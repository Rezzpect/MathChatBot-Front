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

import { weekstat } from './tempdata'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function WeeklyExerciseBar() {
    return (
        <div className="w-full h-100 bg-base-300 rounded-lg p-5 items-center relative">
            <Bar
                data={{
                    labels: weekstat.map((data) => data.label),
                    datasets: [
                        {
                            label: 'exerciseCount',
                            data: weekstat.map((data) => data.value),
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