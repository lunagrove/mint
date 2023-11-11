import React from 'react';

const Snippet = ({ snippet }) => {

    return (
        <div className="snippet-row">
            <p>{snippet}</p>
        </div>
    );
}

export default Snippet;