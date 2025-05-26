import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

export const Dropdown = ({ value,options,setValue }) => (
  <select     
    className="w-[300px] p-1 rounded focus:outline-none border border-slate-500"
    value={ value}
    onChange={(e) => {
        setValue(e.target.value)
    }}    
>
    {/* <option value={value}>{value}</option> */}
    <option value="">Select</option>
    {options.map((o,i) => (
        <option key={i} value={o._id}>{o.name}</option>
    ))}    
    {/* Add more options here if needed */}
  </select>
);


const API_URL='http://localhost:3009'
const Master = () => {

    const [masterName, setMasterName] = useState("");
    const [mainMasters, setMainMasters] = useState([]);
    const [searchMasterId, setSearchMasterId] = useState(null);
    const [addMasterId, setAddMasterId] = useState(null);
    const [addMasterModel, setAddMasterModel] = useState(false);
    const [addSubMasterName, setAddSubMasterName] = useState('');

    // nested-data
    const [nestedMasterData,setNestedMasterData] = useState([]);

    useEffect(()=>{
        const fetchMainMasters = async () => {
        try {
            const response = await fetch(`${API_URL}/get-main-master`);
            const {masters} = await response.json();            
            setMainMasters(masters);
        } catch (error) {
            console.error("Error fetching main masters:", error);
        }
    };

    fetchMainMasters();
    },[]);

    useEffect(()=>{
        const fetchSubMasters = async () => {
            try {
                const response = await fetch(`${API_URL}/get-nested-masters?masterId=${searchMasterId}`);
                const {nestedData} = await response.json();
                setNestedMasterData(nestedData);               
                
            } catch (error) {
                console.log("Error in fetchSubMasters",error.message);
            }
        }

        if(searchMasterId) fetchSubMasters();

    },[searchMasterId])

    const addMainMaster = async() => {
        const response  = await fetch(`${API_URL}/add-main-master`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({masterName})
        })
        const data = await response.json();
        console.log(data);
        setMasterName('');
    };

    const handleAddSubMaster = async(id) => {
        const response = await fetch(`${API_URL}/add-sub-master`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: addSubMasterName,
                parentId: id
            })
        })        



        setAddMasterModel(false);
        setAddSubMasterName('');
    };

    const renderNestedHierarchy = (data) => {
        return data?.map((item) => (
            <div key={item._id} className="ml-1 mt-2 border border-blue-500 rounded mb-1 shadow-xl">
                <div className="flex gap-2 items-center">
                    <Dot size={30}/>
                    <label className="pr-2">{item.name}</label>
                    <span className="border h-6 w-6 p-1 border-slate-500 rounded-full flex justify-center items-center">
                        <span 
                            className="font-semibold hover:cursor-pointer"
                            onClick={()=>{
                                setAddMasterId(item._id);
                                setAddMasterModel(true);
                            }}
                            >
                            +
                        </span>
                    </span>
                    <span className="border h-6 w-6 p-1 border-slate-500 rounded-full flex justify-center items-center">
                        <span 
                            className="font-semibold text-sm hover:cursor-pointer"
                            onClick={()=>{
                                setAddMasterId(item._id);
                                setAddMasterModel(true);
                            }}
                            >
                            <span>Q</span>
                            <span>+</span>
                        </span>
                    </span>
                </div>
                { 
                    item.children && item.children.length > 0 && (
                        <div className="ml-4">
                            {renderNestedHierarchy(item.children)}
                        </div>
                )
                }
            </div>
        ))
    }
    return (
        <div className="min-h-screen">
            {/* Top Section */}
            <div className="flex flow-row gap-5">
                <div className="border basis-1/2 border-slate-500 p-2">
                Add Master
                <div className="pt-5 flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Add Master" 
                        className="w-[300px] border border-slate-500 p-1 rounded focus:outline-none"
                        value={masterName}
                        onChange={(e) => setMasterName(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="border border-slate-500 p-1 rounded"
                        onClick={addMainMaster}
                    >Add</button>
                </div>
                </div>
                <div className="border basis-1/2 border-slate-500 p-2">
                Search Master -{searchMasterId}
                    <div className="pt-5 flex gap-2">
                        <Dropdown  value={searchMasterId || ""} options={mainMasters} setValue={setSearchMasterId}/>
                        <button 
                            type="submit" 
                            className="border border-slate-500 p-1 rounded"
                            onClick={() => setAddMasterId(null)}
                        >
                            Search
                        </button>                        
                    </div>
                </div>
            </div>

            {/* Below Section */}
            { searchMasterId 
            &&
            <div className="w-full border border-slate-500 mt-10">
                <div className="p-2">
                    {mainMasters.filter(master => master._id === searchMasterId).map(master => (
                        <div key={master._id} className="flex gap-2 items-center">
                            <span>{master.name}</span>
                            <span className="border h-6 w-6 p-1 border-slate-500 rounded-full flex justify-center items-center">
                                <span 
                                    className="font-semibold text-xl hover:cursor-pointer"
                                    onClick={()=>{
                                        setAddMasterId(master._id);
                                        setAddMasterModel(true);
                                    }}
                                >
                                    +
                                </span>
                            </span>
                            {/* <span className="border h-6 w-6 p-1 border-slate-500 rounded-full flex justify-center items-center">
                                <span 
                                    className="font-semibold hover:cursor-pointer"
                                    onClick={()=>{
                                        setAddMasterId(master._id);
                                        setAddMasterModel(true);
                                    }}
                                >
                                    <span>Q</span>
                                    <span>+</span>                                     
                                </span>
                            </span> */}
                            <span>{master._id}</span>
                        </div>
                    ))}
                </div>
                {
                    searchMasterId
                    &&
                    <div className="ml-4">
                        {renderNestedHierarchy(nestedMasterData)}
                    </div>
                }

                {/* ADDMASTERMODEL  */}
                {
                    addMasterModel 
                    && 
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                        <div className="w-[600px] rounded bg-white p-10 overflow-y-auto" >
                            <div className="flex justify-between">
                                <span className="font-semibold underline">Add Sub-Master</span>
                                <span 
                                    className="font-semibold text-lg hover:cursor-pointer"
                                    onClick={()=> setAddMasterModel(false)}
                                >
                                        X
                                </span>
                            </div>
                            <div className="mt-2 flex flex-col gap-2">
                                <span className="text-lg">Name -{addSubMasterName}</span>
                                <input 
                                    type="text" 
                                    className="border border-slate-500 rounded p-1 px-2 focus:outline-none"
                                    placeholder="Add Here...."
                                    value={addSubMasterName}
                                    onChange={(e) => setAddSubMasterName(e.target.value)}
                                />
                                <button 
                                    type="submit" 
                                    className="border border-slate-500"
                                    onClick={()=>handleAddSubMaster(addMasterId)}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                }

            </div>
            }
        </div>
    )
};

export default Master;