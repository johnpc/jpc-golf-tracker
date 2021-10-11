import {API, graphqlOperation} from "aws-amplify";
import {listBags as listBagsQuery} from "../graphql/queries";
import {createBag} from "../graphql/mutations";
import {clubs} from "../components/Bag";

const getBag = async () => {
  const result = await API.graphql(
    graphqlOperation(listBagsQuery, {
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  );
  const bag = result.data.listBags.items[0] ?? null;

  if (!bag) {
    const newBagResult = await API.graphql(
      graphqlOperation(createBag, {
        input: {
          // By default, assume user has all clubs
          clubs: Object.keys(clubs),
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
    );

    return newBagResult.data.createBag;
  }

  return bag;
};

export default getBag;
