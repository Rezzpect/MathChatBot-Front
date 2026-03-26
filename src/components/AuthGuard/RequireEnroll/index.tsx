import { useContext, useEffect, useState } from "react";
import type { JSX } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
import toast from "react-hot-toast";
import supabaseClient from "../../../utils/SupabaseClient";
import LoadingPage from "../../../pages/Loading";

export function RequireEnroll({ children }: {
    children: JSX.Element
}) {
    const { authData } = useContext(AuthContext);
    const [isChecking, setIsChecking] = useState(true);
    const [enrollStatus,setEnrollStatus] = useState<boolean>(false);
    const user_role = authData?.role_name
    const { courseId, topicId, questionId } = useParams();

    useEffect(() => {
        const checkEnroll = async () => {
            if (authData?.role_name === 'admin'){ 
                setIsChecking(false);
                return
            };
            try {
                let course_id = courseId;
                if (!course_id && topicId) {
                    const { data, error } = await supabaseClient.functions.invoke('topic-detail', {
                        method: 'POST',
                        body: {
                            topic_id: topicId
                        }
                    })

                    if (error || data.data[0].length === 0) throw error;
                    if (data) {
                        const topic_data = data.data[0]
                        course_id = topic_data.course_id
                    }
                }

                if (!course_id && questionId) {
                    const { data, error } = await supabaseClient.functions.invoke('question-detail', {
                        method: 'POST',
                        body: {
                            question_id: questionId
                        }
                    })

                    if (error || data.data[0].length === 0) throw error;
                    if (data) {
                        const question_data = data.data[0]
                        course_id = question_data.course_id
                    }
                }

                const { data, error } = await supabaseClient.functions.invoke('can-enroll', {
                    method: 'POST',
                    body: {
                        course_id: course_id
                    }
                });

                if (error) throw error
                if (data) {
                    setEnrollStatus(!data.data);
                }

            } catch (error) {
                toast.error('Something went wrong');
                return <Navigate to='/' replace={true} />
            } finally {
                setIsChecking(false);
            }
        }

        checkEnroll();
        
    }, [])

    if (isChecking) {
        return <LoadingPage/>
    }

    if (user_role === 'admin' || enrollStatus) {
        return children
    } else{ 
        toast.error('You need to enroll the course first!');
        return <Navigate to={'/'} replace /> 
    }
}