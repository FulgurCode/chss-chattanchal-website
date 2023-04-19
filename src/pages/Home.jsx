import { Outlet, Link } from "react-router-dom"
export default function Home(){

    return (
        <>
            <div>
                <h1>Home page</h1>
                <h1><Link to='/login'>login page</Link></h1>
                <h1><Link to='/admin'>admin_dash</Link></h1>
            </div>

            <Outlet />

        </>
    )
}