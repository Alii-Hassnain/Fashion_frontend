import React, { useRef, useState } from "react";
import { PiCameraDuotone, PiCameraSlashDuotone } from "react-icons/pi";
import { TbCapture } from "react-icons/tb";

const CameraCapture = ({ imageSrc, setImageSrc }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const toggleCamera = async () => {
    if (isCameraOpen) return closeCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch {
      console.error("Camera access denied or not available.");
    }
  };

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setImageSrc(canvas.toDataURL("image/png"));
    closeCamera();
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
          <video ref={videoRef} autoPlay className="w-64 h-48 border" />
          <button onClick={captureImage} className="btn btn-primary mt-2">
            <TbCapture />
          </button>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
