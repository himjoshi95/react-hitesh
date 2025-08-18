import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from 'react-google-charts';

const API_URL = "http://localhost:3008";
const DepartmentCategoryGaugeChart = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [loading, setLoading] = useState(false);

    const [chartData, setChartData] = useState([]);

    const fetchCategory = async () => {
        const response = await axios.get(`${API_URL}/get-category-master`);
        setCategoryList(response.data.category || [])
        // console.log(response.data)
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchAPIData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/get-gauge-charts-departments-categoryWise?category=${selectedCategory}`);
            // console.log(response.data.result)
            const rawData = response.data.result;
            // console.log(rawData);   

            const chartOrder = ['Policies and Objectives', 'Legal Register', 'KPIs (Key Performance Indicators)', 'Communication Matrix', 'Standard Operating Procedures (SOPs) / Work Instructions', 'Risk Register', 'Departmental Manual', 'Department Organization Chart', 'Guidelines / Reference Documents', 'Process Flow Chart', 'Assets List', 'Forms/Templates', 'Checklists', 'Master List of Documents & Records', 'Records/Reports', 'List of External Documents']

            const transformed = rawData.map(item => {
                const { attribute, responses } = item;
                const { Yes = 0, Partial = 0, No = 0 } = responses;
                const total = Yes + Partial + No;

                const score = total === 0
                    ? 0
                    : ((Yes * 10 + Partial * 7.5 + No * 0) / total).toFixed(2);

                return {
                    attribute,
                    data: [
                        ['Label', 'Value'],
                        ['', parseFloat(score)]
                    ]
                };
            });

            const ordered = chartOrder
                .map(key => transformed.find(chart => chart.attribute === key))
                .filter(Boolean)

            setChartData(ordered)
            setTimeout(() => {
                setLoading(false);
            }, 300);

        } catch (error) {
            console.log("Error in fetchAPI data departmentCategoryGaugeChart", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAPIData();
    }, [selectedCategory])

    const options = {
        min: 0,
        max: 10,
        redFrom: 0,
        redTo: 4,
        yellowFrom: 4,
        yellowTo: 7,
        greenFrom: 7,
        greenTo: 10,
        minorTicks: 5,
        animation: {
            duration: 800,
            easing: 'out',
        }        
    };


    return (
        <div className="pb-20">
            <h1 className="font-semibold text-2xl mb-5 border-b border-blue-400"></h1>
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div className='mb-4 flex gap-3 items-center'>
                    <label className='font-semibold text-xl'>Category</label>
                    <select
                        className='border w-[400px]  border-black rounded py-1 items-center'
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value)
                        }}
                    >
                        <option value="all">All</option>
                        {
                            categoryList.map(item => (
                                <option key={item._id} value={item._id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {
                loading
                    ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-blue-100 rounded p-2 h-[280px] animate-pulse space-y-2"
                            >
                                <div className="h-4 bg-blue-300 rounded w-1/2 mx-1" />
                                <div className="h-8 bg-blue-300 rounded w-1/3 mx-auto mt-4" />
                                <div className="h-24 bg-blue-200 rounded mx-1" />
                            </div>
                        ))}
                    </div>
                    :
                    chartData.length > 0
                    ?                  
                    <div className={`grid grid-cols-4 gap-2 transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
                        {chartData.map((chart, idx) => (
                            <div key={idx} className="bg-blue-100 rounded">
                                {/* <label>{chart.iso}</label> */}
                                <label className="font-semibold mb-4 text-md px-1 ">{chart.attribute}</label>
                                <div className="flex justify-end">
                                    <p className="px-1 py-1 text-2xl ">{chart.data[1][1]}/10</p>
                                </div>
                                <div className="custom-gauge">
                                <Chart
                                    chartType="Gauge"
                                    width="350px"
                                    height="200px"
                                    data={chart.data}
                                    options={options}
                                />
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div>No Data Available</div>


            }
        </div>
    )
}

export default DepartmentCategoryGaugeChart;