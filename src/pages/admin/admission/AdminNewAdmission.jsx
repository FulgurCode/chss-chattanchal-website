import AllColumns from "../../../components/AdminNewAdmission/allColumns";
import NavBar from "../../../components/NavBar";

export default function AdminNewAdmission() {

    return (
        <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
            <NavBar />
            <AllColumns />
        </div>
    )
}