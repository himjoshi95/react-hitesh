import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3008";
const DepartmentCategoryGaugeChart = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const fetchCategory = async () => {
        const response = await axios.get(`${API_URL}/get-category-master`);
        setCategoryList(response.data.category || [])
        console.log(response.data)
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchAPIData = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-gauge-charts-departments-categoryWise?category=${selectedCategory}`);
            console.log(response.data)            
        } catch (error) {
            console.log("Error in fetchAPI data departmentCategoryGaugeChart",error.message);
        }
    }

    useEffect(()=>{
        fetchAPIData();
    },[selectedCategory])


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
        </div>
    )
}

export default DepartmentCategoryGaugeChart;