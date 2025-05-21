import Chart from 'react-apexcharts';
import { useEffect } from 'react';

function Data() {
    
    const state = {
        options: {
            chart: {
                type: 'bar',
                height: 300,
            },
            title: {
                text: "Teachers’ Proficiency - Level-wise",
                align: 'center',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '80%',
                    borderRadius: 4,
                    dataLabels: {
                        position: 'top', // Position labels on top of the bars
                    },
                },
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: "series-2",
                data: [10, 20, 45, 60, 29, 70, 80, 101]
            }
        ]
    };

    
    return (
        <div>
            <div className='pb-10 font-bold text-xl underline'>Data Charts</div>
            <div className='flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-2'>
                <div className='border-2 p-2'>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="350"
                    />
                </div>
                <div className='border-2 p-2'>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="350"
                    />
                </div>
                <div className='border-2 p-2'>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="350"
                    />
                </div>                
            </div>
        </div>
    )
}

export default Data;