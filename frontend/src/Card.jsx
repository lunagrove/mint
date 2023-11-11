import React from 'react';

const Card = ({ cardType }) => {

    return (
        <div className="card">
            <div className="card-heading">
                <h3>{cardType}</h3>
            </div>
            <div className="card-content">
                <img className="plus-button" src="./plus-icon-80x80.png" alt="Plus icon"></img>
                {cardType === 'Experience' && <p>Add a new snippet</p>}
            </div>
        </div>
    );
}

export default Card;
