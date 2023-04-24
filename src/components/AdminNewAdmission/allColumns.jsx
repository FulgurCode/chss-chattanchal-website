import styles from "../../styles/AdminNewAdmission/allColumns.module.css"
import React from "react"
import img2 from "../../../public/imgs/image_2.svg";


function AllColumns() {
    return (
        <div className={`${styles.globalParent}`}>
            <div className={`${styles.subContainer}`}>
                <img className={`${styles.img2}`} src={img2} />
                <label className={`${styles.titleLabel}`} >New Admissions</label>
                <hr className={`${styles.stopLine}`} />
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.pathBox}`}>
                <label className={`${styles.pathLabel}`} >Home</label>
                <label className={`${styles.pathLabel}`} >-</label>
                <label className={`${styles.pathLabel}`} >Admissions</label>
                <label className={`${styles.pathLabel}`} >-</label>
                <label className={`${styles.pathLabel}`} >New Admission</label>
            </div>
            <label className={`${styles.mandatoryLabel}`} >Fields marked with <span className={`${styles.aster}`} >  *  </span> are mandatory</label>
            <div className={`${styles.container}`}>
                <div className={`${styles.subContainer}, ${styles.applicationNo}`}>
                    <label className={`${styles.applicationNoLabel}`}>Application number</label>
                    <input className={`${styles.applicationNoInput} ${styles.inputField}`}></input>
                </div>
                <div className={`${styles.subContainer} ${styles.applicationNo}`}>
                    <label className={`${styles.applicationNoLabel}`}>Admission Date</label>
                    <input className={`${styles.applicationNoInput} ${styles.inputField}`}></input>
                </div>
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew} `}>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.studentNameLabel} ${styles.label}`}>Name of the student <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.studentNameInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.adharNumLabel} ${styles.label}`}>Aadhar No <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.adharNumInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.genderLabel} ${styles.label}`}>Gender <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.genderInput} ${styles.inputFieldNew}`}></input>
                </div>
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew} `}>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.parentNameLabel} ${styles.label}`}>Name of the parent / guardian <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.parentNameInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.parentOccupationLabel} ${styles.label}`}>Occupation of the parent / guardian <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.parentOccupationInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.relationshipLabel} ${styles.label}`}>Relationship of the student to guardian <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.relationshipInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.addressGuardianLabel} ${styles.label}`}>Address of guardian <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.addressGuardianInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.religionLabel} ${styles.label}`}>Religion <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.religionInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.casteLabel} ${styles.label}`}>Caste <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.casteInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.categoryLabel} ${styles.label}`}>Category <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.categoryInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.OBCLabel} ${styles.label}`}>Does the student belong to OBC <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.OBCInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.lanMinorityLabel} ${styles.label}`}>If the student belong to linguistic minority <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.lanMinorityInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.DOBLabel} ${styles.label}`}>DOB <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.DOBInput} ${styles.inputFieldNew}`}></input>
                </div>
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew}`}>
                <label className={`${styles.subHeadingLabel}`}>Details of qualifying examination</label>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.boardNameLabel} ${styles.label}`}>Name of Board <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.boardNameInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.regNoLabel} ${styles.label}`}>Registration No. <span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.regNoInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.monthAndYearOfPassingLabel} ${styles.label}`}>Month and year of passing<span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.monthAndYearOfPassingInput} ${styles.inputFieldNew}`}></input>
                </div>
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew}`}>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.classAndCombinationLabel} ${styles.label}`}>Class and combination in which admitted<span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.classAndCombinationInput} ${styles.inputFieldNew}`}></input>
                </div>
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew}`}>
                <label className={`${styles.subHeadingLabel}`}>Details of Transfer certificate produced on admission</label>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.TCNumberLabel} ${styles.label}`}>Number<span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.TCNumberInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.TCdateLabel} ${styles.label}`}>Date<span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.TCdateInput} ${styles.inputFieldNew}`}></input>
                </div>
                <div className={`${styles.subContainerNew}`}>
                    <label className={`${styles.issuedSchoolLabel} ${styles.label}`}>Issued school / institution<span className={`${styles.aster}`} >  *  </span></label>
                    <input className={`${styles.issuedSchoolInput} ${styles.inputFieldNew}`}></input>
                </div>
                <button className={`${styles.submitButton}`} >Submit</button>
            </div>
        </div>
    )
}

export default AllColumns