// context API (Warehouse)
// Provider (Delivery Boy)
// Consumer / useContext (You)
// children (your order)
// To make available delivery boy everywhere you need to wrap Provider in a index.js then it will pass data everywhere in the app.
import React,{useContext, useEffect, useState} from 'react';



//make warehouse / context
const AppContext = React.createContext();

//create Provider / Delivery boy
const AppProvider = ({children}) => {

    // const [isLoading, setIsLoading] = useState(true);
    // const [movie, setMovie] = useState([]);
    // const [isError, setIsError] = useState({show:"false", msg:""});
    // const [search,setSearch] = useState("slow");

    
    const getMode = () => {
        return  JSON.parse(localStorage.getItem("mode")) || false;
     }

    const [dark, setDark]= useState(getMode);

    useEffect(() => {
        localStorage.setItem("mode",JSON.stringify(dark));
    },[dark]);
   

   const toggleDark = () => {
        setDark(!dark);
   }


    return <AppContext.Provider value={{dark,setDark,toggleDark}}>
    {children}
    </AppContext.Provider>
};

//global custom hooks
const useGlobalContext = () => {
    return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};