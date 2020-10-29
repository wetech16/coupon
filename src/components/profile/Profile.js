// Dependancies
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import MyButton from "../../util/MyButton";
import ProfileSkeleton from "./../../util/ProfileSkeleton";
import EditDetails from "./EditDetails";
// Redux stuff
import { connect } from "react-redux";
import {
  logOutUser,
  uploadImage,
} from "../../redux/actions/userActions";

// MUI stuff
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
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
      "& a": {
        color: "#441e51",
        fontWeight: "bold",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

const Profile = (props) => {
  const classes = useStyles();
  const {
    logOutUser,
    uploadImage,
    user: {
      credentials: {
        handle,
        createdAt,
        imageUrl,
        bio,
        website,
        location,
      },
      authenticated,
      loading,
    },
  } = props;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(props.UI.errors);
  }, [props]);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append("image", image, image.name);
      uploadImage(formData, handle);
      console.log("uploadImage");
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => logOutUser();

  return !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            {errors.error ? (
              <Alert variant="outlined" severity="error">
                {errors.error}
              </Alert>
            ) : null}

            {errors.image ? (
              <Alert variant="outlined" severity="error">
                {errors.image}
              </Alert>
            ) : null}

            <img
              src={imageUrl}
              alt="profile"
              className="profile-image"
            />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h6"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a
                  href={`http://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
};

// PropTypes
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

// Push Actions To Props
const mapActionsToProps = {
  logOutUser,
  uploadImage,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
