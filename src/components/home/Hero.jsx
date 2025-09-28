import { CardTopicData } from "../../data";
import Feature from "./Feature";
import { useOpenStore } from "../../store/useOpenStore";
import SwiperHero from "./SwiperHero";
const Hero = () => {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  return (
    <div
      className={`container mx-auto lg:px-[160px] ${
        isOpenSaleOff ? "mt-[100px]" : "mt-[60px]"
      } `}
    >
      {/* Slider */}
      <SwiperHero />

      {/* Hero Title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 mt-4">
        <h1 className="flex flex-col items-center text-center mt-12 mb-6 px-4">
          {/* Main Title */}
          <span className="text-[38px] md:text-[54px] font-bold leading-none text-neutral_1 tracking-wide">
            <span className="text-darkRed">MTIT</span>{" "}
            <span className="text-neutral_1">SOFTWARE</span>
          </span>

          {/* Divider for style */}
          <span className="w-16 h-[3px] bg-darkRed rounded-full my-2"></span>

          {/* Sub Title */}
          <span className="font-light text-neutral_1 text-lg md:text-2xl tracking-tight">
            EST <span className="font-semibold text-darkRed">since 2025</span>
          </span>
        </h1>

        <p className="text-lg text-pretty text-center text-secondary leading-8 md:ml-6 md:mr-[29px] md:max-w-[424px]">
          <span className="font-semibold text-primary">3legant</span> is a
          technology store based in HCMC, Vietnam. Est since 2025.{" "}
        </p>
      </div>

      {/* Featured Products */}
      <div className="flex items-center mb-4 gap-2 sm:px-10 lg:px-20 px-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 1080 1080"
          fill="none"
        >
          <path
            d="M515.09 725.824L472.006 824.503C455.444 862.434 402.954 862.434 386.393 824.503L343.308 725.824C304.966 638.006 235.953 568.104 149.868 529.892L31.2779 477.251C-6.42601 460.515 -6.42594 405.665 31.2779 388.929L146.164 337.932C234.463 298.737 304.714 226.244 342.401 135.431L386.044 30.2693C402.239 -8.75637 456.159 -8.75646 472.355 30.2692L515.998 135.432C553.685 226.244 623.935 298.737 712.234 337.932L827.121 388.929C864.825 405.665 864.825 460.515 827.121 477.251L708.53 529.892C622.446 568.104 553.433 638.006 515.09 725.824Z"
            fill="url(#paint0_radial_2525_777)"
          ></path>{" "}
          <path
            d="M915.485 1036.98L903.367 1064.75C894.499 1085.08 866.349 1085.08 857.481 1064.75L845.364 1036.98C823.765 987.465 784.862 948.042 736.318 926.475L698.987 909.889C678.802 900.921 678.802 871.578 698.987 862.61L734.231 846.951C784.023 824.829 823.623 783.947 844.851 732.75L857.294 702.741C865.966 681.826 894.882 681.826 903.554 702.741L915.997 732.75C937.225 783.947 976.826 824.829 1026.62 846.951L1061.86 862.61C1082.05 871.578 1082.05 900.921 1061.86 909.889L1024.53 926.475C975.987 948.042 937.083 987.465 915.485 1036.98Z"
            fill="url(#paint1_radial_2525_777)"
          ></path>{" "}
          <defs>
            <radialGradient
              id="paint0_radial_2525_777"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(670.447 474.006) rotate(78.858) scale(665.5 665.824)"
            >
              <stop stop-color="#1BA1E3"></stop>{" "}
              <stop offset="0.0001" stop-color="#1BA1E3"></stop>{" "}
              <stop offset="0.300221" stop-color="#5489D6"></stop>{" "}
              <stop offset="0.545524" stop-color="#9B72CB"></stop>{" "}
              <stop offset="0.825372" stop-color="#D96570"></stop>{" "}
              <stop offset="1" stop-color="#F49C46"></stop>
            </radialGradient>{" "}
            <radialGradient
              id="paint1_radial_2525_777"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(670.447 474.006) rotate(78.858) scale(665.5 665.824)"
            >
              <stop stop-color="#1BA1E3"></stop>{" "}
              <stop offset="0.0001" stop-color="#1BA1E3"></stop>{" "}
              <stop offset="0.300221" stop-color="#5489D6"></stop>{" "}
              <stop offset="0.545524" stop-color="#9B72CB"></stop>{" "}
              <stop offset="0.825372" stop-color="#D96570"></stop>{" "}
              <stop offset="1" stop-color="#F49C46"></stop>
            </radialGradient>
          </defs>
        </svg>
        <h3 className="text-3xl text-[#04297A] font-medium leading-10 font-inter ">
          Featured Products
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-8 sm:px-10 lg:px-20 px-0">
        {CardTopicData.map((item) => (
          <Feature
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
