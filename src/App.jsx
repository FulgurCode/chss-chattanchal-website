import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Admin from "./pages/Admin";
import Login from "./pages/Login";

import ImportStudents from "./pages/admin/admission/ImportStudents";
import Admission from "./pages/admin/Admission";
import NewAdmission from "./pages/admin/admission/NewAdmission";
import StudentDetails from "./pages/admin/admission/StudentDetails";

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
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
