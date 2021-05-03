import React, { useState, useEffect } from "react";
import axios from 'axios';

const TestComms = () => {
    const [message, setMessage] = useState('Making Backend API Call');
    useEffect(
        () => {
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/testHealth`)
                .then(resp => setMessage(resp.data))
                .catch(err => setMessage("Error connecting backend"));
        }
    ,[]);
    return (
        <div>
            {message}
        </div>
    )
}

export default TestComms;