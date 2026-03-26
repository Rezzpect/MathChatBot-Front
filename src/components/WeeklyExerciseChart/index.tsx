import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import type { WeeklyQuestionCount } from '../../@types/statcard';
import supabaseClient from '../../utils/SupabaseClient';
import toast from 'react-hot-toast';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function WeeklyExerciseBar() {
    const { authData } = useContext(AuthContext);
    const [weeklyExercise, setWeeklyExercise] = useState<WeeklyQuestionCount[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getWeeklyExerciseData = async (user_id: string) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabaseClient.functions.invoke("user-profile", {
                'body': {
                    "user_id": user_id
                }
            }
            )

            if (error) { throw error }

            if (data && (data.data.length != 0)) {
                const user_data = data.data[0]
                // const profile_image = await getFile(user_data.user_id);

                setWeeklyExercise(user_data.week_status);
            } else { throw new Error('404 User not found') }
        }catch(error){
            toast.error('Cannot retrieve weekly exercise data');
        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(() => {
        if (!authData) return
        getWeeklyExerciseData(authData?.user_id);
    }, [])
    return (
        <div className="w-full h-100 bg-base-300 rounded-lg p-5 items-center flex justify-center">
            {
                isLoading?
                <span className='loading loading-spinne loading-lg text-primary'/>
                :<Bar
                    data={{
                        labels: weeklyExercise.map((data) => `${data.day.slice(0, 3)}, ${data.date}`),
                        datasets: [
                            {
                                label: 'Count',
                                data: weeklyExercise.map((data) => data.count),
                                backgroundColor: ["rgba(138,56,245,1)"],
                                borderRadius: 10,
                                barThickness: 35
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            }

        </div>
    )
}