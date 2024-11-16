export interface UserProfileDTO {
  userId: number;
  // userPreferId:number;
  userNickName: string;  // 添加 userNickName 屬性
  userName: string; // 添加用戶本名
  height: number | null;  // 修改這裡以允許 null 值
  photoPath?: string; // 設置為可選屬性，因為它可能為空
  info?: string; // 設置為可選屬性
  selectedHobbies?: string[]; // 設置為可選屬性，因為它可能為空
  selectedTraits?: string[]; // 設置為可選屬性
}
