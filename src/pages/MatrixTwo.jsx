import { useEffect, useState } from "react";


const MatrixTwo = () => {
    const [ categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [cellValues, setCellValues] = useState({});

    const fetchData = async () =>{
        const { xAxis } = await fetch('http://localhost:3008/categories').then(res => res.json());
        const { yAxis } = await fetch('http://localhost:3008/questions').then(res => res.json());
        const {cellValues:valuesFromDB} = await fetch('http://localhost:3008/matrix-values').then(res => res.json());

        setCategories(xAxis);
        setQuestions(yAxis);
        const initialValues = {};
        valuesFromDB.forEach(({ questionId, categoryId, value}) => {
            initialValues[`${questionId}_${categoryId}`] = value;
        });
        setCellValues(initialValues);
    };

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <>
            <table className="table-auto border-collapse border">
                <thead>
                    <tr>
                        <th className="border p-2"></th>
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
                                const cellKey = `${q.id}_${cat.id}`
                                return (
                                    <td>{cellKey}</td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-10">
                {JSON.stringify(cellValues)}
            </div>
        </>
    )
};


export default MatrixTwo;