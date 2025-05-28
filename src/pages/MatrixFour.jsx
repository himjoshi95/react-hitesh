import React, { useEffect, useState } from "react";

const matrix = {
    yAxis: [
        {
            clause: { _id: '5', name: '5. Leadership' },
            questions: [
                { _id: 'q1', name: 'Question 1' }
            ],
            children: [
                {
                    clause: { _id: '5.1', name: '5.1 Top Management' },
                    questions: [
                        { _id: 'q1', name: '1. Is top management actively engaged in the IMS?' },
                        { _id: 'q2', name: '2. Is there a commitment from top management to integrate the IMS into the organization’s business processes?' }],
                    children: []
                },
                {
                    clause: { _id: '5.2', name: '5.2 Policy' },
                    questions: [
                        { _id: 'q1', name: '1. Is there a documented Quality, Environment, Health & Safety and Energy Policy with the strategic direction?' },
                        { _id: 'q2', name: '2. Is Policy displayed in offices & workplace?' }],
                    children: []
                },
                {
                    clause: { _id: '5.3', name: '5.3 Roles, responsibilities, and authorities ' },
                    questions: [
                        { _id: 'q1', name: '1. Are roles, responsibilities, and authorities for the IMS clearly defined?' },
                    ],
                    children: []
                },
                {
                    clause: { _id: '5.4', name: '5.4 Consultation and participation of workers ' },
                    questions: [
                        { _id: 'q1', name: '1. Is there an established process for the consultation and participation of workers at all levels?' }],
                    children: []
                },
            ]
        },
        {
            clause: { _id: '6', name: '6. Actions to address risks and opportunities ' },
            questions: [{ _id: 'q1', name: 'Question 1' }],
            children: [
                {
                    clause: { _id: '6.1', name: '6.1 Actions to address risks and opportunities ' },
                    questions: [
                        { _id: 'q1', name: '1. Have you conducted a risk assessment and identified risks and opportunities?' },
                        { _id: 'q2', name: '2. Are actions to address risks and opportunities planned and integrated into the IMS? ' }],
                    children: [
                        {
                            clause: { _id: '6.1.1', name: '6.1.1 Hazard Identification & risk assessment' },
                            questions: [
                                { _id: 'q1', name: '1. Has the organization identified hazards and assessed risks to determine actions needed?' },
                            ],
                            children: []
                        },
                        {
                            clause: { _id: '6.1.2', name: '6.1.2 Environmental aspects & impacts' },
                            questions: [{ _id: 'q1', name: '1. Are Aspects & Impacts identified?. Are significant aspects are evaluated?' }],
                            children: []
                        },
                        {
                            clause: { _id: '6.1.3', name: '6.1.3 Identification of Legal & other requirements' },
                            questions: [{ _id: 'q1', name: '1. Are Legal & other requirements identified & documented?' }],
                            children: []
                        },
                        {
                            clause: { _id: '6.1.4', name: '6.1.4 Planning actions' },
                            questions: [{ _id: 'q1', name: 'Question 1' }, { _id: 'q2', name: 'Question 2' }],
                            children: []
                        },

                    ]
                },
                {
                    clause: { _id: "6.2", name: "6.2 Objectives & Targets" },
                    questions: [
                        { _id: 'q1', name: '1. Is there a process for setting and reviewing objectives and plans to achieve them?' },
                        { _id: 'q2', name: '2. Have quality objectives been established at relevant functions and levels?' }
                    ],
                    children: []
                }
            ]
        },
    ],
    xAxis: [
        { _id: 'iso1', name: 'ISO 9001' },
        { _id: 'iso2', name: 'ISO 14001' },
        { _id: 'iso3', name: 'ISO 45001' },
        { _id: 'iso4', name: 'ISO 50001' },
    ],
    isoMap: {
        '5': ['iso1', 'iso2', 'iso3', 'iso4'],
        '5.1': ['iso1', 'iso2', 'iso3', 'iso4'],
        '5.2': ['iso1', 'iso2', 'iso3', 'iso4'],
        '5.3': ['iso1', 'iso2', 'iso3', 'iso4'],
        '5.4': ['iso3'],
        '6.1': ['iso1', 'iso2', 'iso3', 'iso4'],
        '6.1.1': ['iso3'],
        '6.1.2': ['iso2'],
        '6.1.3': ['iso1', 'iso2', 'iso3', 'iso4'],
        '6.2': ['iso1', 'iso2', 'iso3', 'iso4'],


    }
}

