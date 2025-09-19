from fastapi import FastAPI, Request, HTTPException, Body
from pydantic import Field, BaseModel
from database import db
from database import client
from bson import ObjectId
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Employees(BaseModel):
    name: str=Field(min_length=3)
    # username: str
    # password: str
    designation: str=Field(min_length=3)
    email_id: str
    salary: int

class Team(BaseModel):
    leader_id: str
    team_code: str
    members: dict

class Task(BaseModel):
    Emp_id: str
    Team_code: str
    Task: str
    Description: str
    End_date: str
    # status: str

@app.get("/hello")
def Hello():
    return {"message": "Hello World"}

@app.post("/addEmployee")
async def AddEmployee(employee: Employees):
    print("Hello")
    print(employee)
    data = employee.dict()
    data["status"] = 0
    data["username"] = data["name"]
    res = await db.Employee_details.insert_one(data)
    inserted_id = res.inserted_id
    ans = await db.Employee_details.update_one({"_id": inserted_id},{"$set":{"password": str(inserted_id)}})
    return employee

@app.get("/showallEmployee")
async def showEmployee():
    employees =[]
    cursor=db.Employee_details.find({"status": {"$ne": 1}})
    async for employee in cursor:
        employee['_id']=str(employee['_id'])
        employees.append(employee)

    return employees

@app.put("/updateemployee")
async def updateEmployee(employee_id:str,data):
    res=await db.Employee_details.update_one({"_id":ObjectId(employee_id)},{"$set":{"name":data}})
    return {"message": "Name updated"}

@app.delete("/deleteemployee")
async def deleteEmployee(employee_id:str):
    res = await db.Employee_details.delete_one({"_id":ObjectId(employee_id)})
    return {"message": "deleted"}

@app.get("/displayemployees/{employee_id}")
async def displayEmployee(employee_id: str):
    print(employee_id)
    emp = []
    print(employee_id)
    details = {
        "_id": ObjectId(employee_id),
        "status": {"$ne": 1}
    }
    print(details)
    cursor = await db.Employee_details.find_one(details)
    cursor["_id"] = str(cursor["_id"])
    emp.append(cursor)
    print(emp)
    return emp

@app.put("/admin_update")
async def update_Employee(employee_id: str, data:Employees):
    print(employee_id)
    res = await db.Employee_details.update_many({"_id":ObjectId(employee_id)},{"$set":data.dict()})
    print(data)
    return data

@app.delete("/admin_delete")
async def delete_Employee(employee_id: str):
    res = await db.Employee_details.delete_one({"_id":ObjectId(employee_id)})
    return {"message": "Employee deleted"}

@app.put("/UIdelete")
async def uidelete(employee_id: str):
    res = await db.Employee_details.update_one({"_id":ObjectId(employee_id)}, {"$set": {"status": 1}})
    return {"message": "Employee removed from UI"}

# @app.get("/deletedemp")
# async def empdeleted():
#     employees =[]
#     cursor = db.Employee_details.find({"status": {"$eq": 1}})
#     async for employee in cursor:
#         employee['_id'] = str(employee['_id'])
#         employees.append(employee)
#     print(employees)
#     return employees

def deep_clean(doc):
    if isinstance(doc, dict):
        return {k: deep_clean(v) for k, v in doc.items()}
    elif isinstance(doc, list):
        return [deep_clean(i) for i in doc]
    elif isinstance(doc, ObjectId):
        return str(doc)
    else:
        return doc

@app.get("/deletedemp")
async def empdeleted():
    employees = []
    cursor = db.Employee_details.find({"status": 1})
    async for employee in cursor:
        employees.append(deep_clean(employee))
    return employees

@app.post("/addteam")
async def addTeam(team: Team):
    data = team.dict()
    print(data)
    res = await db.Team.insert_one(data)
    return team  

@app.post("/CTO_Login")
async def CTO_login(request: Request):
    body = await request.json()
    username = body.get("username")
    password = body.get("password")

    cto = await db.Administrators.find_one({"username": username, "password": password})
    if not cto:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"status": "Success"}

# @app.post("/Login")
# async def LOGIN(request: Request):
    body = await request.json()
    username = body.get("username")
    password = body.get("password")

    employee = await db.Employee_details.find_one({"username": username, "password": password})
    if not employee:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    employee["_id"] = str(employee["_id"])
    employee_id = employee["_id"]

    team = await db.Team.find_one({
        "$or": [
            {"leader_id": employee_id},
            {f"members.{employee_id}": {"$exists": True}}
        ]
    })

    if not team:
        return {
            "status": "normal",
            "employee": employee
        }

    # Step 3: Gather full info of all team members and leader
    team["_id"] = str(team["_id"])
    member_ids = list(team["members"].values())
    all_ids = [team["leader_id"]] + member_ids

    # Convert to ObjectIds
    object_ids = [ObjectId(i) for i in all_ids if ObjectId.is_valid(i)]

    # Fetch details from Employee_details
    cursor = db.Employee_details.find({"_id": {"$in": object_ids}})
    members_info = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        members_info.append(doc)

    return {
        "status": "team",
        "employee": employee,
        "team": team,
        "members_info": members_info
    }



