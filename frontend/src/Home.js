import React , {useState, useEffect} from "react";
import './Home.css'
import MonitorBox from './MonitorBox'
import TimeStamp from './TimeStamp'
import CourseCard from './CourseCard'

const Home = ()=> {
    const[courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    const getAllCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-all-courses');
            const data = await response.json();
            setCourses(data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    const addCourse = async (courseName) => {
        if (!courseName) return;
        try {
            const response = await fetch('http://localhost:5000/add-course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ course_name: courseName}),
            });

            const updatedResponse = await fetch('http://localhost:5000/get-all-courses');
            const updatedData = await updatedResponse.json();
            setCourses(updatedData.courses);

            //const data = await response.json();
            //console.log('Data from server:', data);
            //setCourses(prevCourses => [...prevCourses, data]);
            //console.log('Updated courses:', [courses]);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleInputChange = (event) => {
        setNewCourse(event.target.value);
    };

    const handleAddCourseClick = () => {
        addCourse(newCourse);
    };

    const handleCheckIn = async () => {
        if (!selectedCourse) return;

        try {
            const response = await fetch(`http://localhost:5000/check-in/${selectedCourse}/studentName`, {
                method: 'POST',
            });

            // Optionally, update the courses list after check-in
            getAllCourses();
        } catch (error) {
            console.error('Error checking in:', error);
        }
    };

    const handleCheckOut = async () => {
        if (!selectedCourse) return;

        try {
            const response = await fetch(`http://localhost:5000/check-out/${selectedCourse}/studentName`, {
                method: 'POST',
            });

            // Optionally, update the courses list after check-out
            getAllCourses();
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };


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
            <div className="input">
                    <input
                        type="text"
                        placeholder="Enter course name"
                        className="largeText"
                        value={newCourse}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddCourseClick}>Add Course</button>
            </div>
            <div className="card-container">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
            <div className="input">
                <input
                    type="text"
                    placeholder="Enter course name for check-in/out"
                    className="largeText"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                />
                <button onClick={handleCheckIn}>Check-In</button>
                <button onClick={handleCheckOut}>Check-Out</button>
            </div>
        
        <div className="end-container">
            <p className="closing">Made by Ashna Nayak</p>
            <a className="closing" href = "github.com/anayak22">Github</a>
            <a className="closing" href = "https://www.linkedin.com/in/ashna-nayak/">LinkedIn</a>
        </div>
    </div>
        
        
    );
}

export default Home;