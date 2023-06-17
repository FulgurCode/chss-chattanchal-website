import React, { useEffect, useRef } from "react";
import popUpStyles from "../../../styles/admin/admission/newAdmission/Popup.module.css";
import Webcam from "react-webcam";

export default function WebCamPop(props) {
  const webcamRef = useRef(null);

  
  const videoConstraints = {
    aspectRatio: 1 / 1, // Set the desired aspect ratio
  };

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
      }
    };

    getUserCamera();
  }, []);

  
  async function base64ToFile(dataUrl, setState) {
    let blob = await fetch(dataUrl).then((res) => res.blob());
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const arrayBuffer = fileReader.result;
      const file = new File([arrayBuffer], "file.jpg", {
        type: blob.type,
      });
      setState(file);
    };
    fileReader.readAsArrayBuffer(blob);
  }

  const takePhoto = async (e) => {
    e.preventDefault();

    const width = 400;
    const height = 300;

    const photo = props.photoRef.current;
    const video = webcamRef.current.video;
    props.setGlobal(false);
    if (photo && video) {
      photo.width = width;
      photo.height = height;

      const context = photo.getContext("2d");
      context.drawImage(video, 0, 0, photo.width, photo.height);

      // Convert canvas to data URL
      const dataUrl =  photo.toDataURL("image/jpg");
      const photoFile = await base64ToFile(dataUrl, props.webCamPhoto) 
      // props.webCamPhoto(photoFile)
      // props.webCamPhoto(dataUrl)
      props.inputRef.current.value = ""
      props.show(false);
      props.setGlobal(false)
    }
  };

  if (props.open === false) {
    return null;
  }

  return (
    <div className={popUpStyles.overlay}>
      <div className={popUpStyles.popupBodyWebCam}>
        <Webcam ref={webcamRef} className={popUpStyles.canvas} videoConstraints={videoConstraints} />
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
