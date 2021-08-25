import React from "react";

interface CompanyContext {
    newCompany: string;
    setNewCompany: (value: string) => void;
}

// Componente en el que se inyecta el contexto
export const MyContext = React.createContext<CompanyContext>({
    newCompany: "",
    setNewCompany: (value) => { },
});

