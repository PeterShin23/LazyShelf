import { MediaType } from "../enums/s3";

export type User = {
  igUserId: number;
  username: string;
  name?: string;
  pfpUrl?: string;
  media: Media[]
}

export type Media = {
  parentMediaType?: MediaType;
  parentMediaId?: string;
  mediaType: MediaType
  mediaUrl: string;
  mediaId: string;
  likeCount: number;
  isHidden?: boolean;
  timeStamp?: string;
  caption?: string;
  category?: string;
}