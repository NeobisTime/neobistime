import React, { useEffect, useState } from "react";
import "./spinner.css";
import neobis from "./Group 81.svg";

const Spinner = () => {
  const video = React.useRef(null);
  // play video if it's paused
  //   if (video.current && video.current.paused) video.current.play();

  const data = [
    { id: 0, title: "Выпрями спину" },
    { id: 1, title: "in code we trust" },
    { id: 2, title: "you will never code alone" },
    { id: 3, title: "Продуктивного дня! :)" },
    { id: 4, title: "This website offers you cookies in the kitchen :))" },
  ];
  const random = Math.round(Math.random() * 4);
  let [text, setText] = useState<string>("");

  const [show, setShow] = useState(true);

  useEffect(() => {
    setText(data[random].title);
    let timeout = setTimeout(() => setShow(false), 600);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {show && (
        <div className="spinner">
          <img src={neobis} className="spinner__image" alt="neobis logo" />
          <p className="spinner__text">{text}</p>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="spinner__video"
            ref={video}
            src="/video/spinner.mp4"
          ></video>
        </div>
      )}
    </>
  );
};

export default Spinner;
