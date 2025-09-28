import { IoIosArrowDown } from "react-icons/io";
import ReviewForm from "./ReviewForm";
import { useEffect, useRef, useState } from "react";
import ReviewItem from "./ReviewItem";
import ButtonLight from "./ui/Button/ButtonLight";

export function Reviews({ product_id, reviews }) {
  // Handle Show More Reviews
  const REVIEW_PER_TIME = 2;
  const [maxHeight, setMaxHeight] = useState("none");
  const [count, setCount] = useState(REVIEW_PER_TIME);
  const containerRef = useRef(null);

  const handleShowMore = () => {
    if (!containerRef.current) return;
    const currentHeight = containerRef.current.scrollHeight;

    setMaxHeight(currentHeight + "px");

    setTimeout(() => {
      setCount((prev) => prev + REVIEW_PER_TIME);
    }, 50);
  };
  useEffect(() => {
    if (containerRef.current) {
      setMaxHeight(containerRef.current.scrollHeight + "px");
    }
  }, [count]);
  return (
    <>
      <div className="flex flex-col gap-6 bg-gray-100 p-6 rounded-2xl shadow-lg">
        <h2 className="font-medium text-[28px] mx-auto md:mx-0">
          Customer Reviews
        </h2>
        <ReviewForm id={product_id} />
      </div>
      <div className="flex items-center justify-between mt-10">
        <h2 className="font-medium sm:text-[28px] text-xl">
          {reviews.length} Reviews
        </h2>
        <button className="cursor-pointer w-[140px] sm:-[180px] sm:w-[256px] border-2 border-lightGrey rounded-md py-2 px-3 sm:py-3 sm:px-4 flex items-center justify-between">
          <span className="font-semibold font-inter">Newest</span>
          <IoIosArrowDown size={18} />
        </button>
      </div>

      <div
        ref={containerRef}
        style={{ maxHeight }}
        className="transition-all overflow-hidden duration-500"
      >
        <div className="flex flex-col mt-10 gap-6 ">
          {reviews.slice(0, count).map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>

      {count < reviews.length && (
        <ButtonLight onClick={handleShowMore} className="w-fit mx-auto mt-6">
          Show More
        </ButtonLight>
      )}
    </>
  );
}
