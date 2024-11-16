export interface UserProfileDisplayDTO {
  userId: number; // 添加 id 屬性
  userNickName: string;        // 昵稱
  age?: number;                // 年齡（可為空）
  gender: string;              // 性別
  height?: number;             // 身高（可為空）
  hobbies: string[];           // 興趣列表
  traits: string[];            // 特質列表
  bio: string;                 // 自我介紹
  fPhotoPath: string;          // 圖片路徑
  base64ImageData: string;     // Base64 圖片數據
}
