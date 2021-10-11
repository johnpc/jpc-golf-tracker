import {API, graphqlOperation} from "aws-amplify";
import {listHoles as listHolesQuery} from "../graphql/queries";

const listHoles = async () => {
  const result = await API.graphql(graphqlOperation(listHolesQuery, {}));
  return result.data.listHoles.items ?? [];
};

export default listHoles;
