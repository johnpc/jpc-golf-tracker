import {API, graphqlOperation} from "aws-amplify";
import {getCourse as getCourseQuery} from "../graphql/queries";

const getCourse = async (courseId) => {
  const result = await API.graphql(
    graphqlOperation(getCourseQuery, {
      id: courseId,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  );
  return result.data.getCourse;
};

export default getCourse;
