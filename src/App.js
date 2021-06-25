import React from "react";
import axios from "axios";
import Movie from "./Movie";

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
         */
        const { movies } = this.state;
        return movies.map(movie => <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
        />);
    };

    componentDidMount() {
        this.getMovies().then();
    };
    render() {
        const { isLoading } = this.state;
        return (
            <div>
                {isLoading
                    ? "Loading"
                    : this.renderMovies()}
            </div>
        );
    };
}

export default App;
