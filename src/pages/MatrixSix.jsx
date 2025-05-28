import React, { useEffect, useState } from "react";


// const MatrixRows = ({ clauseNodes, isoList, isoMap, questionIsoMap, level = 0, responses, setResponses, remarks, setRemarks, setClauseID, setQuestionMasterModel, setIsos, setIsoForClause }) => {
//     const updateResponse = (clauseId, questionId, isoId, field, value) => {
//         const key = `${questionId}_${isoId}`;
//         setResponses(prev => ({
//             ...prev,
//             [key]: {
//                 ...(prev[key] || {}),
//                 clauseId,
//                 questionId,
//                 isoId,
//                 [field]: value
//             },
//         }));
//     };

//     return clauseNodes.map((clauseNode) => (
//         <React.Fragment key={clauseNode.clause._id}>
//             <tr className="bg-gray-100">
//                 <td
//                     className="flex gap-2"
//                     colSpan={isoList.length + 2}
//                     style={{ paddingLeft: `${level * 16}px` }}
//                 >
//                     <div className="font-semibold pb-2">

//                         {clauseNode.clause.name !== 'Clause Master' && (`${clauseNode?.clause?.number ?? ""} ${clauseNode.clause.name}`)}
//                     </div>
//                     {
//                         clauseNode.clause.name !== 'Clause Master'
//                         &&
//                         <div>
//                             <span
//                                 className="text-sm border bg-white shadow-xl shadow-blue-200 font-bold align-top p-1 hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 duration-300"
//                                 onClick={() => {
//                                     setIsos(isoList)
//                                     setClauseID(clauseNode.clause._id);
//                                     setQuestionMasterModel(true);
//                                     setIsoForClause(isoMap)
//                                 }}
//                             >
//                                 Q+
//                             </span>
//                         </div>
//                     }
//                 </td>
//             </tr>

//             {clauseNode.questions.map((q) => (
//                 <tr key={q._id}>
//                     <td className="sticky left-0 bg-white z-10 border border-slate-700 w-[400px] py-1" style={{ paddingLeft: `${level * 40}px` }}>{q.name} </td>
//                     {isoList.map((iso) => {
//                         // const isMapped = isoMap[clauseNode.clause._id]?.includes(iso._id);
//                         const isMapped = questionIsoMap[q._id]?.includes(iso._id);
//                         const key = `${q._id}_${iso._id}`;
//                         return (
//                             <td key={iso._id} className={`text-center border border-slate-700 ${isMapped ? 'bg-green-400' : 'bg-red-400'}`}>
//                                 {isMapped
//                                     ?
//                                     <Dropdown
//                                         value={responses[key]?.response || ""}
//                                         onChange={(e) => updateResponse(clauseNode.clause._id, q._id, iso._id, 'response', e.target.value)}
//                                     />
//                                     :
//                                     null
//                                 }
//                             </td>
//                         );
//                     })}
//                     <td className="border border-slate-700 p-1">
//                         <input
//                             type="text"
//                             placeholder="Add remarks"
//                             className="w-full p-1 border border-gray-300"
//                             value={remarks[q._id] || ""}
//                             onChange={(e) => setRemarks(prev => ({ ...prev, [q._id]: e.target.value }))}
//                         // onChange={(e) => {
//                         //   const isoId = isoList.find(iso => isoMap[clauseNode.clause._id]?.includes(iso._id))?._id;
//                         //   if (isoId) updateResponse(clauseNode.clause._id, q._id, isoId, 'remark', e.target.value);
//                         // }}

//                         />
//                     </td>
//                 </tr>
//             ))}

//             {clauseNode.children?.length > 0 && (
//                 <MatrixRows
//                     clauseNodes={clauseNode.children}
//                     isoList={isoList}
//                     isoMap={isoMap}
//                     questionIsoMap={questionIsoMap}
//                     level={level + 1}
//                     responses={responses}
//                     setResponses={setResponses}
//                     remarks={remarks}
//                     setRemarks={setRemarks}
//                     setClauseID={setClauseID}
//                     setQuestionMasterModel={setQuestionMasterModel}
//                     setIsos={setIsos}
//                     setIsoForClause={setIsoForClause}
//                 />
//             )}
//         </React.Fragment>
//     ));
// };

const MatrixRows = ({ clauseNodes, isoList, level=0}) => {
    
    return clauseNodes?.map((clauseNode) => (
        <React.Fragment key={clauseNode.clause._id}>
            {
                clauseNode.clause.name !== 'Clause Master' && 
                <tr className="bg-gray-100">
                    <td style={{ paddingLeft: `${level * 16}px` }}>
                        {clauseNode.clause.name}
                    </td>
                    {isoList.map(iso =>(
                        <td className="text-center">
                            <input type="checkbox"/>
                        </td>
                    ))}
                </tr>
            }
            {clauseNode.questions.map((q) => (
                <tr key={q._id}>
                    <td className="sticky left-0 bg-white z-10 border border-slate-700 w-[400px] py-1" style={{ paddingLeft: `${level * 40}px` }}>{q.name}</td>
                    {isoList.map((iso) => (
                        <td key={iso._id} className="text-center">
                            <input type="checkbox"/>
                        </td>
                    ))}
                </tr>
            ))}
            {clauseNode.children?.length > 0 && (
                <MatrixRows
                    clauseNodes={clauseNode.children}
                    isoList={isoList}
                    level={level+1}
                />
            )}

        </React.Fragment>
    ))
}
const API_URL = 'http://localhost:3009';
const MatrixSix = () => {
    const [matrix, setMatrix] = useState({});

    const fetchData  = async () => {
        const response = await fetch(`${API_URL}/get-matrix-clause-question-iso`);
        const data = await response.json();
        setMatrix(data);
    }

    useEffect(()=>{
        fetchData();
    });

    return (
        <div>
            <div className="mt-5 overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto relative">
                    <table className="border-collapse border w-full min-w-max">
                        <thead className="bg-gray-200">
                            <th className="border border-slate-400 p-2 text-left sticky top-0 left-0 z-30 bg-gray-200">
                                Clauses
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
                                />
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MatrixSix;