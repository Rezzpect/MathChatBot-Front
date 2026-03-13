import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabaseClient from "../../utils/SupabaseClient";
import type { TopicData } from "../../@types/topic";
import QuestionTable from "../../components/Tables/QuestionTable";
import LoadingPage from "../Loading";
import toast from "react-hot-toast";

export default function TopicPage() {
    const params = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [topicData, setTopicData] = useState<TopicData>({
        course_id: 0,
        course_name: '',
        course_owner: '',
        course_owner_id: '',
        created_date: '',
        edit_permission: false,
        topic_description: '',
        topic_id: 0,
        topic_name: '',
        updated_date: '',
    })

    const getFile = async (course_id:string,banner_name: string) => {
        const { data } = supabaseClient.storage.from('course_banner').getPublicUrl(course_id + banner_name);

        if (data) {
            setBannerUrl(data.publicUrl);
        }
    }

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('topic-detail', {
                method: 'POST',
                body: {
                    topic_id: params.topicId
                }
            })
            if (error || data.data[0].length===0) throw error;
            

            if (data) {
                const topic_data = data.data[0]
                console.log(topic_data);
                const banner_name = topic_data.course_banner_picture;
                if (banner_name) getFile(topic_data.course_id,banner_name);
                setTopicData(data.data[0]);
            }
            
            setIsLoading(false);
        } catch (error) {
            navigate('/',{replace:true})
            throw error
        }

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>{
            isLoading
                ? <LoadingPage />
                : <div className="h-[calc(100vh-65px)] min-h-fit flex flex-col justify-center items-center">

                    <div className="flex flex-col lg:px-50 md:px-20 px-5 w-full h-fit min-h-[500px]">
                        <div className="relative rounded-b-lg w-full h-[12rem] bg-primary overflow-hidden">
                            {
                                bannerUrl && <img src={bannerUrl} className=" absolute h-full w-full" />
                            }
                            <button
                                onClick={() => navigate('/course/' + topicData.course_id)}
                                className="absolute m-5 btn btn-black btn-outline bg-white rounded-full shadow-sm">
                                ย้อนกลับ <RiArrowGoBackFill />
                            </button>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col text-primary my-8 gap-3">
                                <header className="text-xl font-bold text-shadow-lg">{topicData.course_name}</header>
                                <header className="text-5xl font-bold text-shadow-lg">{topicData.topic_name}</header>
                                <header className="text-xl font-bold text-shadow-lg">{topicData.course_owner}</header>
                            </div>
                        </div>

                        <div className="flex flex-col bg-base-300 rounded-lg shadow-sm text-base p-5 my-5">
                            <header className="text-xl font-bold">{topicData.topic_name}</header>
                            <span className="px-10 py-5 w-full">{topicData.topic_description}</span>
                        </div>

                        <QuestionTable
                            topic_id={params.topicId}
                            edit_permission={topicData.edit_permission}
                        />
                    </div>
                </div>
        }
        </>

    )
}