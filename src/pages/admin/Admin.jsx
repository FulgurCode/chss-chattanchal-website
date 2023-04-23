import styles from '../../styles/admin/admin.module.css'
import { Link, Outlet } from 'react-router-dom'

import React from 'react'
import menu_img from '/imgs/menu.png'
import admission from '/imgs/admission.png'
import user from '/imgs/user.png'
import attendence from '/imgs/attendence.png'

export default function Admin(){
    return (
        <>  
            
            <header className={styles.adminHeader}>
                <Link to='/admin'><div className={styles.adminHomebutton}>
                <img src={menu_img} className={styles.headerHomebuttonImg} />
                    <h3  className={styles.headerHomebuttonText}>Home</h3>
                </div></Link>
                <h3 className={styles.headerTitle}>CHSS CHATTANCHAL</h3>
                <img src={user} className={styles.userimg}>
                </img>
            </header>
            <section>
                <div className={styles.admission}>
                    <Link to="/admin/admission"><img className={styles.iconadmission} src={admission} /></Link>
                    <img className={styles.iconattendence} src={attendence} />
                </div>
            </section>

        </>
    )
}