import { UserPaymentOption, UserUiTemplate } from "../enums/dynamo";

export type UserConfig = {
  username: string;  // partition key
  email: string;
  password: string;
  isActive: string;
  createdDate: string;
  uiOptions?: string;
  longLivedAccessToken: string;
  paymentOption: UserPaymentOption;
  balanceRemaining: number;
  lastPaymentDate: string;
  nextPaymentDate: string;
  lastDataFetchedDate: string;
  dataFetchAttempts: number;
  isDataFetchSuccess: boolean;
}

export type UserUiOptions = {
  color: string;
  templateId: UserUiTemplate;
}