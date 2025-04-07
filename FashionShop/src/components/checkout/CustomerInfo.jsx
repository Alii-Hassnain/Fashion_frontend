import React from 'react';
import { useState } from 'react';

const CustomerInfo = ({onCustomerInfoChange}) => {

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo)=>({
      ...prevInfo,
      [name]: value
    }));
    onCustomerInfoChange((prevInfo)=>({
      ...prevInfo,
      [name]: value
    }))

    // setCustomerInfo({ ...customerInfo, [name]: value });
    // onCustomerInfoChange({ ...customerInfo, [name]: value }); // Pass data to parent
  };


  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="John Doe"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              name="mobileNumber"
              type="tel"
              placeholder="+92-300-1234567"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shipping Address</span>
          </label>
          <input
            name="address"
            type="text"
            placeholder="Street Address, City, Postal Code"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;