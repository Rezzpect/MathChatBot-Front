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

import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function WeeklyExerciseBar() {
    const {authData} = useContext(AuthContext);
    return (
        <div className="w-full h-100 bg-base-300 rounded-lg p-5 items-center relative">
            <Bar
                data={{
                    labels: authData?.week_status.map((data) => `${data.day.slice(0,3)}, ${data.date}`),
                    datasets: [
                        {
                            label: 'Count',
                            data: authData?.week_status.map((data) => data.count),
                            backgroundColor: ["rgba(138,56,245,1)"],
                            borderRadius: 10,
                            barThickness: 35
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio:false,
                }}
            />
        </div>
    )
}