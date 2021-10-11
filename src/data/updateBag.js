import {API, graphqlOperation} from "aws-amplify";
import {updateBag as updateBagQuery} from "../graphql/mutations";
import getBag from "./getBag";

const updateBag = async (clubs) => {
  const bag = await getBag();
  const result = await API.graphql(
    graphqlOperation(updateBagQuery, {
      authMode: "AMAZON_COGNITO_USER_POOLS",
      input: {
          id: bag.id,
          clubs,
      },
    })
  );

  return result.data.updateBag;
};

export default updateBag;
