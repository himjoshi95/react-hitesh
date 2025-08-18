import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";


const API_URL = "http://localhost:3008";

const DepartmentGroupedBar = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [locationList, setLocationList] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('all');

    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [departmentList, setDepartmentList] = useState([]);

    const [selectedProcess, setSelectedProcess] = useState('all');
    const [processList, setProcessList] = useState([]);

    const [apiData, setApiData] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchCategory = async () => {
        const response = await axios.get(`${API_URL}/get-category-master`);
        setCategoryList(response.data.category || [])
    }

    useEffect(() => {
        fetchCategory();
    }, []);

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

    const fetchDepartmentLocation = async() =>{
        try {
            const response = await axios.get(`${API_URL}/get-location-department?locationId=${selectedLocation}`)
            setDepartmentList(response.data.departmentList);
        } catch (error) {
            console.log("Error in fetchDepartmentLocation api data",error.message);
        }
    }

    useEffect(()=>{
        if(selectedLocation !== 'all'){
            fetchDepartmentLocation()
            setSelectedDepartment('all')
            setProcessList([]);
            setSelectedProcess('all')
        }else{
            setDepartmentList([]);
            setSelectedDepartment('all')
            setProcessList([]);
            setSelectedProcess('all')
        }
    },[selectedLocation]);

    const fetchDepartmentProcessLocation = async()=>{
        try {
            const response = await axios.get(`${API_URL}/get-location-department-process?locationId=${selectedLocation}&departmentId=${selectedDepartment}`)
            // console.log(response.data);
            setProcessList(response.data.processList)            
        } catch (error) {
            console.log("Error in fetchDepartmentProcessLocation api data",error.message);
        }
    }

    useEffect(()=>{
        if(selectedDepartment !== 'all'){
            fetchDepartmentProcessLocation();
            setSelectedProcess("all");
        }else{
            setSelectedProcess("all");
            setProcessList([]);
        }
    },[selectedDepartment]);

    const fetchAPIData = async() => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/get-groupedChart-department?category=${selectedCategory}&location=${selectedLocation}&department=${selectedDepartment}&process=${selectedProcess}`);
            // console.log(response.data.result); 
            setApiData(response?.data?.result);
            setLoading(false);           
        } catch (error) {
            console.log("Error in fetchAPIData",error.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        // if(selectedCategory !== "all" && selectedLocation !== "all" && selectedDepartment !== "all" ){
        //     fetchAPIData();
        // }
        fetchAPIData();
    },[selectedCategory,selectedLocation,selectedDepartment,selectedProcess])

    const attributeOrder = ["Policies and Objectives","Legal Register","KPIs (Key Performance Indicators)","Communication Matrix","Standard Operating Procedures (SOPs) / Work Instructions","Risk Register","Departmental Manual","Department Organization Chart","Guidelines / Reference Documents","Process Flow Chart","Assets List","Forms/Templates","Checklists","Master List of Documents & Records","Records/Reports","List of External Documents"]

    const chartLabels = attributeOrder;

    const groupedData = {
        Yes: [],
        No: [],
        Partial: [],
        'Not Applicable': []
    }

    attributeOrder.forEach((attribute) => {
        const entry = apiData?.find((item) => item.attribute === attribute);
        let Yes= 0, No = 0, Partial = 0, NotApplicable = 0;

        if(entry){
            Yes = entry.responses.Yes || 0;
            No = entry.responses.No || 0;
            Partial = entry.responses.Partial || 0;
            NotApplicable = entry.responses[`Not Applicable`] || 0;
        }

        const total = Yes + No + Partial + NotApplicable || 1;

        groupedData["Yes"].push(((Yes / total) * 100).toFixed(2));
        groupedData["No"].push(((No / total) * 100).toFixed(2));
        groupedData["Partial"].push(((Partial / total) * 100).toFixed(2));
        groupedData["Not Applicable"].push(((NotApplicable / total) * 100).toFixed(2));
    });

    const series = [
        {
            name: "Yes",
            data: groupedData["Yes"].map(Number),
        },
        {
            name: "No",
            data: groupedData["No"].map(Number),
        },
        {
            name: "Partial",
            data: groupedData["Partial"].map(Number),
        },
        {
            name: "Not Applicable",
            data: groupedData["Not Applicable"].map(Number),
        },
    ];

    const options = {
        chart: {
            type: "bar",
            stacked: false,
            toolbar: {
                show: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "80%",
                endingShape: "rounded",
                dataLabels: {
                    position: "top", // place above bars
                    orientation: "vertical"
                },
            },
        },
        // colors: ["#4CAF50", "#F44336", "#FFEB3B"], // Green, Red, Yellow
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,            
            offsetY: -10,
            style: {
                fontSize: "12px",
                colors: ["#36454F"] // <- change to any CSS color or hex
            }
        },
        xaxis: {
            categories: chartLabels,
            labels: {
                rotate: -40,
                style: { fontSize: '10px' },
                // trim: true,
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            labels: {
                formatter: (val) => `${val.toFixed(0)}%`,
            },
        },
        legend: {
            position: "top",
        },
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(1)}%`,
            },
        },
        fill: {
            opacity: 1,
        },
    };

    


    return (
        <div className="pb-10">
            <h1>Department Grouped Bar</h1>
            <div>category- {selectedCategory}</div>
            <div>location- {selectedLocation}</div>
            <div>department- {selectedDepartment}</div>
            <div>process - {selectedProcess}</div>

            {/* <div className="mt-10">
                {JSON.stringify(apiData)}
            </div> */}


            <div className="grid grid-cols-2 gap-5">
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
                <div className='mb-4 flex gap-3 items-center'>
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
                    <label className='font-semibold text-xl'>Department</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedDepartment}
                        onChange={(e)=> setSelectedDepartment(e.target.value)}                        
                    >
                        <option value="all">All</option>
                        {
                            departmentList.length !== 0
                            &&
                            departmentList.map(dept => <option key={dept._id} value={dept._id}>{dept.name}</option>)
                        }                        
                    </select>
                </div>
                <div className='mb-4 flex gap-3'>
                    <label className='font-semibold text-xl'>Process</label>
                    <select
                        className='border w-full border-black rounded py-1 items-center'
                        value={selectedProcess}
                        onChange={(e) => setSelectedProcess(e.target.value)}                  
                    >
                        <option value="all">All</option>
                        {
                            processList.length !== 0
                            &&
                            processList.map(process => <option key={process._id} value={process._id}>{process.name}</option>)
                        }                        
                    </select>
                </div>
            </div>

            {
                loading
                ?
                <div style={{height:"500px"}}>Loading.....</div>
                :
                apiData.length > 0
                ?                
                <div>
                    <Chart options={options} series={series} type="bar" height={500} />
                </div>
                :
                <div className="h-[500px]">
                    No Data Available
                </div>

            }

        </div>
    )
};

export default DepartmentGroupedBar;