import type { CourseData } from "./courseData";
import type { EventItems } from "./event";
import type { PlanData } from "./studyplan";
import type { HintRowProp, TopicRowProp } from "./table";

export interface ModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export interface ProfileModalProps extends ModalProps {
    pictureUrl:string;
}

export interface topicModalProps extends ModalProps {
    modalData?: TopicRowProp;
    refreshSubmit: React.Dispatch<React.SetStateAction<number>>;
    options: string;
}

export interface HintModalProps extends ModalProps {
    modalData?: HintRowProp;
    refreshSubmit: React.Dispatch<React.SetStateAction<number>>;
    options: string;
}

export interface CourseModalProps extends ModalProps {
    modalData?: CourseData
    refreshSubmit: React.Dispatch<React.SetStateAction<number>>;
    bannerUrl?: string | undefined;
}

export interface EventModalProps extends ModalProps {
    modalData: EventItems
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export interface PlanlistModalProps extends ModalProps {
    modalData? :PlanData
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export interface DeleteWarningProps extends ModalProps {
    body:Record<string, string>
    funcName:string;
    message:string;
    method?:"DELETE" | "POST" | "GET" | "PUT" | "PATCH";
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export interface QuestionCompleteModalProps extends ModalProps {
    topicId: string | undefined;
}