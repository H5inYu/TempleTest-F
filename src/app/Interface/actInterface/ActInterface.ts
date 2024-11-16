export interface actResponse {
  data: any,
  message: string,
  status: string,
}

export interface actPagesList {
  actList: ActList[],
  pages: number,
}

export interface ActList {
  fActId: number,
  fActName: string,
  fActLocation: string,
  fRegFee: number,
  fActCategory: string,
  fActImgPath: string,
  fActImgName: string,
}

export interface actsearch {
  FActCategoryId: number,
  txtKeyword: string,
  targetPage: number
}

export interface actDetail {
  fActId: number,
  fActCategory: string,
  fActName: string,
  fActDisplayId: string,
  fActLocation: string,
  fActDescription: string,
  fRegFee: number,
  fMaxNumber: number,
  actDetailDate: Array<actDetailDate>,
  fActImgName: string,
  fUserName?: string,
  fUserEmail?: string,
}

export interface actDetailDate {
  fActDetailId: number,
  fDisplayId: string,
  dates: string,
  fStatusId: number,
}
