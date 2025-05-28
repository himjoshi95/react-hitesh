import React, { useEffect, useState } from "react";
import axios from "axios";

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
            <option key={i} value={o.masterType}>{o.name}</option>
        ))}
        {/* Add more options here if needed */}
    </select>
);

const CheckboxCell = ({ checked, onChange }) => (
    <td className="text-center border p-2">
        <input type="checkbox" checked={checked} onChange={onChange} />
    </td>
);

// const renderTreeRows = (nodes, level = 0, toMasterList, selected, toggleMapping) => {
//     return nodes.map(node => (
//         <React.Fragment key={node._id}>
//             <tr>
//                 <td className="border p-2" style={{ paddingLeft: `${level * 20}px` }}>{node.name}</td>
//                 {toMasterList.map(to => (
//                     <CheckboxCell
//                         key={to._id}
//                         checked={selected[`${node._id}_${to._id}`] || false}
//                         onChange={() => toggleMapping(node._id, to._id)}
//                     />
//                 ))}
//             </tr>
//             {node.children?.length > 0 && renderTreeRows(node.children, level + 1, toMasterList, selected, toggleMapping)}
//         </React.Fragment>
//     ));
// };

// const renderTreeRows = (nodes, level = 0, toMasterList, selected, toggleMapping) => {
//     return nodes.map(node => (
//         <React.Fragment key={node._id}>
//             <tr>
//                 <td
//                     className="border p-2 sticky left-0 bg-white z-10"
//                     style={{ paddingLeft: `${level * 20}px` }}
//                 >
//                     {node.name}
//                 </td>
//                 {toMasterList.map(to => (
//                     <td key={to._id} className="text-center border p-2">
//                         <input
//                             type="checkbox"
//                             checked={selected[`${node._id}_${to._id}`] || false}
//                             onChange={() => toggleMapping(node._id, to._id)}
//                         />
//                     </td>
//                 ))}
//             </tr>
//             {node.children?.length > 0 &&
//                 renderTreeRows(node.children, level + 1, toMasterList, selected, toggleMapping)}
//         </React.Fragment>
//     ));
// };

const renderTreeRows = (nodes, level = 0, toMasterList, selected, toggleMapping) => {
    return nodes.map(node => (
        <React.Fragment key={node._id}>
            <tr>
                <td
                    className="border p-2 sticky left-0 bg-white z-10"
                    style={{ paddingLeft: `${level * 20}px`, minWidth: '250px' }}
                >
                    {node.name}
                </td>
                {toMasterList.map(to => (
                    <td key={to._id} className="text-center border p-2">
                        <input
                            type="checkbox"
                            checked={selected[`${node._id}_${to._id}`] || false}
                            onChange={() => toggleMapping(node._id, to._id)}
                        />
                    </td>
                ))}
            </tr>
            {node.children?.length > 0 &&
                renderTreeRows(node.children, level + 1, toMasterList, selected, toggleMapping)}
        </React.Fragment>
    ));
};


