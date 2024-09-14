import { useState } from "react";
import Search from "./components/Search";
import { useEffect } from "react";

function App(){
  const [searchName,setSearchName]=useState('');
  const [showResult,setShowResult]=useState(false);
  const handleSearch=(name)=>{
   
    console.log(name);
    
      setShowResult(!showResult);
  
  }

  useEffect(()=>{

  },[searchName,showResult])
 
  return (
    <>
    <Search 
    val='india'
    searchName={searchName}
    setSearchName={setSearchName}
    handleSearch={handleSearch}
    showResult={showResult}/>
    </>
  )
}

export default App;