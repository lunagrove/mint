import React from 'react';

const Card = ({ cardNumber }) => {
    return (
        <div className="card">
            <h2>Card {cardNumber}</h2>
            <p>Content for Card {cardNumber}</p>
        </div>
    );
}

export default Card;
