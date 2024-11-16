import { actDetail } from "./ActInterface";

export interface RegRequest {
  // FActId: number,
  fActDetailId: number,
  fRegFee: number,
  fUserId: number,
  totalAmount: number,
  fActDetailIdIndex: number,
  regDetail: RegDetail[],
}

export interface RegDetail {
  fRegName: string,
  fRegTel: string,
  fRegEmail: string,
  fRecipientAddress: string,
}

export interface ActToReg {
  actDetail: actDetail[],
  regDetail: RegDetail[],
}
