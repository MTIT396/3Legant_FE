/* eslint-disable react-hooks/exhaustive-deps */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./ui/Button/Button";
import RatingBreakdown from "./RatingBreakdown";
import { reviewServices } from "../services/reviewServices";
import { showToast } from "../utils/toast";
import { axiosClient } from "../utils/axios";
import { useUser } from "../contexts/UserContext";

export default function ReviewForm({ id }) {
  const { user } = useUser();
  // State Managements
  const [isOpen, setIsOpen] = useState(false);
  // Modal States
  const [overallRating, setOverallRating] = useState(5);
  const [comment, setComment] = useState("");
  // Main States
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [ratings, setRatings] = useState(null);
  const [formRatingCriterion, setFormRatingCriterion] = useState({
    performance: 4,
    battery: 4,
    camera: 5,
  });

  // Handle Comment Value
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // Fetch Reviews , Ratings , Stats
  useEffect(() => {
    if (!user) return;
    try {
      const fetchReviews = async () => {
        const res = await axiosClient.get(`/api/reviews/${id}`);
        setReviews(res.data.reviews);
        setRatings({
          average_rating: res.data.average_rating,
          average_criterion: res.data.average_criterion,
        });
        setStats(res.data.stats);
      };
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  }, [id, user]);

  // Base Label Criterions
  const criterions = [
    {
      criterion: "Performance",
    },
    {
      criterion: "Battery",
    },
    {
      criterion: "Camera",
    },
  ];

  // Body Items for call API
  const bodyItems = criterions.map((item) => {
    return {
      ...item,
      score: formRatingCriterion[item.criterion.toLowerCase()],
    };
  });

  // Handle Submit Review
  const handleSubmitReview = async () => {
    if (!user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng !", "error");
      return;
    }
    await reviewServices.addToReviews(id, overallRating, comment, bodyItems);
    setIsOpen(false);
    setComment("");
    setFormRatingCriterion({
      performance: 4,
      battery: 4,
      camera: 5,
    });
    setOverallRating(5);
    showToast("3Legant đã nhận được phản hồi của bạn !", "success");
  };
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Overall Rating */}
      <div className="flex flex-wrap justify-between w-full items-center gap-x-6 gap-y-10 px-0 sm:px-10">
        <div className="flex sm:mx-0 mx-auto flex-col items-center">
          <span className="text-4xl font-bold text-neutral-800 mb-2">
            {ratings?.average_rating?.toFixed(1) || 0}
            <span className="text-gray-500 text-3xl font-medium">/5</span>{" "}
          </span>
          <Rating
            style={{ maxWidth: 160 }}
            value={ratings?.average_rating || 0}
            readOnly
          />
          <span className="text-neutral-500 text-sm mt-2">
            {reviews.length} reviews
          </span>
        </div>

        {/* Progress Bar */}
        <RatingBreakdown stats={stats} totalReviews={reviews.length} />

        {/* Criteria Ratings */}
        {criterions.length > 0 && (
          <div className="flex flex-col gap-3">
            {criterions.map((item, index) => (
              <Criterion
                key={index}
                label={item.criterion}
                value={ratings?.average_criterion?.[item.criterion] || 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* Write Review Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full px-6 py-2 shadow-md"
        >
          Write Review
        </Button>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-lg flex flex-col gap-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <h2 className="text-xl font-semibold text-neutral-800">
                Write a Review
              </h2>

              {/* Overall */}
              <div className="flex flex-col gap-2">
                <span className="text-neutral-700 font-medium">
                  Overall Rating
                </span>
                <Rating
                  style={{ maxWidth: 200 }}
                  value={overallRating}
                  onChange={(val) => setOverallRating(val)}
                />
              </div>

              {/* Criteria */}
              <div className="flex flex-col gap-4">
                <CriterionInput
                  label="Performance"
                  form={formRatingCriterion}
                  onSetForm={setFormRatingCriterion}
                />
                <CriterionInput
                  label="Battery"
                  form={formRatingCriterion}
                  onSetForm={setFormRatingCriterion}
                />
                <CriterionInput
                  label="Camera"
                  form={formRatingCriterion}
                  onSetForm={setFormRatingCriterion}
                />
              </div>

              {/* Comment */}
              <textarea
                onChange={handleComment}
                rows={4}
                placeholder="Share your experience..."
                className="w-full resize-none rounded-lg border border-gray-300 p-3 text-base outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  className="rounded-full px-6 py-2 shadow-md"
                >
                  Submit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Criterion bar display (overview) */
function Criterion({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-sm text-neutral-600">{label}</span>
      <Rating style={{ maxWidth: 120 }} value={value} readOnly />
      <span className="text-sm text-neutral-500">{value.toFixed(1)}/5</span>
    </div>
  );
}

/* Criterion input (inside modal) */
function CriterionInput({ label, form, onSetForm }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-700">{label}</span>
      <Rating
        style={{ maxWidth: 140 }}
        value={form[label.toLowerCase()]}
        onChange={(val) => onSetForm({ ...form, [label.toLowerCase()]: val })}
      />
    </div>
  );
}
