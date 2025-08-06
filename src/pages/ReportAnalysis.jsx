import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);


const API_URL = "http://localhost:3008";
const ReportAnalysis = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [locationList, setLocationList] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('all');

    const [selectedIsoType, setSelectedIsoType] = useState('all');

    const [selectedIso, setSelectedIso] = useState('683e0c116ed56b4ec3bd8fb8');
    const [isoList, setIsoList] = useState([]);


    const [clauseList, setClauseList] = useState([]);
    const [selectedClause, setSelectedClause] = useState('all');

    const [subClauseList, setSubClauseList] = useState([]);
    const [selectedSubClause, setSelectedSubClause] = useState('all');

    //data
    const [pieData, setPieData] = useState({});

    const fetchCategory = async () => {
        const response = await axios.get(`${API_URL}/get-category-master`);
        setCategoryList(response.data.category || [])
    }

    const fetchIsoList = async () => {
        const response = await axios.get(`${API_URL}/get-iso-list`);
        setIsoList(response.data.isoList);
    }

    const fetchClauseList = async () => {
        const response = await axios.get(`${API_URL}/get-clause-master`);
        setClauseList(response.data.clause)
    }

    useEffect(() => {
        fetchCategory();
        fetchClauseList();
        if (selectedCategory === 'all') {
            fetchIsoList();
        }
    }, []);

    const fetchDependentDropdownData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-categoryWise-location-isoTypeMaster-isos?category=${selectedCategory}`);
            // console.log(response.data);
            setSelectedIsoType(response.data.isoTypeName);
            setIsoList(response.data.isoList);
            setLocationList(response.data.locationList);
        } catch (error) {
            console.log("Error in fetchDependentDropdownData", error.message);
        }
    };

    useEffect(() => {
        if (selectedCategory !== 'all') {
            fetchDependentDropdownData();
        } else {
            setSelectedIsoType('all');
            fetchIsoList();
            setLocationList([]);
        }
    }, [selectedCategory]);

    //fetch sub-clause
    const fetchSubClauseData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-subClauses?clause=${selectedClause}`);
            // console.log(response.data);
            setSubClauseList(response.data.subClauses)
        } catch (error) {
            console.log("Error in fetchSubClauseData", error.message);
        }
    }

    useEffect(() => {
        if (selectedClause !== 'all') {
            fetchSubClauseData();
        } else {
            setSubClauseList([])
        }
    }, [selectedClause]);

    const fetchAllCategoryLocationData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all?iso=${selectedIso}&clause=${selectedClause}&category=${selectedCategory}&location=${selectedLocation}&subClause=${selectedSubClause}`);
            // console.log(response.data.pieData)
            setPieData(response.data?.pieData || [])
        } catch (error) {
            console.log("Error in fetchAllCategoryLocationData", error.message);
        }
    }

    useEffect(() => {
        fetchAllCategoryLocationData();
    }, [selectedIso, selectedClause, selectedCategory, selectedLocation, selectedSubClause])

    const labels = ['Yes', 'No', 'Partial'];
    const values = [pieData?.Yes || 0, pieData?.No || 0, pieData?.Partial || 0];
    const total = values.reduce((a, b) => a + b, 0);

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: (value, context) => {
                    if (value === 0) {
                        return ''; // ✅ Don't display anything for zero values
                    }
                    const percentage = ((value / total) * 100).toFixed(1);
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label} (${percentage}%)`;
                }
            }
        }
    };


    return (
        <div>
            {/* <div>{JSON.stringify(selectedCategory)}</div> */}
            <h1 className="font-semibold text-2xl mb-5 border-b border-blue-400">Report Analysis-Clause</h1>
            <div className="grid grid-cols-3 gap-5">
                <div className='mb-4 flex gap-3 items-center'>
                    <label className='font-semibold text-xl'>Category</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedCategory || "all"}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value)
                            setSelectedLocation('all');
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

                <div className='mb-4 flex gap-3'>
                    <label className='font-semibold text-xl'>Location</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="all">All</option>
                        {
                            locationList.length !== 0
                            &&
                            locationList.map(loc => <option key={loc._id} value={loc._id}>{loc.name}</option>)
                        }
                    </select>
                </div>

                <div className='mb-4 flex gap-6'>
                    <label className='font-semibold text-xl'>IMS Type</label>
                    <select
                        className='border w-44 border-black rounded py-1 items-center'
                        value={selectedIsoType}
                    >
                        <option value={`${selectedIsoType}`}>{selectedIsoType.charAt(0).toUpperCase() + selectedIsoType.slice(1)}</option>
                    </select>
                </div>

                <div className='mb-4 flex gap-16'>

                    <label className='font-semibold text-xl'>ISO</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedIso}
                        onChange={e => setSelectedIso(e.target.value)}
                    >

                        {isoList.map(iso => <option value={iso._id} >{iso.name}</option>)}

                    </select>
                </div>

                <div className='mb-4 flex gap-6'>
                    <label className='font-semibold text-xl'>Clause</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedClause}
                        onChange={e => {
                            setSelectedClause(e.target.value)
                            setSelectedSubClause('all')
                        }}
                    >
                        <option value="all">All</option>
                        {
                            clauseList.map(clause => (
                                <option key={clause._id} value={clause._id}>{clause.number} {clause.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="flex gap-2">
                    <label className='font-semibold text-lg'>Sub Clause </label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedSubClause}
                        onChange={(e) => setSelectedSubClause(e.target.value)}
                    >
                        <option value="all">All</option>
                        {
                            subClauseList.length !== 0
                            &&
                            subClauseList.map(sub => <option key={sub._id} value={sub._id}>{sub.number} {sub.name}</option>)
                        }
                    </select>
                </div>

            </div>
            <div className="bg-slate-300 flex mt-2 py-5">
                <div style={{ width: '300px', height: '300px' }}>
                    <Pie data={data} options={options} />
                </div>
                <div>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">Category</td>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">
                                    <select
                                        className="bg-slate-300 text-black appearance-none"
                                        // className='border w-full border-black rounded py-1 items-center'
                                        value={selectedCategory || "all"}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value)
                                            setSelectedLocation('all');
                                        }}
                                        disabled
                                    >
                                        <option value="all">All</option>
                                        {
                                            categoryList.map(item => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">Location</td>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">
                                    <select
                                        // className='border w-full border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        disabled
                                    >
                                        <option value="all">All</option>
                                        {
                                            locationList.length !== 0
                                            &&
                                            locationList.map(loc => <option key={loc._id} value={loc._id}>{loc.name}</option>)
                                        }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">IMS Type</td>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">
                                    <select
                                        // className='border w-44 border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedIsoType}
                                        disabled
                                    >
                                        <option value={`${selectedIsoType}`}>{selectedIsoType.charAt(0).toUpperCase() + selectedIsoType.slice(1)}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">ISO</td>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">
                                    <select
                                        // className='border w-full border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedIso}
                                        onChange={e => setSelectedIso(e.target.value)}
                                        disabled
                                    >

                                        {isoList.map(iso => <option value={iso._id} >{iso.name}</option>)}

                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">Clause</td>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">
                                    <select
                                        // className='border w-full border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedClause}
                                        onChange={e => {
                                            setSelectedClause(e.target.value)
                                            setSelectedSubClause('all')
                                        }}
                                        disabled
                                    >
                                        <option value="all">All</option>
                                        {
                                            clauseList.map(clause => (
                                                <option key={clause._id} value={clause._id}>{clause.number} {clause.name}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">Sub Clause</td>
                                <td className="text-left px-4 py-0.5 text-gray-700 font-medium">
                                    <select
                                        // className='border w-full border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedSubClause}
                                        onChange={(e) => setSelectedSubClause(e.target.value)}
                                        disabled
                                    >
                                        <option value="all">All</option>
                                        {
                                            subClauseList.length !== 0
                                            &&
                                            subClauseList.map(sub => <option key={sub._id} value={sub._id}>{sub.number} {sub.name}</option>)
                                        }
                                    </select>
                                </td>
                            </tr>

                            {/* <tr>
                                <td>Total</td>
                                <td>{total}</td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>
                <div className="text-lg">
                    <div>
                Pie chart for overall <select
                                        // className='border w-full border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedIso}
                                        onChange={e => setSelectedIso(e.target.value)}
                                        disabled
                                    >

                                        {isoList.map(iso => <option value={iso._id} >{iso.name}</option>)}

                                    </select> Summary in % for <select
                                        // className='border w-full border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                        disabled
                                    >
                                        <option value="all">All</option>
                                        {
                                            locationList.length !== 0
                                            &&
                                            locationList.map(loc => <option key={loc._id} value={loc._id}>{loc.name}</option>)
                                        }
                                    </select>
            </div>
            <div>
                
                Total requirements in numbers all Standards put together <select
                                        // className='border w-full border-black rounded py-1 items-center'
                                        className="bg-slate-300 text-black appearance-none"
                                        value={selectedIso}
                                        onChange={e => setSelectedIso(e.target.value)}
                                        disabled
                                    >

                                        {isoList.map(iso => <option value={iso._id} >{iso.name}</option>)}

                                    </select> : {total} (in numbers)
            </div>
            <div>
                Total Yes : {pieData?.Yes || 0} (in numbers) - ({((pieData?.Yes || 0) / total * 100).toFixed(1)}%)
            </div>
            <div>
                Total No : {pieData?.No || 0} (in numbers) - ({((pieData?.No || 0) / total * 100).toFixed(1)}%)
            </div>
            <div>
                Total Partial : {pieData?.Partial || 0} (in numbers) - ({((pieData?.Partial || 0) / total * 100).toFixed(1)}%)
            </div>

                </div>
            </div>
            
        </div>
    )
};

export default ReportAnalysis;