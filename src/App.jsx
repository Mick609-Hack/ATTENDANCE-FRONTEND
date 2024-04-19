import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";

// import './App.css'
import "./dashboard.css";
import Modal from "react-modal"
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./dashboard/dashboard";
import RootLayout from "./layouts/rootlayout";
import Appointments from "./dashboard/dashappointments";
import Records from "./dashboard/dashrecords";
import Details from "./dashboard/details";
import Announcement from "./dashboard/dashannounce";
import StudentDashboardDetails from "./dashboard/studentdashboarddetails";
import StudentDashboardLayout from "./dashboard/studentdashboardlayout";
import StudentUpdateDetails from "./dashboard/studentdupdatedetails";
import StudentAnnounce from "./dashboard/studentannounce";
import { AuthContext } from "../src/context/authContext";
import { useContext } from "react";
import UserAttendance from "./dashboard/userAttendance";

Modal.setAppElement("#root")

function App() {
  const { user } = useContext(AuthContext);
  //  if(user === null){
  //    return <div>loading...</div>
  //   }
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              !user ? (
                <Login userlevel="Login" />
              ) : user.user.role === "student" ? (
                <Navigate to="/studentdashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="signup"
            element={
              !user ? (
                <Signup />
              ) : user.user.role === "student" ? (
                <Navigate to="/studentdashboard" />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="dashboard"
            element={
              user ? (
                user.user.role === "admin" ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/studentdashboard" />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="announcement" element={<Announcement />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="records" element={<Records />}/>
            <Route path="records/details/:userId" element={<Details />}/>
            <Route path="records/details/:userId/attendance/:userId" element={<UserAttendance/>}/>
          </Route>
        </Route>
        <Route
          element={
            user && user.user.role === "student" ? (
              <StudentDashboardLayout />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route
            path="studentdashboard"
            element={<StudentDashboardDetails />}
          />
          <Route path="updatedetails" element={<StudentUpdateDetails />} />
          <Route path="studentannounce" element={<StudentAnnounce />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
