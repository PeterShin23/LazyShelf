import axios from "axios";
import { UserPaymentOption, UserUiTemplate } from "../../../shared/enums/dynamo";
import SecretsHelper from "../../../shared/helpers/secrets-helpers";
import { mapDynamoDBItemToJSON } from "../../../shared/helpers/user-configs";
import { UserConfig } from "../../../shared/types/dynamo";

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

    return mapDynamoDBItemToJSON(response.data);
  } catch (e) {
    console.log(e);

    return null;
  }
}

const getUserConfig = async (username: string) => {
  try {
    const response = await axios.get(`${process.env.REST_API_GATEWAY}/ps-mls-get-user-configs?username=${username}`, 
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `https://www.theshowcase.me/`,
        "X-Api-Key": process.env.REST_API_KEY
      },
    });
    const jsonData = mapDynamoDBItemToJSON(response.data);

    return jsonData;
  } catch (e) {
    console.log(e);

    const response = await axios.get(`${process.env.REST_API_GATEWAY}/ps-mls-get-user-configs?username=peter.shin`, 
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `https://www.theshowcase.me/`,
        "X-Api-Key": process.env.REST_API_KEY
      },
    });

    let data = mapDynamoDBItemToJSON(response.data);

    const secretsHelper = new SecretsHelper();

    data = {
      ...data,
      longLivedAccessToken: secretsHelper.encrypt(data.longLivedAccessToken)
    }

    return data;
  }
}

const createUser = async (username: string, accessToken: string) => {
  try {
    const secretsHelper = new SecretsHelper();

    const body: UserConfig = {
      username,
      longLivedAccessToken: secretsHelper.encrypt(accessToken),
      isActive: true,
      // tagLine: "",
      // description: "",
      createdDate: new Date().toISOString(),
      paymentOption: UserPaymentOption.BypassAll,
      uiOptions: {
        color: "panda",
        templateId: UserUiTemplate.Original,
      }
    }

    const response = await axios.put(`${process.env.REST_API_GATEWAY}/ps-mls-put-user-configs`, 
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `https://www.theshowcase.me/`,
        "X-Api-Key": process.env.REST_API_KEY
      },
      body,
    });

    return mapDynamoDBItemToJSON(response.data);
  } catch (e) {
    console.log(e);

    return null;
  }
}

export const dynamoReq = {
  fetchTestData,
  createUser,
  getUserConfig,
}