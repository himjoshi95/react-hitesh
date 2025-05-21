import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) =>{
    const [cartItems,setCartItems] = useState([]);
    const [products,setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            // const response = await axios.get('/api/products');
            // setProducts(response.data);
            setProducts([{_id:1,name:"devops"},{_id:2,name:"python"},{_id:"3",name:"JS"}]);
            
        } catch (error) {
            console.log("Failed to fetch products",error);            
        }
    };

    const addToCart = (product) => {
        setCartItems((prevItems)=> [...prevItems,product]);
    };

    const removeFromCart = (productId) =>{
        setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
    };

    return (
        <CartContext.Provider value={{ cartItems, products, fetchProducts, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );

};

export const useCart = () => useContext(CartContext);