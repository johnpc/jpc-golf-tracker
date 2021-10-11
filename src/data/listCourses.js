import {API, graphqlOperation} from "aws-amplify";
import {listCourses as listCoursesQuery} from "../graphql/queries";

const listCourses = async () => {
  const result = await API.graphql(graphqlOperation(listCoursesQuery, {}));
  return result.data.listCourses.items ?? [];
};

export default listCourses;
