import {API, graphqlOperation} from "aws-amplify";
import {onUpdateBag} from "../graphql/subscriptions";

const listenUpdateBag = (owner) => {
  return API.graphql(
    graphqlOperation(onUpdateBag, {
      owner: owner.id,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  );
};

export default listenUpdateBag;
