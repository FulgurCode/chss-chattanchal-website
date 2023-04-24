import styles from '../styles/admin/admin.module.css'
import { Link, Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import React from 'react'
// import menu_img from '/imgs/menu.png'
import admission from '/imgs/admission.png'
// import user from '/imgs/user.png'
import attendence from '/imgs/attendence.png'

export default function Admin(){
    return (
        <>  
            
            <NavBar />
            <section>
                <div className={styles.admission}>
                    <Link to="/admin/admission"><img className={styles.iconadmission} src={admission} /></Link>
                    <img className={styles.iconattendence} src={attendence} />
                </div>
            </section>

        </>
    )
}