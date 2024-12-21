import { UserPaymentOption, UserUiTemplate } from "../enums/dynamo";

export type UserConfig = {
  username: string;  // partition key
  // email: string;
  // password: string;
  isActive: boolean;
  createdDate: string;
  uiOptions: UserUiOptions;
  longLivedAccessToken: string;
  paymentOption: UserPaymentOption;
  // balanceRemaining: number;
  // lastPaymentDate: string;
  // nextPaymentDate: string;
  // lastDataFetchedDate: string;
  // dataFetchAttempts: number;
  // isDataFetchSuccess: boolean;
}

export type UserUiOptions = {
  color: string;
  templateId: UserUiTemplate;
}