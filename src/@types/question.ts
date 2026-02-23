export interface QuestionData {
    question_id: number;
    title: string;
    question: string;
    difficulty: string;
    tag_names: string[];
    created_date: string,
    updated_date: string
}

export interface QuestionPanelProp {
    question_id?: number;
    title?: string;
    question?: string;
    setWrongModal:React.Dispatch<React.SetStateAction<boolean>>;
    setCompleteModal:React.Dispatch<React.SetStateAction<boolean>>
}

export type editQuestionForm = {
    title: string,
    question: string,
    answer: string,
}

export type editQuestionProps = {
    questionForm: editQuestionForm,
    setForm: React.Dispatch<React.SetStateAction<editQuestionForm>>
}