import React from "react";

const Input = ({ errors, register, register_name, label, ...props }) => {
  return (
    <div className="flex-1">
      <label className="text-xs font-bold uppercase mb-2 block">{label}</label>
      <input
        {...register(register_name)}
        name={register_name}
        id={register_name}
        className="border border-gray-300 p-2 rounded w-full placeholder:text-sm"
        {...props}
      />
      {errors[register_name] && (
        <p className="text-red text-xs mt-1">
          *{errors[register_name]?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
