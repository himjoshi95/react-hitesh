import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ExportTable() {

    const tableRef = useRef();
    const handleExport = () => {
        const table = tableRef.current;
        const workbook = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        const data = new Blob([excelBuffer], {
            type: 'application/octet-stream',
        });

        saveAs(data, 'table_export.xlsx');
    };

    return (
        <div>
            <table ref={tableRef} border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Profession</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>30</td>
                        <td>Engineer</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>28</td>
                        <td>Designer</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={handleExport} style={{ marginTop: '10px' }}>
                Export to Excel
            </button>
        </div>
    )
};