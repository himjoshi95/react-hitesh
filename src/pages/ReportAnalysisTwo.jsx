import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";


const API_URL = "http://localhost:3008";

const ReportAnalysisTwo = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [locationList, setLocationList] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('all');

    const [clauseList, setClauseList] = useState([]);
    const [selectedClause, setSelectedClause] = useState('all');

    const [subClauseList, setSubClauseList] = useState([]);
    const [selectedSubClause, setSelectedSubClause] = useState('all');

    const [apiData, setApiData] = useState([]);

    const fetchCategory = async () => {
        const response = await axios.get(`${API_URL}/get-category-master`);
        setCategoryList(response.data.category || []);
    }

    const fetchClauseList = async () => {
        const response = await axios.get(`${API_URL}/get-clause-master`);
        setClauseList(response.data.clause);
    }

    useEffect(() => {
        fetchCategory();
        fetchClauseList();
    }, []);

    const fetchDependentDropdownData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-categoryWise-location-isoTypeMaster-isos?category=${selectedCategory}`);
            console.log(response.data)
            setLocationList(response.data.locationList);
        } catch (error) {
            console.log("Error in fetchDependentDropdownData", error.message);
        }
    }

    useEffect(() => {
        if (selectedCategory !== 'all') {
            fetchDependentDropdownData();
        } else {
            setLocationList([]);
        }
    }, [selectedCategory]);

    const fetchSubClauseData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-subClauses?clause=${selectedClause}`);
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
    }, []);

    const fetchAPIData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-charts-two`);
            // console.log(response.data.result);
            setApiData(response.data.result);

        } catch (error) {
            console.log("Error in fetchAPIData", error.message)
        }
    };

    useEffect(() => {
        fetchAPIData();
    }, []);

    const isoOrder = ["IMS", "ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001"];

    const chartLabels = isoOrder;

    const groupedData = {
        Yes: [],
        No: [],
        Partial: [],
    };

    isoOrder.forEach((iso) => {
        const entry = apiData.find((item) => item.iso === iso);
        if (entry) {
            const responses = entry.responses;
            groupedData["Yes"].push(responses["Yes"] || 0);
            groupedData["No"].push(responses["No"] || 0);
            groupedData["Partial"].push(responses["Partial"] || 0);
        } else {
            groupedData["Yes"].push(0);
            groupedData["No"].push(0);
            groupedData["Partial"].push(0);
        }
    })

    const series = [
        {
            name: "Yes",
            data: groupedData["Yes"],
        },
        {
            name: "No",
            data: groupedData["No"],
        },
        {
            name: "Partial",
            data: groupedData["Partial"],
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
                columnWidth: "55%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => (val > 0 ? `${val}` : ""),
        },
        xaxis: {
            categories: chartLabels,
        },
        legend: {
            position: "top",
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} responses`,
            },
        },
    };





    return (
        <div>
            <h1 className="font-semibold text-2xl mb-5 border-b border-blue-400">Report Analysis Two-Clause </h1>
            {JSON.stringify(groupedData)}

            <div className="mt-10">
                {JSON.stringify(apiData)}

            </div>

            {/* <div>
                <p>selectedCategory---- {JSON.stringify(selectedCategory)}</p>
                <p>selectedLocation---- {JSON.stringify(selectedLocation)}</p>
                <p>selectedClause ----{JSON.stringify(selectedClause)}</p>
                <p>selectedSubClause ---{JSON.stringify(selectedSubClause)}</p>
            </div>          */}
            <div className="grid grid-cols-2 gap-5">
                <div className='mb-4 flex gap-3 items-center'>
                    <label className='font-semibold text-xl'>Category</label>
                    <select
                        className='border w-[400px]  border-black rounded py-1 items-center'
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value)
                            setSelectedLocation('all')
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
                <div className='mb-4 flex gap-14 items-center'>
                    <label className='font-semibold text-xl'>Location</label>
                    <select
                        className='border w-[400px]  border-black rounded py-1 items-center'
                        value={selectedLocation}
                        onChange={e => setSelectedLocation(e.target.value)}

                    >
                        <option value="all">All</option>
                        {
                            locationList.length !== 0
                            &&
                            locationList.map(loc => <option key={loc._id} value={loc._id}>{loc.name}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className='mb-4 flex gap-9 items-center'>
                    <label className='font-semibold text-xl'>Clause</label>
                    <select
                        className='border w-[400px]  border-black rounded py-1 items-center'
                        value={selectedClause}
                        onChange={(e) => {
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
                <div className='mb-4 flex gap-10  items-center'>
                    <label className='font-semibold text-xl'>Sub-Clause</label>
                    <select
                        className='border w-[400px]  border-black rounded py-1 items-center'
                        value={selectedSubClause}
                        onChange={e => setSelectedSubClause(e.target.value)}
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

            <div>
                <Chart options={options} series={series} type="bar" height={400} />
            </div>

        </div>
    )

}

export default ReportAnalysisTwo;