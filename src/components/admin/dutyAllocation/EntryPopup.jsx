import { useState, useEffect } from "react";
import styles from "../../../styles/admin/teachers/dutyAllocation/EntryPopup.module.css";

import Select from "react-select";
import Axios from "../../../../stores/Axios";

export default function EntryPopup(props) {
  // const [teachers, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [duties, setDuties] = useState(["add-details", "verification"]);

  const [selectedOptions, setSelectedOptions] = useState({
    teacherId: "",
    duty: "",
  });

  function handleClose() {
    setSelectedOptions({
      teacherId: "",
      duty: "",
    });
  }

  const dutyOptions = duties.map((duty) => ({
    value: duty,
    label: duty,
  }));

  function updateSelectedOptions(selectedOption, name) {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: selectedOption.value,
    }));
  }

  const [submitMsg, setSubmitMsg] = useState("");

  function postData() {
    props.submit(selectedOptions, setSubmitMsg, submitSuccess);
  }

  function submitSuccess() {
    handleClose();
    setIsOpen(!isOpen);
    setSubmitMsg("");
  }

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    handleClose();
    setIsOpen(!isOpen);
  };
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get("/admin/get-teachers");
        const data = response.data;
        const teacherOptions = data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setTeachers(teacherOptions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // For duty display purpose
  const capitalizedLabels = dutyOptions.map((option) => ({
    ...option,
    label: option.label.charAt(0).toUpperCase() + option.label.slice(1),
  }));

  return (
    <div>
      <button onClick={togglePopup} className={styles.openPopup}>
        Add Duty
      </button>
      {isOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div className={styles.inputBox}>
              <div className={styles.inputSet}>
                <label htmlFor="select">Select Teacher:</label>

                <Select
                  className={styles.box}
                  options={teachers}
                  placeholder="Search Here"
                  onChange={(selectedOption) =>
                    updateSelectedOptions(selectedOption, "teacherId")
                  }
                />
              </div>

              <div className={styles.inputSet}>
                <label htmlFor="select">Select Duty</label>
                <div>
                  <Select
                    className={styles.box}
                    name="duty"
                    // options={dutyOptions}
                    options={capitalizedLabels}
                    getOptionValue={(option) => option.value} // Provide a custom value accessor
                    getOptionLabel={(option) => option.label} // Use the modified label for display
                    placeholder="Search Here"
                    onChange={(selectedOption) =>
                      updateSelectedOptions(selectedOption, "duty")
                    }
                  />
                </div>
              </div>
              <div className={styles.response}>
                {submitMsg && <p>{submitMsg}</p>}
              </div>
              <div className={styles.buttonBox}>
                <button onClick={togglePopup} className={styles.closeBtn}>
                  Cancel
                </button>
                <button onClick={postData} className={styles.submitBtn}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
