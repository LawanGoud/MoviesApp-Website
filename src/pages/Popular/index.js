import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import MovieItem from '../../components/MovieItem'
import Header from '../../components/Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Popular extends Component {
  state = {
    isLoading: true,
    popularMovies: [],
  }

  componentDidMount() {
    this.fetchPopularMovies()
  }

  fetchPopularMovies = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const popularMovies = data.results.map(movie => ({
          imageUrl: movie.poster_path,
          id: movie.id,
        }))
        this.setState({
          popularMovies,
          isLoading: false,
        })
      } else {
        console.error('Failed to fetch popular movies')
        this.setState({isLoading: false})
      }
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      this.setState({isLoading: false})
    }
  }

  render() {
    const {popularMovies, isLoading} = this.state

    return (
      <div className="popular-container">
        <Header />
        <h2 className="section-heading">Popular Movies</h2>
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <ul className="movies-list">
            {popularMovies.map(movie => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Popular
