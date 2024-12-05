import React from "react";

const FormInput = ({ type, name, value, placeholder,icon,icon2,onChange }) => {
  return (
    <label className="input flex items-center gap-2 w-full">
      {icon}
      <input
        className="grow w-full"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon2}
    </label>
  );
};

export default FormInput;
