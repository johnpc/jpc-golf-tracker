import {API, graphqlOperation} from "aws-amplify";
import {createHole as createHoleQuery} from "../graphql/mutations";

const createHole = async (course, number, par, handicap) => {
  const newHoleResult = await API.graphql(
    graphqlOperation(createHoleQuery, {
      input: {
        holeCourseId: course.id,
        hole_number: number,
        par,
        handicap,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  );

  return newHoleResult.data.createHole;
};

export default createHole;
