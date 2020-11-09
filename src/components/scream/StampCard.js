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
      userImage,
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
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
        onClick={() => setCardflip(!cardFlip)}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <small color="textSecondary">{`@${userHandle}`}</small>
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {Array(5)
          .fill()
          .map((item, index) => (
            <SpaIcon key={index} />
          ))}
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
      </CardContent>
    </Card>
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
