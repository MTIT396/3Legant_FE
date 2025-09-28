import React from "react";
import { POLICIES } from "../../data";

const Policies = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {POLICIES.map((item) => (
        <div
          key={item.id}
          className="px-6 py-4 border flex items-center justify-center w-full gap-3 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <div className="flex-shrink-0">{item.icon}</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Policies;
