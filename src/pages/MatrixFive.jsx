import React, { useEffect, useState } from "react";


const renderNestedDepartment = (nodes, level = 0, attributes, setDepartmentId, setShowDepartmentModal, setAddType) => {
    return nodes.map(node => (
        <React.Fragment key={node._id}>
            <tr>
                <td
                    className={`border p-2 sticky left-0 bg-white z-10 ${level === 0 ? 'font-bold' : ''}`}
                    style={{ paddingLeft: `${level * 20}px`, minWidth: '250px' }}
                >
                    <div className="flex flex-col gap-3 pl-4">
                        <div className="flex justify-between pl-2">
                            <span>{node.name}</span>
                            <span
                                title={level === 0 ? `Add Process - ${node.name}` : `Add Sub-Process - ${node.name}`}
                                className="flex items-center justify-center border border-blue-500 text-blue-500 h-6 w-6 rounded-full hover:cursor-pointer hover:shadow-md hover:shadow-blue-400 duration-200"
                                onClick={() => {
                                    const newAddType = level === 0 ? "Process" : "Sub-Process";
                                    setDepartmentId(node._id);
                                    setShowDepartmentModal(true);
                                    setAddType(newAddType);
                                }}
                            >
                                <span>+</span>
                            </span>
                        </div>
                        {/* <div className="pl-4">
                                {level === 0 && 
                                <div className="flex gap-2">
                                    <span className="font-normal underline">Process</span>
                                    <span
                                    className="flex items-center justify-center border border-black h-6 w-6 rounded-full hover:cursor-pointer"
                                    onClick={() => {
                                        const newAddType= level === 0 ? "Process":"Sub-Process";
                                        setDepartmentId(node._id);
                                        setShowDepartmentModal(true); 
                                        setAddType(newAddType);
                                    }}
                                    >
                                        <span>+</span>
                                    </span>
                                </div>
                                }                                
                                {level === 1 &&
                                <div className="flex gap-2">
                                    <span className="font-normal underline">Sub-Process</span>
                                    <span
                                    className="flex items-center justify-center border border-black h-6 w-6 rounded-full hover:cursor-pointer"
                                    onClick={() => {
                                        const newAddType= level === 0 ? "Process":"Sub-Process";
                                        setDepartmentId(node._id);
                                        setShowDepartmentModal(true); 
                                        setAddType(newAddType);
                                    }}
                                    >
                                        <span>+</span>
                                    </span>
                                </div> 
                                // <span className="font-normal underline">Sub-Process</span>
                                }                                
                        </div> */}
                    </div>
                </td>
                {attributes.map(att => (
                    <td key={att._id} className="border border-slate-400 p-2 text-center">
                        <select className="py-1 px-2  w-28 rounded focus:outline-none">
                            <option value="select">Select</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Partial</option>
                        </select>
                    </td>
                ))}
                <td className="border border-slate-400 p-2">
                    <input type="text" className="p-1 border border-slate-400 rounded-sm" placeholder="Add Remarks.." />
                </td>

            </tr>
            {node.children?.length > 0 &&
                renderNestedDepartment(node.children, level + 1, attributes, setDepartmentId, setShowDepartmentModal, setAddType)
            }
        </React.Fragment>
    ))
};

