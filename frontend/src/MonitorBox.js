import React from "react";
import './MonitorBox.css'
import TimeStamp from './TimeStamp'

function MonitorBox() {
    const info= TimeStamp();
    return(
        <div className="monitor">
            <div className="overall-container">
                <div className="left-container">
                    < h2 id = "dia">{info.date.toUpperCase()}</h2>
                    <p id = "tiempo">{info.time}</p>
                </div>
                <div className="right-container">
                    <img src = "https://iribe.umd.edu/img/iribefront.jpg" alt="iribepic"/>
                </div>
                
            </div>
            <p id = "queueLabel">Estimated Queue:</p>
            <p id = "queue">0</p>
            
        </div>
    )

}

export default MonitorBox;