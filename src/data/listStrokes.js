import {API, graphqlOperation} from "aws-amplify";
import {listStrokes as listStrokesQuery} from "../graphql/queries";

const listStrokes = async () => {
  const result = await API.graphql(graphqlOperation(listStrokesQuery, {}));
  return result.data.listStrokes.items ?? [];
};

export default listStrokes;
