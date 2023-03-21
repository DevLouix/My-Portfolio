import React, { createContext, useState } from 'react';
const LoadingMode = createContext();

function LoadingContext({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingMode.Provider
            value={{
                loading,
                setLoading
            }}>
            {children}
        </LoadingMode.Provider>
    );
}

export { LoadingContext, LoadingMode };
