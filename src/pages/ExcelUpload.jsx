import Papa from 'papaparse';
import { useState } from 'react';

function ExcelUpload(){
    const [uploadedData,setUploadedData] = useState([]);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        // console.log("File",file)
        Papa.parse(file,{
            header:true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data
                .filter((row) => Object.values(row).some((cell) => cell.trim() !== ''))
                .map((row) => ({
                    Name: row.Name,
                    Age: row.Age,
                    Email: row.Email
                }))                
                setUploadedData(data);
                saveTeacherData(data);
            }
        })
    }

    const saveTeacherData = async(data) =>{
        try {
            console.log("---DATA--",data);
        } catch (error) {
            console.log("Error Saving Teachers:",error);
        }
    }
    return (
        <div>
            <h3>Bulk Upload Teachers</h3>
            <div className="mt-5">
                <input type="file" onChange={handleUpload}/>
            </div>
            <div>
                {JSON.stringify(uploadedData)}
            </div>
        </div>
    )
}

export default ExcelUpload;