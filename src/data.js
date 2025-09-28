import { FaPhoneAlt, FaShippingFast } from "react-icons/fa";
import { BsGift, BsShieldCheck } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";

// Hero
// import hero_1 from "./imgs/hero/hero_1.png";
// import hero_2 from "./imgs/hero/hero_2.png";

import feature_1 from "./imgs/feature_1.png";
import feature_2 from "./imgs/feature_2.png";
import feature_3 from "./imgs/feature_3.png";
import feature_4 from "./imgs/feature_4.png";

// Articles
import articles_1 from "./imgs/articles/articles_1.png";
import articles_2 from "./imgs/articles/articles_2.png";
import articles_3 from "./imgs/articles/articles_3.png";

import { FaLock, FaMoneyBillTransfer } from "react-icons/fa6";

export const heroImages = [
  {
    id: 1,
    img: "https://didongviet.vn/_next/image?url=https%3A%2F%2Fcdn-v2.didongviet.vn%2Ffiles%2Fbanners%2F2025%2F8%2F24%2F1%2F1758707288584_824x400_5.png&w=1080&q=75",
    category: 7,
  },
  {
    id: 2,
    img: "https://didongviet.vn/_next/image?url=https%3A%2F%2Fcdn-v2.didongviet.vn%2Ffiles%2Fbanners%2F2025%2F8%2F24%2F1%2F1758686996341_xiaomi_watch_s4_41mm_06.png&w=1080&q=75",
    category: 3,
  },
  {
    id: 3,
    img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/690x300_Home_iPhone_17_%20Pro_Opensale_v2.png",
    category: 2,
  },
  {
    id: 4,
    img: "https://didongviet.vn/_next/image?url=https%3A%2F%2Fcdn-v2.didongviet.vn%2Ffiles%2Fbanners%2F2025%2F8%2F25%2F1%2F1758783292058_ip16_pro_max_824x400_2_min.jpg&w=1080&q=75",
    category: 2,
  },
];
export const CardTopicData = [
  {
    id: 1,
    title: "Laptop",
    img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/lenovo_ideapad_slim_3_14irh10_luna_grey_1_b3e26f1c73.png",
  },
  {
    id: 2,
    title: "IPhone",
    img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_16_pro_37987b6def.png",
  },
  {
    id: 3,
    title: "Watch",
    img: feature_3,
  },
  {
    id: 7,
    title: "Airpod",
    img: "https://hoanghamobile.com/Uploads/2023/10/09/true-wireless-huawei-freebuds-se-2-3.png",
  },
];

// Options Data
export const optionsProductData = [
  {
    icon: <FaShippingFast size={48} />,
    title: "Free Shipping",
    desc: "Order above $200",
  },
  {
    icon: <FaMoneyBillTransfer size={48} />,
    title: "Money-back",
    desc: "30 days guarantee",
  },
  {
    icon: <FaLock size={48} />,
    title: "Secure Payments",
    desc: "Secured by Stripe",
  },
  {
    icon: <FaPhoneAlt size={48} />,
    title: "24/7 Support",
    desc: "Phone and Email support",
  },
];
// Articles
export const articlesData = [
  {
    img: articles_1,
    title: "7 ways to decor your home",
  },
  {
    img: articles_2,
    title: "Kitchen organization",
  },
  {
    img: articles_3,
    title: "Decor your bedroom",
  },
];
// Categories Data
export const categoriesData = [
  {
    id: "allroom",
    title: "All Room",
  },
  {
    id: "livingroom",
    title: "Living Room",
  },
  {
    id: "bedroom",
    title: "Bedroom",
  },

  {
    id: "dining",
    title: "Dining",
  },
  {
    id: "outdoor",
    title: "Outdoor",
  },
  {
    id: "homedecor",
    title: "Home Decor",
  },
];
export const priceData = [
  {
    id: "firstPriceType",
    title: "$0.00 - 99.99",
  },
  {
    id: "secondPriceType",
    title: "$100.00 - 199.99",
  },
  {
    id: "thirdPriceType",
    title: "$200.00 - 299.99",
  },
  {
    id: "fourthPriceType",
    title: "$300.00 - 399.99",
  },
  {
    id: "fifthPriceType",
    title: "$400.00+",
  },
];
export const SortByData = [
  {
    id: "ascending",
    title: "Giá tăng dần",
  },
  {
    id: "descending",
    title: "Giá thấp dần",
  },
];

export const POLICIES = [
  {
    id: 1,
    icon: <BsShieldCheck className="w-6 h-6 text-red-500" />,
    title: "Bảo hành chính hãng",
    desc: "12 tháng 1 đổi 1 tại tất cả cửa hàng",
  },
  {
    id: 2,
    icon: <LuRefreshCw className="w-6 h-6 text-blue-500" />,
    title: "Đổi trả dễ dàng",
    desc: "Hỗ trợ đổi trả trong vòng 7 ngày",
  },
  {
    id: 3,
    icon: <BsGift className="w-6 h-6 text-green-500" />,
    title: "Ưu đãi hấp dẫn",
    desc: "Nhiều voucher và quà tặng kèm",
  },
];
export const PAYMENTS_OFFER = [
  {
    id: 1,
    logo: "https://cellphones.com.vn/media/wysiwyg/DUMT_ZV0.png",
    text: "Giảm đến 5.000.000đ khi thanh toán qua Kredivo",
  },
  {
    id: 2,
    logo: "https://cellphones.com.vn/media/wysiwyg/Icon/hsbc_icon.png",
    text: "Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC",
  },
  {
    id: 3,
    logo: "https://cellphones.com.vn/media/wysiwyg/image_1694_1_.png",
    text: "Giảm đến 1 triệu khi thanh toán qua thẻ tín dụng ACB",
  },
  {
    id: 4,
    logo: "https://cellphones.com.vn/media/wysiwyg/Icon/vibb_bank.png",
    text: "Mở thẻ VIB nhận E-Voucher đến 600K",
  },
  {
    id: 5,
    logo: "https://cellphones.com.vn/media/wysiwyg/Icon/image_1009_1__1.png",
    text: "Giảm đến 300K khi thanh toán qua VNPAY-QR",
  },
  {
    id: 6,
    logo: "https://cellphones.com.vn/media/wysiwyg/Icon/image_1010_1_.png",
    text: "Giảm 2% tối đa 200K khi thanh toán qua MOMO",
  },
];
export const DISCOUNT_OFFERS = [
  {
    id: 1,
    text: "Giảm ngay 5% tối đa 500k mua Apple Watch khi mua iPhone",
  },
  {
    id: 2,
    text: "Trả góp 0% lãi suất, tối đa 12 tháng, trả trước từ 10% qua CTTC hoặc 0đ qua thẻ tín dụng",
  },
  {
    id: 3,
    text: "Đặc quyền trợ giá lên đến 3 triệu khi thu cũ lên đời iPhone",
  },
  {
    id: 4,
    text: "Tặng Sim/Esim VNSKY, có ngay 5GB data 5G/ngày, miễn phí 30 ngày đầu - chỉ áp dụng tại cửa hàng",
  },
];
