import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const StarRating = ({ rating, maxRating = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={i <= rating ? solidStar : regularStar}
        style={{ color: "#ffa534"}}
      />
    );
  }

  return <div>{stars}</div>
};

export default StarRating;


