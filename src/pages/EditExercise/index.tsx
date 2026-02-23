import { useNavigate, useParams } from "react-router-dom";
import type { editQuestionForm } from "../../@types/question";
import TabMenu from "../../components/TabMenu/tabMenu";
import ExerciseForm from "./exerciseForm";
import DataTable from "../../components/DataTable";
import { useEffect, useState } from "react";
import supabaseClient from "../../utils/SupabaseClient";
import type { HintRowProp } from "../../@types/table";
import HintModal from "../../modals/HintModal";

export default function EditExercise() {
    const navigate = useNavigate();
    const { questionId, topicId } = useParams();
    const isEdit = questionId ? true : false

    //########## HINT SECTION ########################

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<HintRowProp | undefined>(undefined);
    const [modalOption, setModalOption] = useState<string>('edit');
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    const onEditModal = (hintData: HintRowProp) => {
        setModalOption('edit');
        setModalData(hintData)
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalOption('create');
        setIsModalOpen(true);
    }

    const deleteHint = async (hint_id:string) => {
        console.log(typeof(hint_id));
        const { error } = await supabaseClient.functions.invoke('delete-hint',{
            method:'DELETE',
            body:{
                hint_id:hint_id
            }
        })

        setRefreshTrigger(refreshTrigger+1);
    }

    //########## QUESTION SECTION ########################

    const [questionForm, setQuestionForm] = useState<editQuestionForm>({
        title: '',
        question: '',
        answer: ''
    });

    const createQuestion = async () => {
        const { error } = await supabaseClient.functions.invoke('create-question', {
            method: 'POST',
            body: {
                "topic_id": topicId,
                "title": questionForm.title,
                "question": questionForm.question,
                "answer": questionForm.answer,
                "difficulty": "Easy",
                "is_published": true,
                "tags": ["1", "2"]
            }
        })

        if (error) throw error
    }

    const editQuestion = async () => {
        const { error } = await supabaseClient.functions.invoke('edit-question', {
            method: 'PUT',
            body: {
                "question_id": questionId,
                "title": questionForm.title,
                "question": questionForm.question,
                "answer": questionForm.answer,
                "difficulty": "Easy",
                "is_published": true,
                "new_tags": [
                    "1",
                    "2"
                ]
            }
        })

        if (error) throw error
    }

    const getQuestionData = async () => {
        const { data: question_data, error: question_error } = await supabaseClient.functions.invoke('question-detail', {
            method: 'POST',
            body: {
                "question_id": questionId
            }
        })

        const { data: answer, error: answer_error } = await supabaseClient.functions.invoke('question-answer', {
            method: 'POST',
            body: {
                "question_id": questionId
            }
        })

        if (answer_error | question_error) navigate('/')
        if (question_data) {
            const QuestionData = question_data.data[0]
            setQuestionForm((prev) => ({
                ...prev,
                title: QuestionData.title,
                question: QuestionData.question,
                answer: answer.data[0].answer
            }))
        }
    }

    const handleSubmit = () => {
        if (isEdit) {
            editQuestion();
        } else createQuestion();
        navigate(`/problemselection/${topicId}`);
    }

    useEffect(() => {
        if (isEdit) {
            getQuestionData()
        }
    }, [])

    const tab_data = [
        {
            label: "Topic 1", content:
                <ExerciseForm
                    questionForm={questionForm}
                    setForm={setQuestionForm}
                />
        },
        {
            label: "Topic 2", content:
                <div className='py-5 min-h-[400px]'>
                    <DataTable
                        name="hint-list-in-question"
                        id_key="question_id"
                        data_id={Number(questionId)}
                        underline={true}
                        editScript={onEditModal}
                        deleteScript={deleteHint}
                        extraScript={openCreateModal}
                        refreshTrigger={refreshTrigger}
                    />
                </div>
        }
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            {isModalOpen && <HintModal
                modalData={modalData}
                setOpen={setIsModalOpen}
                options={modalOption}
                refreshSubmit={setRefreshTrigger} />}
            <div className="flex flex-col gap-10 w-[60%] m-10">
                <div className="h-fit">
                    <TabMenu tab_data={tab_data} />
                </div>

                <div className="flex justify-end gap-2 w-full">
                    <button className="btn bg-primary text-primary-content rounded-full">เผยแผร่</button>
                    <button className="btn bg-primary text-primary-content rounded-full" onClick={handleSubmit}>บันทึก</button>
                </div>
            </div>

        </div>
    );
};