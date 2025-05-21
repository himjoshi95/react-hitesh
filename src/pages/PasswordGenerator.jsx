import { useCallback, useEffect, useState, useRef} from "react";
import { Helmet } from 'react-helmet-async';


const PasswordGenerator = () => {
    const [length,setLength] = useState(8);
    const [numberAllowed,setNumberAllowed] = useState(false);
    const [charAllowed,setCharAllowed] = useState(false);
    const [password,setPassword] = useState("");

    //useRef hook
    const passwordRef = useRef(null);


    const passGenerator  = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numberAllowed) str += "0123456789";
        if(charAllowed) str += "!@#$%^&*-_+=[]{}~`";

        for (let i=1 ; i<= length ; i++){
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);        
    },[length,numberAllowed,charAllowed]);

    const copyPasswordToClipboard = useCallback(() =>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,length);
        window.navigator.clipboard.writeText(password);
    },[password]);

    useEffect(()=>{
        passGenerator();
    },[length,numberAllowed,charAllowed,passGenerator]);
    

    return (
        <div>
            <Helmet>
                <title>Password Generator</title>
            </Helmet>
            <h1 className="text-center">Password Generator</h1>            
            <div className="mt-10 grid place-content-center">
                <div className="border border-zinc-600 rounded w-[600px] p-5 flex flex-col gap-5">
                    <div className="rounded overflow-hidden flex">
                        <input 
                            type="text" 
                            className="bg-slate-100 py-1 w-full focus:outline-none px-1"
                            value={password}
                            readOnly
                            ref={passwordRef}
                        />
                        <button
                            onClick={copyPasswordToClipboard}
                            className="bg-blue-500 py-1 px-1 hover:bg-blue-800"
                        >copy
                        </button>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex gap-2">
                            <input 
                                type="range" 
                                min="8" 
                                max="20" 
                                value={length} 
                                onChange={(e)=>setLength(e.target.value)}
                                className="cursor-pointer"
                            />
                            <span className="text-base">Length ({length})</span>
                        </div>
                        <div className="flex gap-1">
                            <input type="checkbox"
                                defaultChecked={numberAllowed}
                                onChange={() =>{
                                    setNumberAllowed((prev) => !prev)
                                }} 
                                className="cursor-pointer"   
                            />
                            <label className="text-base">Numbers</label>
                        </div>

                        <div className="flex gap-1">
                            <input type="checkbox"
                                defaultChecked={charAllowed}
                                onChange={() =>{
                                    setCharAllowed((prev) => !prev)
                                }}
                                className="cursor-pointer"
                            />
                            <label className="text-base">Characters</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordGenerator;