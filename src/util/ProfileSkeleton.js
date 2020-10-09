// Dependancies
import React from "react";
import PropTypes from "prop-types";
import NoImg from "./images/No-Image-Thumb.jpg";
// MUI stuff
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    height: 20,
    // backgroundColor: global__theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10,
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      // objectFit: 'cover',
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  },
};

const ProfileSkeleton = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={"image-wrapper"}>
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
};

// PropTypes
ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
