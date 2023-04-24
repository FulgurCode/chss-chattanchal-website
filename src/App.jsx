import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Admin from "./pages/Admin";
import Login from "./pages/Login";

import AdminImportStudents from "./pages/admin/admission/AdminImportStudents";
import AdminAdmission from "./pages/admin/admission/AdminAdmission";
import AdminNewAdmission from "./pages/admin/admission/AdminNewAdmission";
import AdminStudentDetails from "./pages/admin/admission/AdminStudentDetails";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="/admin/admission">
            <Route index element={<AdminAdmission />} />
            <Route
              path="/admin/admission/new-admission"
              element={<AdminNewAdmission />}
            ></Route>
            <Route
              path="/admin/admission/import-students"
              element={<AdminImportStudents />}
            ></Route>
            <Route
              path="/admin/admission/student-details"
              element={<AdminStudentDetails />}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
