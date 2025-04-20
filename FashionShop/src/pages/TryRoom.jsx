import React, { useState, useEffect } from "react";
import ImageUploader from "../components/tryroom/imageUploader";
import CameraCapture from "../components/tryroom/cameraCapture";
import QRUploader from "../components/tryroom/qrUploader";
import SelectedOutfit from "../components/tryroom/selectedOutfit";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "../utils/tostify";
import { useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const IMAGE_UPLOAD_INTERVAL = 2000;
const POLL_STATUS_INTERVAL = 5000;

const TryRoom = () => {
  const location = useLocation();
  const initialImage = location.state?.image;

  const [sessionId] = useState(uuidv4());
  const [showQR, setShowQR] = useState(false);

  const [responseData, setResponseData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [selectImageScr, setSelectImageScr] = useState(
    initialImage || "/assets/shirt.jpg"
  );
  const [startProcess, setStartProcess] = useState(false);

  const deleteImage = () => {
    setImageSrc("");
  };

  const convertToBase64 = async (imagePath) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
      });
    } catch (error) {
      handleError("Error converting image to base64");
      return "";
    }
  };

  const createHeaders = () => ({
    Authorization: `Bearer fa-BPoPLSO5yR1U-5lbMlU7Amr8H4GxGemDkGfv7`,
    "Content-Type": "application/json",
  });

  const runApiCall = async () => {
    const shirtImage = await convertToBase64(selectImageScr);
    const modelImage = await convertToBase64(imageSrc);
    try {
      const response = await fetch("/api/v1/run", {
        method: "POST",
        body: JSON.stringify({
          model_image: modelImage,
          garment_image: shirtImage,
          category: "tops",
        }),
        headers: createHeaders(),
      });
      const data = await response.json();
      setResponseData(data);
      if (data?.id) pollStatus(data.id);
    } catch (error) {
      console.error(error);
      handleError("An error occurred. Please try again.");
      setStartProcess(false);
    }
  };

  const pollStatus = (id) => {
    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/v1/status/${id}`, {
          headers: createHeaders(),
        });
        const sd = await res.json();
        setStatusData(sd);
        if (["completed", "failed", "canceled"].includes(sd.status)) {
          clearInterval(iv);
          setStartProcess(false);
        }
      } catch {
        clearInterval(iv);
        setStartProcess(false);
      }
    }, POLL_STATUS_INTERVAL);
  };

  const handleClick = () => {
    if (!imageSrc)
      return handleError("Please select or capture an image first");
    setStartProcess(true);
    runApiCall();
  };

  const qrValue = `https://YOUR_NGROK_URL/upload/${sessionId}`;

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
    }, IMAGE_UPLOAD_INTERVAL);
    return () => clearInterval(interval);
  }, [showQR, sessionId]);

  return (
    <div className="align-elements">
      <h1 className="text-center font-bold text-2xl m-8">Welcome To Try Room</h1>

      <div className="flex flex-row justify-between">
      <Tabs defaultValue="upload" className="w-full max-w-sm">
        {/* Tabs Header */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
        </TabsList>

        {/* Upload Image Tab */}
        <TabsContent value="upload" className="mt-4">
          <ImageUploader
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            deleteImage={deleteImage}
          />
        </TabsContent>

        {/* Camera Tab */}
        <TabsContent value="camera" className="mt-4">
          <CameraCapture
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
        </TabsContent>

        {/* QR Code Tab */}
        <TabsContent value="qr" className="mt-4">
          <QRUploader
            qrValue={qrValue}
            showQR={showQR}
            setShowQR={setShowQR}
          />
        </TabsContent>
      </Tabs>

      <div>

      <button onClick={handleClick} className="btn btn-primary">
        {startProcess ? "Processing..." : "Change Outfit"}
      </button>
      {statusData.status && <p>Status: {statusData.status}</p>}
      {statusData.output && (
        <img src={statusData.output} alt="Result" className="w-64 h-64 mt-4 object-scale-down" />
      )}

      </div>
      
        <SelectedOutfit
          selectImageScr={selectImageScr}
          handleClick={handleClick}
          startProcess={startProcess}
          statusData={statusData}
        />
      </div>
    </div>
  );
};

export default TryRoom;
