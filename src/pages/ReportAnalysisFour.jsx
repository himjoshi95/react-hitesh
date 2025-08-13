import DepartmentCategoryGaugeChart from "../components/DepartmentCategoryGaugeChart";
import DepartmentGroupedBar from "../components/DepartmentGroupedBar";
import DepartmentPieChart from "../components/DepartmentPieChart";


const ReportAnalysisFour = () => {

    return (
        <div>
            <h1 className="font-semibold text-2xl mb-5 border-b border-blue-400">Department-Process Analysis</h1>

            <div>
                <DepartmentPieChart/>
            </div>
            <div className="mt-5">
                <DepartmentGroupedBar/>
            </div>
            <div className="mt-5">
                <h1>Gauge chart One Category Wise</h1>
                <DepartmentCategoryGaugeChart/>

            </div>
        </div>
    )
};


export default ReportAnalysisFour;