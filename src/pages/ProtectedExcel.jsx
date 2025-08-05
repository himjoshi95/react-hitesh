export default function ProtectedExcel(){
    const downloadExcel = async () => {
        const response = await fetch("http://localhost:3008/generate-observation-excel");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "dropdown_excel.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    return (
        <div>
            <h1>Excel Generator with Dropdown</h1>
            <button onClick={downloadExcel}>Download Excel</button>
        </div>
    )
}