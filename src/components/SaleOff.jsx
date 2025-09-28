import { IoClose, IoTicketOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { useOpenStore } from "../store/useOpenStore";

const SaleOff = (prop) => {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);
  const setIsOpenSaleOff = useOpenStore((state) => state.setIsOpenSaleOff);
  return (
    <div
      className={`${
        isOpenSaleOff ? "block" : "hidden"
      } fixed w-full top-0 left-0 right-0 ${prop.bgColor} z-[8]`}
    >
      <div className="py-2 container mx-auto flex justify-center items-center">
        <IoTicketOutline size={24} />
        <p className="mr-6 ml-3 text-saleColor text-sm font-semibold text-nowrap text-ellipsis overflow-hidden">
          30% off storewide — Limited time!
        </p>
        <div className="cursor-pointer text-blue  items-center hidden md:flex border-b border-blue">
          <p className="font-medium text-base mr-1">Shop Now</p>
          <span>
            <IoMdArrowForward size={24} />
          </span>
        </div>
        <span>
          <IoClose
            onClick={() => setIsOpenSaleOff(false)}
            className="md:absolute md:top-1/2 md:right-5 md:-translate-y-1/2 cursor-pointer"
            size={24}
          />
        </span>
      </div>
    </div>
  );
};

export default SaleOff;
