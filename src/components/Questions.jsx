import { useState } from "react";
import Button from "./ui/Button/Button";

export function Questions() {
  const [form, setForm] = useState({ name: "", email: "", question: "" });

  // Mock data Q&A
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Shop có hỗ trợ đổi trả không?",
      answer:
        "Có, bạn có thể đổi trả trong vòng 7 ngày kể từ khi nhận hàng, với điều kiện sản phẩm còn nguyên tem mác.",
    },
    {
      id: 2,
      question: "Phí ship tính thế nào?",
      answer:
        "Phí ship nội thành là 20k. Ngoại thành tùy khu vực sẽ dao động từ 30k - 40k.",
    },
    {
      id: 3,
      question: "Tôi muốn mua số lượng lớn thì có giảm giá không?",
      answer:
        "Shop có chính sách giá sỉ cho đơn hàng trên 10 sản phẩm. Liên hệ trực tiếp để được báo giá chi tiết.",
    },
    {
      id: 4,
      question: "Thời gian giao hàng bao lâu?",
      answer:
        "Nếu trong nội thành, đơn hàng thường được giao trong 1-2 ngày. Ngoại thành hoặc tỉnh khác từ 3-5 ngày làm việc.",
    },
    {
      id: 5,
      question: "Shop có địa chỉ cửa hàng để ghé xem trực tiếp không?",
      answer:
        "Có, bạn có thể ghé showroom tại 123 Nguyễn Trãi, Quận 1, TP.HCM. Mở cửa từ 9h - 21h mỗi ngày.",
    },
    {
      id: 6,
      question: "Thanh toán như thế nào?",
      answer:
        "Shop hỗ trợ thanh toán COD (nhận hàng trả tiền), chuyển khoản ngân hàng và ví điện tử Momo/ZaloPay.",
    },
    {
      id: 7,
      question: "Sản phẩm có bảo hành không?",
      answer:
        "Có, hầu hết sản phẩm điện tử được bảo hành 6-12 tháng. Các sản phẩm khác tùy loại sẽ có chính sách riêng.",
    },
    {
      id: 8,
      question: "Tôi muốn hủy đơn hàng thì phải làm sao?",
      answer:
        "Bạn có thể liên hệ hotline hoặc inbox fanpage để hủy đơn trong vòng 12h kể từ khi đặt hàng.",
    },
  ]);

  const [openId, setOpenId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      id: questions.length + 1,
      question: form.question,
      answer: "Cửa hàng sẽ phản hồi bạn sớm nhất!",
    };
    setQuestions([newQuestion, ...questions]);
    setForm({ name: "", email: "", question: "" });
  };

  return (
    <div className="py-6 font-third flex flex-wrap gap-4">
      {/* Form đặt câu hỏi */}
      <div className="md:max-w-[50%] w-full">
        <div className="w-full border max-w-lg bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-center text-pretty">
            Gửi câu hỏi cho cửa hàng
          </h2>
          <p className="text-gray-500 text-center mb-6 text-balance">
            Chúng tôi sẽ phản hồi bạn sớm nhất
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Tên của bạn"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="question"
              placeholder="Viết câu hỏi của bạn..."
              rows={4}
              value={form.question}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="w-full">Gửi câu hỏi</Button>
          </form>
        </div>
      </div>

      {/* Danh sách Q&A */}
      <div className="bg-white border rounded-2xl shadow-md p-6 flex-1">
        <h3 className="text-xl font-bold mb-4">Câu hỏi thường gặp</h3>
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenId(openId === q.id ? null : q.id)}
                className="w-full text-left px-4 py-3 font-medium flex justify-between items-center hover:bg-gray-50"
              >
                {q.question}
                <span className="text-gray-400">
                  {openId === q.id ? "−" : "+"}
                </span>
              </button>
              {openId === q.id && (
                <div className="px-4 pb-4 text-sm py-3 text-gray-600">
                  {q.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
