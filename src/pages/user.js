// Dependancies
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Scream from "../components/scream/StampCard";
import StaticProfile from "../components/profile/StaticProfile";
// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { getUser } from "../redux/actions/userActions";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

const User = (props) => {
  const {
    getUserData,
    getUser,
    data: { screams, loading },
    user: { suser },
  } = props;

  const [screamIdParam, setScreamIdParam] = useState(null);

  useEffect(() => {
    const { handle, screamId } = props.match.params;
    if (screamId) setScreamIdParam(screamId);
    getUserData(handle);
    getUser(handle);
  }, [getUserData, props.match.param]);

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => (
      <Scream key={scream.screamId} scream={scream} />
    ))
  ) : (
    screams.map((scream) => {
      if (scream.screamId === screamIdParam)
        return (
          // openDialog is passed will be true by default
          <Scream key={scream.screamId} scream={scream} openDialog />
        );
      else return <Scream key={scream.screamId} scream={scream} />;
    })
  );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {suser === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={suser} />
        )}
      </Grid>
    </Grid>
  );
};

// PropTypes
User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

// Push Actions To Props
const mapActionsToProps = {
  getUserData,
  getUser,
};

export default connect(mapStateToProps, mapActionsToProps)(User);
