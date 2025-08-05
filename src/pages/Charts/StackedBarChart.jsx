import React, { useEffect, useState } from 'react';
import { Bar,Pie } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from "axios";

ChartJS.register(ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend,ChartDataLabels);

// const matrixData = [
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the internal issues relevant to the management systems? ",
//     "iso": "IMS",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the internal issues relevant to the management systems? ",
//     "iso": "ISO 9001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the internal issues relevant to the management systems? ",
//     "iso": "ISO 14001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the internal issues relevant to the management systems? ",
//     "iso": "ISO 45001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the internal issues relevant to the management systems? ",
//     "iso": "ISO 50001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the external issues relevant to the management systems?",
//     "iso": "ISO 9001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the external issues relevant to the management systems?",
//     "iso": "ISO 14001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the external issues relevant to the management systems?",
//     "iso": "ISO 45001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the external issues relevant to the management systems?",
//     "iso": "ISO 50001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.1 Understanding the organization and its context",
//     "question": "Have you identified and documented the external issues relevant to the management systems?",
//     "iso": "IMS",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.2 Understanding the needs and expectations of interested parties",
//     "question": "Are the needs and expectations of interested parties determined and addressed?",
//     "iso": "IMS",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.2 Understanding the needs and expectations of interested parties",
//     "question": "Are the needs and expectations of interested parties determined and addressed?",
//     "iso": "ISO 9001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.2 Understanding the needs and expectations of interested parties",
//     "question": "Are the needs and expectations of interested parties determined and addressed?",
//     "iso": "ISO 14001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.2 Understanding the needs and expectations of interested parties",
//     "question": "Are the needs and expectations of interested parties determined and addressed?",
//     "iso": "ISO 45001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.2 Understanding the needs and expectations of interested parties",
//     "question": "Are the needs and expectations of interested parties determined and addressed?",
//     "iso": "ISO 50001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.3 Determining the scope of the integrated management system",
//     "question": "Is the scope of the IMS defined and maintained?",
//     "iso": "IMS",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.3 Determining the scope of the integrated management system",
//     "question": "Is the scope of the IMS defined and maintained?",
//     "iso": "ISO 9001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.3 Determining the scope of the integrated management system",
//     "question": "Is the scope of the IMS defined and maintained?",
//     "iso": "ISO 14001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.3 Determining the scope of the integrated management system",
//     "question": "Is the scope of the IMS defined and maintained?",
//     "iso": "ISO 45001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.3 Determining the scope of the integrated management system",
//     "question": "Is the scope of the IMS defined and maintained?",
//     "iso": "ISO 50001",
//     "response": "No"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Have all the core and support processes needed for the MS been identified and documented?",
//     "iso": "IMS",
//     "response": "Partial"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Have all the core and support processes needed for the MS been identified and documented?",
//     "iso": "ISO 9001",
//     "response": "Partial"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Have all the core and support processes needed for the MS been identified and documented?",
//     "iso": "ISO 14001",
//     "response": "Partial"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Have all the core and support processes needed for the MS been identified and documented?",
//     "iso": "ISO 45001",
//     "response": "Partial"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Have all the core and support processes needed for the MS been identified and documented?",
//     "iso": "ISO 50001",
//     "response": "Partial"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are process descriptions clear, including inputs, outputs, and interactions?",
//     "iso": "ISO 9001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are process descriptions clear, including inputs, outputs, and interactions?",
//     "iso": "IMS",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Is there a process map or flowchart illustrating process relationships?",
//     "iso": "IMS",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Is there a process map or flowchart illustrating process relationships?",
//     "iso": "ISO 9001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Is there a process map or flowchart illustrating process relationships?",
//     "iso": "ISO 14001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Is there a process map or flowchart illustrating process relationships?",
//     "iso": "ISO 45001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Is there a process map or flowchart illustrating process relationships?",
//     "iso": "ISO 50001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are the processes monitored, measured, and analyzed regularly to ensure they are achieving intended results?",
//     "iso": "ISO 9001",
//     "response": "Partial"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are the processes monitored, measured, and analyzed regularly to ensure they are achieving intended results?",
//     "iso": "IMS",
//     "response": "Partial"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are process owners assigned and responsible for the performance and continual improvement of their respective processes?",
//     "iso": "ISO 9001",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are process owners assigned and responsible for the performance and continual improvement of their respective processes?",
//     "iso": "IMS",
//     "response": "Yes"
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are changes to processes evaluated, approved, and documented before implementation?",
//     "iso": "ISO 9001",
//     "response": ""
//   },
//   {
//     "mainClause": "4 Context of the Organization",
//     "clause": "4.4 Management system(MS) & its processess",
//     "question": "Are changes to processes evaluated, approved, and documented before implementation?",
//     "iso": "IMS",
//     "response": "Yes"
//   }
// ];


