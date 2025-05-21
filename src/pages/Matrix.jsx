import  { useEffect, useState } from 'react';

const Matrix = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [cellValues, setCellValues] = useState({}); // { [questionId_categoryId]: value }

  useEffect(() => {
    // Simulated fetch
    async function fetchData() {
      const {xAxis} = await fetch('http://localhost:3009/categories').then(res => res.json());
      const {yAxis} = await fetch('http://localhost:3009/questions').then(res => res.json());
      const {cellValues:valuesFromDB} = await fetch('http://localhost:3009/matrix-values').then(res => res.json());
        
      setCategories(xAxis);
      setQuestions(yAxis);
      const initialValues = {};
      valuesFromDB.forEach(({ questionId, categoryId, value }) => {
        initialValues[`${questionId}_${categoryId}`] = value;
      });
      setCellValues(initialValues);
    }
    fetchData();
  }, []);

  const handleChange = (questionId, categoryId, value) => {
    setCellValues(prev => ({
      ...prev,
      [`${questionId}_${categoryId}`]: value
    }));
  };

  return (
    <>
    
    <table className="table-auto border-collapse border">
      <thead>
        <tr>
          <th className="border p-2">Questions</th>
          {categories.map(cat => (
            <th key={cat.id} className="border p-2">{cat.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {questions.map(q => (
          <tr key={q.id}>
            <td className="border p-2">{q.text}</td>
            {categories.map(cat => {
              const cellKey = `${q.id}_${cat.id}`;
              return (
                <td key={cellKey} className="border p-2 text-center">
                  {/* Choose input type */}
                  {/* Example: Checkbox */}
                  {/* <input
                    type="checkbox"
                    checked={cellValues[cellKey] === true}
                    onChange={(e) =>
                      handleChange(q.id, cat.id, e.target.checked)
                    }
                  /> */}
                  
                  <select
                    value={cellValues[cellKey] || ''}
                    onChange={(e) => handleChange(q.id, cat.id, e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Partial">Partial</option>
                  </select>
                 
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>

    <div className='mt-10'>
        {JSON.stringify(cellValues)}
    </div>
    </>
  );
};

export default Matrix;
