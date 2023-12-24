import React, { useState, useEffect } from 'react';

const SelectYear = ({ defaultValue, onChange }) => {

    const splitCenturyAndYear = (value) => {
        const century = Math.floor(value / 100);
        const year = value % 100;
        return { century, year };
    };

    const formatTwoDigitYear = (value) => {
        return value < 10 ? `0${value}` : value.toString();
    };
    
    const [century, setCentury] = useState(0);
    const [year, setYear] = useState(0);
    
    useEffect(() => {
        const { century, year } = splitCenturyAndYear(defaultValue);
        setCentury(century);
        setYear(year);
    }, [defaultValue]);

    const handleCenturyChange = (increment) => {
        const newCentury = century + increment > 20 ? 19 : century + increment < 19 ? 20 : century + increment;
        onChange(newCentury * 100 + year);
    };

    const handleYearChange = (increment) => {
        const newYear = year + increment > 99 ? 0 : year + increment < 0 ? 99 : year + increment;
        onChange(century * 100 + newYear);
    };

    const handleYearInputChange = (e) => {
        const inputValue = e.target.value;
        const parsedValue = parseInt(inputValue, 10);
        if (!isNaN(parsedValue) && inputValue !== '') {
            setYear(parsedValue);
            onChange(century * 100 + (isNaN(parsedValue) ? 0 : parsedValue));
        }
    };

    return (
        <div>
        <button className="spin-control-down" onClick={() => handleCenturyChange(-1)}>-</button>
        <input
            id="centuryInput"
            className="form-input century-input"
            type="text"
            value={century}
            readOnly
        />
        <button className="spin-control-up" onClick={() => handleCenturyChange(1)}>+</button>

        <button className="spin-control-down" onClick={() => handleYearChange(-1)}>-</button>
        <input
            id="yearInput"
            className="form-input year-input"
            type="text"
            value={formatTwoDigitYear(year)}
            onChange={handleYearInputChange}
            maxLength={2}
        />
        <button className="spin-control-up" onClick={() => handleYearChange(1)}>+</button>
        </div>
    );
};

export default SelectYear;