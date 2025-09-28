import Footer from "../../layouts/Footer";
import Navigation from "../../components/ui/MyAccount/Navigation";
import Button from "../../components/ui/Button/Button";
import SaleOff from "../../components/SaleOff";
import Header from "../../layouts/Header";
import { useOpenStore } from "../../store/useOpenStore";
const MyAccount = () => {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  return (
    <div>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <div
        className={`container mx-auto relative lg:px-[160px] py-20 h-full ${
          isOpenSaleOff ? "mt-[100px]" : "mt-[60px]"
        } `}
      >
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-[54px] text-primary font-medium leading-[58px]">
            My Account
          </h1>
          {/* Content */}
          <div className="w-full flex flex-col md:flex-row gap-y-6">
            {/* Navbar */}
            <Navigation />
            {/*  Info */}
            <div className="flex-1 md:px-[72px] gap-10 flex flex-col">
              {/* Account Details */}
              <div className="">
                <div className="flex-1 h-fit">
                  <h1 className="text-xl font-medium leading-7 mb-6">
                    Account Details
                  </h1>
                  <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col gap-6 ">
                      <div className="">
                        <h1 className="text-xs text-secondary font-bold uppercase mb-3">
                          First Name *
                        </h1>
                        <div className="border border-formColor rounded-md overflow-hidden">
                          <input
                            type="text"
                            placeholder="First name"
                            className="placeholder:text-secondary font-light w-full outline-none px-4 py-[7px]"
                          />
                        </div>
                      </div>
                      <div className="">
                        <h1 className="text-xs text-secondary font-bold uppercase mb-3">
                          Last Name *
                        </h1>
                        <div className="border border-formColor rounded-md overflow-hidden">
                          <input
                            type="text"
                            placeholder="Last name"
                            className="placeholder:text-secondary font-light w-full outline-none px-4 py-[7px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <h1 className="text-xs text-secondary font-bold uppercase mb-3">
                        Display name *
                      </h1>
                      <div className="border border-formColor rounded-md overflow-hidden">
                        <input
                          type="text"
                          placeholder="Display name"
                          className="placeholder:text-secondary font-light w-full outline-none px-4 py-[7px]"
                        />
                      </div>
                      <p className="mt-3 text-secondary text-xs italic">
                        This will be how your name will be displayed in the
                        account section and in reviews
                      </p>
                    </div>

                    <div className="">
                      <h1 className="text-xs text-secondary font-bold uppercase mb-3">
                        Email
                      </h1>
                      <div className="border border-formColor rounded-md overflow-hidden">
                        <input
                          type="email"
                          placeholder="Email"
                          className="placeholder:text-secondary font-light w-full outline-none px-4 py-[7px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Password */}
              <div className="">
                <div className=" flex-1 h-fit">
                  <h1 className="text-xl font-medium leading-7 mb-6">
                    Password
                  </h1>
                  <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col gap-6 ">
                      <div className="">
                        <h1 className="text-xs text-secondary font-bold uppercase mb-3">
                          Old password
                        </h1>
                        <div className="border border-formColor rounded-md overflow-hidden">
                          <input
                            type="password"
                            placeholder="Old password"
                            className="placeholder:text-secondary font-light w-full outline-none px-4 py-[7px]"
                          />
                        </div>
                      </div>
                      <div className="">
                        <h1 className="text-xs text-secondary font-bold uppercase mb-3">
                          New password
                        </h1>
                        <div className="border border-formColor rounded-md overflow-hidden">
                          <input
                            type="password"
                            placeholder="New password"
                            className="placeholder:text-secondary font-light w-full outline-none px-4 py-[7px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <h1 className="text-xs text-secondary font-bold uppercase mb-3">
                        Repeat new password
                      </h1>
                      <div className="border border-formColor rounded-md overflow-hidden">
                        <input
                          type="password"
                          placeholder="Repeat new password"
                          className="placeholder:text-secondary font-light w-full outline-none px-4 py-[7px]"
                        />
                      </div>
                    </div>
                    <span className="w-fit">
                      <Button>Save changes</Button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
