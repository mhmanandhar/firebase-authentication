export interface Password {
  password: string;
  confirm_password: string;
}

export interface UserModel {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}

export interface SignupModel extends UserModel, Password {}
