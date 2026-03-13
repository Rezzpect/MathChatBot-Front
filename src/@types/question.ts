import type { UploadedImage } from "./richeditor";

export interface QuestionData {
    question_id: number;
    topic_id: string;
    title: string;
    question: string;
    difficulty: string;
    tag_names: string[];
    is_published: boolean;
    created_date: string;
    updated_date: string;
}

export interface QuestionPanelProp {
    question_id?: number;
    title?: string;
    question?: string;
    setWrongModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCompleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadingQuestion: boolean;
}

export type QuestionForm = {
    title: string,
    question: string,
    answer: string,
    tags: string[],
    is_published: boolean,
    difficulty: string
}

export type QuestionFormValidate = {
    title: string,
    answer: string
}

export type QuestionFormProps = {
    questionForm: QuestionForm,
    setForm: React.Dispatch<React.SetStateAction<QuestionForm>>
    formError: Partial<QuestionForm>
    uploadedImages: UploadedImage[],
    setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>
}