const StackedBarChart = () => {

	const [file, setFile] = useState(null);
	const [selectedClause, setSelectedClause] = useState('all');
	const [data, setData] = useState({});
	const [options, setOptions] = useState({});

	const [selectedIso , setSelectedIso] = useState('');
	const [selectedSubClause, setSelectedSubClause] = useState('');
	const [chartData, setChartData] = useState({});

	useEffect(() => {
		axios.get(`http://localhost:3008/get-ims-data?clause=${encodeURIComponent(selectedClause)}`)
			.then(response => {
				// console.log(response.data.count);
				setData(response.data?.chart?.data);
				setOptions(response.data?.chart?.options)
			})
			.catch(error => console.log(error.message));
	}, [selectedClause]);

	useEffect(()=>{
		if(selectedIso && selectedSubClause){
			axios.get(`http://localhost:3008/get-ims-data-subClause?subClause=${encodeURIComponent(selectedSubClause)}&isoName=${selectedIso}`)
			.then(response => {
				// console.log(response.data.pieData)
				setChartData(response.data.pieData)
			})
			.catch(error => console.log(error.message))
		}
	},[selectedIso,selectedSubClause]);

	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (!file) return alert("Please select a file!");

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await axios.post("http://localhost:3008/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Upload successful:", response.data);
		} catch (error) {
			console.error("Upload error:", error);
		}
	};
	
	// const pieChartData = {
	// 	labels: ['Yes', 'No', 'Partial'],
	// 	datasets: [
	// 		{
	// 			label: 'Responses',
	// 			data: [chartData.Yes, chartData.No, chartData.Partial],
	// 			backgroundColor: ['#4CAF50', '#F44336', '#FFC107'], // Yes, No, Partial colors
	// 			borderWidth: 1
	// 		}
    // 	]
	// };

	const labels = ['Yes', 'No', 'Partial'];
	const values = [chartData.Yes, chartData.No, chartData.Partial];
	const total = values.reduce((a, b) => a + b, 0);

	const pieChartData = {
			labels,
			datasets: [
			{
				data: values,
				backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
				borderWidth: 1
			}
			]
  	};

	const pieChartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom'
			},
			datalabels: {
				color: '#fff',
				font: {
				weight: 'bold',
				size: 14
				},
				// formatter: (value, context) => {
				// if (total === 0) return `${context.chart.data.labels[context.dataIndex]} (0) 0%`;
				// const percentage = ((value / total) * 100).toFixed(1);
				// const label = context.chart.data.labels[context.dataIndex];
				// return `${label} (${value}) ${percentage}%`;
				// }
				formatter: (value, context) => {
					if (value === 0) {
						return ''; // ✅ Don't display anything for zero values
					}
					const percentage = ((value / total) * 100).toFixed(1);
					const label = context.chart.data.labels[context.dataIndex];
					return `${label} (${value}) ${percentage}%`;
				}
			}
		}
  	};

	return (
		<div>
			<div className='grid grid-cols-2'>
				<div>
					<div className='flex gap-4 items-center mb-4'>
						<label className='font-semibold text-xl'>Organisation</label>
						<h1>Hydel Power Stations/Dam - MHS, Maithon</h1>
					</div>
					<div className='mb-4 flex gap-16'>
						<label className='font-semibold text-xl'>Clauses</label>
						<select
							className='border border-black rounded py-1 items-center'
							value={selectedClause}
							onChange={(e) => setSelectedClause(e.target.value)}
						>
							<option value="all">All</option>
							<option value="4 Context of the Organization">4 Context of the Organization</option>
							<option value="5 Leadership">5 Leadership</option>
							<option value="6 Actions to address Risks & Opportunities">6 Actions to address Risks & Opportunities</option>
							<option value="7 Support">7 Support</option>
							<option value="8 Opeartional Control">8 Opeartional Control</option>
							<option value="9 Performance Evaluation">9 Performance Evaluation</option>
							<option value="10 Improvement">10 Improvement</option>
						</select>
					</div>
				</div>
				<div className='flex justify-end'>
					<div className="p-4">
						<input type="file" accept=".xlsx, .xls" onChange={handleChange} />
						<button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
							Upload Excel
						</button>
					</div>
				</div>
			</div>
			<div style={{ width: '800px', height: '400px' }}>
				<h2 className="text-lg font-bold mb-4 text-center">{selectedClause === 'all' ? 'All Clauses': selectedClause}</h2>
				{Object.keys(data).length === 0 && Object.keys(options).length === 0 ? (
					<p>Loading or no chart data</p>
				) : (
					<Bar data={data} options={options} />
				)}
			</div>

			<div className='mt-24 mb-[500px]'>
				<div className='flex gap-16 items-center mb-4'>
						<label className='font-semibold text-xl'>Category</label>
						<h1>Hydel Power Stations/Dam</h1>
				</div>				
				<div className='flex gap-[70px] items-center mb-4'>
						<label className='font-semibold text-xl'>Location</label>
						<h1>MHS, Maithon</h1>
				</div>				
				<div className='mb-4 flex gap-[105px]'>
					<label className='font-semibold text-xl'>ISOS</label>
					<select
						className='border border-black rounded py-1 px-1 items-center focus:outline-none'
						value={selectedIso || ""}
						onChange={(e) => setSelectedIso(e.target.value)}
					>
						<option value=""> Select Here </option>
						<option value="IMS">IMS</option>
						<option value="ISO 9001">ISO 9001</option>
						<option value="ISO 14001">ISO 14001</option>
						<option value="ISO 45001">ISO 45001</option>
						<option value="ISO 50001">ISO 50001</option>
					</select>
				</div>
				<div className='mb-4 flex gap-10'>
					<label className='font-semibold text-xl'>Sub-Clauses</label>
					<select
						className='border border-black rounded py-1 px-1 items-center focus:outline-none'
						value={selectedSubClause || ""}
						onChange = {(e) => setSelectedSubClause(e.target.value)}
					>
						<option value=""> Select Here </option>
						<option value="4.1 Understanding the organization and its context">4.1 Understanding the organization and its context</option>
						<option value="4.2 Understanding the needs and expectations of interested parties">4.2 Understanding the needs and expectations of interested parties</option>
						<option value="4.3 Determining the scope of the integrated management system">4.3 Determining the scope of the integrated management system</option>
						<option value="4.4 Management system(MS) & its processess">4.4 Management system(MS) & its processess</option>
						<option value="5.1 Leadership and commitment">5.1 Leadership and commitment</option>
						<option value="5.2 Policy">5.2 Policy</option>
						<option value="5.3 Roles, responsibilities, and authorities">5.3 Roles, responsibilities, and authorities</option>
						<option value="5.4 Consultation and participation of workers">5.4 Consultation and participation of workers</option>
						<option value="6.1 Actions to address risks and opportunities">6.1 Actions to address risks and opportunities</option>
						<option value="6.2 Objectives & Targets">6.2 Objectives & Targets</option>
						<option value="6.3 Planning of Changes">6.3 Planning of Changes</option>
						<option value="6.3 Energy Review">6.3 Energy Review</option>
						<option value="6.4 Energy performance indicators">6.4 Energy performance indicators</option>
						<option value="6.5 Energy baseline">6.5 Energy baseline</option>
						<option value="6.6 Planning for collection of energy data">6.6 Planning for collection of energy data</option>

					</select>
				</div>

				{/* Pie Chart */}
				{ selectedSubClause && selectedIso && 
				<div  className="bg-slate-300 flex justify-center">
					{total === 0 ?
					<div style={{ width: '300px', height: '300px' }}>
						<h3>Not Marked under the following standard</h3>
					</div>
					:
					<div  style={{ width: '300px', height: '300px' }}>
						<Pie data={pieChartData} options={pieChartOptions}/>
					</div>
					}
				</div>
				}

			</div>

		</div>
	)
};


export default StackedBarChart;