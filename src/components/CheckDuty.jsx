import Axios from "../../stores/Axios";

export default function CheckDuty(duty, navigate){
    let determiner = true
        Axios.get(`/teacher/have-duty?duty=${duty}`)
          .then((response) => {
            if (response.data == false){
                props.navigate("/teacher/admission")
                determiner = false
            }
          })
          .catch((error) => {
            console.log(error.data);
            navigate("/teacher/admission")
          });

      return determiner
}