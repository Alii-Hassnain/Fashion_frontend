import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRUploader = ({ qrValue, showQR, setShowQR }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={() => setShowQR(true)} className="btn btn-secondary">
        Scan QR to Upload
      </button>
      {showQR && (
        <div className="mt-4 text-center">
          <QRCodeSVG value={qrValue} size={200} />
          <p>Scan with your phone to upload</p>
          <button
            onClick={() => setShowQR(false)}
            className="btn btn-secondary mt-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default QRUploader;
