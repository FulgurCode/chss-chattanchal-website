import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import StudentsImport from "./pages/admin/StudentsImport";
import AdminAdmission from "./pages/admin/admission/AdminAdmission";
import AdminNewAdmission from "./pages/admin/admission/AdminNewAdmission";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin">
          <Route index element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route
            path="/admin/import-students"
            element={<StudentsImport />}
          ></Route>
          <Route path="/admin/admission">
            <Route index element={<AdminAdmission />} />
            <Route
              path="/admin/admission/new-admission"
              element={<AdminNewAdmission />}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
