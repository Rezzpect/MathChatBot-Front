import type { UserAuthData } from "./authdata"
import type { CourseData, CourseForm, CourseModalData } from "./courseData";
import type { CourseRowProp, HintRowProp, TopicRowProp } from "./table";

export interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface EditModalProps extends ModalProps {
    userData: UserAuthData | undefined;
    onSubmit: (first_name:string,last_name:string)=>void;
}

export interface topicModalProps extends ModalProps {
    modalData: TopicRowProp | undefined;
    refreshSubmit: React.Dispatch<React.SetStateAction<number>>;
    options: string; 
}

export interface HintModalProps extends ModalProps {
    modalData: HintRowProp | undefined;
    refreshSubmit: React.Dispatch<React.SetStateAction<number>>;
    options: string; 
}

export interface CourseModalProps extends ModalProps {
    modalData: CourseRowProp | CourseData | undefined
    refreshSubmit: React.Dispatch<React.SetStateAction<number>>;
    options: string;
}