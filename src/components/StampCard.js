import React from "react";
import SpaIcon from "@material-ui/icons/Spa";
import "./stampCard.css";
const StampCard = ({ shopName, eventName, number }) => {
  return (
    <div className="card ">
      <div className="card__inner is-flipped">
        <div className="card__face card__face--front">
          <h2>Card Front</h2>
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
