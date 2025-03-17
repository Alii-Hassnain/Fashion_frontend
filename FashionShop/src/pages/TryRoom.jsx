import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import modle from "../assets/modle.jpg";
import shirt from "../assets/shirt.jpg";
import { handleError } from "../utils/tostify";

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
  const [responseData, setResponseData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [selectImageScr, setSelectImageScr] = useState(shirt);
  const [startProcess, setStartProcess] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showFileInput, setShowFileInput] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // API Call
  const runApiCall = async () => {
    const shirtImage = await convertToBase64(shirt);
    const modelImage = await convertToBase64(imageSrc);
    try {
      const response = await fetch("/api/v1/run", {
        method: "POST",
        body: JSON.stringify({
          model_image: modelImage,
          garment_image: shirtImage,
          category: "tops",
        }),
        headers: {
          Authorization: `Bearer fa-BPoPLSO5yR1U-5lbMlU7Amr8H4GxGemDkGfv7`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResponseData(data);

      if (data && data.id) {
        pollStatus(data.id);
      }
    } catch (error) {
      console.error("Error:", error);
      handleError("An error occurred. Please try again.");
      setStartProcess(false);
    }
  };

const checkUser=async()=>{
  try {
    const response=await fetch("http://localhost:8080/user/verify-session",{
      method:"GET",
      credentials:"include"
    })
    const result=await response.json();
    console.log(result);
    if(!result.success){
      console.log(result.message)
      handleError(result.message);
      navigate("/login");
    }

    console.log(result.success)
    console.log(result)
  } catch (error) {
    console.log(error);
    handleError("An error occurred. Please try again.",error.message);
  }
}



  // Poll Status API
  const pollStatus = (statusId) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`api/v1/status/${statusId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer fa-BPoPLSO5yR1U-5lbMlU7Amr8H4GxGemDkGfv7`,
          },
        });

        const statusData = await response.json();
        setStatusData(statusData);

        const { status } = statusData;
        console.log(`Status: ${status}`);

        if (["completed", "failed", "canceled"].includes(status)) {
          clearInterval(intervalId);
          setStartProcess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        handleError("An error occurred. Please try again.");
        setStartProcess(false);
        clearInterval(intervalId);
      }
    }, 5000);
  };

  // Handle Image Upload from Gallery
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      closeCamera();
    };

    reader.readAsDataURL(file);
  };

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

  // Close Camera
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

// image capture from camera 
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL("image/png");

    setImageSrc(capturedImage);
    closeCamera(); // Close camera after capture
  };

 
 // delete image  
  const deleteImage = () => {
    setImageSrc(""); 
    setShowFileInput(false); 

    setTimeout(() => {
      setShowFileInput(true); 
    }, 0);
  };

  // Start Process
  const handleClick = async () => {
    if (!imageSrc) {
      handleError("Please select or capture an image first");
      return;
    }
    checkUser()
    runApiCall();
    setStartProcess(true);
  };

  useEffect(() => {
    return () => closeCamera();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-xl my-10 font-bold">
        Welcome To Try Room Demo
      </h1>

      <div className="flex flex-row gap-10 justify-center">
        {/* Upload from Gallery */}
        <div className="flex flex-col gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Image</span>
            </label>

                     {showFileInput && (
            <input type="file" accept="image/*" onChange={handleFile}  />
          )}
          </div>

          {imageSrc && (
               <div className="mt-4 flex flex-col items-center relative"> 
                  <button
              onClick={deleteImage}
              className=" flex items-center gap-2 bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-700 transition"
              
            >
              DeleteImage
              {/* <FaTrash size={20} /> */}
            </button>

            <img
                src={imageSrc}
                alt="Uploaded"
                className="object-contain w-64 h-64"
              />
            
            </div>
          )}
        </div>

        {/* Camera Capture */}
        <div className="flex flex-col gap-2">
          <button
            onClick={toggleCamera}
            className={`btn ${isCameraOpen ? "btn-error" : "btn-secondary"}`}
          >
            {isCameraOpen ? "Close Camera" : "Open Camera"}
          </button>

          {isCameraOpen && (
            <>
              <video ref={videoRef} autoPlay className="w-64 h-48 border" />
              <button onClick={captureImage} className="btn btn-primary mt-2">
                Capture Photo
              </button>
            </>
          )}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>

        {/* Selected Outfit */}
        {selectImageScr && (
          <div className="mt-4">
            <h1 className="my-4 text-xl font-bold">Selected Shirt</h1>
            <img
              src={selectImageScr}
              alt="Shirt"
              className="object-contain w-64 h-64"
            />
          </div>
        )}

        {/* Process Button */}
        <div>
          <button onClick={handleClick} className="btn btn-primary">
            {startProcess ? (
              <>
                <span className="loading loading-spinner"></span>
                Processing...
              </>
            ) : (
              "Change Outfit"
            )}
          </button>

          {/* Status Updates */}
          {statusData && <p>Status: {statusData.status}</p>}
          {statusData.output && (
            <div className="mt-4">
              <img
                src={statusData.output}
                alt="Result"
                className="object-contain w-64 h-64 my-5"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryRoom;
