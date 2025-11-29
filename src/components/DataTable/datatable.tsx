import { useState, useEffect } from "react";
import {topic_data } from "./topic_data";
import type { topic_row } from "./topic_data";
import {exercise_data} from "./exercise_data";
import type { exercise_row } from "./exercise_data";

interface Content_Data {
    header: Array<string>;
    data: Array<topic_row> | Array<exercise_row>;
}

export default function DataTable({ name }: { name: string }) {
    const [getData, setData] = useState<Content_Data>({
        header: [],
        data: []
    });

    useEffect(() => {
        if (name === "topic") {
            setData(topic_data);
        } else if (name === "exercise") {
            setData(exercise_data);
        };
    },[])


    return (
        <div>
            <div className="flex flex-col flex-1 w-full h-full py-5 text-neutral-content">
                <header className="text-xl font-bold pb-5">โจทย์ปัญหา</header>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-base-300 text-base-content w-full">
                                {getData.header.map((title, index) => {
                                    return index === 0 ? (
                                        <th className="rounded-l-xl">{title}</th>
                                    ) : index === (getData.header.length - 1) ? (
                                        <th className="rounded-r-xl">{title}</th>
                                    ) : (<th>{title}</th>)
                                }
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {getData.data.map((course) =>
                                <tr className="border-0">
                                    {Object.values(course).map((value) =>
                                    <td>{value}</td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-center mb-5">
                <div className="flex join justify-center items-center gap-2 font-bold">
                    <button className="join-item w-fit h-fit hover:cursor-pointer p-3">«</button>
                    <button className="join-item text-xs bg-primary text-primary-content  rounded-lg h-7 w-7">1</button>
                    <button className="join-item text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-content rounded-lg h-7 w-7">2</button>
                    <button className="join-item text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-content rounded-lg h-7 w-7">3</button>
                    <button className="join-item w-fit h-fit hover:cursor-pointer p-3">»</button>
                </div>
            </div>
        </div>
    );
} 