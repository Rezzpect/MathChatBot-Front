import { useNavigate, useParams } from "react-router-dom";
import TabMenu from "../../components/TabMenu/tabMenu";
import ExerciseForm from "./exerciseForm";
import HintMenu from "./hintMenu";
import { useMemo } from "react";

export default function EditExercise() {
    const navigate = useNavigate();
    const { questionId, topicId } = useParams();
    const isEdit = useMemo(() => { return Boolean(questionId) }, []);

    const tab_data = [
        {
            label: "คำถาม", content:
                <ExerciseForm />
        },
        {
            label: "ตัวอย่างการใบ้", content:
                <HintMenu />
        }
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col gap-10 lg:mx-50 md:mx-20 mx-5 my-10">
                <div className="h-fit md:w-200 w-full">
                    {isEdit
                        ? <TabMenu tab_data={tab_data} />
                        : <TabMenu tab_data={[tab_data[0]]} />
                    }
                </div>

                <div className="flex justify-end gap-2 w-full">
                    <button className="btn bg-white text-black border border-black rounded-full" onClick={() => { navigate(`/topic/${topicId}`) }}>ย้อนกลับ</button>
                </div>
            </div>
        </div>

    );
};