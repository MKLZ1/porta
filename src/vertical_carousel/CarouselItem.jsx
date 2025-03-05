import React from "react";
import "./CarouselItem.css";

const CarouselItem = ({
  title,
  subtitle,
  logoLeft,
  logoRight,
  titleColor,
  subtitleColor,
  footer,
  footerColor,
  backgroundColor,
  logoLeftBackgroundColor,
  logoRightBackgroundColor,
  position,
  onClick,
}) => {
  return (
    <div className={`carousel-item ${position}`} onClick={onClick}>
      <div
        className="carousel-item-left-logo"
        style={{ backgroundColor: logoLeftBackgroundColor }}
      >
        <img src={logoLeft} />
      </div>
      <div
        className="carousel-item-content dm-sans-font"
        style={{ backgroundColor: backgroundColor }}
      >
        <p style={{ color: titleColor, fontWeight: "bold" }}>{title}</p>
        {/* <div style={{ height: "5px" }}></div> */}
        <p style={{ color: subtitleColor }}>{subtitle}</p>
        {footer != null && (
          <p style={{ color: footerColor, fontSize: "12px" }}>{footer}</p>
        )}
      </div>
      {logoRight != null && (
        <div
          className="carousel-item-right-logo"
          style={{ backgroundColor: logoRightBackgroundColor }}
        >
          <img src={logoRight} />
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
