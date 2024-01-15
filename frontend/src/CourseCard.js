import React from "react"
import './CourseCard.css'

const CourseCard = ({ course }) => (
    <div className="monitor">
    <div className="overall-container">
        <div className="left-container">
            < h2 id = "dia">{course.course_name.toUpperCase()}</h2>
            <p id = "tiempo">Description</p>
        </div>
        <div className="right-container">
            <img src = "https://iribe.umd.edu/img/iribefront.jpg" alt="iribepic"/>
        </div>
        
    </div>
    <p id = "queueLabel">Estimated Queue:</p>
    <p id = "queue">{course.total_checked_in}</p>
    
</div>
);

export default CourseCard;
