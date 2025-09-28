import React from "react";
import { FiEdit } from "react-icons/fi";
const AddressItem = () => {
  return (
    <div>
      <div className="rounded-lg border border-secondary px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-primary">Billing Address</h1>
            <button className="flex gap-1 items-center cursor-pointer">
              <span className="text-secondary">
                <FiEdit size={20} />
              </span>
              <p className="text-secondary font-semibold">Edit</p>
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-primary font-light">Le Minh Thien</p>
            <p className="text-sm text-primary font-light">(+84) 328 077 936</p>
            <p className="text-sm text-primary font-light">
              65/3 Duyen Hai street, Can Thanh town, Can Gio district
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
