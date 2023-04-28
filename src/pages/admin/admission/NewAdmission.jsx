import AllColumns from "../../../components/admin/newAdmission/AllColumns";
import NavBar from "../../../components/NavBar";

export default function NewAdmission() {
  return (
    <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <NavBar />
      <AllColumns />
    </div>
  );
}
