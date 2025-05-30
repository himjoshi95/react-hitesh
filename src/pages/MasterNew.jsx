import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

const Dropdown = ({ value, options, setValue }) => (
    <select
        className="w-[300px] p-1 rounded focus:outline-none border border-slate-500"
        value={value}
        onChange={(e) => {
            setValue(e.target.value)
        }}
    >
        {/* <option value={value}>{value}</option> */}
        <option value="">Select</option>
        {options.map((o, i) => (
            <option key={i} value={o._id}>{o.name}</option>
        ))}
        {/* Add more options here if needed */}
    </select>
);

const API_URL = 'http://localhost:3008'
const MasterNew = () => {

    const [masterName, setMasterName] = useState("");
    const [mainMasters, setMainMasters] = useState([]);
    const [searchMasterId, setSearchMasterId] = useState(null);
    const [nestedMasterQuestion, setNestedMasterQuestion] = useState([]);
    const [addMasterId, setAddMasterId] = useState(null);
    const [addMasterModel, setAddMasterModel] = useState(false);
    const [addSubMasterName, setAddSubMasterName] = useState('');
    
    const [questionMasterModel, setQuestionMasterModel] = useState(false);
    const [questionName, setQuestionName] =useState('');

    useEffect(() => {
        const fetchMainMasters = async () => {
            try {
                const response = await fetch(`${API_URL}/get-main-master`);
                const { masters } = await response.json();
                setMainMasters(masters);
            } catch (error) {
                console.error("Error fetching main masters:", error);
            }
        };

        fetchMainMasters();
    }, []);

    const addMainMaster = async () => {
        const response = await fetch(`${API_URL}/add-main-master`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ masterName })
        })
        const data = await response.json();
        console.log(data);
        setMasterName('');
    };

    useEffect(()=>{
        const fetchSubMasters = async () => {
            try {
                const response = await fetch(`${API_URL}/get-nested-masters?masterId=${searchMasterId}`)
                const data = await response.json();
                console.log(data.clauseTree);
                setNestedMasterQuestion(data.clauseTree);
            } catch (error) {
                console.log("Error in fetchSubMaster in MasterNew",error.message);
            }
        }

        if(searchMasterId) fetchSubMasters();
    },[searchMasterId]);

    const NestedRows =({clauseNodes,level=0}) => {

        return clauseNodes?.map((clauseNode) =>(
            <div key={clauseNode.clause._id} className="ml-1 mt-2 border border-blue-500 rounded mb-1 p-2 shadow-xl">
                <div className="flex gap-1 items-center" style={{ paddingLeft: `${level * 16}px` }}>
                    <Dot size={30}/>
                    <label>{clauseNode.clause.number ? clauseNode.clause.number: "" }</label>
                    <label>{clauseNode.clause.name}</label>
                    <span 
                        className="border h-6 w-6 p-1 border-slate-500 rounded-full flex justify-center items-center hover:cursor-pointer"
                        onClick={()=>{
                            setAddMasterId(clauseNode.clause._id);
                            setAddMasterModel(true);
                        }}
                    >
                        <span>+</span>
                    </span>
                    { 
                        level !== 0 
                        &&
                        <span 
                            className="border h-6 w-6 p-1 border-slate-500 rounded-full flex justify-center items-center hover:cursor-pointer"
                            onClick={()=>{
                                setAddMasterId(clauseNode.clause._id);
                                setQuestionMasterModel(true);
                            }}
                        >
                            <span className="text-sm">
                                <span>Q</span>
                                <span>+</span>
                            </span>
                        </span>
                    }
                    {/* <span>{clauseNode.clause._id}</span> */}
                </div>
                <div className="flex flex-col gap-2 rounded" style={{ marginLeft: `${level * 20}px` }}>
                    {clauseNode.questions.length > 0
                        &&
                    <>
                        <label className="font-semibold text-md underline">Questions</label>
                        {clauseNode.questions.map((q) => (
                            <label key={q._id} style={{ paddingLeft: `${level * 20}px` }}>Q. {q.name}</label>
                        ))}
                    </>                    
                    }
                </div>
                {clauseNode.children?.length > 0 && (
                    <NestedRows
                        clauseNodes={clauseNode.children}
                        level={level+1}
                    />
                )}
            </div>
        ))
    }

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

    const handleAddQuestionMaster = async(id) =>{
        const response = await fetch(`${API_URL}/add-question-clause-main`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: questionName,
                masterId:id
            })            
        })

        setQuestionMasterModel(false);
        setQuestionName('');
    };

    return (
        <div className="min-h-screen">
            <div className="flex flow-row gap-5">
                <div className="border basis-1/2 border-slate-500 p-2">
                    Add Master -{addMasterId}
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
                        <Dropdown value={searchMasterId || ""} options={mainMasters} setValue={setSearchMasterId} />
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

            { 
            searchMasterId
                &&
            <div className="w-full mt-10">
                {
                    <NestedRows
                        clauseNodes={nestedMasterQuestion}
                    />
                }
            </div>
            }

            {
                addMasterModel
                &&
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                    <div className="w-[600px] rounded bg-white p-10 overflow-y-auto">
                        <div className="flex justify-between">
                            <span className="font-semibold underline">Add Sub-Master {addMasterId}</span>
                            <span 
                                    className="font-semibold text-lg hover:cursor-pointer"
                                    onClick={()=> setAddMasterModel(false)}
                                >
                                        X
                            </span>
                        </div>
                        <div className="mt-2 flex flex-col gap-2">
                            <span className="text-lg">Name</span>
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

            {
                questionMasterModel
                &&
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                    <div className="w-[600px] rounded bg-white p-10 overflow-y-auto">
                        <div className="flex justify-between">
                            <span className="font-semibold underline">Add Question {addMasterId}</span>
                            <span 
                                    className="font-semibold text-lg hover:cursor-pointer"
                                    onClick={()=> setQuestionMasterModel(false)}
                            >
                                        X
                            </span>                          
                        </div>
                        <div className="mt-2 flex flex-col gap-2">
                            <span className="text-lg">Name</span>
                            <input
                                type="text"
                                className="border border-slate-500 rounded p-1 px-2 focus:outline-none"
                                placeholder="Add Question Here...."
                                value={questionName}
                                onChange={(e) => setQuestionName(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="border border-slate-500"
                                onClick={() => handleAddQuestionMaster(addMasterId)}
                            >
                                Add
                            </button>

                        </div>
                    </div>        
                </div>

            }

        </div>
    )
}

export default MasterNew;