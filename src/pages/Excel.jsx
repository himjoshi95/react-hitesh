import React, { useState, useEffect } from 'react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


export default function Excel() {
    const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch your data here
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/products');
      const jsonData = await response.json();
      setData(jsonData.products);
    };
    fetchData();
  }, []);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    // Add headers
    worksheet.columns = [
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Category', key: 'category', width: 20 },
    ];

    // Add data
    data.forEach(item => {
      worksheet.addRow({ title: item.title, category: item.category });
    });

    // Dropdown options
    const categories = ['Outstanding','Very Good','Good', 'Satisfactory', 'Needs Improvement'];
    console.log(categories);

    // Add data validation for category dropdown
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
            const cell = worksheet.getCell(`B${rowNumber}`);
            cell.dataValidation = {
                type: 'list',
                allowBlank: true,
                formulae: [`"${categories.join(',')}"`],
            };
        }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'exported_data_dropdown.xlsx');
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};