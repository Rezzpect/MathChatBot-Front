import { useState, useEffect, useContext } from "react";
import { questionTableConfig, hintTableConfig, skeltonTableConfig, teacherCourseTableConfig, topicTableConfig } from "./tableconfig";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../../utils/SupabaseClient";
import type { TableConfig } from "../../@types/table";
import type { PageReqWithId, IdKey, DataTableProps } from "../../@types/table";

function BuildReqBody<K extends IdKey>(
    idKey: K,
    idValue: number | string,
    currentPage: number,
    pagesSize: number
): PageReqWithId<K> {
    return {
        [idKey]: idValue,
        current_page: currentPage,
        page_size: pagesSize,
    } as PageReqWithId<K>
}

export default function DataTable<K extends IdKey>({
    name,
    id_key,
    data_id,
    underline = false,
    editScript,
    deleteScript,
    extraScript,
    refreshTrigger = 0
}: DataTableProps<K>) {
    const [tableData, setTableData] = useState<Array<Record<string, any>>>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [config, setConfig] = useState<TableConfig<any>>(skeltonTableConfig);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const fetchData = async (itemsPerPage = 6) => {
        setIsLoading(true);
        try {
            const req_body = BuildReqBody(
                id_key,
                data_id,
                currentPage,
                itemsPerPage
            )

            const { data, error } = await supabaseClient.functions.invoke(name, {
                "body":
                    req_body
            });

            if (data) {
                setTableData(data.data.items);
                console.log(data.data.items)
                setTotalPages(data.data.total_pages);
            } else throw new Error(error)
        }catch(error) {
            throw error
        }finally {
            setIsLoading(false);
        }
        
    }

    useEffect(() => {
        if (name === "topic-list-in-course") {
            fetchData();
            setConfig(topicTableConfig);
        } else if (name === "question-list-in-topic") {
            fetchData();
            setConfig(questionTableConfig);
        } else if (name === "hint-list-in-question") {
            fetchData();
            setConfig(hintTableConfig);
        }else if (name === "teacher-course-list") {
            fetchData();
            setConfig(teacherCourseTableConfig);
        };

    }, [currentPage])

    useEffect(()=>{
        fetchData();
        setCurrentPage(1);
    },[refreshTrigger])

    const visibleCol = config.columns.filter(col => col.display !== false)
    const navigate = useNavigate();
    const showEdit = Boolean(config.editOption)
    const showDelete = Boolean(config.deleteOption)
    const showAction = config.editOption || config.deleteOption
    const showExtra = Boolean(config.extraOption)

    return (
        <div>
            <div className="flex flex-col flex-1 w-full h-[400px] py-5 text-neutral-content">
                <div className="flex justify-between items-center mb-5">
                    <header className="text-xl font-bold">{config.title}</header>
                    {showExtra && extraScript &&
                        <div>
                            <button className="btn bg-primary text-primary-content rounded-full"
                                onClick={() => {
                                    extraScript(data_id);
                                }}
                            >
                                Extra Button+
                            </button>
                        </div>}
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-base-300 text-base-content w-full">
                                {isLoading &&
                                    <th className="rounded-lg"><span className="loading loading-spinner loading-xl"></span></th>
                                }

                                {!isLoading && visibleCol?.map((col, index) => {
                                    return index === 0 ? (
                                        <th className="rounded-l-xl" style={{ width: col.width }} key={`header-${index}`}>{col.header}</th>
                                    ) : index === (visibleCol.length - 1) && !(config.deleteOption || config.editOption) ? (
                                        <th className="rounded-r-xl" style={{ width: col.width }} key={`header-${index}`}>{col.header}</th>
                                    ) : (<th style={{ width: col.width }}>{col.header}</th>)
                                }
                                )}

                                {showAction && !isLoading && (
                                    <th className="rounded-r-xl" style={{ width: '100px' }}>
                                        การจัดการ
                                    </th>
                                )}

                            </tr>
                        </thead>

                        <tbody>
                            {isLoading &&
                                <tr className="rounded-lg"><td className="loading loading-spinner loading-xl"></td></tr>
                            }

                            {!isLoading && tableData?.map((row) => {
                                const row_id = row[config.rowIdKey];

                                return (
                                    <tr className={` ${config?.navDest === '' ? '' : 'hover:cursor-pointer hover:bg-base-300'}`}

                                        onClick={config.navDest !== '' ? () => navigate(`${config.navDest}${row[config.rowIdKey]}`) : undefined}
                                        key={`row-${row_id}`}
                                        style={underline ? { "borderBottom": "1px solid black" } : {}}
                                    >
                                        {
                                            visibleCol?.map((col) =>
                                                <td>{row[col.key as string]}</td>
                                            )
                                        }
                                        {showAction && <td className="flex">
                                            {(showEdit && editScript) && (

                                                <div>
                                                    <button className="btn bg-primary text-primary-content"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            editScript(row);
                                                        }}>edit</button>
                                                </div>
                                            )}

                                            {showDelete && deleteScript && (
                                                <div>
                                                    <button className="btn bg-primary text-primary-content"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteScript(row_id);
                                                        }}>delete</button>
                                                </div>

                                            )}
                                        </td>}
                                    </tr>)
                            }
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