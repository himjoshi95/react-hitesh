import { useState } from "react";
import MultiSelect from "../components/MultiSelect";
import { Helmet } from "react-helmet-async";

const options = [
    { value: 0, label: "Industry" },
    { value: 1, label: "Service" },
    { value: 2, label: "Practice Area" },
    { value: 3, label: "SMF" },    
];



function MultiDropdown() {
    const [optionSelectedOne, setSelectedOne] = useState(null);
    const [optionSelectedTwo, setSelectedTwo] = useState(null);

    const [arrayOne,setArrayOne] = useState(['Data 1'])
    const [arrayTwo,setArrayTwo] = useState(['Data 2'])


    const handleChangeOne = (selected) => {
        setSelectedOne(selected);
    };
    const handleChangeTwo = (selected) => {
        setSelectedTwo(selected);
    };

    const handleAdd = () =>{
        const newOne = ['Data 1']
        setArrayOne(prev => [...prev,...newOne]);
        const newTwo = ['Data 2']
        setArrayTwo(prev => [...prev,newTwo]);
    }

    const handledelete = () => {
        console.log("Got clicked")
        const newOne = arrayOne.slice(0, -1); 
        const newTwo = arrayTwo.slice(0, -1); 
        setArrayOne(newOne);
        setArrayTwo(newTwo);
    } 
    return (
        <div>
            <Helmet>
                <title>Multi Select</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <h1 className="mb-2 text-lg font-semibold underline">Mapping</h1>
            <div className="grid grid-cols-2 gap-5">
                <div className="">
                    <MultiSelect
                        key="example_id_1"
                        options={options}
                        onChange={handleChangeOne}
                        value={optionSelectedOne}
                        isSelectAll={true}
                        menuPlacement={"bottom"}
                    />
                </div>                
                <div className="">
                    <MultiSelect
                        key="example_id_2"
                        options={options}
                        onChange={handleChangeTwo}
                        value={optionSelectedTwo}
                        isSelectAll={true}
                        menuPlacement={"bottom"}
                    />
                </div>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-2 gap-5">
                    <div className="grid grid-cols-1">
                            {
                            optionSelectedOne &&
                            arrayOne.map((value,index) =>(
                                <div className="border border-blue-200 rounded mt-5 p-2">
                                    <div className="flex gap-2">
                                        <input type="checkbox"></input>
                                        <p>{value}</p>
                                    </div>
                                </div>                  

                            ))                            
                            }
                    </div>
                    <div className="grid grid-cols-1">
                            {
                                optionSelectedTwo &&
                                arrayTwo.map((value,index) => (
                                <div className="border border-blue-200 rounded mt-5 p-2">
                                    <div className="flex gap-2">
                                        <input type="checkbox"></input>
                                        <p>{value}</p>
                                    </div>
                                </div>
                                ))
                            }
                    </div>

                </div>
                
            </div>
            <div className="mt-10 flex items-end">
                <div className="flex gap-2 ml-auto">
                    {
                        optionSelectedTwo &&
                        <button 
                            className="border-2 p-2"
                            onClick={handleAdd}
                        >Add More</button>              

                    }
                    {   
                        arrayTwo.length > 1
                        &&
                        <button 
                            className="border-2 p-2"
                            onClick={handledelete}
                        >Delete</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default MultiDropdown;