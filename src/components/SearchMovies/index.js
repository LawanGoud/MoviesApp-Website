import React, {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      searchResults: [],
      isLoading: false,
      error: '',
    }
  }

  handleInputChange = event => {
    this.setState({searchValue: event.target.value})
  }

  handleSearch = async () => {
    const {searchValue} = this.state
    if (!searchValue) return

    this.setState({isLoading: true})

    try {
      // Simulate API call
      const response = await fetch(
        `https://api.example.com/search/movies?query=${searchValue}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }
      const data = await response.json()
      this.setState({searchResults: data.results, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  handleRetry = () => {
    this.setState({isLoading: true, error: ''})
    this.handleSearch()
  }

  render() {
    const {searchValue, searchResults, isLoading, error} = this.state

    return (
      <div className="search-container">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchValue}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch} testid="searchButton">
            <i className="search-icon">Search</i>
          </button>
        </div>

        {isLoading && (
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={this.handleRetry}>Try Again</button>
          </div>
        )}

        {!isLoading && searchResults.length === 0 && (
          <div className="no-results-container">
            <img src="/path/to/no-movies.png" alt="no movies" />
            <p>{`Your search for "${searchValue}" did not find any matches.`}</p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(movie => (
              <div key={movie.id} className="movie-item">
                <img src={movie.posterUrl} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Search
