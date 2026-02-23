import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/navbar'

export default function MainLayout () {
    return (
        <div className='h-full flex flex-col border border-red-500'>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};