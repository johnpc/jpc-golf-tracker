import {API, graphqlOperation} from "aws-amplify";
import {createCourse as createCourseQuery} from "../graphql/mutations";

const createCourse = async (name, slope, rating, holes) => {
  const newCourseResult = await API.graphql(
    graphqlOperation(createCourseQuery, {
      input: {
        name,
        slope_rating: slope,
        course_rating: rating,
        holes,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  );

  return newCourseResult.data.createCourse;
};

export default createCourse;
