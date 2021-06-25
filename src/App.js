import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    };

    getMovies = async () => {
        const {
            data: {
                data: { movies }
            }
        } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
        this.setState({ movies, isLoading: false });
    };
    renderMovies = () => {
        /**
         * @param movie.id
         * @param movie.year
         * @param movie.title
         * @param movie.summary
         * @param movie.medium_cover_image
         * @param movie.genres
         */
        const { movies } = this.state;
        return movies.map(movie => <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}
        />);
    };

    componentDidMount() {
        this.getMovies().then();
    };
    render() {
        const { isLoading } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <div className="loader__text">Loading...</div>
                    </div>
                ) : (
                    <div className="movies">
                        {this.renderMovies()}
                    </div>
                )}
            </section>
        );
    };
}

export default App;
