import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import AdminImportStudents from "./pages/admin/admission/AdminImportStudents";
import AdminAdmission from "./pages/admin/admission/AdminAdmission";
import AdminNewAdmission from "./pages/admin/admission/AdminNewAdmission";

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
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
