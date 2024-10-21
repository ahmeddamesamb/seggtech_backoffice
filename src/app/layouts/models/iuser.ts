export interface IUser {
  id?: number;
  nom: string;
  email: string;
  password: string;
  telephone: string;
  photo?: string;
  is_active?: boolean;
}
