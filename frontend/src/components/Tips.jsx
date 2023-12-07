import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { IoMdClose } from "react-icons/io";
import { tips } from "../utilities/constants";

const Tips = ({ tipIndex, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const currentTip = tips[tipIndex];

  return (
    <div className="popup" style={{ top: position.y, left: position.x }}>
      <div className="popup-header" onMouseDown={handleMouseDown}>
        <p>{currentTip.title}</p>
        <IoMdClose className="icon-large tips-close" onClick={onClose}/>
      </div>
      <div className="popup-content">
        <ReactMarkdown>{currentTip.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Tips;