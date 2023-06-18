import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Admin from "./pages/Admin";
import Login from "./pages/Login";

import ImportStudents from "./pages/admin/admission/ImportStudents";
import Admission from "./pages/admin/Admission";
import NewAdmission from "./pages/admin/admission/NewAdmission";

import StudentDetails from "./pages/admin/admission/StudentDetails";
import VerificationTeacher from "./pages/teacher/admission/VerificationTeacher";
import AdminStudentProfile from "./components/AdminStudentProfile";
import TeacherStudentProfile from "./components/TeacherStudentProfile";
import Confirmation from "./pages/admin/admission/Confirmation";
import AdminReport from "./pages/admin/admission/Report";

import Teachers from "./pages/admin/Teachers";
import AddTeachers from "./pages/admin/teachers/AddTeachers.jsx";
import DutyAllocation from "./pages/admin/teachers/DutyAllocation.jsx";
import ImportTeachers from "./pages/admin//teachers/ImportTeachers.jsx";
import TeacherReport from "./pages/teacher/admission/Report";
import VerificationAdmin from "./pages/admin/admission/VerificationAdmin";

import SignUp from "./pages/teacher/SignUp";
import SignUpOtp from "./pages/teacher/Otp";

// Pages for Teacher User
import Teacher from "./pages/teacher/Teacher";
import TeacherAdmission from "./pages/teacher/Admission";
import TeacherNewAdmission from "./pages/teacher/admission/NewAdmission";
import TeacherStudentDetails from "./pages/teacher/admission/StudentDetails";
import TeacherImportStudents from "./pages/teacher/admission/ImportStudents";
import EditStudentsTeacher from "./pages/teacher/admission/EditStudentTeacher";
//

import ChangePassword from "./components/common/ChangePassword";

import EditStudents from "./pages/admin/admission/EditStudent";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route
            path="/admin/change-password"
            element={<ChangePassword user="admin" />}
          />
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
              path="/admin/admission/edit-student"
              element={<EditStudents />}
            ></Route>
            <Route
              path="/admin/admission/student-details"
              element={<StudentDetails />}
            ></Route>
            <Route
              path="/admin/admission/profile"
              element={<AdminStudentProfile />}
            ></Route>
            <Route
              path="/admin/admission/verification"
              element={<VerificationAdmin />}
            ></Route>
            <Route
              path="/admin/admission/verification/student-details"
              element={<AdminStudentProfile />}
            ></Route>
            <Route
              path="/admin/admission/confirmation"
              element={<Confirmation />}
            ></Route>
            <Route
              path="/admin/admission/report"
              element={<AdminReport />}
            ></Route>
          </Route>
          <Route
            path="/admin/admission/confirmation/student-details"
            element={<AdminStudentProfile />}
          />
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

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/teacher">
          <Route index element={<Teacher />} />
          <Route path="/teacher/signup-otp" element={<SignUpOtp />}></Route>
          <Route
            path="/teacher/change-password"
            element={<ChangePassword user="teacher" />}
          />

          <Route path="/teacher/admission">
            <Route index element={<TeacherAdmission />} />
            <Route
              path="/teacher/admission/new-admission"
              element={<TeacherNewAdmission />}
            ></Route>
            <Route
              path="/teacher/admission/import-students"
              element={<TeacherImportStudents />}
            ></Route>
            <Route index element={<VerificationTeacher />} />
            <Route
              path="/teacher/admission/verification/student-details"
              element={<TeacherStudentProfile />}
            ></Route>
            <Route
              path="/teacher/admission/student-details"
              element={<TeacherStudentDetails />}
            ></Route>
            <Route
              path="/teacher/admission/edit-student"
              element={<EditStudentsTeacher />}
            ></Route>
            <Route
              path="/teacher/admission/profile"
              element={<TeacherStudentProfile />}
            ></Route>
            <Route
              path="/teacher/admission/verification"
              element={<VerificationTeacher />}
            ></Route>
            <Route
              path="/teacher/admission/report"
              element={<TeacherReport />}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