const API_URL = 'http://localhost:3009'
const MatrixFive = () => {

    const [attributes, setAttributes] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [departmentId, setDepartmentId] = useState(null);
    const [showAddDepartmentModal, setShowDepartmentModal] = useState(false);
    const [attributeId, setAttributeId] = useState(null);
    const [showAddAttributeModal, setShowAttributeModal] = useState(false);
    const [addType, setAddType] = useState("");
    const [addInput, setAddInput] = useState("");
    const [addAttributeInput, setAddAttributeInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/get-nested-department`);
                const { nestedData } = await response.json();
                setDepartmentList(nestedData);
            } catch (error) {
                console.log("Error in fetchData", error);
            }
        }
        fetchData();
    }, [showAddDepartmentModal]);

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const response = await fetch(`${API_URL}/get-attributes-department`);
                const { attributes } = await response.json();
                setAttributes(attributes);
            } catch (error) {
                console.error("Error fetching attributes master:", error);
            }
        }
        fetchAttributes();
    }, [showAddAttributeModal]);

    const handleAddSubMasterDepartment = async (id) => {
        const response = await fetch(`${API_URL}/add-sub-master`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: addInput,
                parentId: id
            })
        });
        setShowDepartmentModal(false);
        setAddInput('');
    }

    const handleAddSubMasterAttribute = async (id) => {
        const response = await fetch(`${API_URL}/add-sub-master`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: addAttributeInput,
                parentId: id
            })
        });
        setShowAttributeModal(false);
        setAddAttributeInput('')
    }
    return (
        <div>
            {/* <div>{JSON.stringify(departmentList)}</div> */}
            <div className="mt-5 overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto relative">
                    <table className="border-collapse border w-full min-w-max">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-slate-400 p-2 text-left sticky top-0 left-0 z-30 bg-gray-200">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2">
                                            <span>Department</span>
                                            <span
                                                title="Add Department"
                                                className="flex items-center justify-center border border-blue-500 text-blue-500 h-6 w-6 rounded-full hover:cursor-pointer hover:shadow-md hover:shadow-blue-400 duration-200"
                                                onClick={() => {
                                                    setDepartmentId('6835abf58c32c8a297354866')
                                                    setShowDepartmentModal(true)
                                                    setAddType('Department')
                                                }}
                                            >
                                                <span>+</span>
                                            </span>
                                        </div>
                                        <div
                                            className="font-normal text-sm  border rounded border-blue-400 px-2 py-1 text-blue-500 hover:border-blue-500 duration-200 hover:shadow-lg hover:shadow-blue-400 hover:cursor-pointer"
                                            onClick={() => {
                                                setAttributeId('6835b29c8c32c8a297354bb8')
                                                setShowAttributeModal(true);
                                            }}
                                        >
                                            Attributes +
                                        </div>
                                    </div>
                                </th>
                                {
                                    attributes.map(attribute => (
                                        <th
                                            key={attribute._id}
                                            className="border border-slate-400 p-2 text-left sticky top-0 bg-gray-200 z-20"
                                        // style={{
                                        //     writingMode:"vertical-rl",
                                        //     transform: "rotate(180deg)",
                                        //     whiteSpace: "nowrap",
                                        //     height:"500px",
                                        //     lineHeight:1,
                                        //     display:"inline-block"
                                        // }}
                                        >
                                            {attribute.name}
                                        </th>

                                    ))
                                }

                                <th className="border border-slate-400 p-2 text-left sticky top-0 left-0 z-30 bg-gray-200">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderNestedDepartment(departmentList, 0, attributes, setDepartmentId, setShowDepartmentModal, setAddType)}
                        </tbody>
                    </table>
                </div>
            </div>
            {showAddDepartmentModal
                &&
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                    <div className="w-[600px] rounded bg-white p-10 overflow-y-auto">
                        <div className="flex justify-between mb-5">
                            <span className="font-semibold text-xl underline">Add {addType}</span>
                            <span
                                className="font-semibold text-lg hover:cursor-pointer"
                                onClick={() => setShowDepartmentModal(false)}
                            >
                                X
                            </span>
                        </div>
                        <div className="mt-2 flex flex-col gap-2">
                            <span className="text-lg">{addType} Name</span>
                            <input
                                type="text"
                                className="border border-slate-500 rounded p-1 px-2 focus:outline-none mb-5"
                                placeholder="Add Here...."
                                value={addInput}
                                onChange={(e) => setAddInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="border border-slate-500"
                                onClick={() => handleAddSubMasterDepartment(departmentId)}
                            // onClick={() => handleAddQuestionMaster(addMasterId)}
                            >
                                Add
                            </button>

                        </div>
                    </div>
                </div>
            }

            {
                showAddAttributeModal
                &&
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                    <div className="w-[600px] rounded bg-white p-10 overflow-y-auto">
                        <div className="flex justify-between mb-5">
                            <span className="font-semibold text-xl underline">Add Attribute</span>
                            <span
                                className="font-semibold text-lg hover:cursor-pointer"
                                onClick={() => setShowAttributeModal(false)}
                            >
                                X
                            </span>
                        </div>
                        <div className="mt-2 flex flex-col gap-2">
                            <span className="text-lg">Name</span>
                            <input
                                type="text"
                                className="border border-slate-500 rounded p-1 px-2 focus:outline-none mb-5"
                                placeholder="Add Here...."
                                value={addAttributeInput}
                                onChange={(e) => setAddAttributeInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="border border-slate-500"
                                onClick={() => handleAddSubMasterAttribute(attributeId)}
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

export default MatrixFive;