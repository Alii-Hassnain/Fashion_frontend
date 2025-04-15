import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UploadPage = () => {
  const { sessionId } = useParams();
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpload = async () => {
    if (!file) return setMsg("Select an image first");
    const form = new FormData();
    form.append("image", file);
    try {
      await axios.post(
        `https://YOUR_NGROK_URL/api/upload/${sessionId}`,
        form
      );
      setMsg("✅ Uploaded! Return to desktop.");
    } catch {
      setMsg("❌ Upload failed. Try again.");
    }
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Upload Your Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{msg}</p>
    </div>
  );
};

export default UploadPage;
