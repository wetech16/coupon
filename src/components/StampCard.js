import React, { useState } from "react";
import SpaIcon from "@material-ui/icons/Spa";
import "./stampCard.css";

const StampCard = ({ shopName, eventName, number }) => {
  const [cardFlip, setCardflip] = useState(false);
  return (
    <div
      className={cardFlip ? "card is_flipped" : "card"}
      onClick={() => setCardflip(!cardFlip)}
    >
      <div
        className={
          cardFlip ? "card__inner is-flipped" : "card__inner"
        }
      >
        <div className="card__face card__face--front">
          <div>
            <img src="pp.jpg" alt="" className="pp" />
            <h2>{shopName}</h2>
          </div>
          <SpaIcon /> x4
        </div>
        <div className="card__face card__face--back">
          <div className="card__content">
            <div className="card__header">
              <img src="pp.jpg" alt="" className="pp" />
              <h2>{shopName}</h2>
            </div>
            <div className="card__body">
              <h3>{eventName}</h3>
              <p>
                Lorem ipsum <strong>dolor</strong> sit amet,
                consectetur <strong>adipiscing</strong> elit. Sed id
                erat a magna lobortis dictum. Nunc est arcu,{" "}
                <strong>lacinia</strong> quis sapien placerat,{" "}
                <strong>laoreet</strong> tincidunt nulla.
              </p>
              <SpaIcon /> x4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampCard;
