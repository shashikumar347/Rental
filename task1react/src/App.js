import { Route, Routes } from 'react-router-dom';
import './App.css';
import ExpenseForm from './Component/ExpenseForm';
import Navbar1 from './Component/Navbar1';
import EmployeeForm from './Component/EmployeAdd';
import TicketTrackerForm from './Component/TicketTracker';

function App() {
  return (
 <>
       {/* <Task/>  */}
       <Navbar1/>
       <Routes>
        <Route path='/Expenses' element={<ExpenseForm/>}/>
        <Route path='/Tickettracker' element={<TicketTrackerForm/>}/>
        <Route path='/Employee' element={<EmployeeForm/>}/>
       </Routes>
  
  </>
  );
}
export default App;