const API_URL = 'http://localhost:3009'
const Mapping = () => {

    const [mainMasters, setMainMasters] = useState([]);
    const [fromType, setFromType] = useState('');
    const [toType, setToType] = useState('');

    const [fromTree, setFromTree] = useState([]);
    const [toList, setToList] = useState([]);
    const [selected, setSelected] = useState({});


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

    useEffect(() => {
        const fetchData = async () => {
            const [fromRes, toRes] = await Promise.all([
                axios.get(`${API_URL}/matrix-nested/${fromType}`),
                axios.get(`${API_URL}/matrix-nested/${toType}`)
            ]);
            setFromTree(fromRes.data);
            setToList(flattenTree(toRes.data));
        };
        if (fromType !== '' && toType !== '') {
            fetchData();
        }
    }, [fromType, toType]);

    const flattenTree = (tree) => {
        const result = [];
        const traverse = (nodes, level = 0) => {
            nodes.forEach(n => {
                result.push({ ...n, level });
                if (n.children) traverse(n.children, level + 1);
            });
        };
        traverse(tree);
        return result;
    };

    const toggleMapping = (fromId, toId) => {
        const key = `${fromId}_${toId}`;
        setSelected(prev => ({ ...prev, [key]: !prev[key] }));
    };

    function getMatrixTitle(fromType, toType) {
        const cleanFrom = fromType.replace(" Master", "");
        const cleanTo = toType.replace(" Master", "");
        return `${cleanFrom}-${cleanTo}`;
    }

    const handleSubmit = async () => {
        const mappings = Object.entries(selected)
            .filter(([_, v]) => v)
            .map(([key]) => {
                const [fromId, toId] = key.split('_');
                return { fromId, toId };
            });

        const title = getMatrixTitle(fromType, toType);

        await axios.post(`${API_URL}/add-mappings`, {
            mappings,
            mappingType: title
        });

        alert('Mappings saved!');
    };



    return (
        <div className="min-h-screen">

            <div className="mb-5">
                {JSON.stringify(selected)}
                {/* {mappingType} */}
            </div>
            {/* Above section */}
            <div className="flex flow-row gap-5">
                <div className="border basis-1/2 border-slate-500 p-2">
                    <h2 className="font-semibold text-lg">From :</h2>
                    <div className="flex justify-end">
                        <div className="flex flex-col">
                            <div>{fromType}</div>
                            <Dropdown value={fromType || ""} options={mainMasters} setValue={setFromType} />
                        </div>
                    </div>
                </div>
                <div className="border basis-1/2 border-slate-500 p-2">
                    <h2 className="font-semibold text-lg">To:</h2>
                    <div className="flex justify-end">
                        <div className="flex flex-col">
                            <div>{toType}</div>
                            <Dropdown value={toType || ""} options={mainMasters} setValue={setToType} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mapping Section */}
            {
                fromType &&
                toType &&
                (
                    // <div className="mt-5">
                    //     <div className="overflow-x-auto ">
                    //         <div className="max-h-[480px] overflow-y-auto">
                    //             <table className="border-collapse border w-full min-w-max">
                    //                 <thead>
                    //                     <tr className="bg-gray-200">
                    //                         <th className="border p-2 text-left sticky left-0 bg-gray-200 z-10">
                    //                             {fromType}
                    //                         </th>
                    //                         {toList.map(to => (
                    //                             <th
                    //                                 key={to._id}
                    //                                 className="sticky border p-2 text-center break-words align-top"
                    //                                 style={{
                    //                                     paddingLeft: `${to.level * 20}px`,
                    //                                     maxWidth: '120px', // adjust as needed
                    //                                     minWidth: '80px',
                    //                                     wordWrap: 'break-word'
                    //                                 }}
                    //                             >
                    //                                 {to.name}
                    //                             </th>
                    //                         ))}
                    //                     </tr>
                    //                 </thead>
                    //                 <tbody>
                    //                     {renderTreeRows(fromTree, 0, toList, selected, toggleMapping)}
                    //                 </tbody>
                    //             </table>
                    //         </div>
                    //     </div>

                    //     <button
                    //         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    //     onClick={handleSubmit}
                    //     >
                    //         Save Mapping
                    //     </button>
                    // </div>
                    <div className="mt-5 overflow-x-auto">
                        <div className="max-h-[480px] overflow-y-auto relative">
                            <table className="border-collapse border w-full min-w-max">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border p-2 text-left sticky top-0 left-0 z-30 bg-gray-200">
                                            {fromType}
                                        </th>
                                        {toList.map(to => (
                                            <th
                                                key={to._id}
                                                className="border p-2 text-center sticky top-0 bg-gray-200 z-20"
                                                style={{
                                                    paddingLeft: `${to.level * 20}px`,
                                                    minWidth: '100px',
                                                    maxWidth: '150px',
                                                    wordWrap: 'break-word',
                                                }}
                                            >
                                                {to.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTreeRows(fromTree, 0, toList, selected, toggleMapping)}
                                </tbody>
                            </table>
                        </div>

                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={handleSubmit}
                        >
                            Save Mapping
                        </button>
                    </div>



                )
            }

        </div>
    )
};

export default Mapping;