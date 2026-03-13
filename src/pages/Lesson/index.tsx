import { RiArrowGoBackFill } from "react-icons/ri";
import { FaBook, FaBookOpen, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { CourseData } from "../../@types/courseData";
import CourseModal from "../../modals/CourseModal";
import TabMenu from "../../components/TabMenu/tabMenu";
import DocumentTable from "../../components/Tables/DocumentInCourseTable";
import StudentListTable from "../../components/Tables/StudentInCourseTable";
import TopicTable from "../../components/Tables/TopicTable";
import { AuthContext } from "../../contexts/authContext";
import LoadingPage from "../Loading";

export default function LessonPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);
    const [isCourseModal, setIsCourseModal] = useState<boolean>(false);
    const [isUploadModal, setIsUploadModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [enrollStatus, setEnrollStatus] = useState<boolean>(false);

    const [refreshPage, setRefreshPage] = useState<number>(0);

    const [bannerUrl, setBannerUrl] = useState<string>('https://img.freepik.com/premium-photo/purple-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-57975.jpg');

    const [courseData, setCourseData] = useState<CourseData>({
        "course_id": 0,
        "course_name": "",
        "course_owner_id": "",
        "course_owner": "",
        "difficulty": "",
        "course_description": null,
        "edit_permission": false,
        "is_published": false,
        "student_amount": 0,
        "created_date": "",
        "updated_date": "",
        "banner_picture": null
    })

    const getEnrolledStatus = async () => {
        const { data, error } = await supabaseClient.functions.invoke('can-enroll', {
            method: 'POST',
            body: {
                course_id: params.lessonId
            }
        });

        if (error) throw error
        if (data) {
            setEnrollStatus(data.data);
        }
    }


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke("course-detail", {
                'body': {
                    "course_id": params.lessonId
                }
            })

            if (error) { throw error }

            if (data) {
                setCourseData(data.data[0]);

                const banner_name = data.data[0].banner_picture;
                if (banner_name) getFile(banner_name);
                await getEnrolledStatus();
            }


        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const getFile = async (banner_name: string) => {
        const { data } = supabaseClient.storage.from('course_banner').getPublicUrl(params.lessonId + banner_name);

        if (data) {
            setBannerUrl(data.publicUrl);
        }
    }

    const enrollCourse = async () => {
        const { data, error } = await supabaseClient.functions.invoke('enroll-course', {
            method: 'POST',
            body: {
                course_id: params.lessonId
            }
        }
        )

        if (error) throw error
        if (data) {
            console.log(data);
            await getEnrolledStatus();
        }
    }

    const tab_data = [
        {
            label: "รายการหัวข้อ",
            content:
                <TopicTable
                    course_id={params.lessonId}
                    edit_permission={courseData.edit_permission}
                />
        },
        {
            label: "รายชื่อนักเรียน",
            content:
                <StudentListTable course_id={params.lessonId} />

        },
        {
            label: "Document",
            content:
                <DocumentTable
                    course_id={params.lessonId}
                    isModal={isUploadModal}
                    setModal={setIsUploadModal}
                    edit_permission={courseData.edit_permission}
                />

        }
    ]

    useEffect(() => {
        fetchData();
    }, [refreshPage]);

    useEffect(() => {
        getEnrolledStatus();
    }, [])

    return (<>
        {isLoading ?
            <LoadingPage />
            : <div className="min-h-fit flex flex-col justify-center w-full items-center">
                {courseData.edit_permission && isCourseModal && <CourseModal
                    modalData={courseData}
                    setOpen={setIsCourseModal}
                    refreshSubmit={setRefreshPage}
                    bannerUrl={bannerUrl}
                />}

                <div className="flex flex-col lg:px-50 md:px-20 px-5 w-full h-fit min-h-[500px]">
                    <div className="relative rounded-b-lg w-full h-[12rem] bg-primary overflow-hidden">
                        {
                            bannerUrl && <img src={bannerUrl} className=" absolute h-full w-full" />
                        }
                        <button
                            onClick={() => navigate('/')}
                            className="absolute m-5 btn btn-black btn-outline bg-white rounded-full shadow-sm">
                            ย้อนกลับ <RiArrowGoBackFill />
                        </button>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col text-primary my-8 gap-3">
                            <div className="flex gap-2 items-baseline">
                                <header className="md:text-5xl text-4xl font-bold text-shadow-lg">{courseData.course_name}</header>
                                {/* {courseData.is_published && <FaBookOpen/>} */}
                            </div>
                            <header className="md:text-xl text-lg font-bold text-shadow-lg">{courseData.course_owner}</header>
                        </div>

                    </div>

                    <div className="w-full h-fit flex flex-col">


                        {authData &&
                            <div className="w-full flex justify-end gap-2">
                                {courseData.edit_permission
                                    ? <>
                                        <button className="btn btn-primary rounded-full shadow-sm" onClick={() => setIsCourseModal(true)}>EDIT</button>
                                        <button className="btn btn-primary rounded-full shadow-sm" onClick={() => navigate('./planlists')}>StudyPlan</button>
                                    </>
                                    :authData.role_name === 'student'
                                    ? <>
                                        {enrollStatus
                                            ? <button className="btn btn-primary rounded-full shadow-sm" onClick={() => enrollCourse()}>ลงทะเบียน<FaPlus /></button>
                                            : <button className="btn btn-primary rounded-full shadow-sm" onClick={getEnrolledStatus}>ถอนลงทะเบียน<FaMinus /></button>

                                        }
                                    </>
                                    :<></>
                                }
                            </div>
                        }

                        <div className="flex flex-col bg-base-300 rounded-lg shadow-sm text-base p-5 my-5">
                            <header className="md:text-2xl text-lg font-bold">เกี่ยวกับคอร์ส</header>
                            <span className="px-10 py-5 w-full">{courseData.course_description}</span>
                        </div>
                    </div>

                    {
                        courseData.edit_permission
                            ? <TabMenu tab_data={tab_data} />
                            : <TabMenu tab_data={[tab_data[0]]} />
                    }

                </div>
            </div >}
    </>
    )
}