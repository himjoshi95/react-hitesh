import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from 'react-google-charts';

const API_URL = "http://localhost:3008";
const DepartmentAttributeGaugeChart = () => {

    const [selectedAttribute, setSelectedAttribute] = useState('683fed941be29131454635b0');
    const [attributeList, setAttributeList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [chartData, setChartData] = useState([]);


    const fetchAttribute = async () => {
        const response = await axios.get(`${API_URL}/get-attribute-list`);
        setAttributeList(response.data.attributeData || []);
    }

    useEffect(() => {
        fetchAttribute();
    }, []);

    const fetchAPIData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/get-gauge-charts-departments-attributeWise?attribute=${selectedAttribute}`);
            const rawData = response.data.finalArray;

            const transformed = rawData.map(item => {
                const { category, responses } = item;
                const { Yes = 0, Partial = 0, No = 0 } = responses;
                const total = Yes + Partial + No;

                const score = total === 0
                    ? 0
                    : ((Yes * 10 + Partial * 7.5 + No * 0) / total).toFixed(2);

                return {
                    category,
                    data: [
                        ['Label', 'Value'],
                        ['', parseFloat(score)]
                    ]
                };
            });

            setChartData(transformed);

            setTimeout(() => {
                setLoading(false);
            }, 300);
        } catch (error) {
            console.log("Error in fetchAPIData", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAPIData();
    }, [selectedAttribute]);

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
        },
    };

    return (
        <div>
            <h1>Gauge Chart Two Attribute wise </h1>
            <h1 className="font-semibold text-2xl mb-5 border-b border-blue-400"></h1>
            <div className='mb-4 flex gap-3'>
                <label className='font-semibold text-xl'>Attribute</label>
                <select
                    className='border border-black rounded py-1 items-center'
                    value={selectedAttribute}
                    onChange={(e) => setSelectedAttribute(e.target.value)}
                >
                    {/* <option value="all">All</option> */}
                    {attributeList.map(attr => <option key={attr._id} value={attr._id}>{attr.name}</option>)}
                </select>
            </div>
            {
                loading
                    ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
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
                    // <div className="grid grid-cols-5 gap-2">
                    <div className={`grid grid-cols-5 gap-2 transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
                        {chartData.map((chart, idx) => (
                            <div key={idx} className="bg-blue-100 rounded">
                                {/* <label>{chart.iso}</label> */}
                                <label className="font-semibold mb-4 text-md px-1 ">{chart.category}</label>
                                <div className="flex justify-end">
                                    <p className="px-1 py-1 text-2xl ">{chart.data[1][1]}/10</p>
                                </div>
                                <Chart
                                    chartType="Gauge"
                                    width="350px"
                                    height="200px"
                                    data={chart.data}
                                    options={options}
                                />
                            </div>
                        ))}
                    </div>
            }

        </div>
    )
};

export default DepartmentAttributeGaugeChart;