const Dropdown = ({ value, onChange }) => (
    <select value={value} onChange={onChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Partial">Partial</option>
    </select>
);

const MatrixRows = ({ clauseNodes, isoList, isoMap, questionIsoMap, level = 0, responses, setResponses, remarks, setRemarks, setClauseID, setQuestionMasterModel, setIsos, setIsoForClause }) => {
    const updateResponse = (clauseId, questionId, isoId, field, value) => {
        const key = `${questionId}_${isoId}`;
        setResponses(prev => ({
            ...prev,
            [key]: {
                ...(prev[key] || {}),
                clauseId,
                questionId,
                isoId,
                [field]: value
            },
        }));
    };

    return clauseNodes.map((clauseNode) => (
        <React.Fragment key={clauseNode.clause._id}>
            <tr className="bg-gray-100">
                <td
                    className="flex gap-2"
                    colSpan={isoList.length + 2}
                    style={{ paddingLeft: `${level * 16}px` }}
                >
                    <div className="font-semibold pb-2">

                        {clauseNode.clause.name !== 'Clause Master' && (`${clauseNode?.clause?.number ?? ""} ${clauseNode.clause.name}`)}
                    </div>
                    {
                        clauseNode.clause.name !== 'Clause Master'
                        &&
                        <div>
                            <span
                                className="text-sm border bg-white shadow-xl shadow-blue-200 font-bold align-top p-1 hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 duration-300"
                                onClick={() => {
                                    setIsos(isoList)
                                    setClauseID(clauseNode.clause._id);
                                    setQuestionMasterModel(true);
                                    setIsoForClause(isoMap)
                                }}
                            >
                                Q+
                            </span>
                        </div>
                    }
                </td>
            </tr>

            {clauseNode.questions.map((q) => (
                <tr key={q._id}>
                    <td className="sticky left-0 bg-white z-10 border border-slate-700 w-[400px] py-1" style={{ paddingLeft: `${level * 40}px` }}>{q.name} </td>
                    {isoList.map((iso) => {
                        // const isMapped = isoMap[clauseNode.clause._id]?.includes(iso._id);
                        const isMapped = questionIsoMap[q._id]?.includes(iso._id);
                        const key = `${q._id}_${iso._id}`;
                        return (
                            <td key={iso._id} className={`text-center border border-slate-700 ${isMapped ? 'bg-green-400' : 'bg-red-400'}`}>
                                {isMapped
                                    ?
                                    <Dropdown
                                        value={responses[key]?.response || ""}
                                        onChange={(e) => updateResponse(clauseNode.clause._id, q._id, iso._id, 'response', e.target.value)}
                                    />
                                    :
                                    null
                                }
                            </td>
                        );
                    })}
                    <td className="border border-slate-700 p-1">
                        <input
                            type="text"
                            placeholder="Add remarks"
                            className="w-full p-1 border border-gray-300"
                            value={remarks[q._id] || ""}
                            onChange={(e) => setRemarks(prev => ({ ...prev, [q._id]: e.target.value }))}
                        // onChange={(e) => {
                        //   const isoId = isoList.find(iso => isoMap[clauseNode.clause._id]?.includes(iso._id))?._id;
                        //   if (isoId) updateResponse(clauseNode.clause._id, q._id, isoId, 'remark', e.target.value);
                        // }}

                        />
                    </td>
                </tr>
            ))}

            {clauseNode.children?.length > 0 && (
                <MatrixRows
                    clauseNodes={clauseNode.children}
                    isoList={isoList}
                    isoMap={isoMap}
                    questionIsoMap={questionIsoMap}
                    level={level + 1}
                    responses={responses}
                    setResponses={setResponses}
                    remarks={remarks}
                    setRemarks={setRemarks}
                    setClauseID={setClauseID}
                    setQuestionMasterModel={setQuestionMasterModel}
                    setIsos={setIsos}
                    setIsoForClause={setIsoForClause}
                />
            )}
        </React.Fragment>
    ));
};

const API_URL = 'http://localhost:3009';
const MatrixFour = () => {

    const [matrix, setMatrix] = useState({});
    const [responses, setResponses] = useState({});
    const [remarks, setRemarks] = useState({});
    const [questionMasterModal, setQuestionMasterModel] = useState(false);
    const [clauseID, setClauseID] = useState(null);
    const [questionName, setQuestionName] = useState('');
    const [isos, setIsos] = useState([]);
    const [isoForClause, setIsoForClause] = useState({});
    const [isoTypeMaster, setIsoTypeMaster] = useState([]);
    const [selectIsoType, setSelectIsoType] = useState(null);

    const [selectConsultant, setSelectConsultant] = useState('');
    // const [selectLocation, setSelectLocation]

    const fetchISOTypeMaster = async () => {
        const response = await fetch(`${API_URL}/get-isotype-master`)
        const data = await response.json();
        setIsoTypeMaster(data.isoTypeMasterdata)
    }


    const fetchData = async () => {
        const response = await fetch(`${API_URL}/get-matrix-data?isoTypeMaster=${selectIsoType}`)
        const data = await response.json();
        // console.log(data);
        setIsoForClause(data.isoMap);
        setMatrix(data);
    };

    useEffect(() => {
        if(selectIsoType){
            fetchData();
        }
        fetchISOTypeMaster();
    }, [selectIsoType]);

    const handleSubmit = async () => {
        const payload = Object.values(responses).map(r => {
            const remark = remarks[r.questionId] || "";
            return {
                ...r,
                remark
            }
        });
        // console.log(payload);
        const res = await fetch(`${API_URL}/save-matrix`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ responses: payload })
        });
        const data = await res.json();
        alert(data.message);
    }

    // Not using this currently
    // function addQuestionToClause(clauseID, newQuestion, isoForClause) {
    //     setMatrix(prevMatrix => {
    //         // Deep copy yAxis tree
    //         const deepCopy = JSON.parse(JSON.stringify(prevMatrix));

    //         let clauseFound = false;

    //         function traverse(node) {
    //             if (node.clause._id === clauseID) {
    //                 node.questions.push(newQuestion);
    //                 clauseFound = true;
    //                 return;
    //             }
    //             for (let child of node.children) {
    //                 traverse(child);
    //                 if (clauseFound) return;
    //             }
    //         }

    //         for (let root of deepCopy.yAxis) {
    //             traverse(root);
    //             if (clauseFound) break;
    //         }

    //         return {
    //             ...deepCopy,
    //             questionIsoMap: {
    //                 ...deepCopy.questionIsoMap,
    //                 [newQuestion._id]: isoForClause?.[clauseID] || []
    //             }
    //         };
    //     });
    // }


    const handleAddNewQuestion = async (clauseID) => {
        // const id = questionIdCounter.current++;
        // addQuestionToClause(clauseID, {
        //     _id: `q${id}`,
        //     name: questionName
        // }, isoForClause);
        // setQuestionMasterModel(false);
        const response = await fetch(`${API_URL}/add-question-clause`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: questionName,
                masterId: clauseID,
                isoQuestion: isoForClause?.[clauseID]
            })
        })
        setQuestionMasterModel(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center border border-slate-500 p-2 rounded">
                <div className="flex gap-2">
                    <label>Select Consultant</label>
                    <select className="w-[200px]">
                        <option value="">Select</option>
                        <option value="Consultant A">Consultant A</option>
                        <option value="Consultant B">Consultant B</option>
                        <option value="Consultant C">Consultant C</option>
                        <option value="Consultant D">Consultant D</option>

                    </select>
                </div>           
                <div className="flex gap-2">
                    <label>Select Location</label>
                    <select className="w-[200px]">
                        <option value="">Select</option>
                        <option value="Location A">Location A</option>
                        <option value="Location B">Location B</option>
                        <option value="Location C">Location C</option>
                        <option value="Location D">Location D</option>

                    </select>
                </div>           
                <div className="flex gap-2">
                    <label>Select ISO Master Type</label>
                    <select
                        className="w-[200px]"
                        onChange={(e) => setSelectIsoType(e.target.value)}
                    >
                        <option value="">Select</option>
                        {isoTypeMaster.map((item) => (
                            <option
                                key={item._id}
                                value={item._id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {
                selectIsoType
                &&
                <>
                    <div className="max-w-full overflow-x-auto mb-10">
                        <div className="max-h-[480px] overflow-y-auto">
                            <table className="min-w-full border border-collapse border-slate-700">
                                <thead className="bg-blue-100">
                                    <tr>
                                        <th className="border border-slate-700 p-2 text-left">Clause / Question</th>
                                        {matrix?.xAxis?.map((iso) => (
                                            <th key={iso._id} className="border border-slate-700 p-2 text-center">
                                                {iso.name}
                                            </th>
                                        ))}
                                        <th className="w-[300px] border border-slate-700 p-2 text-left">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (
                                            <MatrixRows
                                                clauseNodes={matrix?.yAxis || []}
                                                isoList={matrix?.xAxis || []}
                                                isoMap={matrix?.isoMap || []}
                                                questionIsoMap={matrix?.questionIsoMap || []}
                                                responses={responses}
                                                setResponses={setResponses}
                                                remarks={remarks}
                                                setRemarks={setRemarks}
                                                setClauseID={setClauseID}
                                                setQuestionMasterModel={setQuestionMasterModel}
                                                setIsos={setIsos}
                                                setIsoForClause={setIsoForClause}
                                            />
                                        )
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
                </>
            }

            {
                questionMasterModal
                &&
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 p-5">
                    <div className="w-[600px] rounded bg-white p-10 overflow-y-auto">
                        {/* <div>{JSON.stringify(isoForClause)}</div> */}
                        <div className="flex justify-between">
                            <span className="font-semibold underline">Add Question to Clause</span>
                            <span
                                className="font-semibold text-lg hover:cursor-pointer"
                                onClick={() => {
                                    setQuestionMasterModel(false)
                                    setIsos(matrix?.xAxis || [])
                                }}
                            >
                                X
                            </span>
                        </div>
                        <div className="mt-5 flex flex-col gap-5">
                            <span className="text-lg font-semibold">
                                Question Name
                                {/* {clauseID} */}
                            </span>
                            <input
                                type="text"
                                className="border border-slate-500 rounded p-1 px-2 focus:outline-none"
                                placeholder="Add Here...."
                                value={questionName}
                                onChange={(e) => setQuestionName(e.target.value)}
                            />

                            <div>
                                <label className="text-xl font-semibold">ISO Attributes</label>
                                <div className="flex flex-col mt-2">
                                    {isos.map((item) => (
                                        <div className="flex gap-2 items-center">
                                            {(matrix?.isoMap?.[clauseID] || [])?.includes(item._id)
                                                &&
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        checked={isoForClause?.[clauseID]?.includes(item._id)}
                                                        className="align-middle"
                                                        value={item._id}
                                                        onChange={(e) => {
                                                            const isChecked = e.target.checked;
                                                            setIsoForClause(prev => {
                                                                const currentList = prev[clauseID] || [];

                                                                const updatedList = isChecked
                                                                    ? [...new Set([...currentList, item._id])] // Add item._id if checked
                                                                    : currentList.filter(id => id !== item._id); // Remove if unchecked

                                                                return {
                                                                    ...prev,
                                                                    [clauseID]: updatedList
                                                                };
                                                            });
                                                        }}
                                                    />
                                                    <label className="align-middle">{item.name}</label>
                                                </>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="border border-slate-500"
                                onClick={() => handleAddNewQuestion(clauseID)}
                            >
                                Add
                                {/* {clauseID} */}
                            </button>

                        </div>
                    </div>
                </div>

            }
        </div>

    )
}


export default MatrixFour;