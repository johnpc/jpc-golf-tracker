import {API, graphqlOperation} from "aws-amplify";
import {createStroke as createStrokeQuery} from "../graphql/mutations";

const createStroke = async (
  hole_id,
  club,
  start_flag_distance,
  end_flag_distance,
  shot_number,
  fate,
  tags
) => {
  const newStroke = await API.graphql(
    graphqlOperation(createStrokeQuery, {
      input: {
        strokeHoleId: hole_id,
        club,
        start_flag_distance,
        end_flag_distance,
        fate,
        tags,
        shot_number,
        date: new Date().toISOString(),
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  );

  return newStroke.data.createStroke;
};

export default createStroke;
