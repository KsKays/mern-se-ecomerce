import { use, useState } from "react";

const Card = ({ item }) => {
  const { id, name, image, description, category, price } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStart `}
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="rating"
          className={`mask mask-heart ${isHeartFilled ? "bg-green-500" : ""} `}
        />
      </div>
      <figure>
        <img
          src={image}
          alt=""
          className="hover:scale-105 transition-all duration-300 md:h-60"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-bold">
            {price}
            <span className="text-sm text-red">$</span>
          </h5>
          <button className="btn bg-red text-white">Add to Card</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
