import { BsClockFill } from "react-icons/bs";
import { MdEmail, MdLocationOn } from "react-icons/md";
import SaleOff from "../components/SaleOff";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { FaPhoneFlip } from "react-icons/fa6";
import Button from "../components/ui/Button/Button";
import { useOpenStore } from "../store/useOpenStore";

export default function ContactUs() {
  const isOpenSaleOff = useOpenStore((state) => state.isOpenSaleOff);

  const shopPosition = { lat: 10.845657282053997, lng: 106.78318489540929 };
  return (
    <div>
      <SaleOff bgColor="bg-saleBgColor" />
      <Header />
      <div
        className={`container mb-10 mx-auto lg:px-[160px] ${
          isOpenSaleOff ? "mt-[120px]" : "mt-[60px]"
        } `}
      >
        <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center py-6 px-6">
          {/* Tiêu đề */}
          <div className="text-center max-w-2xl mb-12">
            <h1 className="text-[40px] font-bold mb-2 font-inter">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-gray-600 font-inter">
              Nếu bạn có thắc mắc hoặc muốn biết thêm thông tin, hãy gửi tin
              nhắn cho chúng tôi. Chúng tôi sẽ phản hồi nhanh nhất có thể.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full">
            {/* Thông tin liên hệ */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-10 border">
              <div className="flex items-center gap-4">
                <FaPhoneFlip className="text-primary w-6 h-6 shrink-0" />
                <div>
                  <p className="font-bold font-third">Phone number</p>
                  <p className="text-gray-600 text-sm mt-1">+84 328 077 936</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MdEmail className="text-primary w-6 h-6 shrink-0" />
                <div>
                  <p className="font-bold font-third">Email</p>
                  <p className="text-gray-600 text-sm mt-1">
                    mtit3legant@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MdLocationOn className="text-primary w-6 h-6 shrink-0" />
                <div>
                  <p className="font-bold font-third">Address</p>
                  <p className="text-gray-600 text-sm mt-1 text-pretty">
                    201/10 Đ. Lê Văn Việt, khu phố 5, Thủ Đức, Hồ Chí Minh, Việt
                    Nam
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <BsClockFill className="text-primary w-6 h-6 shrink-0" />
                <div>
                  <p className="font-bold font-third">Opening hours</p>
                  <p className="text-gray-600 text-sm mt-1">
                    8:00 - 21:00 (Thứ 2 - CN)
                  </p>
                </div>
              </div>
            </div>

            {/* Form liên hệ */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border">
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name ..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your email address ..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Content</label>
                <textarea
                  placeholder="Enter your message..."
                  rows={5}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button className="w-full">Send message</Button>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-16 w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src={`https://www.google.com/maps?q=${shopPosition.lat},${shopPosition.lng}&hl=vi&z=15&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
