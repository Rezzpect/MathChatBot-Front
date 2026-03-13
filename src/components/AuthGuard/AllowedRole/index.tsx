import { useContext, useEffect, useState} from "react";
import type { JSX } from "react"; 
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
import toast from "react-hot-toast";
import supabaseClient from "../../../utils/SupabaseClient";
import LoadingPage from "../../../pages/Loading";

export function AllowedRoles({ allowed_role, checkPerm = false, children }: {
    allowed_role: string[],
    checkPerm?: boolean
    children: JSX.Element
}) {
    const { authData, isLoadingAuth } = useContext(AuthContext);
    const [isChecking, setIsChecking] = useState(false);
    const [permission,setPermission] = useState<boolean>(false);
    const user_role = authData?.role_name
    const params = useParams();

    useEffect(() => {
        const checkPermission = async () => {
            setIsChecking(true);
            try {
                const { data, error } = await supabaseClient.functions.invoke('topic-detail', {
                    method: 'POST',
                    body: {
                        topic_id: params.topicId
                    }
                })

                if (error) {
                    throw error
                }

                if (data.data.length === 0) {
                    return setPermission(false);
                }

                if (data.data.length !== 0) {
                    const topic_data = data.data[0]
                    if (topic_data.course_owner_id !== authData?.user_id && authData?.role_name !== 'admin') {
                        toast.success('Perm checked!')
                        setPermission(true);
                    }
                }

            } catch (error) {
                toast.error('Something went wrong');
                setPermission(false);
            }finally{
                setIsChecking(false);
            }
        }
        if (!checkPerm) return
        checkPermission();
    }, [authData])

    if (isLoadingAuth || isChecking) {
        console.log(isLoadingAuth)
        return <LoadingPage />
    }

    if (!user_role) {
        return <Navigate to={'/login'} replace />
    }

    if (checkPerm && !permission){
        return <Navigate to={'/'} replace />
    }

    if (allowed_role.includes(user_role)) {
        return children
    } else return <Navigate to={'/'} replace />
}