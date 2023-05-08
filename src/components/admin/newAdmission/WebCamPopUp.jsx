import React, { useEffect, useRef } from "react";
import popUpStyles from "../../../styles/admin/admission/newAdmission/PopUp.module.css";
import Webcam from "react-webcam";

export default function WebCamPop(props) {


  let videoRef = useRef(null);
  let photoRef = useRef(null);

  // get access to user camera 

  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({
      video:true
    })
    .then(
      (stream) => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      }
      
    )
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getUserCamera()
  }, [videoRef])

  if (props.open == false) {
    return null;
  }

  // take photo

  const takePhoto = () => {

    let width = 400

    let height = 300

    let photo = photoRef.current

    let video = videoRef.current

    photo.width = width
    photo.height = height 

    let context = photo.getContext("2d")
    context.drawImage(video, 0, 0, photo.width, photo.height)
  }

  return (
    <div onClick={() => props.show(!props.open)} className={popUpStyles.overlay}>
      <div className={`${popUpStyles.popupBodyWebCam}`}>
        <video ref={videoRef} className={popUpStyles.canvas}></video>
        <button
          onClick={() => {
            props.show(!props.open);
          }}
          className={`${popUpStyles.close}`}
        >
          X
        </button>
        <button onClick={takePhoto} className={popUpStyles.clickButton}></button>
        <canvas ref={photoRef} ></canvas>
      </div>

    </div>
  );
}
