import axios from "axios";
import { mapDynamoDBItemToJSON } from "../../../shared/helpers/user-configs";

const fetchTestData = async () => {
  try {
    const response = await axios.get(`${process.env.REST_API_GATEWAY}/ps-mls-get-user-configs?username=lazyshelf.test`, 
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `https://www.theshowcase.me/`,
        "X-Api-Key": process.env.REST_API_KEY
      },
    });

    // console.log(mapDynamoDBItemToJSON(response.data))

    return mapDynamoDBItemToJSON(response.data);
  } catch (e) {
    console.log(e);

    return null;
  }
}

export const dynamoReq = {
  fetchTestData,
}