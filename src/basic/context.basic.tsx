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


// Contexto. Lo meto dentro de MyContext
export const MyContextComponent: React.FC = (props) => {
    const [newCompany, setNewCompany] = React.useState("Lemoncode");
    return (
        <MyContext.Provider value={{ newCompany, setNewCompany }}>
            {props.children}
        </MyContext.Provider>
    )
};