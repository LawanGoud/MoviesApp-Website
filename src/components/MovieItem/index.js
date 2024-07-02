import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = ({movie}) => (
  <Link to={`/movies/${movie.id}`} className="movie-item">
    <img src={movie.imageUrl} alt="Movie Poster" />
  </Link>
)

export default MovieItem
