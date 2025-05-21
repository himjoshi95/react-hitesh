import { memo, useState } from "react";

export const Practice = () => {
    const [parent, setParent] = useState(0);
    const [child1, setChild1] = useState(0);
    const [child2, setChild2] = useState(0);

    console.log("Parent Rendered");

    return (
        <>
            <p>Parent - {parent}</p>
            <button 
                className="border border-black p-2 my-2"
                onClick={() => setParent(prev => prev + 1)}
            >
                Update
            </button>
            <Child1 value={child1}/>
            <button 
                className="border border-black p-2 my-2"
                onClick={() => setChild1(prev => prev + 1)}
            >
                Update Child 1
            </button>
            <Child2 value={child2}/>
            <button 
                className="border border-black p-2 my-2"
                onClick={() => setChild2(prev => prev + 1)}    
            >
                    Update Child 2
            </button>
        </>
    )
};

const Child1 = memo(({ value }) => {
    console.log("Child 1 rendered")

    return (
        <p>Child 1 - {value}</p>
    );
});

const Child2 = memo(({ value }) => {
    console.log("Child 2 rendered")

    return (
        <p>Child 2 - {value}</p>
    );
});

