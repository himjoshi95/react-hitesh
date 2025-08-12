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
const DepartmentPieChart = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [locationList, setLocationList] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('all');

    const [selectedAttribute, setSelectedAttribute] = useState('683fed941be29131454635b0');
    const [attributeList, setAttributeList] = useState([]);

    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedProcess, setSelectedProcess] = useState('all');

    //data
    const [pieData, setPieData] = useState({});

    const fetchCategory = async () => {
        const response = await axios.get(`${API_URL}/get-category-master`);
        setCategoryList(response.data.category || [])
    }

    const fetchAttribute= async() => {
        const response = await axios.get(`${API_URL}/get-attribute-list`);
        setAttributeList(response.data.attributeData || []);
    }


    useEffect(()=>{
        fetchCategory();
        fetchAttribute();
    },[]);

    const fetchDependentDropdownData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-categoryWise-location-isoTypeMaster-isos?category=${selectedCategory}`)
            setLocationList(response.data.locationList);
            
        } catch (error) {
            console.log("Error in fetchDependentDropdownData", error.message);
        }
    }

    useEffect(()=>{
        if(selectedCategory !== 'all'){
            fetchDependentDropdownData();
        }else{
            setLocationList([]);
        }
    },[selectedCategory]);

    const fetchAPIData = async () =>{
        try {
            const response = await axios.get(`${API_URL}/get-piechart-department?category=${selectedCategory}&location=${selectedLocation}&attribute=${selectedAttribute}&department=${selectedDepartment}&process=${selectedProcess}`);
            // console.log(response.data);
            setPieData(response.data?.pieData || [])
        } catch (error) {
            console.log("Error in fetchAPIData",error.message)
        }
    }

    useEffect(()=>{
        if(selectedCategory !== 'all' && selectedLocation !== 'all'){
            fetchAPIData();
        }
    },[selectedCategory,selectedLocation,selectedAttribute,selectedDepartment,selectedProcess]);

    const labels = ['Yes','No','Partial','Not Applicable'];
    const values = [pieData?.Yes || 0, pieData?.No || 0, pieData?.Partial || 0, pieData?.[`Not Applicable`] || 0];
    const total = values.reduce((a, b) => a + b, 0);

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107','#7393B3'],
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
                    return `${percentage}%`;
                }
            }
        }
    };



    return (
        <div>
            {/* <h1 className="font-semibold text-2xl mb-5 border-b border-blue-400">Department Pie Chart</h1> */}
            {/* {JSON.stringify(selectedCategory)} */}
            {/* <div>
                SelectedCategory: {JSON.stringify(selectedCategory)}
            </div>
            <div>
                SelectedLocation: {JSON.stringify(selectedLocation)}
            </div> */}
            <div>{JSON.stringify(pieData)}</div>
            <div className="grid grid-cols-3 gap-5">
                <div className='mb-4 flex gap-[40px] items-center'>
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

                <div className='mb-4 flex gap-3'>
                    <label className='font-semibold text-xl'>Attribute</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedAttribute}
                        onChange={(e) => setSelectedAttribute(e.target.value)}
                    >
                        {/* <option value="all">All</option> */}
                        {attributeList.map(attr => <option key={attr._id} value={attr._id}>{attr.name}</option>)}
                    </select>
                </div>
                <div className='mb-4 flex gap-3'>
                    <label className='font-semibold text-xl'>Department</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        
                        
                    >
                        <option value="all">All</option>
                        
                    </select>
                </div>
                <div className='mb-4 flex gap-3'>
                    <label className='font-semibold text-xl'>Process</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        
                        
                    >
                        <option value="all">All</option>
                        
                    </select>
                </div>
            </div>
            <div className="bg-slate-300">
                <div style={{ width: '300px', height: '300px' }}>
                    <Pie data={data} options={options} />
                </div>
            </div>
        </div>
    )
};

export default DepartmentPieChart;