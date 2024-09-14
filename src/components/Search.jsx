import { useState, useEffect } from "react";

function Search({ searchName, setSearchName, handleSearch ,showResult}) {
    const [name, setName] = useState([]);
    const [filterResult, setFilteredResults] = useState([]);

    const handleApi = async () => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/capital');
            const data = await response.json();
            console.log(data.data); 
            setName(data.data); 
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        handleApi();
    }, [searchName]);

    
    useEffect(() => {
        if (searchName) {
            const filtered = name.filter((item) =>{
              const name=item.name? item.name.toLowerCase():'';
              const capital=item.name?item.capital.toLowerCase():'';

              return(
                name.includes(searchName.toLowerCase())
                || capital.includes(searchName.toLowerCase())
              )
            }
                
            );
            setFilteredResults(filtered);
        } else {
            setFilteredResults(name); 
        }
    }, [searchName, name]);

    return (
        <>
            <header>
                <div className="container">
                <div className="search_container">
                    <input 
                        type="text"
                        onChange={(e) => setSearchName(e.target.value)} 
                        value={searchName}
                        placeholder="Search countries..."
                    />

                    <div className="search" onClick={() => handleSearch(searchName)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </div>
                </div>
                <div className="search_display">
                    <ul>
                        {filterResult.length > 0 && showResult? (
                            filterResult.map((item, index) => (
                                <li key={index}>
                                 <span>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                                 </span>
                                    {item.name}
                                    </li>
                            ))
                        ) : (
                            <li className="li_nodata"></li>
                        )}
                    </ul>
                </div>
                </div>
            </header>
        </>
    );
}

export default Search;