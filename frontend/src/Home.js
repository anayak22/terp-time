import React from "react";
import './Home.css'
import MonitorBox from './MonitorBox'
import TimeStamp from './TimeStamp'

function Home() {
    const info= TimeStamp();
    return(
    <div className="container">
        <div className="home">
            <div className= "homeLeft">
                <h2>Track Your CMSC132 TA Office Hour Wait Time</h2>
                <p>Get Real-Time Insights</p>
                <button>Get Started</button>
            </div>
            <div id = "image">
                <img src = "https://m.media-amazon.com/images/I/81nUFx9sXoL._AC_UF894,1000_QL80_.jpg" alt="people pic" />
            </div>
        </div>

        <MonitorBox />
        <div className="check-in">
            <h2>Check-In To Office Hours Here!</h2>
            <h3>Current time: {info.time}</h3>

        </div>
        <div className="end-container">
            <p className="closing">Made by Ashna Nayak</p>
            <a className="closing" href = "github.com/anayak22">Github</a>
            <a className="closing" href = "https://www.linkedin.com/in/ashna-nayak/">LinkedIn</a>
        </div>
    </div>
        
        
    )
}

export default Home;