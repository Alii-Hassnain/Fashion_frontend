import React, { useState } from "react";
import modle from "../assets/modle.jpg";
import shirt from "../assets/shirt.jpg";
import { handleError } from "../utils/tostify";


const convertToBase64 = async (imagePath) => {
  const response = await fetch(imagePath); // Fetch the image
  const blob = await response.blob(); // Convert response to Blob
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.readAsDataURL(blob); // Read the Blob as data URL
    reader.onloadend = () => resolve(reader.result); // Resolve with base64 string
  });
};
const TryRoom = () => {
  const [responseData, setResponseData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [selectImageScr, setSelectImageScr] = useState(shirt);
  const runApiCall = async () => {
    const shirtImage = await convertToBase64(shirt);
    const modelImage = await convertToBase64(imageSrc);
    try {
      const response = await fetch("/api/v1/run", {
        method: "POST",
        body: JSON.stringify({
          model_image: modelImage, // Ensure `modle` and `shirt` variables are defined
          garment_image: shirtImage,
          category: "tops",
        }),
        headers: {
          Authorization: `Bearer fa-BPoPLSO5yR1U-5lbMlU7Amr8H4GxGemDkGfv7`,
          // Authorization: 'Bearer fa-uULDdUGV6WQB-dFVTvFLhaLQOO0fZVMFHiZki',
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResponseData(data); // Store the response from the first API call

      // Assuming the status ID comes from the first API call response
      if (data && data.id) {
        console.log(data.id);

        // Start polling the status API
        pollStatus(data.id);
      }
    } catch (error) {
      console.error("Error:", error);
      handleError("An error occurred. Please try again.");
      setStartProcess(false);
    }
  };

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
        setStatusData(statusData); // Store the response from the second API call

        const { status } = statusData;

        // Log status updates for all possible status values
        console.log("Status Data:", statusData);

        console.log(`Status: ${status}`);

        if (status === "starting") {
          console.log("Process is starting...");
        } else if (status === "in_queue") {
          console.log("Process is in queue...");
        } else if (status === "processing") {
          console.log("Process is ongoing...");
        } else if (status === "completed") {
          setStartProcess(false);
          console.log("Process completed!");
          clearInterval(intervalId);
        } else if (status === "failed") {
          console.log("Process failed.");
          clearInterval(intervalId);
        } else if (status === "canceled") {
          console.log("Process was canceled.");
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error:", error);
        handleError("An error occurred. Please try again.");
        setStartProcess(false);
        clearInterval(intervalId); // Clear interval on error to avoid infinite loop
      }
    }, 5000);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("this is the result", reader.result);
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
    console.log(reader);
  };
  const [startProcess, setStartProcess] = useState(false);

  const handleClick = async () => {
    if (!imageSrc) {
      handleError("Please select an image first");
      return;
    }
    runApiCall();
    setStartProcess(true);
    await runApiCall();
    
  };
  

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-xl my-10 font-bold">
        {" "}
        Welcome To Try Room Demo
      </h1>
      <div className="flex flex-row gap-10 justify-center">
        <div className="flex flex-col gap-2">
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              name="product_image"
              onChange={handleFile}
              placeholder="Product Image"
            />
          </div>
          {imageSrc && (
            <div className="mt-4">
              <img
                src={imageSrc}
                alt={imageSrc}
                className="object-contain w-64 h-64"
              />
            </div>
          )}
        </div>
        {selectImageScr && (
          <div className="mt-4">
            <h1 className="my-4 text-xl font-bold">User's Selected Image</h1>
            <img
              src={selectImageScr}
              alt={selectImageScr}
              className="object-contain w-64 h-64"
            />
          </div>
        )}
        <div>

      <button onClick={handleClick} className="btn btn-primary ">
        {startProcess ? (
          <>
            <span className="loading loading-spinner"></span>
            Processing...
          </>
        ) : (
          "Change Outfit"
        )}
      </button>
      {statusData && (
        <div>
          <p>Status: {statusData.status}</p>
          {/* <pre>{JSON.stringify(statusData, null, 2)}</pre> */}
        </div>
      )}
      {statusData.output && (
        <div className="mt-4">
          <img
            src={statusData.output}
            alt="image"
            className="object-contain w-64 h-64 my-5"
          />
        </div>
      )}
        </div>
      </div>




      {/* {responseData && (
        <div>
          <h3>First API Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default TryRoom;
