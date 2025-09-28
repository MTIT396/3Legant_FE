import React from "react";
import { BsClock } from "react-icons/bs";
import { Rating } from "@smastrom/react-rating";
import { timeFromNow } from "../utils/time";

const criterionLabel = (value) => {
  switch (value) {
    case 5:
      return "Rất tốt";
    case 4:
      return "Khá tốt";
    case 3:
      return "Trung bình";
    case 2:
      return "Kém";
    case 1:
      return "Rất kém";
    default:
      return "";
  }
};

const ReviewItem = ({ review }) => {
  return (
    <div className="flex flex-wrap gap-4 pb-6 border-b border-gray-300">
      {/* Header */}
      <div className="flex h-10 items-center w-[280px] gap-3">
        <div className="size-10 rounded-full overflow-hidden shrink-0">
          <img
            src={
              review.avatar
                ? `http://localhost:8080${review.avatar}`
                : "http://getdrawings.com/free-icon-bw/free-avatars-icons-25.png"
            }
            alt="user avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-neutral_1 overflow-hidden text-ellipsis font-semibold font-inter text-lg">
          {review.user_name}
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {/* Rating + Criteria */}
        <div className="flex flex-col gap-3 flex-wrap">
          <Rating
            style={{ maxWidth: 100 }}
            value={parseInt(review.rating)}
            readOnly
          />
          <div className="flex items-center gap-2">
            {review.items?.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1.5 bg-gray-200 text-sm rounded-xl"
              >
                {item.criterion} {criterionLabel(parseInt(item.score))}
              </span>
            ))}
          </div>
        </div>

        {/* Comment */}
        <p
          className="text-neutral_3 mt-2 text-[15px
          
        ] font-inter leading-relaxed"
        >
          {review.comment}
        </p>

        {/* Timestamp */}
        <span className="text-gray-500 text-sm flex items-center gap-2">
          <BsClock size={16} />
          Đánh giá đã đăng {timeFromNow(review.created_at)}
        </span>
      </div>
    </div>
  );
};

export default ReviewItem;
