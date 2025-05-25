import React, { useEffect, useState } from "react";
import axios from "axios";

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
            { _id: 'q2', name: '2. Is there a commitment from top management to integrate the IMS into the organization’s business processes?' } ],
          children: []
        },
        {
          clause: { _id: '5.2', name: '5.2 Policy' },
          questions: [ 
            { _id: 'q1', name: '1. Is there a documented Quality, Environment, Health & Safety and Energy Policy with the strategic direction?' },
            { _id: 'q2', name: '2. Is Policy displayed in offices & workplace?' } ],
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
            { _id: 'q1', name: '1. Is there an established process for the consultation and participation of workers at all levels?' } ],
          children: []
        },
      ]
    },
    {
      clause: { _id: '6', name: '6. Actions to address risks and opportunities ' },
      questions: [ { _id: 'q1', name: 'Question 1' } ],
      children: [
        {
          clause: { _id: '6.1', name: '6.1 Actions to address risks and opportunities ' },
          questions: [ 
            { _id: 'q1', name: '1. Have you conducted a risk assessment and identified risks and opportunities?' },
            { _id: 'q2', name: '2. Are actions to address risks and opportunities planned and integrated into the IMS? ' } ],
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
                questions: [ { _id: 'q1', name: '1. Are Aspects & Impacts identified?. Are significant aspects are evaluated?' } ],
                children: []
            },
            {
                clause: { _id: '6.1.3', name: '6.1.3 Identification of Legal & other requirements' },
                questions: [ { _id: 'q1', name: '1. Are Legal & other requirements identified & documented?' } ],
                children: []
            },
            {
                clause: { _id: '6.1.4', name: '6.1.4 Planning actions' },
                questions: [ { _id: 'q1', name: 'Question 1' },{ _id: 'q2', name: 'Question 2' } ],
                children: []
            },

            ]
        },
        {
            clause: {_id: "6.2", name:"6.2 Objectives & Targets"},
            questions: [
                {_id: 'q1', name: '1. Is there a process for setting and reviewing objectives and plans to achieve them?'},
                {_id: 'q2', name: '2. Have quality objectives been established at relevant functions and levels?'}
            ],
            children:[]
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

    a3: ['iso1','iso2','iso3','iso4']
  }
}

const Dropdown = ({ value }) => (
  <select defaultValue={value}>
    {/* <option value={value}>{value}</option> */}
    <option value="">Select</option>
    <option>Yes</option>
    <option>No</option>
    <option>Partial</option>
    {/* Add more options here if needed */}
  </select>
);

const MatrixRows = ({ clauseNodes, isoList, isoMap, level=0 }) => {
  return clauseNodes.map((clauseNode) => (
    <React.Fragment key={clauseNode.clause._id}>
      <tr className="bg-gray-100 font-semibold">
        <td colSpan={isoList.length + 2} style={{paddingLeft: `${level*16}px`}}>{clauseNode.clause.name}</td>
      </tr>

      {clauseNode.questions.map((q) => (
        <tr key={q._id}>
          <td className="w-[400px] py-1 border border-slate-700"  style={{paddingLeft: `${level*40}px`}}>{q.name} </td>
          {isoList.map((iso) => {
            const isMapped = isoMap[clauseNode.clause._id]?.includes(iso._id);
            return (
              <td key={iso._id} className={`text-center border border-slate-700 ${isMapped ? 'bg-green-400':'bg-red-400'}`}>
                {isMapped ? <Dropdown value={""} /> : null}
              </td>
            );
          })}
          <td className="border border-slate-700 p-1">
            <input
              type="text"
              placeholder="Add remarks"
              className="w-full p-1 border border-gray-300"
            />
          </td>
        </tr>
      ))}

      {clauseNode.children?.length > 0 && (
        <MatrixRows
          clauseNodes={clauseNode.children}
          isoList={isoList}
          isoMap={isoMap}
          level = {level + 1}
        />
      )}
    </React.Fragment>
  ));
};


const MatrixFour = () => {

    const [matrix,setMatrix] = useState([]);

    

    const fetchData = async() => {
        const response = await fetch(`http://localhost:3009/get-matrix-data`)
        const data = await response.json();
        console.log(data);
        setMatrix(data);
    };
    useEffect(() =>{
        fetchData();
    },[]);

    return (
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
        {/* <MatrixRows 
            clauseNodes={matrix.yAxis} 
            isoList={matrix.xAxis} 
            isoMap={matrix.isoMap} 
        /> */}
        {
   (
    <MatrixRows 
      clauseNodes={matrix?.yAxis || []} 
      isoList={matrix?.xAxis || []} 
      isoMap={matrix?.isoMap || []} 
    />
  )
}
      </tbody>
    </table>
    )
}


export default MatrixFour;