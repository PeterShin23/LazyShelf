import { MediaType } from "../enums/s3"

export const mapInstagramMediaType = (media_type: string) => {
  switch (media_type) {
    case "IMAGE":
      return MediaType.INSTAGRAM_IMAGE;
    case "CAROUSEL_ALBUM": 
      return MediaType.INSTAGRAM_CAROUSEL;
    case "VIDEO":
      return MediaType.INSTAGRAM_VIDEO;
  }
}