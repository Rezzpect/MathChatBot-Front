import { createContext, useEffect, useState } from "react";
import supabaseClient from "../utils/SupabaseClient";
import type { AuthContextType, UserAuthData } from "../@types/authdata";

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authData, setAuthData] = useState<UserAuthData | undefined>(undefined);
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

    // const sendFile = async () => {
    //     const { data, error } = await supabaseClient.storage.from('profile_image').upload(authData?.user_id + '/' + 'profile', file[0], {
    //         upsert:true
    //     })

    //     if (error) console.log(error);
    //     if (data) getFile();
    // }

    // const getFile = async (user_id:string) => {
    //     const { data } = supabaseClient.storage.from('profile_image').getPublicUrl(user_id + '/' + 'profile',)

    //     if (data)
    //         console.log(data.publicUrl); 
    //         return data.publicUrl+ `?t=${Date.now()}`;
    // }

    const login = async (email: string, password: string) => {
        setIsLoadingAuth(true);
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword(
                {
                    email: email,
                    password: password,
                }
            )
            if (error) { throw error }

            if (data) getUserData(data.user.id);
            window.location.href = "/";
        } catch (error) {
            throw error
        }
        setIsLoadingAuth(false);
    }

    const logout = async () => {
        const { error } = await supabaseClient.auth.signOut()
        if (error) throw error
        setAuthData(undefined);

        window.location.href = "/";
    }

    const getUserData = async (user_id: string) => {
        const { data, error } = await supabaseClient.functions.invoke("user-profile", {
            'body': {
                "user_id": user_id
            }
        }
        )

        if (error) { throw error }

        if (data && (data.data.length != 0)) {
            const user_data = data.data[0]
            // const profile_image = await getFile(user_data.user_id);

            setAuthData({...user_data});
        } else { throw new Error('404 User not found') }
    }

    const refreshAuthData = async () => {
        setIsLoadingAuth(true);
        try {
            const { data, error } = await supabaseClient.auth.getClaims();
            if (error) {throw error;}

            if (data) {
                await getUserData(data.claims.sub);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingAuth(false);
        }
    }

    useEffect(() => {
        refreshAuthData();
    }, [])

    useEffect(() => {
        const { data: auth_listener } = supabaseClient.auth.onAuthStateChange((
            event, session
        ) => {
            console.log(`ALERT EVENT : ${event}`)
            if (session?.user) {
                getUserData(session.user.id);
            } else {
                setAuthData(undefined);
            }
        })

        return () => auth_listener.subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ authData, login, logout, refreshAuthData, isLoadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}