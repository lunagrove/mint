import React, { useState, useEffect } from 'react';

const SelectYear = ({ defaultValue, onChange }) => {

    const splitCenturyAndYear = (value) => {
        const stringValue = value.toString();
        const century = stringValue.substring(0, 2);
        const year = stringValue.substring(2);
        return { century, year };
    };
    
    const [century, setCentury] = useState('20');
    const [year, setYear] = useState('00');
    
    useEffect(() => {
        const { century, year } = splitCenturyAndYear(defaultValue);
        setCentury(century);
        setYear(year);
    }, [defaultValue]);

    const handleCenturyChange = (increment) => {
        const newCentury = parseInt(century) + increment > 20 ? 19 : parseInt(century) + increment < 19 ? 20 : parseInt(century) + increment;
        setCentury(newCentury);
        onChange(newCentury * 100 + parseInt(year));
    };

    const handleYearChange = (increment) => {
        const newYear = parseInt(year) + increment > 99 ? 0 : parseInt(year) + increment < 0 ? 99 : parseInt(year) + increment;
        setYear(newYear);
        onChange(parseInt(century) * 100 + newYear);
    };

    const handleYearInputChange = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,2}$/.test(inputValue)) {
            setYear(inputValue);
        }
    };
    
    const handleYearInputBlur = () => {
        const newYear = year === '' ? '00' : year;
        onChange(parseInt(century) * 100 + parseInt(newYear));
    };
    
    const handleYearInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newYear = year === '' ? '00' : year;
            onChange(parseInt(century) * 100 + parseInt(newYear));
        }
    };

    return (
        <div className="date-input-fields">
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
            </div>
            <div>
                <button className="spin-control-down" onClick={() => handleYearChange(-1)}>-</button>
                <input
                    id="yearInput"
                    className="form-input year-input"
                    type="text"
                    value={year}
                    onChange={handleYearInputChange}
                    maxLength={2}
                    onBlur={handleYearInputBlur}
                    onKeyDown={handleYearInputKeyDown}
                />
                <button className="spin-control-up" onClick={() => handleYearChange(1)}>+</button>
            </div>
        </div>
    );
};

export default SelectYear;