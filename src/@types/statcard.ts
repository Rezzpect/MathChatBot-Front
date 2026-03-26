export interface StatCardProps {
    title:string;
    value:string;
    icon: React.ReactNode;
}

export interface WeeklyQuestionCount {
    day:string;
    date:number;
    count:number;
}