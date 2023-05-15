import React, { useEffect, useRef } from "react";
import popUpStyles from "../../../styles/admin/admission/newAdmission/Popup.module.css";
import Webcam from "react-webcam";

export default function WebCamPop(props) {
  const webcamRef = useRef(null);

  useEffect(() => {
    const getUserCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video = webcamRef.current.video;
        video.srcObject = stream;
        video.play();
      } catch (err) {
        console.error(err);
      }
    };


    getUserCamera();
  }, []);

  const takePhoto = (e) => {
    e.preventDefault();

    const width = 400;
    const height = 300;

    const photo = props.photoRef.current;
    const video = webcamRef.current.video;
    console.log("photo is" + photo);
    props.setGlobal(false);
    if (photo && video) {
      console.log("yes");
      photo.width = width;
      photo.height = height;

      const context = photo.getContext("2d");
      context.drawImage(video, 0, 0, photo.width, photo.height);

      // Convert canvas to data URL
      const dataUrl = photo.toDataURL("image/jpg");
      console.log(dataUrl);
      console.log(props.inputRef)
      props.inputRef.current.value = ""
      props.show(false);
    }
  };

  if (props.open === false) {
    return null;
  }

  return (
    <div className={popUpStyles.overlay}>
      <div className={popUpStyles.popupBodyWebCam}>
        <Webcam ref={webcamRef} className={popUpStyles.canvas} />
        <button
          onClick={() => {
            props.show(!props.open);
          }}
          className={popUpStyles.close}
        >
          X
        </button>
        <button onClick={takePhoto} className={popUpStyles.clickButton} />
      </div>
    </div>
  );
}
