export interface UserLogin {
  FUserEmail: string;
  FUserPassword: string;
}

export interface LoginResponse {
  userId: number;
  token: string;
  message: string;
}
