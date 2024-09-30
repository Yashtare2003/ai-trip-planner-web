// src/components/ui/Input.jsx
import React from 'react';

const Input = ({ placeholder, type, onChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className="border rounded-md p-2"
    />
  );
};

export default Input;
