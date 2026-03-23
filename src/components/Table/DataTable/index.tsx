import { useState, useEffect } from "react";
import { questionTableConfig, hintTableConfig, skeltonTableConfig, teacherCourseTableConfig, topicTableConfig, studentCourseTableConfig, DocumentTableConfig, StudentInCourseTableConfig } from "./tableconfig";
import { useNavigate, useParams } from "react-router-dom";
import supabaseClient from "../../../utils/SupabaseClient";
import type { TableConfig } from "../../../@types/table";
import type { PageReqWithId, IdKey, DataTableProps } from "../../../@types/table";
import { FaCheck, FaX } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";

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
    bucketName,
    showAction = false,
    refreshTrigger = 0
}: DataTableProps<K>) {
    const [tableData, setTableData] = useState<Array<Record<string, any>>>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(6);
    const [config, setConfig] = useState<TableConfig<any>>(skeltonTableConfig);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const fetchData = async () => {
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

            if (error) {
                toast.error('Cannot get table data')
                throw error
            }

            if (data) {
                const table_data = data.data
                setTableData(table_data.items);
                setTotalPages(table_data.total_pages);
            }
        } catch (error) {
            throw error
        } finally {
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
        } else if (name === "teacher-course-list") {
            fetchData();
            setConfig(teacherCourseTableConfig);
        } else if (name === "student-enrollment-list") {
            fetchData();
            setConfig(studentCourseTableConfig);
        } else if (name === "course-doc-list") {
            fetchData();
            setConfig(DocumentTableConfig);;
        } else if (name === "student-list-in-course") {
            fetchData();
            setConfig(StudentInCourseTableConfig);
        }
    }, [currentPage])

    useEffect(() => {
        fetchData();
        setCurrentPage(1);
    }, [refreshTrigger])

    const renderBoxData = (data: any) => {
        if (Array.isArray(data)) {
            return data.map((item: string) => (
                <span title={item}  className="badge badge-sm badge-accent mx-0.5 text-white line-clamp-1">
                    {item}
                </span>
            ))
        }

        if (typeof (data) === 'boolean') {
            return data ? <FaCheck className="text-accent" /> : <FaX className="text-secondary font-bold" />
        }

        return data;
    }

    const visibleCol = config.columns.filter(col => col.display !== false)
    const navigate = useNavigate();
    const params = useParams();

    const extractFileUrl = async (name: string) => {
        const file_surname = name.split('.').pop()?.toLocaleLowerCase()

        if (!bucketName || !params.courseId || !file_surname) return;

        const { data, error } = await supabaseClient.storage.from(bucketName).createSignedUrl(`${params.courseId}/${name}`, 600)

        if (error || !data) {
            console.error('Failed to get signed URL:', error);
            return
        }

        const previewable = ['pdf', 'md', 'txt', 'json']

        if (previewable.includes(file_surname)) {
            window.open(data?.signedUrl)
        } else {
            const a = document.createElement('a');
            a.href = data.signedUrl
            a.download = name
            a.click();
        }

    }

    return (
        <div className="flex flex-col gap-5">
            {!isLoading ?
                <div className="flex flex-col flex-1 w-full h-fit py-5 text-neutral-content">
                    <div className="flex justify-between items-center mb-5">
                        <header className="text-xl font-bold">{config.title}</header>
                        {(extraScript && showAction) &&
                            <div>
                                <button className="btn bg-primary text-primary-content rounded-full"
                                    onClick={() => {
                                        extraScript(data_id);
                                    }}
                                >
                                    Create +
                                </button>
                            </div>}
                    </div>

                    <div>
                        <table className="table table-pin-rows">
                            <thead>
                                <tr className="bg-base-300 text-base-content w-full">

                                    {visibleCol?.map((col, index) => {
                                        return index === 0 ? (
                                            <th className="rounded-l-xl" style={{ width: col.width }} key={`header-${index}`}>{col.header}</th>
                                        )
                                            : index === (visibleCol.length - 1) && !(showAction) ? (
                                                <th className="rounded-r-xl" style={{ width: col.width }} key={`header-${index}`}>{col.header}</th>
                                            )
                                                : (<th style={{ width: col.width }} key={`header-${index}`}>{col.header}</th>)
                                    }
                                    )}

                                    {showAction && (
                                        <th className="rounded-r-xl w-5">

                                        </th>
                                    )}

                                </tr>
                            </thead>

                            <tbody>

                                {tableData?.map((row,r_index) => {
                                    const row_id = row[config.rowIdKey];

                                    return (
                                        <tr className={`${(!config?.navDest || config?.navDest === '') ? '' : 'hover:cursor-pointer hover:bg-base-300'}`}

                                            onClick={
                                                config.navDest
                                                    ? () => navigate(`${config.navDest}${row[config.rowIdKey]}`)
                                                    : config.isFile
                                                        ? () => {return extractFileUrl(row.name) }
                                                        : undefined}
                                            key={`row-${r_index}`}
                                            style={underline ? { "borderBottom": "1px solid black" } : {}}
                                        >
                                            {
                                                visibleCol?.map((col,c_index) => {
                                                    const box_data = row[col.key as string]
                                                    return (
                                                        <td key={`row-${r_index}-col-${c_index}`}>
                                                            <p className="w-full line-clamp-3">
                                                                {
                                                                    renderBoxData(box_data)
                                                                }
                                                            </p>
                                                        </td>
                                                    )
                                                }
                                                )
                                            }
                                            {showAction && 
                                            <td>
                                                <div onClick={(e) => e.stopPropagation()} className="dropdown dropdown-end">
                                                    <div tabIndex={0} className="text-xl h-full w-full hover:cursor-pointer hover:text-primary text-neutral-content"><BsThreeDotsVertical /></div>
                                                    <ul id={`manage-dropdown-${row_id}`} tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                        {editScript && !config.isFile && (
                                                            <li>
                                                                <div className="text-primary"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        document.getElementById(`manage-dropdown-${row_id}`)?.blur();
                                                                        editScript(row);
                                                                    }}>edit
                                                                </div>
                                                            </li>
                                                        )}
                                                        {deleteScript && (
                                                            <li>
                                                                <div className="text-primary"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        document.getElementById(`manage-dropdown-${row_id}`)?.blur();
                                                                        deleteScript(config.isFile ? row.name : row_id);
                                                                    }}>delete
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </td>}
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div className="flex justify-center items-center h-[30rem] w-full rounded-lg bg-base-300">
                    <span className="loading loading-spinner"></span>
                </div>
            }

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