from motor.motor_asyncio import AsyncIOMotorClient

mongourl="mongodb://127.0.0.1:27017/"

client=AsyncIOMotorClient(mongourl)

db=client.Employees