from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app=Flask(__name__)
client = MongoClient("mongodb+srv://ashnarainbow:ashnan18@terp-time.vdbpbll.mongodb.net/?retryWrites=true&w=majority")
db = client["terp-time"]
CORS(app)

cs_office_hr_profiles = db.office_hour_attendance

@app.route('/check-in/<course_name>/<student_name>', methods=['POST','OPTIONS'])
def check_in(course_name, student_name):
    if request.method == 'OPTIONS':
        response = jsonify({"message": "Preflight request allowed"})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response


    current_office_hour = cs_office_hr_profiles.find_one({
        "course_name": course_name
    })

    if current_office_hour:
        cs_office_hr_profiles.update_one(
            {"_id":current_office_hour["_id"]},
            {
                "$inc":{"total_checked_in": 1},
                "$push": {"checked_in_students": {"student_name": student_name}}
            }
        )
        return jsonify({"message": "Student checked in successfully"})
    else:
        return jsonify({"message": "No current TA CS Office Hours session found"})

@app.route('/check-out/<course_name>/<student_name>',methods=['POST','OPTIONS'])
def check_out(course_name, student_name):
    if request.method == 'OPTIONS':
        response = jsonify({"message": "Preflight request allowed"})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    current_office_hour=cs_office_hr_profiles.find_one({
        "course_name": course_name
    })

    if current_office_hour:
        cs_office_hr_profiles.update_one(
            {"_id": current_office_hour["_id"],"checked_in_students.student_name": student_name},
            {
                "$inc": {"total_checked_in":-1},
                "$pull": {"checked_in_students": {"student_name": student_name}}
            }
        )
        return jsonify({"message": "Student checked out successfully"})
    else:
        return jsonify({"message": "No current TA CS Office Hour session found"})

@app.route('/add-course', methods=['POST', 'OPTIONS'])
def add_course():
    if request.method == 'OPTIONS':
        response = jsonify({"message": "Preflight request allowed"})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    data=request.get_json()
    course_name=data.get('course_name', '')
    if not course_name:
        return jsonify({"error": "Course name is required"})
    existing_course = cs_office_hr_profiles.find_one({"course_name": course_name})

    if existing_course:
        existing_course["_id"] = str(existing_course["_id"])
        return jsonify(existing_course)
    else:
        new_course = {
            "course_name": course_name, 
            "total_checked_in": 0,
            "checked_in_students": []
        }
        result = cs_office_hr_profiles.insert_one(new_course)
        new_course["_id"] = str(result.inserted_id)
        return jsonify(new_course)

@app.route('/get-all-courses', methods=['GET'])
def get_all_courses():
    all_courses = list(cs_office_hr_profiles.find({},{'_id': False}))
    return jsonify({"courses": all_courses})

if __name__=='__main__':
    app.run()


