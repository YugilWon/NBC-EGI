export interface UserType {
  uid: string;
  email: string;
  password: string;
  nickname: string;
  profileImg: string;
}
export interface Comment {
  cid?: number;
  uid: number;
  pid: number;
  nickname: string;
  body: string;
  created_at: string;
}