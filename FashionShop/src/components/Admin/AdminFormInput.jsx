import React from 'react';

const AdminFormInput = ({ productTitle, setProductTitle }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Product Title</span>
      </label>
      <input
        type="text"
        value={productTitle}
        onChange={(event) => setProductTitle(event.target.value)}
        placeholder="Product Title"
        className="input input-bordered"
      />
    </div>
  );
};

export default AdminFormInput;