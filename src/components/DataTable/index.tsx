import { useState, useEffect } from "react";
import { exerciseTableConfig, hintTableConfig, skeltonTableConfig, topicTableConfig } from "./tableconfig";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../../utils/SupabaseClient";
import type { TableConfig } from "../../@types/table";
import type { PageReqWithId, IdKey, DataTableProps } from "../../@types/table";

function BuildReqBody<K extends IdKey>(
    idKey: K,
    idValue: number,
    studentId: string,
    currentPage: number,
    pagesSize: number
): PageReqWithId<K> {
    return {
        [idKey]: idValue,
        user_id: studentId,
        current_page: currentPage,
        page_size: pagesSize,
    } as PageReqWithId<K>
}

export default function DataTable<K extends IdKey>({
    name,
    id_key,
    data_id,
    underline = false,
}: DataTableProps<K>) {
    const [getData, setData] = useState<Array<Record<string, any>>>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [config, setConfig] = useState<TableConfig<any>>(skeltonTableConfig);
    const itemsPerPage = 6;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const fetchData = async () => {
        const req_body = BuildReqBody(
            id_key,
            data_id,
            "72b50802-70d2-4368-a6cf-f21a10fd59c7",
            currentPage,
            itemsPerPage
        )

        console.log(req_body)

        const { data, error } = await supabaseClient.functions.invoke(name, {
            "body":
                req_body
        });

        if (data) {
            console.log(data.data);
            setData(data.data.items);
            setTotalPages(data.data.total_pages);
        } else { console.log(error) }
    }

    const hint_list = [
        {
            example_question: ['a', 'b', 'c'],
            hint: 'lorem man'
        },
        {
            example_question: ['a', 'b', 'c'],
            hint: 'lorem man'
        }
    ];

    useEffect(() => {
        if (name === "topic-list-in-course") {
            fetchData();
            setConfig(topicTableConfig);
        } else if (name === "question-list-in-topic") {
            fetchData();
            setConfig(exerciseTableConfig);
        } else if (name === "hint-list-in-question") {
            setData(hint_list);
            setTotalPages(10);
            setConfig(hintTableConfig);
        };


    }, [currentPage])

    const visibleCol = config?.columns.filter(col => col.display !== false)
    const navigate = useNavigate();
    const showEdit = Boolean(config?.editOption)
    const showDelete = Boolean(config?.deleteOption)
    const showAction = config?.editOption || config?.deleteOption
    const showExtra = Boolean(config?.extraOption)

    return (
        <div>
            <div className="flex flex-col flex-1 w-full h-[400px] py-5 text-neutral-content">
                <div className="flex justify-between items-center mb-5">
                    <header className="text-xl font-bold">{config.title}</header>
                    {showExtra &&
                        <div>
                            <button className="btn bg-primary text-primary-content rounded-full">Extra Button+</button>
                        </div>}
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-base-300 text-base-content w-full">
                                {visibleCol?.map((col, index) => {
                                    return index === 0 ? (
                                        <th className="rounded-l-xl" style={{ width: col.width }} key={`header-${index}`}>{col.header}</th>
                                    ) : index === (visibleCol.length - 1) && !(config.deleteOption || config.editOption) ? (
                                        <th className="rounded-r-xl" style={{ width: col.width }} key={`header-${index}`}>{col.header}</th>
                                    ) : (<th style={{ width: col.width }}>{col.header}</th>)
                                }
                                )}

                                {showAction && (
                                    <th className="rounded-r-xl" style={{ width: '100px' }}>
                                        การจัดการ
                                    </th>
                                )}

                            </tr>
                        </thead>

                        <tbody>
                            {getData?.map((row) =>
                                <tr className={` ${config?.navDest === '' ? '' : 'hover:cursor-pointer hover:bg-base-300'}`}

                                    onClick={config?.navDest !== '' ? () => navigate(`${config?.navDest}${row[config?.rowIdKey]}`) : undefined}
                                    key={`row-${row[config?.rowIdKey]}`}
                                    style={underline ? { "borderBottom": "1px solid black" } : {}}
                                >
                                    {
                                        visibleCol?.map((col) =>
                                            <td>{row[col.key as string]}</td>
                                        )
                                    }
                                    {showAction && <td className="flex">
                                        {showEdit && (

                                            <div>
                                                <button className="btn bg-primary text-primary-content">edit</button>
                                            </div>
                                        )}

                                        {showDelete && (
                                            <div>
                                                <button className="btn bg-primary text-primary-content">delete</button>
                                            </div>

                                        )}
                                    </td>}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-center mb-5">
                <div className="flex join justify-center items-center gap-2 font-bold">
                    <button className="join-item w-fit h-fit hover:cursor-pointer p-3 disabled:cursor-default disabled:border-0"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || totalPages === 1}
                    >«</button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                            <button
                                key={`page-${pageNum}`}
                                className={`join-item text-xs rounded-lg h-7 w-7 ${currentPage === pageNum
                                    ? 'bg-primary text-primary-content'
                                    : 'hover:cursor-pointer hover:bg-primary hover:text-primary-content'
                                    }`}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button className="join-item w-fit h-fit hover:cursor-pointer p-3 disabled:cursor-default disabled:border-0"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 1}
                    >»</button>
                </div>
            </div>
        </div>
    );
} 