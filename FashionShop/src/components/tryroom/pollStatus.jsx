import React, { useState, useEffect } from "react";

const PollStatus = ({ id, onStatusChange }) => {
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/v1/status/${id}`, {
          headers: {
            Authorization: `Bearer fa-BPoPLSO5yR1U-5lbMlU7Amr8H4GxGemDkGfv7`,
            "Content-Type": "application/json",
          },
        });
        const sd = await res.json();
        setStatusData(sd);
        onStatusChange(sd);
        if (["completed", "failed", "canceled"].includes(sd.status)) {
          clearInterval(iv);
        }
      } catch {
        clearInterval(iv);
      }
    }, 5000);
    return () => clearInterval(iv);
  }, [id, onStatusChange]);

  return <>{statusData.status && <p>Status: {statusData.status}</p>}</>;
};

export default PollStatus;
