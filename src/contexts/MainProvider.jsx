import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ThemeProvider } from "./ThemeContext";

export const MainProvider = ({ children }) => (
    <AuthProvider>
        <CartProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </CartProvider>
    </AuthProvider>
)