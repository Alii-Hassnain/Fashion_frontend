import React from "react";

const FormInput = ({ type, name, defaultvalue, placeholder,icon }) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {icon}
      <input
        type={type}
        name={name}
        defaultValue={defaultvalue}
        className="grow"
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormInput;
