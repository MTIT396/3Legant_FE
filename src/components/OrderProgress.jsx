import React from "react";
import { FaCheck } from "react-icons/fa6";

const steps = ["Pending", "Checkout", "Shipped", "Completed"];

export default function CustomSteps({ currentStep = 1 }) {
  return (
    <div className="steps-container">
      {steps.map((title, index) => {
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
            <p className="step-title">{title}</p>

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
