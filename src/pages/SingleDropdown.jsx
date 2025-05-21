import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";


const options = [
    { value: "Industry", label: "Industry" },
    { value: "Service", label: "Service" },
    { value: "Practice Area", label: "Practice Area" },
    { value: "SMF", label: "SMF" },
];

const checkboxOptions = [
    {value: "industry 1", label: "Industry 1"},
    {value: "industry 2", label: "Industry 2"},
    {value: "industry 3", label: "Industry 3"},
    {value: "industry 4", label: "Industry 4"},
]

const checkboxOptionsTwo = [
    {value: "service 1", label: "Service 1"},
    {value: "service 2", label: "Service 2"},
    {value: "service 3", label: "Service 3"},
    {value: "service 4", label: "Service 4"},
]


function SingleDropdown() {
    const [optionSelectedOne, setSelectedOne] = useState(null);
    const [optionSelectedTwo, setSelectedTwo] = useState(null);
    const [optionsTwo, setOptionsTwo] = useState([]);

    useEffect(() => {
        const filteredArray = options.filter(item => item.label !== optionSelectedOne);
        setOptionsTwo(filteredArray);
    }, [optionSelectedOne])
    return (
        <div>
            <h1 className="text-xl font-semibold underline mb-5">Mapping</h1>
            {/* <div className="grid grid-cols-2 gap-5">
                <div>{optionSelectedOne}</div>
                <div>{optionSelectedTwo}</div>
            </div> */}
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <Dropdown
                        options={options}
                        selection={setSelectedOne}
                        value={optionSelectedOne} 
                    />
                </div>
                <div>
                    <Dropdown
                        options={optionsTwo}
                        selection={setSelectedTwo}
                        value={optionSelectedTwo}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-10">
                {
                    optionSelectedOne
                    &&
                    <div className="border border-blue-500 p-2">
                        {
                            checkboxOptions.map((item,index) =>(
                            <div className="flex gap-2">
                                <input type="checkbox"/>
                                <label>{item.label}</label>
                            </div>
                            ))
                        }
                    </div>
                }

                {
                    optionSelectedTwo
                    &&
                    <div className="border border-blue-500 p-2">
                        <div>
                            {
                                checkboxOptionsTwo.map((item,index) =>(
                                <div className="flex gap-2">
                                    <input type="checkbox"/>
                                    <label>{item.label}</label>
                                </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>

            <div className="flex mt-10">
                <div className="ml-auto">
                    <button className="border px-2 py-1 bg-blue-500 text-white hover:bg-blue-800 rounded">Submit</button>
                </div>

            </div>
        </div>
    )
}

export default SingleDropdown;