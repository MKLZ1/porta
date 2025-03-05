import React, { useEffect, useRef } from "react";

const PhoneFrame = ({
  width,
  height = 700,
  borderSize = 16,
  borderRadius = 30,
  factor = 1,
  src,
  children,
}) => {
  const phoneBaseStyle = {
    margin: "0 30px",
    flexGrow: 1,
    maxWidth: width == null ? null : `${width}px`,
    height: "100%",
    // height: `${height}px`,
    borderRadius: `${borderRadius}px`,
    // backgroundColor: "transparent",
    // boxShadow: `inset 0 0 0 ${borderSize}px rgba(0, 0, 0, 1)`,
    padding: `${borderSize}px`,
    // overflow: "hidden",
    position: "relative",
    top: 0,
    left: 0,
  };
  const phoneFrameStyle = {
    width: "100%",
    height: "100%",
    borderRadius: `${borderRadius}px`,
    // backgroundColor: "red",
    boxShadow: `inset 0 0 0 ${borderSize}px rgba(0, 0, 0, 1)`,
    // padding: "12px",
    // overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
  };
  const phoneContentStyle = {
    // opacity: 0.2,
    // position: "absolute",
    // top: `${borderSize}px`,
    // left: `${borderSize}px`,
    // position: "absolute",
    // left:0,
    // right:0,
    width: `${100 * factor}%`,
    height: `${100 * factor}%`,
    transform: `scale(${1 / factor})`,
    transformOrigin: "top left",

    // borderRadius: `${borderRadius}px`,
    // overflow: "hidden",
  };
  const screenStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "transparent",
  };

  const buttonsContainer = {
    position: "absolute",
    top: "30%",
    right: "-4px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const sideButton = {
    width: "4px",
    height: "40px",
    background: "linear-gradient(to right, #000, #000)",
    borderRadius: "2px 0 0 2px",
    boxShadow: "-1px 0 2px rgba(0, 0, 0, 0.3)",
  };
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        iframe.contentWindow?.focus();
      };

      const handleBlur = () => {
        setTimeout(() => {
          iframe.contentWindow?.focus();
        }, 0);
      };

      iframe.addEventListener("load", handleLoad);
      window.addEventListener("blur", handleBlur);
      iframe.contentWindow?.addEventListener("blur", handleBlur);

      return () => {
        iframe.removeEventListener("load", handleLoad);
        window.removeEventListener("blur", handleBlur);
        iframe.contentWindow?.removeEventListener("blur", handleBlur);
      };
    }
  }, []);
  return (
    <div style={phoneBaseStyle}>
      <div style={phoneContentStyle}>
        <iframe
          ref={iframeRef}
          loading="lazy"
          src={src}
          height="100%"
          width="100%"
        ></iframe>
      </div>
      <div style={phoneFrameStyle}></div>
    </div>
  );
};

export default PhoneFrame;
