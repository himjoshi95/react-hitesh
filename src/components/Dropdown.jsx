
function Dropdown({options,selection,value}){
    return (
        <div>
            <select 
                className="w-full rounded-md py-1 px-2 focus:outline-none border"
                onChange={(e) =>selection(e.target.value)}
                value={value || ""}
            >
                <option value="" disabled>Select...</option>
                {
                    options.map((item,index)=>(
                        <option value={item.value}>{item.label}</option>
                    ))
                }               
            </select>
        </div>
    )
}

export default Dropdown;