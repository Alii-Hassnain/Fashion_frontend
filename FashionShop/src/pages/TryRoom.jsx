import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { PiCameraDuotone, PiCameraSlashDuotone } from "react-icons/pi";
import { TbCapture } from "react-icons/tb";
import { QRCodeSVG } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "../utils/tostify";
import { useLocation } from "react-router-dom";

const convertToBase64 = async (imagePath) => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
  });
};

const TryRoom = () => {
  const location = useLocation();
  const initialImage = location.state?.image;

  // New state for QR upload flow
  const [sessionId] = useState(uuidv4());
  const [showQR, setShowQR] = useState(false);

  // Existing states
  const [responseData, setResponseData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [selectImageScr, setSelectImageScr] = useState(initialImage || "/assets/shirt.jpg");
  const [startProcess, setStartProcess] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showFileInput, setShowFileInput] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // 1️⃣ Poll backend for mobile-uploaded image
  useEffect(() => {
    if (!showQR) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://YOUR_NGROK_URL/api/image/${sessionId}`
        );
        if (res.ok) {
          const { imageDataUrl } = await res.json();
          setImageSrc(imageDataUrl);
          clearInterval(interval);
        }
      } catch {
        // not uploaded yet
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [showQR, sessionId]);

  // 2️⃣ Your existing runApiCall and pollStatus
  const runApiCall = async () => {
    const shirtImage = await convertToBase64(selectImageScr);
    const modelImage = await convertToBase64(imageSrc);
    try {
      const response = await fetch("/api/v1/run", {
        method: "POST",
        body: JSON.stringify({ model_image: modelImage, garment_image: shirtImage, category: "tops" }),
        headers: {
          Authorization: `Bearer fa-BPoPLSO5yR1U-5lbMlU7Amr8H4GxGemDkGfv7`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setResponseData(data);
      if (data?.id) pollStatus(data.id);
    } catch (err) {
      console.error(err);
      handleError("An error occurred. Please try again.");
      setStartProcess(false);
    }
  };
  const pollStatus = (id) => {
    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/v1/status/${id}`, {
          headers: { Authorization: `Bearer fa-BPoPLSO5yR1U-5lbMlU7Amr8H4GxGemDkGfv7` },
        });
        const sd = await res.json();
        setStatusData(sd);
        if (["completed","failed","canceled"].includes(sd.status)) {
          clearInterval(iv);
          setStartProcess(false);
        }
      } catch {
        clearInterval(iv);
        setStartProcess(false);
      }
    }, 5000);
  };

  // 3️⃣ Gallery upload handler
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      closeCamera();
    };
    reader.readAsDataURL(f);
  };

  // 4️⃣ Camera handlers
  const toggleCamera = async () => {
    if (isCameraOpen) return closeCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      setIsCameraOpen(true);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch {
      handleError("Camera access denied or not available.");
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

  // 5️⃣ Delete image
  const deleteImage = () => {
    setImageSrc("");
    setShowFileInput(false);
    setTimeout(() => setShowFileInput(true), 0);
  };

  // 6️⃣ Start AI process
  const handleClick = () => {
    if (!imageSrc) return handleError("Please select or capture an image first");
    setStartProcess(true);
    runApiCall();
  };

  // QR code value
  const qrValue = `https://YOUR_NGROK_URL/upload/${sessionId}`;

  useEffect(() => () => closeCamera(), []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome To Try Room</h1>

      <div className="flex flex-wrap gap-10 justify-center">
        {/* Gallery Upload */}
        <div className="flex flex-col gap-4">
          <label className="label"><span className="label-text">Upload Image</span></label>
          {showFileInput && <input type="file" accept="image/*" onChange={handleFile} />}
          {imageSrc && (
            <div className="relative">
              <button onClick={deleteImage} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2">
                <FaTrash />
              </button>
              <img src={imageSrc} alt="Uploaded" className="w-64 h-64 object-contain border" />
            </div>
          )}
        </div>

        {/* Camera Capture */}
        <div className="flex flex-col gap-4">
          <button onClick={toggleCamera} className={`btn ${isCameraOpen ? "btn-error" : "btn-active"}`}>
            {isCameraOpen ? <PiCameraSlashDuotone /> : <PiCameraDuotone />}
          </button>
          {isCameraOpen && (
            <>
              <video ref={videoRef} autoPlay className="w-64 h-48 border" />
              <button onClick={captureImage} className="btn btn-primary mt-2"><TbCapture /></button>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* QR Upload */}
        <div className="flex flex-col items-center gap-4">
          <button onClick={() => setShowQR(true)} className="btn btn-secondary">
            Scan QR to Upload
          </button>
          {showQR && (
            <div className="mt-4 text-center">
              <QRCodeSVG value={qrValue} size={200} />
              <p>Scan with your phone to upload</p>
            </div>
          )}
        </div>

        {/* Selected Outfit & AI Process */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Selected Shirt</h2>
          <img src={selectImageScr} alt="Shirt" className="w-64 h-64 object-contain border" />
          <button onClick={handleClick} className="btn btn-primary">
            {startProcess ? "Processing..." : "Change Outfit"}
          </button>
          {statusData.status && <p>Status: {statusData.status}</p>}
          {statusData.output && <img src={statusData.output} alt="Result" className="w-64 h-64 mt-4" />}
        </div>
      </div>
    </div>
  );
};

export default TryRoom;
