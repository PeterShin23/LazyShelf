import axios from "axios";
import { httpsRoute } from "../../../shared/constants/https";

const fetchTestData = async () => {
  try {
    //working poast
    const response = await axios.post('https://64nnnkhnv5.execute-api.us-east-2.amazonaws.com/ps-mls-get-user-posts', 
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${httpsRoute}/`
      },
      queryStringParameters: {
        objectKey: "tst/dump/facebook-data-test.json"
      }
    });

    return response.data;
  } catch (e) {
    console.log(e);

    return null;
  }
}

export const s3Req = {
  fetchTestData,
}