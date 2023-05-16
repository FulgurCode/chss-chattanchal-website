import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Admin from "./pages/Admin";
import Login from "./pages/Login";

import ImportStudents from "./pages/admin/admission/ImportStudents";
import Admission from "./pages/admin/Admission";
import NewAdmission from "./pages/admin/admission/NewAdmission";
import Profile from "./pages/admin/admission/Profile";
import StudentDetails from "./pages/admin/admission/StudentDetails";
import Verification from "./pages/admin/admission/Verification";
import Confirmation from "./pages/admin/admission/Confirmation";

import Teachers from "./pages/admin/Teachers";
import AddTeachers from "./pages/admin/teachers/AddTeachers.jsx";
import DutyAllocation from "./pages/admin/teachers/DutyAllocation.jsx";
import ImportTeachers from "./pages/admin//teachers/ImportTeachers.jsx";

import SignUp from "./pages/teacher/SignUp";
import SignUpOtp from "./pages/teacher/Otp";

import Teacher from "./pages/teacher/Teacher";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="/admin/admission">
            <Route index element={<Admission />} />
            <Route
              path="/admin/admission/new-admission"
              element={<NewAdmission />}
            ></Route>
            <Route
              path="/admin/admission/import-students"
              element={<ImportStudents />}
            ></Route>
            <Route
              path="/admin/admission/student-details"
              element={<StudentDetails />}
            ></Route>
            <Route
              path="/admin/admission/profile"
              element={<Profile />}
            ></Route>
            <Route
              path="/admin/admission/confirmation"
              element={<Confirmation />}
            ></Route>
          </Route>
          <Route path="/admin/teachers">
            <Route index element={<Teachers />} />
            <Route
              path="/admin/teachers/add-teachers"
              element={<AddTeachers />}
            ></Route>
            <Route
              path="/admin/teachers/import-teachers"
              element={<ImportTeachers />}
            ></Route>
            <Route
              path="/admin/teachers/duty-allocation"
              element={<DutyAllocation />}
            ></Route>
          </Route>
        </Route>
        <Route path="/teacher">
          <Route path="/teacher/signup" element={<SignUp />}></Route>
          <Route path="/teacher/signup-otp" element={<SignUpOtp />}></Route>
          <Route index element={<Teacher />} />

          <Route
            path="/teacher/verification"
            element={<Verification />}
          ></Route>

          <Route path="/teacher/admission">
            <Route index element={<Admission />} />
            <Route
              path="/teacher/admission/new-admission"
              element={<NewAdmission />}
            ></Route>
            <Route
              path="/teacher/admission/import-students"
              element={<ImportStudents />}
            ></Route>
            <Route
              path="/teacher/admission/student-details"
              element={<StudentDetails />}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
