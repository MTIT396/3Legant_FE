import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function RatingBreakdown({ stats, totalReviews }) {
  return (
    <div className="flex flex-col gap-3 w-full sm:w-fit">
      {Object.keys(stats)
        .sort((a, b) => b - a)
        .map((star) => {
          const count = stats[star] || 0;
          const percent = totalReviews
            ? Math.round((count / totalReviews) * 100)
            : 0;
          return (
            <div key={star} className="flex items-center gap-3">
              {/* Số sao */}
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{star}</span>
                <Rating
                  className="max-w-[90px] sm:max-w-[90px]"
                  value={parseInt(star)}
                  readOnly
                />
              </div>

              {/* Thanh progress */}
              <div className="md:w-[220px] w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-darkRed rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Số lượng */}
              <span className="hidden sm:block w-10 text-sm text-neutral-600 text-nowrap">
                {count} đánh giá
              </span>
            </div>
          );
        })}
    </div>
  );
}
