import { useNavigate, useParams } from "react-router-dom";
import TabMenu from "../../components/TabMenu/tabMenu";
import ExerciseForm from "./exerciseForm";
import HintMenu from "./hintMenu";
import supabaseClient from "../../utils/SupabaseClient";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import LoadingPage from "../Loading";

export default function EditExercise() {
    const navigate = useNavigate();
    const params = useParams();
    const { authData } = useContext(AuthContext);
    const { questionId, topicId} = useParams();
    const [courseId,setCourseId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isEdit = questionId ? true : false

    // const [showAlert, setShowAlert] = useState(false);

    // const handleSave = () => {
    //     setShowAlert(true);
    // };

    const tab_data = [
        {
            label: "คำถาม", content:
                <ExerciseForm course_id={courseId}/>
        },
        {
            label: "ตัวอย่างการใบ้", content:
                <HintMenu />
        }
    ]

    return (
        <>{
            isLoading
            ? <LoadingPage/>
            : <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col gap-10 w-[60%] m-10">
                    <div className="h-fit">
                        {isEdit
                            ? <TabMenu tab_data={tab_data} />
                            : <TabMenu tab_data={[tab_data[0]]} />
                        }
                    </div>

                    <div className="flex justify-end gap-2 w-full">
                        <button className="btn bg-white text-black border border-black rounded-full" onClick={() => { navigate(`/topic/${topicId}`) }}>ย้อนกลับ</button>
                    </div>
                </div>
                {/* {showAlert && <ShowAlert message={'test'} type="success"/>} */}
            </div>
        }
        </>
    );
};