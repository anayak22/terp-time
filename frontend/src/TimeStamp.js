import React, { useState, useEffect } from 'react';
import './TimeStamp.css'

function TimeStamp() {
  const [timestamp, setTimestamp] = useState(new Date());

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  function returnFormat(now) {
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours}:${padZero(minutes)}:${padZero(seconds)}`;
      return formattedTime;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date());
    }, 1000); // Update the timestamp every second

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  const info = {
    date: timestamp.toDateString(),
    time: returnFormat(timestamp)
  }


  return info;
}

export default TimeStamp;
