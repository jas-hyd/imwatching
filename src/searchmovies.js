import React, {useState} from "react";
import MovieCard from "./movieCard.js";

export default function SearchMovies(props){
    
    //states = input query, movies
    const [query, setQuery] = useState(''); //setQuery updates query, empty state initialized

    const [movies, setMovies] = useState([]);
    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=2585c3a9bc2304c242f4db818f9d0055&language=en-US&query=${query}&include_adult=false`;
        
        try{
            //await asynchronously waits for a task to be done
            //here we are waiting for the url to be fetched and the json file to be retreived
            const res = await fetch(url); 
            const data = await res.json();

            console.log(data.results);
            setMovies(data.results); //passing in array of movie results

        }catch(err)
        {
            console.error(err);
        }
        
    } 
    return (
        <>
            <form className="form" onSubmit = {searchMovies}>
                <label htmlFor="query" className= "label">Movie Name</label>
                <input className = "input" type="text" name="query" 
                    placeholder=" i.e. Coraline"
                    value = {query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className = "card-list">
                {movies.filter(movie => movie.poster_path).map(movie => ( //filtering out movies without images
                    <MovieCard movie={movie} key={movie.id}/>
                    ))}
            </div>
        </>
    )


    /* TODO:
    Create form with a class form
    label with htmlfor = "query" and class of label
    input type of text with name "query" and a placeholder
    button class with type button and type of submit
    */
}