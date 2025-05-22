import React, { useEffect, useState } from "react";

const MatrixThree = () => {
    const [clauses, setClauses] = useState([]);
    const [isos, setIsos] = useState([]);
    const [matrixCombination, setMatrixCombination] = useState({});
    const [formData, setFormData] = useState({});
    const [formRemark, setFormRemark] = useState({});

    const fetchData = async () => {
        const { nestedData } = await fetch('http://localhost:3001/api/mapping/getClauseMaster').then(res => res.json());
        const { dvcIsoMasterData } = await fetch('http://localhost:3001/api/mapping/getDvcIsoMaster').then(res => res.json());
        const { pairings,dataAudit,auditRemark } = await fetch('http://localhost:3001/api/mapping/getMatrixMapping').then(res => res.json());

        setClauses(nestedData);
        setIsos(dvcIsoMasterData);
        setMatrixCombination(pairings);
        setFormData(dataAudit);
        setFormRemark(auditRemark);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (clauseId,isoId,field,value) => {
        const key = `${clauseId}-${isoId}`;
        setFormData(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value
            }
        }))
    }

    const handleRemarkChange = (clauseId,value) => {
        const key = clauseId
        setFormRemark(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                remark: value
            }
        }))
    }

    const renderClauseRows = (clauses, level = 0) => {
        return clauses.map((clause) => (
            <React.Fragment key={clause._id}>
                <tr>
                    <td className={`p-2 w-[250px] ${level === 0 ? 'font-bold border' : 'border'}`} style={{paddingLeft: `${level*10}px`}}>
                        {clause.name}
                    </td>
                    {level === 0 ? (
                        <>
                            {isos.map((_, i) => (
                                <td key={`empty-${i}`} className="w-[100px] border"></td>
                            ))}
                        </>
                    ) : (
                        <>
                            {isos.map(iso => (
                                <td
                                    key={`${clause._id}-${iso._id}`}
                                    className={`w-[100px] border p-2 ${
                                        matrixCombination[`${clause._id}-${iso._id}`]
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                    }`}
                                >
                                    {matrixCombination[`${clause._id}-${iso._id}`] && (
                                        <select 
                                            className="w-full"
                                            value={formData[`${clause._id}-${iso._id}`]?.dropDownValue || ""}
                                            onChange={(e) => handleChange(clause._id,iso._id,'dropDownValue',e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                            <option value="Partial">Partial</option>
                                        </select>
                                    )}
                                </td>
                            ))}
                        </>
                    )}
                    <td className="border p-2 w-[250px]">
                            {level !== 0 
                            &&
                            <textarea 
                                className="w-full p-1 focus:outline-none border border-slate-400"
                                value={formRemark[`${clause._id}`]?.remark || ""}
                                onChange={(e) => handleRemarkChange(clause._id,e.target.value)}
                            ></textarea>
                        }
                    </td>
                </tr>
                {clause.children?.length > 0 && renderClauseRows(clause.children, level + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div className="p-2 space-y-2">
            <div className="max-w-full overflow-x-auto mb-10">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full table-fixed border-collapse">
                        <thead className="sticky top-0 z-10 bg-slate-300">
                            <tr>
                                <th className="border p-2 w-[250px] bg-slate-300"></th>
                                {isos.map(iso => (
                                    <th key={iso._id} className="border p-2 w-[100px] bg-slate-300">{iso.name}</th>
                                ))}
                                <th className="border p-2 w-[250px] bg-slate-300">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderClauseRows(clauses)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-end mb-10">
                <button 
                    className="border px-5 py-1 text-lg bg-blue-500 text-white rounded">
                    Save
                </button>
            </div>

            <div className="mt-20">
                {JSON.stringify(formData)}
            </div>

            <div className="pt-20">
                {JSON.stringify(formRemark)}
            </div>
        </div>
    );
};

export default MatrixThree;
