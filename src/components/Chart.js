import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useRef } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    }
};

export const Chart = ({data}) => {
    
    const chart = useRef();
    
    useEffect(
        ()=>{
            chart.current.update();
        }
    ,[data])

    return(
        <div className='temp-chart'>
            <Line ref={chart} options={options} data={data}/>
        </div>
    )
}