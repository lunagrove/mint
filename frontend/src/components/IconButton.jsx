import React from 'react';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";

const IconButton = ({ iconType, caption, linkTo, size }) => {

    return (
        <button type="button"
                className={size === 'wide' ? 'button-icon-wide' : 'button-icon'}>
            <Link to={linkTo} className="link-text">
                {iconType === "back" &&
                    <MdOutlineKeyboardBackspace className="icon-medium icon-button"/>
                }
                {iconType === "document" &&
                    <IoDocumentTextSharp className="icon-medium icon-button"/>
                }
                <p>{caption}</p>
            </Link>
        </button>
    );
}

export default IconButton;