import React, { useRef, useState } from "react";
import { PiCameraDuotone, PiCameraSlashDuotone } from "react-icons/pi";
import { TbCapture } from "react-icons/tb";
import { handleError } from "../../utils/tostify"

const CameraCapture = ({ imageSrc, setImageSrc }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [videoError, setVideoError] = useState(null);

  // const toggleCamera = async () => {
  //   if (isCameraOpen) return closeCamera();
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: { facingMode: "user" },
  //     });
  //     streamRef.current = stream;
  //     setIsCameraOpen(true);
  //     videoRef.current.srcObject = stream;
  //     videoRef.current.play();
  //     // if (videoRef.current) {
  //     //   videoRef.current.srcObject = stream;
  //     //   videoRef.current.onloadedmetadata = () => {
  //     //     videoRef.current.play().catch((err) => {
  //     //       console.error("Video play error:", err);
  //     //       setVideoError("Failed to play video stream. Please try again.");
  //     //       handleError("Failed to play video stream");
  //     //       closeCamera();
  //     //     });
  //     //   };
  //     //   videoRef.current.onerror = (err) => {
  //     //     console.error("Video element error:", err);
  //     //     setVideoError("Video element error. Please try again.");
  //     //     handleError("Video element error");
  //     //     closeCamera();
  //     //   };
  //     // }
      
  //   } catch {
  //     console.error("Camera access denied or not available.");
  //     setVideoError("Camera access denied or not available. Please check permissions.");
  //     handleError("Camera access denied or not available");
  //   }
  // };

  const toggleCamera = async () => {
    if (isCameraOpen) {
      closeCamera();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 500);
    } catch (error) {
      console.error("Error accessing camera:", error);
      handleError("Camera access denied or not available.");
      alert("Camera access denied or not available.");
    }
  };
  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setIsCameraOpen(false);
  };

  // const captureImage = () => {
  //   if (!videoRef.current) return;
  //   const canvas = canvasRef.current;
  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;
  //   canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
  //   setImageSrc(canvas.toDataURL("image/png"));
  //   closeCamera();
  // };
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL("image/png");
    console.log("captured image : ", capturedImage)
    setImageSrc(capturedImage);
    closeCamera(); // Close camera after capture
  };

  const deleteImage = () => {
    setImageSrc("");  
  };
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={toggleCamera}
        className={`btn ${isCameraOpen ? "btn-error" : "btn-active"}`}
      >
        {isCameraOpen ? <PiCameraSlashDuotone /> : <PiCameraDuotone />}
      </button>
      {isCameraOpen && (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-64 h-48 border" />
          <button onClick={captureImage} className="btn btn-primary mt-2 mb-10">
            <TbCapture /> 
          </button>
        </>
      )}
      {imageSrc && (
        <div className="mt-4 ">
          <p className="text-left text-xl ">Captured Image </p>
          <img
            src={imageSrc}
            alt="Captured"
            className="w-64 h-48 object-cover border rounded"
            style={{ display: "block" }}
            onError={(e) => console.error("Error loading image in CameraCapture:", e)}
          />
         <button onClick={deleteImage} className=" btn btn-primary mt-2 mb-10 "> Dell Image 
         </button>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;



