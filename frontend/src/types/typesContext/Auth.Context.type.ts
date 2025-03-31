import { LoginForm } from "../typesFetch/Login.Form.Type";
import { RegisterForm } from "../typesFetch/Register.Form.Type";

interface User {
  id: string;
  email: string;
  role: string;
}

export type AuthContextType = {
  login: (data: LoginForm) => Promise<boolean>;
  register: (data: RegisterForm) => Promise<boolean>;
  isAuthenticated: boolean;
  userLogged: User | null;
  isLoading: boolean;
};