@app.post("/Login")
async def login(request: Request):
    body = await request.json()
    username = body.get("username")
    password = body.get("password")

    # Step 1: Validate credentials
    employee = await db.Employee_details.find_one({"username": username, "password": password})
    if not employee:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    employee["_id"] = str(employee["_id"])
    employee_id = employee["_id"]

    # Step 2: Check if the user is a leader or member in a team
    team = await db.Team.find_one({
        "$or": [
            {"leader_id": employee_id},
            {"members.mem1": employee_id},
            {"members.mem2": employee_id},
            {"members.mem3": employee_id},
            {"members.mem4": employee_id}
        ]
    })

    if not team:
        return {
            "status": "normal",
            "employee": employee
        }

    # Step 3: Get all member info including leader
    team["_id"] = str(team["_id"])
    member_ids = list(team["members"].values())
    all_ids = [team["leader_id"]] + member_ids

    object_ids = [ObjectId(i) for i in all_ids if ObjectId.is_valid(i)]
    cursor = db.Employee_details.find({"_id": {"$in": object_ids}})
    members_info = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        members_info.append(doc)

    return {
        "status": "team",
        "employee": employee,
        "team": team,
        "members_info": members_info
    }



@app.post("/addtask")
async def Addtask(task: Task):
    data=task.dict()
    data["status"] = "In Progress"
    res = await db.Task.insert_one(data)
    return task

@app.get("/taskcount")
async def get_task_count(emp_id: str = None):
    if emp_id:
        count = await db.Task.count_documents({"Emp_id": emp_id})
    else:
        count = await db.Task.count_documents({})
    return {"count": count}

@app.get("/completedtask")
async def complete_task(emp_id: str):
    count = await db.Task.count_documents({"Emp_id": emp_id,"status": "Completed"})
    return {"count": count,"Emp_id": emp_id}

# @app.post("/Employee_login")
# async def Employee_Login(request: Request):
    # body =  await request.json()
    # username = body.get("username")
    # password = body.get("password")

    # print(username)
    # print(password)
    
    # employee = await db.Employee_details.find_one({"username": username, "password": password})
    # if not employee:
    #     raise HTTPException(status_code=401, detail="Invalid Credentials")

    # print(employee)

    # employee["_id"] = str(employee["_id"])
    # employee_id = employee["_id"]
    # print(employee_id)

    # employee_id = ObjectId(employee["_id"])

    # team = await db.Team.find_one({
    #     "$or": [
    #         {"members.mem1": employee_id},
    #         {"members.mem2": employee_id},
    #         {"members.mem3": employee_id},
    #         {"members.mem4": employee_id}
    #     ]
    # })
    # if not team:
    #     raise HTTPException(status_code=404,detail="Not Found")

    # print(team)

    # team["_id"] = str(team["_id"])
    # member_id = team["members"].values()
    # all_ids = member_id

    # # object_ids = [ObjectId(i) for i in all_ids if ObjectId.is_valid(i)]
    # object_ids = list(all_ids)

    # cursor = db.Employee_details.find({"_id": {"$in": object_ids}})
    # member_info =[]
    # async for doc in cursor:
    #     doc["_id"] = str(doc["_id"])
    #     member_info.append(doc)
    #     print(member_info)

    # return {
    #     "status": "team",
    #     "employee": employee,
    #     "team": team,
    #     "member_info": member_info
    # }


# @app.post("/Employee_login")
async def Employee_Login(request: Request):
    body = await request.json()
    username = body.get("username")
    password = body.get("password")

    # Step 1: Validate credentials
    employee = await db.Employee_details.find_one({"username": username, "password": password})
    if not employee:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    # Convert employee ID to string for comparison
    employee["_id"] = str(employee["_id"])
    employee_id_str = employee["_id"]

    # Step 2: Find team where employee is one of the members
    team = await db.Team.find_one({
        "$or": [
            {"members.mem1": employee_id_str},
            {"members.mem2": employee_id_str},
            {"members.mem3": employee_id_str},
            {"members.mem4": employee_id_str}
        ]
    })

    if not team:
        raise HTTPException(status_code=403, detail="You are not part of any team")

    # Step 3: Convert member strings to ObjectId to get full member details
    team["_id"] = str(team["_id"])
    member_ids = team["members"].values()
    object_ids = [ObjectId(mid) for mid in member_ids if ObjectId.is_valid(mid)]

    # Step 4: Fetch member details
    cursor = db.Employee_details.find({"_id": {"$in": object_ids}})
    member_info = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        member_info.append(doc)

    return {
        "status": "success",
        "employee": employee,
        "team": team,
        "member_info": member_info
    }

@app.get("/gettask")
async def Get_task(employee_id: str):
    tasks = []
    cursor = db.Task.find({"Emp_id": employee_id})
    async for x in cursor:
        x['_id']=str(x['_id'])
        tasks.append(x)
    # tasks.append(cursor)
    print(type(tasks))
    return tasks

@app.put("/updatetask")
async def update_task(task: dict = Body(...)):
    task_id = task.get("_id")
    status = task.get("status")

    if not task_id or not status:
        raise HTTPException(status_code=400, detail="Missing '_id' or 'status'")

    try:
        result = await db.Task.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": status}}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # if result.matched_count == 0:
    #     raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task updated"}





@app.on_event("shutdown")
async def shutdown_db_client():
    # Ensure MongoDB client closes cleanly to avoid noisy CancelledError on shutdown
    client.close()

