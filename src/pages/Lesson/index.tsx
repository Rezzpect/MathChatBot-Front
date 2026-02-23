import { RiArrowGoBackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import DataTable from "../../components/DataTable";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { CourseData } from "../../@types/courseData";
import TabMenu from "../../components/TabMenu/tabMenu";
import { AuthContext } from "../../contexts/authContext";
import TopicModal from "../../modals/TopicModal";
import CourseModal from "../../modals/CourseModal";
import type { TopicRowProp } from "../../@types/table";

export default function LessonPage() {
    const params = useParams();
    const [isTopicModal, setIsTopicModal] = useState<boolean>(false);
    const [isCourseModal, setIsCourseModal] = useState<boolean>(false);
    const [topicModalData, setTopicModalData] = useState<TopicRowProp | undefined>(undefined);
    const [modalOption, setModalOption] = useState<string>('edit');
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const [courseData, setCourseData] = useState<CourseData>({
        "course_id": 0,
        "course_name": "",
        "course_owner_id": "",
        "course_owner": "",
        "difficulty": "",
        "course_description": null,
        "student_amount": 0,
        "created_date": "",
        "updated_date": ""
    })
    const tab_data = [
        {
            label: "รายการหัวข้อ",
            content:
                <DataTable name="topic-list-in-course" id_key="course_id" data_id={Number(params.lessonId)} />
        },
        {
            label: "รายชื่อนักเรียน",
            content:
                <DataTable name="topic-list-in-course" id_key="course_id" data_id={Number(params.lessonId)} />
        }
    ]

    const deleteTopic = async (topic_id: string) => {
        const result = await supabaseClient.functions.invoke('delete-topic', {
            method: 'DELETE',
            body: {
                "topic_id": topic_id
            }
        })
        console.log(result);
    }

    const onOpenModal = (topicData: TopicRowProp) => {
        setModalOption('edit');
        setTopicModalData(topicData)
        console.log(topicData);
        setIsTopicModal(true);
    };

    const openCreateModal = () => {
        setModalOption('create');
        setIsTopicModal(true);
    }

    const handleDelete = async (topic_id: string) => {
        await deleteTopic(topic_id)
        setRefreshTrigger(refreshTrigger + 1);
    }

    const fetchData = async () => {
        try {
            const { data, error } = await supabaseClient.functions.invoke("course-detail", {
                'body': {
                    "course_id": params.lessonId
                }
            })

            if (error) { throw error }

            if (data) {
                console.log(data.data[0]);
                setCourseData(data.data[0]);
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-fit flex flex-col justify-center w-full items-center">
            {isCourseModal && <CourseModal
                modalData={courseData} 
                setOpen={setIsCourseModal} 
                refreshSubmit={setRefreshTrigger} 
                options="edit"
            />}
            {isTopicModal && <TopicModal
                modalData={topicModalData}
                setOpen={setIsTopicModal}
                options={modalOption}
                refreshSubmit={setRefreshTrigger} />}
            <div className="flex rounded-b-lg w-full h-[25vh] bg-primary">
                <button className=" m-5 btn btn-black btn-outline bg-white rounded-full shadow-sm">ย้อนกลับ <RiArrowGoBackFill /></button>
            </div>
            <div className="flex flex-col lg:px-50 md:px-20 px-5 w-full h-fit min-h-[500px]">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col text-primary my-8 gap-3">
                        <header className="md:text-5xl text-4xl font-bold text-shadow-lg">{courseData.course_name}</header>
                        <header className="md:text-xl text-lg font-bold text-shadow-lg">{courseData.course_owner}</header>
                    </div>
                    <button className="btn btn-primary rounded-full shadow-sm" onClick={()=>setIsCourseModal(true)}>EDIT</button>
                    <button className="btn btn-primary rounded-full shadow-sm">ลงทะเบียน<FaPlus /></button>
                </div>

                <div className="flex flex-col bg-base-300 rounded-lg shadow-sm text-base p-5 my-5">
                    <header className="md:text-2xl text-lg font-bold">เกี่ยวกับคอร์ส</header>
                    <span className="px-10 py-5 w-full">{courseData.course_description}</span>
                </div>

                <DataTable
                    name="topic-list-in-course"
                    id_key="course_id"
                    data_id={Number(params.lessonId)}
                    editScript={onOpenModal}
                    deleteScript={handleDelete}
                    extraScript={openCreateModal}
                    refreshTrigger={refreshTrigger}
                />
                {/* <TabMenu tab_data={tab_data} /> */}
            </div>
        </div>
    )
}