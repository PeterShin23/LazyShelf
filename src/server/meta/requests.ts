import axios from "axios";
import { Request } from "express";
import { Media } from "../../shared/types/s3";
import { mapInstagramMediaType } from "../../shared/helpers/media";
import SecretsHelper from "../../shared/helpers/secrets-helpers";

const retrieveLongLivedAccessToken = async (req: Request) => {
  try {
    const { shortLivedAccessToken } = req.body;

    const url = `https://graph.instagram.com/access_token`

    // convert to api gateway endpoint
    const response = await axios.get(url, {
      params: {
        grant_type: "ig_exchange_token",
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        access_token: shortLivedAccessToken,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.APP_URL}` // was commented out maybe don't need this?
      }
    });

    return response.data;
  } catch (e) {
    console.log(e);

    return {};
  }
}

const getIgUser = async (req, userConfig: any) => {
  try {
    const secretsHelper = new SecretsHelper();
    let longLivedAccessToken = userConfig.longLivedAccessToken;
    longLivedAccessToken = secretsHelper.decrypt(longLivedAccessToken);

    const url = `https://graph.instagram.com/v21.0/me`

    // convert to api gateway endpoint
    const response = await axios.get(url, {
      params: {
        fields: "id,username,profile_picture_url",
        access_token: longLivedAccessToken,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.APP_URL}` // was commented out maybe don't need this?
      }
    });

    return response.data;
  } catch (e) {
    console.log(e); 

    return {};
  }
}

const getIgUserMedia = async (req, userConfig) => {
  try {
    const secretsHelper = new SecretsHelper();
    let longLivedAccessToken = userConfig.longLivedAccessToken;
    longLivedAccessToken = secretsHelper.decrypt(longLivedAccessToken);

    const url = `https://graph.instagram.com/v21.0/me/media`

    // convert to api gateway endpoint
    const response = await axios.get(url, {
      params: {
        fields: "caption,id,media_type,media_url,like_count",
        access_token: longLivedAccessToken,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.APP_URL}` // was commented out maybe don't need this?
      }
    });

    const media = response.data?.data;

    if (!media) throw Error("Could not retrieve media")

    const carouselMediaPromises = media
      .filter(m => m.media_type === "CAROUSEL_ALBUM")
      .map(cm => {
        const carouselUrl = `https://graph.instagram.com/v21.0/${cm.id}`

        return axios.get(carouselUrl, {
          params: {
            fields: "children{id,media_type,media_url}",
            access_token: longLivedAccessToken,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `${process.env.APP_URL}` // was commented out maybe don't need this?
          }
        }).then(res => res.data)
      }
    )

    const carouselMediaList = await Promise.all(carouselMediaPromises);

    const igUserMedia = media.reduce((acc, curr) => {
      if (curr.media_type === "CAROUSEL_ALBUM") {
        const childrenMedia = carouselMediaList.filter(cm => cm.id === curr.id).map(cm => cm.children.data);

        const allMedia = childrenMedia[0].map(cm => {    
          if (cm.media_type === "VIDEO") return null;
          
          return {
            parentMediaType: mapInstagramMediaType(curr.media_type),
            parentMediaId: curr.id,
            mediaId: cm.id,
            mediaType: mapInstagramMediaType(cm.media_type),
            mediaUrl: cm.media_url,
            likeCount: curr.like_count,
            isHidden: false,
            caption: curr.caption,
          }
        })

        return [...acc, allMedia.filter(x => x)];
      } else if (curr.media_type === "VIDEO") {
        return [...acc];
      } else {
        return [...acc, [{
          parentMediaType: mapInstagramMediaType(curr.media_type),
          parentMediaId: curr.id,
          mediaId: curr.id,
          mediaType: mapInstagramMediaType(curr.media_type),
          mediaUrl: curr.media_url,
          likeCount: curr.like_count,
          isHidden: false,
          caption: curr.caption,
        }]]
      }
    }, [])

    return igUserMedia;
  } catch (e) {
    throw e;
  }
}

export const metaReq = {
  retrieveLongLivedAccessToken,
  getIgUser,
  getIgUserMedia,
}