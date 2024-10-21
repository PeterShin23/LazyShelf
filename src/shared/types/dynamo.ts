import { UserPaymentOption } from "../enums/dynamo";

export type UserConfig = {
  username: string;  // partition key
  createdDate: string;
  uiColor?: string;
  paymentOption: UserPaymentOption;
  longTermKey: string;
  balanceRemaining: number;
  lastDataFetchedDate: string;
  dataFetchAttempts: number;
}