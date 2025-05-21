import React, { useEffect, useState } from "react";


const MatrixThree = () => {
    const [clauses, setClauses] = useState([]);
    const [isos, setIsos] = useState([]);
    const [matrixCombination,setMatrixCombination] = useState({});

    const fetchData = async () => {
        const { nestedData } = await fetch('http://localhost:3001/api/mapping/getClauseMaster').then(res => res.json());
        const { dvcIsoMasterData } = await fetch('http://localhost:3001/api/mapping/getDvcIsoMaster').then(res => res.json());
        const { pairings } = await fetch('http://localhost:3001/api/mapping/getMatrixMapping').then(res => res.json());
        
        setClauses(nestedData);
        setIsos(dvcIsoMasterData);
        setMatrixCombination(pairings);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderClauseRows = (clauses, level = 0) => {
        return clauses.map((clause) => (
            <React.Fragment key={clause._id}>
                <tr>
                    <td className={`p-2 ${level === 0 ? 'font-bold border' : 'border'}`} style={{ paddingLeft: `${level * 5}px` }}>
                        {clause.name}
                    </td>
                    {level === 0 
                    ?
                    <>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                    </>
                    :
                    <>
                    {isos.map(iso =>{
                        return (
                            <td className={`border p-2 ${matrixCombination[`${clause._id}-${iso._id}`] ? 'bg-green-400': 'bg-red-500'}`}>
                                {/* {`${clause.name.substring(0,3)}-${iso.name}`}  */}
                                {
                                    matrixCombination[`${clause._id}-${iso._id}`]
                                    ?
                                    <select className="w-full">
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="Partial">Partial</option>
                                    </select>
                                    :
                                    ''
                                }
                            </td>
                        )
                    })}                    
                    </>
                    
                    }
                    
                </tr>
                {clause.children && clause.children.length > 0 && renderClauseRows(clause.children, level + 1)}
            </React.Fragment>
        ));
    };


    return (
        <>
            <table className="table-auto border-collapse border">
                <thead className="bg-slate-300">
                    <tr>
                        <th className="border p-2"></th>
                        
                        {isos.map(iso => (
                            <th key={iso._id} className="border p-2">{iso.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderClauseRows(clauses)}
                </tbody>
            </table>            
        </>
    )
};

export default MatrixThree;