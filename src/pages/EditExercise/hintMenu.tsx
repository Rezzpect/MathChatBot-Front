import DataTable from "../../components/DataTable";

export default function HintMenu() {
    return (
        <div className='py-5 min-h-[400px]'>
            <DataTable name="hint-list-in-question" id_key="hint_id" data_id={1} underline={true}/>
        </div>
    )
}