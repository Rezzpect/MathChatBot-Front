import TabMenu from "../../components/TabMenu/tabMenu";
import ExerciseForm from "./exerciseForm";
import HintMenu from "./hintMenu";

export default function EditExercise() {

    const tab_data = [
        { label: "Topic 1", content: <ExerciseForm /> },
        { label: "Topic 2", content: <HintMenu /> }
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col gap-10 w-[60%] m-10">
                <div className="h-fit">
                    <TabMenu tab_data={tab_data} />
                </div>

                <div className="flex justify-end gap-2 w-full">
                    <button className="btn bg-primary text-primary-content rounded-full">เผยแผร่</button>
                    <button className="btn bg-primary text-primary-content rounded-full">บันทึก</button>
                </div>
            </div>

        </div>
    );
};