import { IoIosArrowForward } from "react-icons/io";
import { useOpenStore } from "../../store/useOpenStore";
const Hero = () => {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  return (
    <div className="">
      <div
        className={`container mx-auto lg:px-[160px] h-full ${
          isOpenSaleOff ? "mt-[100px]" : "mt-[60px]"
        } `}
      >
        {/* Img Hero*/}
        <div className="relative">
          <div className="md:h-[536px]">
            <img
              className="w-full h-full aspect-square object-cover"
              src="https://i.pinimg.com/originals/50/08/6f/50086fa13c99883112928d2fbafeffba.jpg"
              alt=""
            />
          </div>
          {/* Content Hero */}
          <div className="flex flex-col gap-y-4 absolute inset-0 justify-center items-center">
            <div className="text-sm font-medium flex items-center">
              <p className="text-darkGrey mr-2">Home</p>
              <span className="text-secondary">
                <IoIosArrowForward size={12} />
              </span>
              <p className="ml-4">Shop</p>
            </div>
            <h1 className="sm:text-[54px] text-[40px] font-medium leading-[58px] text-center">
              Shop Page
            </h1>
            <p className="text-sm sm:text-xl leading-8 text-center text-third">
              Let’s design the place you always imagined.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
