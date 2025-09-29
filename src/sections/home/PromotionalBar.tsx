import React from "react";
import "@/app/styles/css/promotionBarProps.css";

interface PromotionBarProps {
  percentage: number;
}

const PromotionBar: React.FC<PromotionBarProps> = ({ percentage }) => {
  const validPercentage = Math.max(0, Math.min(percentage, 100));

  return (
    <div className="promotion-bar">
      <div
        className="promotion-bar-fill"
        style={{ width: `${validPercentage}%` }}
      ></div>
      <span className="promotion-percentage">{validPercentage}%</span>
    </div>
  );
};

export default PromotionBar;
