import { useEffect, useState } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import type { CourseData } from "../../@types/courseData";
import { RiArrowGoBackFill } from "react-icons/ri";
import PlanListModal from "../../modals/StudyPlanModal";
import type { PlanData } from "../../@types/studyplan";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteModal from "../../modals/DeleteModal";

export default function PlanListPage({ }
) {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [isEditPlanModal, setEditPlanModal] = useState<boolean>(false);
    const [isCreatePlanModal, setCreatePlanModal] = useState<boolean>(false);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const [bannerUrl, setBannerUrl] = useState<string>('https://img.freepik.com/premium-photo/purple-background-simple-empty-backdrop-various-design-works-with-copy-space-text-images_7954-57975.jpg');
    const [planList, setPlanList] = useState<PlanData[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0)
    const [modalData, setModalData] = useState<PlanData | undefined>();
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

    const fetchData = async () => {
        try {
            const { data, error } = await supabaseClient.functions.invoke("course-detail", {
                'body': {
                    "course_id": courseId
                }
            })

            if (error) { throw error }

            if (data) {
                const course_data: CourseData = data.data[0]
                if (!course_data.edit_permission) {
                    navigate('/', { replace: true })
                    return
                }
                setCourseData(data.data[0]);
                const banner_name = data.data[0].banner_picture;
                if (banner_name) getFile(banner_name);

            }
        } catch (error) {
            throw error
        }
    }

    const fetchPlan = async () => {
        try {
            const { data, error } = await supabaseClient.functions.invoke("teacher-study-plan-list", {
                'body': {
                    "course_id": courseId
                }
            })

            if (error) { throw error }

            if (data) {
                setPlanList(data.data);
            }
        } catch (error) {
            throw error
        }
    }

    const getFile = async (banner_name: string) => {
        const { data } = supabaseClient.storage.from('course_banner').getPublicUrl(courseId + banner_name);

        if (data) {
            setBannerUrl(data.publicUrl);
        }
    }

    const openEdit = (plan_data: PlanData) => {
        setModalData(plan_data);
        setEditPlanModal(true);
    }

    const openDelete = (plan_data: PlanData) => {
        setModalData(plan_data);
        setIsDeleteModal(true);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchPlan();
    }, [refreshTrigger])

    return (
        <div className="min-h-fit flex flex-col justify-center w-full items-center mb-20">
            {isEditPlanModal &&
                <PlanListModal modalData={modalData} setRefresh={setRefreshTrigger} setOpen={setEditPlanModal} />
            }
            {isCreatePlanModal &&
                <PlanListModal setRefresh={setRefreshTrigger} setOpen={setCreatePlanModal} />
            }
            {
                isDeleteModal &&
                <DeleteModal
                    body={{
                        course_id: String(courseData.course_id),
                        topic_id: String(modalData?.topic_id)
                    }}
                    funcName="delete-study-plan"
                    message="หากดำเนินการต่อ แผนการเรียนนี้จะถูกลบให้กับนักเรียนทุกคนและจะไม่สามารถกู้คืนได้"
                    setOpen={setIsDeleteModal}
                    setRefresh={setRefreshTrigger}
                />
            }
            <div className="flex flex-col lg:px-50 md:px-20 px-5 w-full h-fit min-h-[500px] gap-5">
                <div className="relative rounded-b-lg w-full h-[12rem] bg-primary overflow-hidden">
                    {
                        bannerUrl && <img src={bannerUrl} className=" absolute h-full w-full" />
                    }
                    <button
                        onClick={() => navigate('/course/' + courseId)}
                        className="absolute m-5 btn btn-black btn-outline bg-white rounded-full shadow-sm">
                        ย้อนกลับ <RiArrowGoBackFill />
                    </button>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col text-primary my-8 gap-3">
                        <header className="md:text-5xl text-4xl font-bold text-shadow-lg">{courseData.course_name}</header>
                        <header className="md:text-xl text-lg font-bold text-shadow-lg">{courseData.course_owner}</header>
                    </div>

                </div>
                <section className="flex justify-between w-full">
                    <header className="text-2xl font-bold">Study Plans</header>
                    <button className="btn btn-primary text-primary-content p-2 font-bold rounded-full" onClick={() => setCreatePlanModal(true)}>Create +</button>
                </section>

                <div className="flex flex-col h-fit gap-2 w-full">
                    {planList.map((data, index) => (
                        <div className="flex md:flex-row flex-col gap-2 justify-between md:items-center relative items-baseline border border-neutral rounded-lg p-5 hover:cursor-pointer">
                            <div className="flex flex-col">
                                <header className="line-clamp-1 font-bold">{data.course_name}</header>
                                <p>{data.topic_name}</p>
                            </div>
                            <div className="flex items-center gap-2 md:w-fit w-full">
                                <div className="flex flex-col p-2 md:w-fit w-[70%] items-center bg-neutral rounded-lg">
                                    <header className="text-sm font-bold">วันเริ่ม</header>
                                    {data.start_day === 1?'วันแรกที่ลงทะเบียน':`วันที่ ${data.start_day} หลังจากการทะเบียน`} 
                                </div>
                                <div className="flex flex-col p-2 items-center bg-neutral md:w-fit w-[30%] rounded-lg">
                                    <header className="text-sm font-bold">ระยะเวลา</header>
                                    {data.day_todo} วัน
                                </div>
                                <div onClick={(e) => e.stopPropagation()} className="dropdown dropdown-end md:static absolute right-5 top-5">
                                    <div tabIndex={0} className="text-xl h-full w-full hover:cursor-pointer hover:text-primary text-neutral-content"><BsThreeDotsVertical /></div>
                                    <ul id={`manage-dropdown-${index}`} tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li>
                                            <div className="text-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    document.getElementById(`manage-dropdown-${index}`)?.blur();
                                                    openEdit(data);
                                                }}>edit
                                            </div>
                                        </li>
                                        <li>
                                            <div className="text-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    document.getElementById(`manage-dropdown-${index}`)?.blur();
                                                    openDelete(data);
                                                }}>delete
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}