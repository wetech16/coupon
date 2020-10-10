// dependancies
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import StampCard from "../components/scream/StampCard";
// Components
import Profile from "../components/profile/Profile";
// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import ScreamSkeleton from "../util/ScreamSkeleton";

const Home = (props) => {
  const {
    getScreams,
    data: { screams, loading },
  } = props;
  // const [stamps, setStamp] = useState([
  //   {
  //     id: 1,
  //     shopName: "T4 Shop",
  //     eventName: "July 4 Event",
  //     number: 4,
  //   },
  //   {
  //     id: 2,
  //     shopname: "Quickly Shop",
  //     eventName: "11 11 Event",
  //     number: 4,
  //   },
  // ]);
  // key={stamp.id}
  // shopName={stamp.shopName}
  // eventName={stamp.eventName}
  // number={stamp.number}

  useEffect(() => {
    getScreams();
  }, [getScreams]);

  let recentScreamsMarkup = !loading ? (
    screams.map((scream) => (
      <StampCard key={scream.screamId} scream={scream} />
    ))
  ) : (
    <ScreamSkeleton />
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};
// PropTypes static
Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

// Pull state from Redux Store To Component
const mapStateToProps = (state) => ({
  data: state.data,
});

// Push Actions To Props
const mapActionsToProps = {
  getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
