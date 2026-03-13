import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/navbar'
import { Toaster } from 'react-hot-toast'

export default function MainLayout () {
    return (
        <div className='h-full flex flex-col'>
            <Navbar/>
            <div>
                <Outlet/>
                <Toaster position='bottom-center'/>
            </div>
        </div>
    );
};