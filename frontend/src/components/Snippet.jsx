import React from 'react';
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { formatLongDate } from "../utilities/dates";

const Snippet = ({ snippet }) => {

    return (
        <div className="snippet-row">
            <div className="snippet-item">
                <VscDebugBreakpointLog className="icon-medium snippet-bullet"/>
                <p className="snippet-text">{snippet.snippet}</p>
            </div>
            <h5 className="snippet-date">Created on: {formatLongDate(snippet.createdon, false)}</h5>
        </div>
    );
}

export default Snippet;