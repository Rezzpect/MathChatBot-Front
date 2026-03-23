import { useEffect, useMemo, useState } from "react";
import type { DataTableProps, HintRowProp, hintTableProps, TableConfig } from "../../../@types/table";
import supabaseClient from "../../../utils/SupabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaExclamationCircle } from "react-icons/fa";

export const hintTableConfig: TableConfig<HintRowProp> = {
    title: "Hint",
    rowIdKey: "hint_id",
    columns: [
        { key: 'hint_id', header: 'Hint id', display: false, width: '100px' },
        { key: 'hint_title', header: 'คำถาม', display: true, width: '15rem' },
        { key: 'hint_content', header: 'คำใบ้', display: true },

    ]
};

export default function HintTable({
    data_id,
    extraScript,
    editScript,
    deleteScript,
    showAction,
    refreshTrigger
}: hintTableProps) {
    const [tableData, setTableData] = useState<Array<Record<string, any>>>();
    const { questionId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const visibleCol = hintTableConfig.columns.filter(col => col.display !== false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const isMaxHint = useMemo(() => {
        return totalItems <= 10
    }, [totalItems])

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke('hint-list-in-question', {
                body: {
                    question_id: questionId,
                    current_page: currentPage,
                    page_size: 10
                }
            })

            if (error) {
                toast.error('Cannot retrieve table data')
                throw error
            }

            if (data.data) {
                setTableData(data.data.items);
                setTotalItems(data.data.total_items);
                setTotalPages(data.data.total_pages);
            }
        } catch (error) {
            toast.error('Something went wrong')
            throw error
        } finally {
            setIsLoading(false);
        }

    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshTrigger])

    return (
        <div className="flex flex-col gap-5">
            {!isLoading ?
                <div className="flex flex-col flex-1 w-full h-fit py-5 text-neutral-content">
                    <div className="flex justify-between items-center mb-5">
                        <header className="text-xl font-bold">ตัวอย่างการใบ้</header>
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

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <header className={`text-sm font-bold ${totalItems < 3 ? 'text-yellow-500' : ''}`}>
                                จำนวนคำใบ้ {totalItems}/10
                            </header>
                            {(totalItems < 3) &&
                                <div className="dropdown">
                                    <div tabIndex={0} className="hover:cursor-pointer">
                                        <FaExclamationCircle className="text-yellow-500" />
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-sm">
                                        <div className="card-body">
                                            <p className="text-md">คำใบ้ควรมี 3 อันหรือมากกว่าเพื่อให้ได้ผลลัพธ์ตามที่ต้องการ</p>
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>

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
                                                : (<th style={{ width: col.width }}>{col.header}</th>)
                                    }
                                    )}

                                    {showAction && (
                                        <th className="rounded-r-xl w-5">

                                        </th>
                                    )}

                                </tr>
                            </thead>

                            <tbody>

                                {tableData?.map((row) => {
                                    const row_id = row[hintTableConfig.rowIdKey];

                                    return (
                                        <tr className='border-b-[1px] border-neutral'
                                            key={`row-${row_id}`}
                                        >
                                            {
                                                visibleCol?.map((col) => {
                                                    const box_data = row[col.key as string]
                                                    return (
                                                        <td>
                                                            <p className="w-full line-clamp-3">
                                                                {box_data}
                                                            </p>
                                                        </td>
                                                    )
                                                }
                                                )
                                            }
                                            {showAction && <td>
                                                <div onClick={(e) => e.stopPropagation()} className="dropdown dropdown-end">
                                                    <div tabIndex={0} className="text-xl h-full w-full hover:cursor-pointer hover:text-primary text-neutral-content"><BsThreeDotsVertical /></div>
                                                    <ul id={`manage-dropdown-${row_id}`} tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                        {editScript && !hintTableConfig.isFile && (
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
                                                                        deleteScript(hintTableConfig.isFile ? row.name : row_id);
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