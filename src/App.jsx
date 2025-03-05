import React, { act, useEffect, useRef, useState } from "react";

import Background from "./background/ParticleBackground";
import VerticalCarousel from "./vertical_carousel/VerticalCarousel";
import PhoneFrame from "./phone/PhoneFrame";
import "./App.css";

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dataList = [
    {
      title: "Whatsapp",
      titleColor: "white",
      subtitle: "Plantillas y chatbot",
      subtitleColor: "white",
      footer: "Android",
      footerColor: "white",
      logoLeft: "image/flutterf.png",
      logoLeftBackgroundColor: "white",
      logoRight: "image/nodemongo.png",
      logoRightBackgroundColor: "#1B2336",
      backgroundColor: "#0468D7",
      description: "SAD ASDAS DAS D",
    },

    {
      title: "Videojuego casual",
      titleColor: "black",
      subtitle: "Sin frameworks",
      subtitleColor: "black",
      footer: "Web",
      footerColor: "black",
      logoLeft: "svg/javascript.svg",
      logoLeftBackgroundColor: "#F7DF1E",
      backgroundColor: "white",
      description: "SAD ASDAS DAS D",
    },
    {
      title: "Sistema POS",
      titleColor: "white",
      subtitle: "Gestión de ventas",
      subtitleColor: "white",
      footer: "Android",
      footerColor: "white",
      logoLeft: "image/flutterf.png",
      logoLeftBackgroundColor: "white",
      logoRight: "image/nodemongo.png",
      logoRightBackgroundColor: "#1B2336",
      backgroundColor: "#0468D7",
      description: "SAD ASDAS DAS D",
    },
    {
      title: "Sistema de fisica basico",
      titleColor: "black",
      subtitle: "Sin frameworks",
      subtitleColor: "black",
      footer: "Web",
      footerColor: "black",
      logoLeft: "svg/javascript.svg",
      logoLeftBackgroundColor: "#F7DF1E",
      backgroundColor: "white",
      description: "SAD ASDAS DAS D",
    },
    {
      title: "Editor de mapas",
      titleColor: "white",
      subtitle: "Para un videojuego casual",
      subtitleColor: "white",
      footer: "Windows, Web",
      footerColor: "white",
      logoLeft: "image/flutterf.png",
      logoLeftBackgroundColor: "white",
      backgroundColor: "#0468D7",
      description: "SAD ASDAS DAS D",
    },

    // {
    //   title: "Javascript Css Html",
    //   titleColor: "black",
    //   subtitle: "Web",
    //   subtitleColor: "black",
    //   footer: "Android",
    //   footerColor: "white",
    //   logoLeft: "svg/javascript.svg",
    //   logoLeftBackgroundColor: "#F7DF1E",
    //   backgroundColor: "white",
    //   description: "SAD ASDAS DAS D",
    // },
    // {
    //   title: "React",
    //   titleColor: "#61DAFB",
    //   subtitle: "Web",
    //   subtitleColor: "white",
    //   footer: "Android",
    //   footerColor: "white",
    //   logoLeft: "svg/react.svg",
    //   logoLeftBackgroundColor: "#20232A",
    //   backgroundColor: "#16181D",
    //   description: "SAD ASDAS DAS D",
    // },
    // {
    //   title: "React",
    //   titleColor: "#61DAFB",
    //   subtitle: "Web",
    //   subtitleColor: "white",
    //   footer: "Android",
    //   footerColor: "white",
    //   logoLeft: "svg/react.svg",
    //   logoLeftBackgroundColor: "#20232A",
    //   backgroundColor: "#16181D",
    //   description: "SAD ASDAS DAS D",
    // },
  ];

  return (
    <div id="main">
      <Background></Background>
      {/* <img src='assets/seal.jpg' alt='aaaa'/> */}
      <VerticalCarousel
        dataList={dataList}
        onChange={(newIndex) => setActiveIndex(newIndex)}
      />
      {activeIndex == 0 && (
        <PhoneFrame
          src="apps/whatsapp-flutter/index.html"
          width={400}
          height={700}
          factor={1.2}
        ></PhoneFrame>
      )}
      {activeIndex == 1 && (
        <PhoneFrame src="apps/game-js/index.html"></PhoneFrame>
      )}
      {activeIndex == 2 && (
        <PhoneFrame
          src="apps/inventory/index.html"
          width={400}
          height={700}
        ></PhoneFrame>
      )}
      {activeIndex == 3 && (
        <PhoneFrame src="apps/fisica-js/index.html" factor={1.3}></PhoneFrame>
      )}
      {activeIndex == 4 && (
        <PhoneFrame
          src="apps/map-maker/index.html"
          height={700}
          factor={1.4}
        ></PhoneFrame>
      )}
      <div></div>
      {/* <div
        style={{
          flexGrow: 1,
          maxWidth: "300px",
          backgroundColor: "red",
        }}
      >
        <p style={{ color: "white" }}>{dataList[activeIndex].description}</p>
      </div> */}
    </div>
  );
};

export default App;
