import type { WeeklyQuestionCount } from "./statcard";

export type UserAuthData = {
  email: string;
  first_name: string;
  last_name: string;
  role_name: string;
  user_id: string;
  profile_picture:string;
  week_status: WeeklyQuestionCount[];
}
export interface UserFormData {
    first_name: string,
    last_name: string,
    email: string,
    profile_picture: string | null,
    picture_url: string,
    user_id:string
}

export interface AuthContextType {
    authData: UserAuthData | undefined,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void,
    refreshAuthData: ()=>void,
    isLoadingAuth: boolean
}