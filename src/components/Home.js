import React, {useState, useEffect} from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";
import {AmplifySignOut} from "@aws-amplify/ui-react";
import listCourses from "../data/listCourses";

const Home = () => {
  const [courses, setCourses] = useState([]);
  async function setupState() {
    const courses = await listCourses();
    setCourses(courses);
  }
  useEffect(() => {
    setupState();
  }, []);
  return (
    <div>
      <div>
        <h1>Play a round!</h1>
        {courses.map((course) => {
          return (
            <Link key={course.id} to={`/course/${course.id}`}>
              <Button>{course.name}</Button>
            </Link>
          );
        })}
      </div>
      <hr />
      <div>
        <Link to={"/bag"}>
          <Button type="dashed">Update Bag</Button>
        </Link>
      </div>
      <div>
        <Link to={"/past"}>
          <Button type="primary">Review Past Rounds</Button>
        </Link>
      </div>
      <div>
        <AmplifySignOut />
      </div>
    </div>
  );
};

export default Home;
