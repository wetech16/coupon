// dependencies
import React, { useState } from "react";
import SpaIcon from "@material-ui/icons/Spa";
import "./stampCard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./LikeButton";
import DeleteScream from "./DeleteScream";
import MyButton from "../../util/MyButton";
// Redux
import { connect } from "react-redux";
// MUI stuff

import { makeStyles } from "@material-ui/core";
import { scream__theme } from "../../util/theme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
import ScreamDialog from "./ScreamDialog";

const useStyles = makeStyles(scream__theme);

const StampCard = (props) => {
  const classes = useStyles();
  const [cardFlip, setCardflip] = useState(false);
  const {
    scream: {
      body,
      createdAt,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
    openDialog,
  } = props;
  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  return (
    <div className={cardFlip ? "card is_flipped" : "card"}>
      <div
        className={
          cardFlip ? "card__inner is-flipped" : "card__inner"
        }
      >
        <div className="card__face card__face--front">
          <div>
            <Typography variant="body1">{body}</Typography>
            <Typography
              variant="h5"
              color="primary"
              component={Link}
              to={`users/${userHandle}`}
            >
              {userHandle}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>

            <img
              src="pp.jpg"
              alt=""
              className="pp"
              onClick={() => setCardflip(!cardFlip)}
            />
          </div>
          {Array(5)
            .fill(1)
            .map((item) => (
              <SpaIcon />
            ))}
          {deleteButton}
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={openDialog}
          />
        </div>
        <div className="card__face card__face--back">
          <div className="card__content">
            <div className="card__header">
              <img
                src="pp.jpg"
                alt=""
                className="pp"
                onClick={() => setCardflip(!cardFlip)}
              />
            </div>
            <div className="card__body">
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

// PropTypes
StampCard.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(StampCard);
