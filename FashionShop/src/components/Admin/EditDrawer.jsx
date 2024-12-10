import React, { useState } from 'react';
import AdminAddProducts from './AdminAddProducts';
import AdminEditProducts from './AdminEditProducts';

const EditDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerId = `my-drawer-${Math.floor(Math.random() * 10000)}`; // Generate unique ID for drawer toggle

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="drawer drawer-end">
      {/* Use dynamic ID for drawer toggle */}
      <input
        id={drawerId}
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor={drawerId}
          className="link-hover cursor-pointer text-gray-500"
        >
          Edit
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Pass a unique id to AdminEditProducts */}
          <AdminEditProducts/>
        </ul>
      </div>
    </div>
  );
};

export default EditDrawer;
