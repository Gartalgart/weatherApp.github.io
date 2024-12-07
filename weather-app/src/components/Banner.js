import React from "react";
import {format} from "date-fns";
import {fr} from "date-fns/locale"; //importer la localisation française
import SearchBar from "./SearchBar";

function Banner({setCity}){

    const currentDate = new Date();
    const formattedDate = format(currentDate, "eeee d MMMM", {locale: fr});
    const capitalize = (str) => {
        return str
            .split(" ")//Divise la chaine en un tableau de mot en utilisant les espaces comme séparateurs
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))// Parcourt les mots de chaque tableaux et converti chaque 1ère lettre en majuscule.
            .join(" ");//Rejoint les mots du tableau
    };
    const capitalizeDate = capitalize(formattedDate);

    return(
        <div className="banner">
            <SearchBar setCity={setCity} />
            <div className="currentDateContainer">
                <h1 className="currentDate">{capitalizeDate}</h1>
            </div>
        </div>
        
    );
}

export default Banner