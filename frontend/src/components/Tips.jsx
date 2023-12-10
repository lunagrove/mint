import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { IoMdClose } from "react-icons/io";
import { tips } from "../utilities/constants";

const Tips = ({ tipIndex, onClose, position }) => {

  const [markdownContent, setMarkdownContent] = useState('');
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupSize, setPopupSize] = useState({ width: 400, height: 300 });

  const popupRef = useRef(null);
  const currentTip = tips[tipIndex];
  const filePath = `/markdown/${currentTip.filename}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch Markdown content: ${response.status}`);
        }
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error fetching Markdown content:', error);
      }
    };
    fetchData();
  }, [filePath, tipIndex]);
  
  useEffect(() => {
    if (popupRef.current) {
      setPopupSize({
        width: popupRef.current.scrollWidth,
        height: popupRef.current.scrollHeight
      });
    }
  }, [tipIndex]);

  useEffect(() => {
    if (position && position.x !== undefined && position.y !== undefined) {
      setPopupPosition(position);
    }
  }, [position]);

  useEffect(() => {
    if (position) {
      var newX = position.x;
      var newY = position.y;

      // Check if the popup extends beyond the right edge of the viewport, if so
      // set the top right to the starting position
      if (newX + popupSize.width > window.innerWidth) {
        newX = newX - popupSize.width;
      }
      // Check if the popup extends beyond the bottom edge of the viewport, if so
      // set the bottom left to the starting position
      if (newY + popupSize.height > window.innerHeight) {
        newY = newY - popupSize.height;
      }
      setPopupPosition({
          x: newX,
          y: newY
      });
    }
  }, [position, popupSize]);
  
  const handleMouseDown = (e) => {
    const offsetX = e.clientX - popupPosition.x;
    const offsetY = e.clientY - popupPosition.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      setPopupPosition({
        x: newX,
        y: newY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="popup" ref={popupRef} style={{ top: popupPosition.y, left: popupPosition.x }}>
      <div className="popup-header" onMouseDown={handleMouseDown}>
        <p>{currentTip.title}</p>
        <IoMdClose className="icon-large tips-close" onClick={onClose}/>
      </div>
      <div className="popup-content">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Tips;