import React from 'react';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";

const IconButton = ({ iconType, caption, type, linkTo, size, onClick }) => {

    const handleClick = () => {
        onClick();
    };

    return (
        <button type="button"
                className={size === 'wide' ? 'button-icon-wide' : 'button-icon'}
                onClick={type === 'click' ? handleClick : null}>
            {type === 'link' && (
                <Link to={linkTo} className="link-text">
                    {iconType === "back" &&
                        <MdOutlineKeyboardBackspace className="icon-medium icon-button"/>
                    }
                    {iconType === "document" &&
                        <IoDocumentTextSharp className="icon-medium icon-button"/>
                    }
                    {iconType === "download" &&
                        <MdOutlineFileDownload className="icon-medium icon-button"/>
                    }
                    {iconType === "save" &&
                        <TfiSave className="icon-medium icon-button"/>
                    }
                    <p>{caption}</p>
                </Link>
            )}
            {type === 'click' && (
                <div className="link-text">
                    {iconType === "back" &&
                        <MdOutlineKeyboardBackspace className="icon-medium icon-button"/>
                    }
                    {iconType === "document" &&
                        <IoDocumentTextSharp className="icon-medium icon-button"/>
                    }
                    {iconType === "download" &&
                        <MdOutlineFileDownload className="icon-medium icon-button"/>
                    }
                    {iconType === "save" &&
                        <TfiSave className="icon-medium icon-button"/>
                    }
                    <p>{caption}</p>
                </div>
            )}
        </button>
    );
}

export default IconButton;