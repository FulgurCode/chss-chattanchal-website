import styles from "../../styles/Loader.module.css"
import React from "react"

export default function Loader(props){

    return(
        <div>
         {
            props.open &&
         <div className={styles.outside}>   
        <div>
            <div className={styles.loader}>
            </div>
        </div>
            </div>
        }
        </div>
    )
}