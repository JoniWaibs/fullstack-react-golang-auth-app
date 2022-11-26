import { HTTP_METHODS } from "../enums";

export interface UserModel {
  name: string,
  password: string,
  role: string,
  country: string
}

export interface UseRequestProps {
  url: string;
  onSucces: (data?: any) => void
  method?: HTTP_METHODS
}

export interface UserContextModel {
  users: UserModel[]
}

export interface UserContextProviderProps {
  children: JSX.Element,
}