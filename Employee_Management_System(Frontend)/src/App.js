import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Dashboard';
import AddForm from './components/AddForm';
import EmpDetails from './components/EmpDetails';
import DeletedDetails from './components/DeletedDetails';
import Login from './components/Login';
import Teamlogin from './components/Teamlogin';
import Logout from './components/Logout';
// import PrivateRoute from './components/PrivateRoute';
import Employee_Login from './components/Employee_Login';
import Employee_Task from './components/Employee_Task';
import Admin_Dashboard from './components/Admin_Dashboard';
import Home from './components/Home';
import CTO_Login from './components/CTO_Login';
import Task_List from './components/Task_List';

function App() {
  return (
    <div className='App'>
      {/* <h1>Welcome</h1> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      <Route path='/dashboard'  element={<Dashboard/>}/>
      <Route path='/tasklist' element={<Task_List/>}/>
      <Route path='admin_dashboard' element={<Admin_Dashboard/>}/>
      <Route path='/addform' element={<AddForm/>}/>
      <Route path='/displayemployees/:_id' element={<EmpDetails/>}/>
      <Route path='/deletedemployees' element={<DeletedDetails/>}/>
      <Route path='/CTO_Login' element={<CTO_Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Employee_login' element={<Employee_Login/>}/>
      <Route path='/employee_task' element={<Employee_Task/>}/>
      <Route path='/team-info' element={<Teamlogin/>}/>
      <Route path='/logout' element={<Logout/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

