import React from 'react';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const IconButton = ({ iconType, caption }) => {

    return (
        <button type="button"
            className="button-icon">
                <Link to="/" className="link-text">
                    {iconType === "back" &&
                        <MdOutlineKeyboardBackspace className="icon-medium icon-button"/>
                    }
                    <p>{caption}</p>
                </Link>
        </button>
    );
}

export default IconButton;