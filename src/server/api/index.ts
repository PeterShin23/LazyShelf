import { s3Req } from "../aws/s3/requests";
import axios from 'axios';
import express from 'express';
import { metaReq } from "../meta/requests";
import { dynamoReq } from "../aws/dynamoDb/requests";

const router = express.Router();

// Define API routes
router.get('/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

router.get('/test-data', async (req, res) => {
  try {
    // working get
    // const response = await axios.get('https://64nnnkhnv5.execute-api.us-east-2.amazonaws.com/ps-mls-get-user-posts', 
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "http://localhost:5500/"
    //     },
    //     // queryStringParameters: {
    //     //   objectKey: "tst/dump/facebook-data-test.json"
    //     // }
    //   });

    //working poast
    const response = await s3Req.fetchTestData();

    res.json(response);
    // console.log("response", response)
  } catch (e) {
    console.log(e)
    res.status(500).send("an error occurred");
  }
})

router.get('/get-user-config', async (req, res) => {
  try {
    const response = await dynamoReq.fetchTestData();
    // console.log(response);
    res.json(response);
  } catch (e) {
    console.log(e)
    res.status(500).send("An error occurred")
  }
})

router.post('/retrieve-long-token', async (req, res) => {
  try {
    const response = await metaReq.retrieveLongLivedAccessToken(req);

    res.json(response);
    console.log("response", response)
  } catch (e) {
    console.log(e)
    res.status(500).send("an error occurred");
  }
})

router.get('/get-ig-user', async (req, res) => {
  try {
    const response = await metaReq.getIgUser(req);
    // console.log(response);
    res.json(response);
  } catch (e) {
    console.log(e)
    res.status(500).send("An error occurred")
  }
})

router.get('/get-ig-user-media', async (req, res) => {
  try {
    const response = await metaReq.getIgUserMedia(req);
    // console.log(response);
    res.json(response);
  } catch (e) {
    console.log(e)
    res.status(500).send("An error occurred")
  }
})

export default router;