import React from 'react';
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Dialog = ({ type, heading, text, onCancel, onConfirm }) => {

    return (
        <div className="custom-dialog">
            <div className="custom-dialog-background">
                <div className="custom-dialog-content">
                    <h2>{heading}</h2>
                    <div className="custom-dialog-body">
                        {type === "Warning" &&
                            <IoWarningOutline className="icon-huge warning-icon"/>}
                        {type === "Error" &&
                            <MdOutlineErrorOutline className="icon-huge error-icon"/>}
                        {type === "Information" &&
                            <IoIosInformationCircleOutline className="icon-huge info-icon"/>}
                        <p>{text}</p>
                    </div>
                    
                </div>
                <div className="custom-dialog-footer">
                    <button type="submit"
                        className="formbutton focused"
                        id="submitBtn"
                        onClick={onConfirm}>Ok</button>
                    <button type="button"
                        className="formbutton"
                        id="cancelBtn"
                        onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;