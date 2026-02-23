import { createContext, useEffect, useState } from "react";
import supabaseClient from "../utils/SupabaseClient";
import type { AuthContextType, UserAuthData } from "../@types/authdata";

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authData, setAuthData] = useState<UserAuthData | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

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
        setAuthData(null);

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
            setAuthData(data.data[0]);
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
                setAuthData(null);
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