import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { NewsProvider } from "./context/NewsContext.jsx";
import { EventProvider } from "./context/EventContext.jsx";
import { StampProvider } from "./context/StampContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { PostalCircleProvider } from "./context/PostalCircleContext.jsx";
import { AuthProvider } from "./context/AuthContext";


// Render the app with all context providers
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DarkModeProvider>
        <NewsProvider>
          <EventProvider>
            <StampProvider>
              <CartProvider>
                <PostalCircleProvider>
                    <App />
                </PostalCircleProvider>
              </CartProvider>
            </StampProvider>
          </EventProvider>
        </NewsProvider>
      </DarkModeProvider>
    </AuthProvider>
  </StrictMode>
);
