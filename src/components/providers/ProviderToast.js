// Import necessary modules from React and PrimeReact
import { Toast } from "primereact/toast";
import React, { createContext, useContext, useRef } from "react";

// Create the Context for Toast
const ContextToast = createContext();

// Provider Component for Toast
export const ProviderToast = ({ children }) => {
    const toast = useRef(null); // Initialize ref for Toast component

    return (
        // Pass the toast reference down through context
        <ContextToast.Provider value={toast}>
            <Toast ref={toast} />
            {children}
        </ContextToast.Provider>
    );
};

// Custom hook to access the Toast context
export const useToast = () => useContext(ContextToast);
