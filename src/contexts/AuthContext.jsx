import { createContext, useState, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);

    const login = async() =>{
        try {
            // const response = await axios.post('/api/login',credential)
            // setUser(response.data.user)
            setUser({_id:22,username: "admin", name:"superAdmin"});
            
        } catch (error) {
            console.log("Login Failed", error);            
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);