import toast from "react-hot-toast";
import type { DeleteWarningProps } from "../../@types/modal";
import supabaseClient from "../../utils/SupabaseClient";
import { useState } from "react";

export default function DeleteModal({
    body,
    funcName,
    message,
    method = 'DELETE',
    setOpen,
    setRefresh
}: DeleteWarningProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabaseClient.functions.invoke(funcName, {
                method: method,
                body: {
                    ...body
                }
            })

            if (error) throw error

            toast.success('Deleted successfully!')
            setRefresh((prev) => prev + 1);
            setOpen(false);
        } catch (error) {
            toast.error('Something went wrong')
            throw error
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center z-100">
            <div className="flex flex-col h-fit bg-base-100 shadow-sm rounded-lg w-120 p-5 gap-5">
                <div className="flex flex-col gap-2">
                    <header className="text-2xl font-bold text-red-500">คำเตือน!</header>
                    <p>{message}</p>
                </div>

                <div className="flex w-full justify-end gap-2">
                    <button
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                        className="btn rounded-full btn-white border border-black text-black font-bold text-lg py-2 px-5">Cancel</button>

                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="btn rounded-full btn-secondary text-primary-content font-bold text-lg py-2 px-5">{isLoading ? <span className="loading loading-spinner text-white" /> : <>Delete</>}</button>
                </div>
            </div>
        </div>
    )
}