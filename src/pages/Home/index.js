import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import Footer from '../../components/Footer'
import MovieItem from '../../components/MovieItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    trendingMovies: [],
    topRatedMovies: [],
    originals: [],
    searchQuery: '', // eslint-disable-line no-unused-vars
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    const {searchQuery} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    let trendingMoviesApi = 'https://apis.ccbp.in/movies-app/trending-movies'
    let topRatedMoviesApi = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    let originalsApi = 'https://apis.ccbp.in/movies-app/originals'

    // Modify API endpoints if there is a search query
    if (searchQuery) {
      trendingMoviesApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchQuery}`
      topRatedMoviesApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchQuery}`
      originalsApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchQuery}`
    }

    try {
      const [
        trendingResponse,
        topRatedResponse,
        originalsResponse,
      ] = await Promise.all([
        fetch(trendingMoviesApi, options),
        fetch(topRatedMoviesApi, options),
        fetch(originalsApi, options),
      ])

      if (trendingResponse.ok && topRatedResponse.ok && originalsResponse.ok) {
        const trendingData = await trendingResponse.json()
        const topRatedData = await topRatedResponse.json()
        const originalsData = await originalsResponse.json()

        const updateData = data =>
          data.results.map(movie => ({
            imageUrl: movie.backdrop_path,
            id: movie.id,
            title: movie.title,
          }))

        console.log('Trending Movies:', trendingData) // Log fetched data
        console.log('Top Rated Movies:', topRatedData)
        console.log('Originals:', originalsData)

        this.setState({
          trendingMovies: updateData(trendingData),
          topRatedMovies: updateData(topRatedData),
          originals: updateData(originalsData),
          isLoading: false,
        })
      } else {
        // Handle fetch errors
        console.error('Failed to fetch movies data')
        this.setState({isLoading: false})
      }
    } catch (error) {
      // Handle network errors
      console.error('Error fetching movies data:', error)
      this.setState({isLoading: false})
    }
  }

  handleSearchChange = event => {
    const {value} = event.target
    this.setState({searchQuery: value}, () => {
      // Fetch movies immediately after updating searchQuery
      this.fetchMovies()
    })
  }

  renderMoviesList = movies => (
    <ul className="movies-list">
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </ul>
  )

  render() {
    const {trendingMovies, topRatedMovies, originals, isLoading} = this.state

    return (
      <div className="home-page">
        <Header handleSearchChange={this.handleSearchChange} />

        <HeroSection />

        <div className="content">
          <h2 className="section-heading">Trending Now</h2>
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            this.renderMoviesList(trendingMovies)
          )}

          <h2 className="section-heading">Top Rated</h2>
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            this.renderMoviesList(topRatedMovies)
          )}

          <h2 className="section-heading">Originals</h2>
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            this.renderMoviesList(originals)
          )}
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
