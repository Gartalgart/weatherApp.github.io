import React from "react";

function SearchBar({setCity}){
    
    const handleSearch = (e) => {
        if(e.key === "Enter"){
            setCity(e.target.value);
            e.target.value = "";
        }
    };

    return(
        <div className="searchBarContainer">
            <input type="text" placeholder="Search City" onKeyDown={handleSearch} className="searchBar"></input>
        </div>
    )
}

export default SearchBar