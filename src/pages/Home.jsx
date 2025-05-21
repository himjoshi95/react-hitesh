import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Home = () =>{
    const { user,login,logout} = useAuth();
    const { cartItems, products, fetchProducts, addToCart,removeFromCart } = useCart();

    useEffect(()=>{
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div>
            <h2 className="text-xl underline">Trainings</h2>
            <div className="mt-5">
                {products.map(product =>(
                    <div key={product._id} className="max-w-md grid grid-cols-2 gap-10 mb-3">
                        <h3>{product.name}</h3>
                        <button 
                            className="border-2 hover:bg-slate-500 hover:text-white duration-200"
                            onClick={() => addToCart(product)}
                        >Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            <h2 className="text-xl underline">Cart</h2>
            <div className="mt-5">
                {
                    cartItems.length > 0
                    ?
                    cartItems.map(item =>(
                        <div key={item._id} className="max-w-md grid grid-cols-2 gap-10 mb-3">
                            <h3>{item.name}</h3>
                            <button
                                className="border-2 hover:bg-slate-500 hover:text-white duration-200"
                                onClick={()=>removeFromCart(item._id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                    :
                    <div className="max-w-md flex justify-center bg-red-50">
                        <p>Cart is Empty</p>
                    </div>
                }

            </div>

            
        </div>
    )
}

export default Home;