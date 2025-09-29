import React from "react";
import { FaCheck } from "react-icons/fa6";

const steps = [
  { id: 1, status: "PENDING" },
  { id: 2, status: "CHECKOUT" },
  { id: 3, status: "SHIPPED" },
  { id: 4, status: "COMPLETED" },
];

export default function CustomSteps({ status = "PENDING" }) {
  const currentStep = steps.find((item) => item.status === status).id;
  return (
    <div className="steps-container">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep; // tới đâu thì completed
        return (
          <div key={index} className="step-item">
            {/* Circle */}
            <div
              className={`step-circle ${isCompleted ? "completed" : "pending"}`}
            >
              {isCompleted ? (
                <FaCheck style={{ fontSize: 20, color: "#fff" }} />
              ) : (
                index + 1
              )}
            </div>

            {/* Title */}
            <p className="step-title">{step.status}</p>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`step-line ${
                  index < currentStep - 1 ? "line-completed" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
