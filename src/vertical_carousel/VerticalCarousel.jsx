import React, { useEffect, useState } from "react";
import "./VerticalCarousel.css";
import CarouselItem from "./CarouselItem";

const VerticalCarousel = ({ dataList, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    onChange(activeIndex);
  }, [activeIndex, onChange]);

  const handleNavigation = (direction) => {
    if (direction === "prev") {
      setActiveIndex((prev) => (prev - 1 + dataList.length) % dataList.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % dataList.length);
    }
  };

  const calculatePosition = (index) => {
    const diff = index - activeIndex;
    const totalItems = dataList.length;

    if (diff === -1 || diff === totalItems - 1) return "previous";
    if (diff === 1 || diff === -totalItems + 1) return "next";
    if (diff === 0) return "active";

    return "hidden";
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {dataList.map((data, index) => {
          const position = calculatePosition(index);

          return (
            <CarouselItem
              key={index}
              title={data.title}
              titleColor={data.titleColor}
              subtitle={data.subtitle}
              subtitleColor={data.subtitleColor}
              footer={data.footer}
              footerColor={data.footerColor}
              logoLeft={data.logoLeft}
              logoRight={data.logoRight}
              backgroundColor={data.backgroundColor}
              logoLeftBackgroundColor={data.logoLeftBackgroundColor}
              logoRightBackgroundColor={data.logoRightBackgroundColor}
              onClick={() => {
                if (position === "previous") handleNavigation("prev");
                if (position === "next") handleNavigation("next");
              }}
              position={position}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VerticalCarousel;
