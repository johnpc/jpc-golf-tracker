import {API, graphqlOperation} from "aws-amplify";
import {deleteStroke as deleteStrokeQuery} from "../graphql/mutations";

const removeStroke = async (id) => {
  await API.graphql(
    graphqlOperation(deleteStrokeQuery, {
      input: {
        id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  );
};

export default removeStroke;
