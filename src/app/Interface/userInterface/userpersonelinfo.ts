export interface UserPersonelinfo {
  fUserEmail: string;
  fUserName: string;
  fUserPhone: string;
  fUserGender: boolean | null;
  fUserAddress: string;
  fUserBirthdate?: string;
  fUserNickName: string;
  fUserState?: string;
  fUserStateId?: number;
  fUserImage?: string;  // 新增照片路徑
}
