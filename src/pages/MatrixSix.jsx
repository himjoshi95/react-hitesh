import React, { useEffect, useState } from "react";


const MatrixRows = ({ clauseNodes, isoList, level=0,setClauseId,setShowAddClauseModal,setShowQuestionModal,setQuestionName,clauseIsoSelection,toggleMapping,questionIsoSelection,toggleQuestionMapping}) => {
    
    return clauseNodes?.map((clauseNode) => (
        <React.Fragment key={clauseNode.clause._id}>
            {
                clauseNode.clause.name !== 'Clause Master' && 
                <tr className="bg-gray-100">
                    <td
                        className="border sticky top-0 left-0 z-30 bg-gray-100" 
                        style={{ paddingLeft: `${level * 16}px` }}
                    >
                        <div className="flex gap-2 items-center">
                            <span>{clauseNode.clause.name}</span>
                            <span 
                                className="flex items-center justify-center border border-blue-500 text-blue-500 h-6 w-6 rounded-full hover:cursor-pointer hover:shadow-md hover:shadow-blue-400 duration-200"
                                onClick={() => {
                                    setClauseId(clauseNode.clause._id)
                                    setShowAddClauseModal(true)
                                }}
                            >
                                <span>+</span>
                            </span>
                            <span 
                                className="p-1 flex items-center justify-center border border-blue-500 text-blue-500 h-6 w-6 rounded-full hover:cursor-pointer hover:shadow-md hover:shadow-blue-400 duration-200"
                                onClick={() => {
                                    setClauseId(clauseNode.clause._id)
                                    setShowQuestionModal(true)
                                }}
                            >
                                <div>
                                    <span className="text-sm">Q</span>
                                    <span>+</span>
                                </div>
                            </span>
                        </div>
                    </td>
                    {isoList.map(iso =>{
                        const key=`${clauseNode.clause._id}_${iso._id}`

                        return (
                            <td className="text-center border">
                                <input 
                                    type="checkbox"
                                    checked={clauseIsoSelection[key] || false}
                                    onChange={() => toggleMapping(clauseNode.clause._id,iso._id)}                                
                                />
                                {/* {key} */}
                            </td>
                        )
                    })}
                </tr>
            }
            {clauseNode.questions.map((q) => (
                <tr key={q._id} className="bg-gray-100">
                    <td className="sticky left-0 bg-white z-10 border w-[400px] py-1" style={{ paddingLeft: `${level * 40}px` }}>{q.name}</td>
                    {isoList.map((iso) => {
                        const key=`${q._id}_${iso._id}`

                        return (
                            <td key={iso._id} className="text-center border">
                                <input 
                                    type="checkbox"
                                    checked={questionIsoSelection[key] || false}
                                    onChange={() => toggleQuestionMapping(q._id,iso._id)}
                                />
                                {/* {key} */}
                            </td>
                        )
                    }
                    )}
                </tr>
            ))}
            {clauseNode.children?.length > 0 && (
                <MatrixRows
                    clauseNodes={clauseNode.children}
                    isoList={isoList}
                    level={level+1}
                    setClauseId={setClauseId}
                    setShowAddClauseModal={setShowAddClauseModal}
                    setShowQuestionModal = {setShowQuestionModal}
                    setQuestionName={setQuestionName}
                    clauseIsoSelection={clauseIsoSelection}
                    toggleMapping={toggleMapping}
                    questionIsoSelection={questionIsoSelection}
                    toggleQuestionMapping={toggleQuestionMapping}
                />
            )}

        </React.Fragment>
    ))
}
const API_URL = 'http://localhost:3009';
const MatrixSix = () => {
    const [matrix, setMatrix] = useState({});

    //add-clause
    const [clauseId, setClauseId] = useState(null);
    const [showAddClauseModal,setShowAddClauseModal] = useState(false);
    const [clauseName,setClauseName] = useState('');

    //add-Question
    const [showQuestionModal,setShowQuestionModal] = useState(false);
    const [questionName, setQuestionName] = useState('');

    //clause-iso selection
    const [clauseIsoSelection, setClauseIsoSelection] = useState({});
    //question-iso selection
    const [questionIsoSelection,setQuestionIsoSelection] = useState({});
    

    const fetchData  = async () => {
        const response = await fetch(`${API_URL}/get-matrix-clause-question-iso`);
        const data = await response.json();
        setMatrix(data);
    }

    useEffect(()=>{
        fetchData();
    },[showAddClauseModal,showQuestionModal]);

    const handleAddClauseMaster = async(id) => {
        const response = await fetch(`${API_URL}/add-sub-master`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: clauseName,
                parentId: id
            })
        });
        setShowAddClauseModal(false);
        setClauseName('')
    };

    const handleAddNewQuestion = async(id) => {
        const response = await fetch(`${API_URL}/add-question-clause-main`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: questionName,
                masterId: clauseId
            })
        })
        setShowQuestionModal(false);
        setQuestionName('')
    };

    const toggleMapping =(fromId,toId) => {
        const key=`${fromId}_${toId}`;
        setClauseIsoSelection(prev => ({ ...prev, [key]: !prev[key]}))
    };

    const toggleQuestionMapping = (fromId,toId) => {
        const key=`${fromId}_${toId}`;
        setQuestionIsoSelection(prev => ({ ...prev, [key]: !prev[key]}))
    };

    const handleSubmit = async() => {
        const mappings =Object.entries(clauseIsoSelection)
            .filter(([_, v]) => v)
            .map(([key]) => {
                const [fromId, toId] = key.split('_');
                return { fromId, toId };
            })

        console.log(mappings);

    };

    return (
        <div>
            <div>
                {/* <div>
                    {JSON.stringify(clauseIsoSelection)}
                </div>
                <div>
                    {JSON.stringify(questionIsoSelection)}
                </div> */}
            </div>
            <div className="mt-5 overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto relative">
                    <table className="border-collapse border w-full min-w-max">
                        <thead className="bg-gray-200">
                            <th className="border border-slate-400 p-2 text-left sticky top-0 left-0 z-40 bg-gray-200">
                                <div className="flex gap-2">
                                    <span>Clause</span>
                                    <span 
                                        className="flex items-center justify-center border border-blue-500 text-blue-500 h-6 w-6 rounded-full hover:cursor-pointer hover:shadow-md hover:shadow-blue-400 duration-200"
                                        onClick={()=>{
                                            setClauseId('6836da8919b98636c722acf2');
                                            setShowAddClauseModal(true);
                                        }}
                                    >
                                        <span>+</span>
                                    </span>
                                </div>
                            </th>
                            {matrix?.xAxis?.map((iso) => (
                                <th 
                                    key={iso._id}
                                    className="border border-slate-400 p-2 text-center sticky top-0 bg-gray-200 z-20"
                                >
                                    {iso.name}
                                </th>
                            ))}
                        </thead>
                        <tbody>
                            {
                                <MatrixRows
                                    clauseNodes={matrix?.yAxis || []}
                                    isoList={matrix?.xAxis || []}
                                    setClauseId={setClauseId}
                                    setShowAddClauseModal={setShowAddClauseModal}
                                    setShowQuestionModal = {setShowQuestionModal}
                                    setQuestionName={setQuestionName}
                                    clauseIsoSelection={clauseIsoSelection}
                                    toggleMapping={toggleMapping}
                                    questionIsoSelection={questionIsoSelection}
                                    toggleQuestionMapping={toggleQuestionMapping}
                                />
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>

            {/* showaddClauseModal */}
            {
            showAddClauseModal
            &&
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                <div className="w-[600px] rounded bg-white p-10 overflow-y-auto">
                    <div className="flex justify-between mb-5">
                        <span className="font-semibold text-xl underline">Add Clause</span>
                        <span
                            className="font-semibold text-lg hover:cursor-pointer"
                            onClick={() => setShowAddClauseModal(false)}
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
                                value={clauseName}
                                onChange={(e) => setClauseName(e.target.value)}
                        />
                        <button
                                type="submit"
                                className="border border-blue-500 text-blue-500"
                                onClick={() => handleAddClauseMaster(clauseId)}
                            >
                                Add
                        </button>

                    </div>
                </div>
            </div>
            }

            {
            showQuestionModal
            &&
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                <div className="w-[600px] rounded bg-white p-10 overflow-y-auto">
                    <div className="flex justify-between mb-5">
                        <span className="font-semibold text-xl underline">Add Question</span>
                        <span
                            className="font-semibold text-lg hover:cursor-pointer"
                            onClick={() => setShowQuestionModal(false)}
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
                                value={questionName}
                                onChange={(e) => setQuestionName(e.target.value)}
                        />
                        <button
                                type="submit"
                                className="border border-blue-500 text-blue-500"
                                onClick={() => handleAddNewQuestion(clauseId)}
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

export default MatrixSix;