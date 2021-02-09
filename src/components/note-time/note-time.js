import React, { useState, useEffect, useRef } from 'react';
import './note-time.css';


/** Таймер и дата записи */
const NoteTime = (props) => {

    const setDateTimeInterval = useRef();
    const [date, setDate] = useState('');
    const {dateTime} = props

    useEffect(() => {
        const id = setInterval(() => {
            let curentDate = Date.now();
            let rangeDate = curentDate-dateTime;
            let days = Math.round(rangeDate/(1000 * 3600 * 24));
            let hours = Math.round(rangeDate/(1000 * 3600)) % 24;
            let minuts = Math.round(rangeDate/(1000 * 60)) % 60;
            let seconds = Math.round(rangeDate/(1000)) % 60;
            let time = `d: ${days} h: ${hours}: m: ${minuts} s: ${seconds}`
            setDate(time)
        }, 1000);

        setDateTimeInterval.current = id;

        return () => clearInterval(setDateTimeInterval.current)
    },[dateTime]);

    return ( 
        <>
            <p className="date-created-info ml-1">
                Date created: { new Date(dateTime).toLocaleString()}
            </p>  
            <p className="time-elapsed-info ml-1">
                Time elapsed: { date }
            </p> 
        </>
    )
}

export default NoteTime;