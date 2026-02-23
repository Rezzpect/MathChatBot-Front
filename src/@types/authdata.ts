export type UserAuthData = {
  email: string;
  first_name: string;
  last_name: string;
  role_name: string;
  user_id: string;
}

export interface AuthContextType {
    authData: UserAuthData | undefined,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void,
    refreshAuthData: ()=>void,
    isLoadingAuth: boolean
}