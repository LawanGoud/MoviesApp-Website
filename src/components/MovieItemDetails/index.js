import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    isLoading: true,
  }

  componentDidMount() {
    this.fetchMovieDetails()
  }

  fetchMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (!data) {
        throw new Error('Movie details not found')
      }

      const genres = data.movie_details.genres
        ? data.movie_details.genres.map(genre => ({
            id: genre.id,
            name: genre.name,
          }))
        : []

      const similarMovies = data.movie_details.similar_movies
        ? data.movie_details.similar_movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
          }))
        : []

      const spokenLanguages = data.movie_details.spoken_languages
        ? data.movie_details.spoken_languages.map(language => ({
            id: language.id,
            englishName: language.english_name,
          }))
        : []

      const updatedData = {
        title: data.movie_details.title,
        imageUrl: data.movie_details.poster_path,
        overview: data.movie_details.overview,
        backdropImageUrl: data.movie_details.backdrop_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        adult: data.movie_details.adult,
        budget: data.movie_details.budget,
        voteAverage: data.movie_details.vote_average,
        genres,
        similarMovies,
        spokenLanguages,
      }

      this.setState({movieDetails: updatedData, isLoading: false})
    } catch (error) {
      console.error('Error fetching movie details:', error)
      this.setState({isLoading: false}) // Handle error state
    }
  }

  renderMovieDetails = () => {
    const {movieDetails, isLoading} = this.state

    if (isLoading) {
      return (
        <div className="loader-container">
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      )
    }

    return (
      <div className="movie-details-container">
        <Header />
        <h2>{movieDetails.title}</h2>
        <img
          src={movieDetails.imageUrl}
          alt={movieDetails.title}
          className="movie-poster"
        />
        <p>
          <strong>Overview:</strong> {movieDetails.overview}
        </p>
        <p>
          <strong>Release Date:</strong> {movieDetails.releaseDate}
        </p>
        <p>
          <strong>Runtime:</strong> {movieDetails.runtime} minutes
        </p>
        <p>
          <strong>Adult:</strong> {movieDetails.adult ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Budget:</strong> ${movieDetails.budget.toLocaleString()}
        </p>
        <p>
          <strong>Vote Average:</strong> {movieDetails.voteAverage}
        </p>

        <div className="genres-container">
          <p>
            <strong>Genres:</strong>
          </p>
          <ul>
            {movieDetails.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>

        <div className="spoken-languages-container">
          <p>
            <strong>Spoken Languages:</strong>
          </p>
          <ul>
            {movieDetails.spokenLanguages.map(language => (
              <li key={language.id}>{language.englishName}</li>
            ))}
          </ul>
        </div>

        <div className="similar-movies-container">
          <p>
            <strong>Similar Movies:</strong>
          </p>
          <ul className="similar-movies-list">
            {movieDetails.similarMovies.map(movie => (
              <li key={movie.id}>
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="similar-movie-poster"
                />
                <p>{movie.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return <div className="movie-container">{this.renderMovieDetails()}</div>
  }
}

export default MovieItemDetails
