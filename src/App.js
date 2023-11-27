import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import Login from "./features/auth/Login";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PresistLogin from "./features/auth/PresistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle('dk Tek')
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public route */}
        <Route index element={<Public/>}/>
        <Route path="login" element={<Login/>}/>
        {/* private route */}
        <Route element={<PresistLogin />} >
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >          
            <Route element={<Prefetch/>} >
              <Route path="dash" element={<DashLayout/>}>
                <Route index element={<Welcome/>} />
                <Route element={<RequireAuth allowedRoles={ROLES.Manager || ROLES.Admin}/>} >
                  <Route path="users">
                    <Route index element={<UsersList/>}/>            
                    <Route path=":id" element = {<EditUser/>} /> 
                    <Route path="new" element ={<NewUserForm/>} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList/>}/>              
                  <Route path=":id" element ={<EditNote/>} /> 
                  <Route path="new" element ={<NewNote/>} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>   

    </Routes>
  );
}

export default App;
