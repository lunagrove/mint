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
            <h6 className="snippet-date">Last modified: {formatLongDate(snippet.createdon, false)}</h6>
        </div>
    );
}

export default Snippet;