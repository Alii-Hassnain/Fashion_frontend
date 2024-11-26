import React from "react";

const FormInput = ({ type, name, value, placeholder,icon,icon2,onChange }) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        className="grow"
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon2}
    </label>
  );
};

export default FormInput;
