import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () =>{
    const {user, login, logout} = useAuth();
    return (
        <div className="border-b py-3 bg-emerald-600 text-white">
            <div className="grid grid-cols-3 gap-10 mx-10">
                <div>
                    <h1 className="text-xl font-bold"><i>Trainings</i></h1>
                </div>
                <div>
                    <ul className="hidden md:flex md:gap-5">
                        {/* <li><NavLink to='/master' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'} `}>Master Data</NavLink></li> */}
                        {/* <li><NavLink to='/convertor' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>Convertor</NavLink></li> */}
                        <li><NavLink to='/master-new' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>Master New</NavLink></li>
                        <li><NavLink to='/mapping' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>Mapping</NavLink></li>
                        <li><NavLink to='/matrix-four' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>IMS</NavLink></li>
                        <li><NavLink to='/matrix-five' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>Process</NavLink></li>
                        <li><NavLink to='/matrix-six' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>New</NavLink></li>
                        {/* <li><NavLink to='/home' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>Home</NavLink></li> */}
                        {/* <li><NavLink to='/signUp' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>Sign-up</NavLink></li> */}
                        {/* <li><NavLink to='/data' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold': 'text-white'}`}>Data chart</NavLink></li> */}
                        {/* <li><NavLink to='/signIn' className={({isActive})=>`${isActive ? 'text-slate-200 font-bold' : 'text-white'}`}>Sign In</NavLink></li> */}
                    </ul>
                </div>
                <div className="hidden md:flex md:justify-end ">                    
                    {
                        user ?
                        (   
                            <div className="flex gap-2 items-center">
                            <p>Welcome, {user.username}</p>
                            <button onClick={logout}>Logout</button>
                            </div>
                        ) : (
                            <button onClick={()=>login()}>Login</button>
                        )                        
                    }
                </div>
                
            </div>
        </div>
    )
}


export default Navbar;