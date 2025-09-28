import Navigation from "../../components/ui/MyAccount/Navigation";
import AddressItem from "../../components/ui/MyAccount/AddressItem";
import SaleOff from "../../components/SaleOff";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useOpenStore } from "../../store/useOpenStore";
const Address = () => {
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
            <Navigation />
            <div className="md:px-[72px] flex-1">
              <h1 className="text-xl text-primary font-semibold leading-8 mb-5">
                Address
              </h1>
              <div className="grid xl:grid-cols-2 grid-cols-1 lg:flex-row gap-6">
                <AddressItem />
                <AddressItem />
                <AddressItem />
                <AddressItem />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Address;
