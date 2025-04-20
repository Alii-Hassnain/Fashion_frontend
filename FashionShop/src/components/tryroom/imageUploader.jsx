import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const ImageUploader = ({ imageSrc, setImageSrc, deleteImage }) => {
  const [showFileInput, setShowFileInput] = useState(true);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="label">
        <span className="label-text font-bold">Upload Image</span>
      </label>
      {showFileInput && (
        <input type="file" accept="image/*" onChange={handleFile} />
      )}
      {imageSrc && (
        <div className="relative">
          <button
            onClick={deleteImage}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2"
          >
            <FaTrash />
          </button>
          <img
            src={imageSrc}
            alt="Uploaded"
            className="w-64 h-64 object-scale-down border p-2"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
