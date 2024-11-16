export interface UserPersonelinfoEdit {
  fUserName: string;
  fUserPhone: string;
  fUserGender: boolean | null;
  fUserAddress: string;
  fUserBirthdate?: string;
  fUserNickName: string;
  photo?: File;
}
