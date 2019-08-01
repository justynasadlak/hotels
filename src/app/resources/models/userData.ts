export interface UserData {
  id?: number;
  login: string;
  email: string;
  password: string;
  activated?: boolean;
  authorities?: string[];
  createdDate?: string;
  createdBy?: string;
  firstName?: string;
  imageUrl?: string;
  langKey?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  lastName?: string;
}
