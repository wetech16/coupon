import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import StampCard from "../components/StampCard";
const Home = () => {
  const [stamps, setStamp] = useState([
    {
      id: 1,
      shopName: "T4 Shop",
      eventName: "July 4 Event",
      number: 4,
    },
    {
      id: 2,
      shopname: "Quickly Shop",
      eventName: "11 11 Event",
      number: 4,
    },
  ]);

  // useEffect(() => {
  //     return () => {
  //         firestore.get()
  //         .then(snap => setState({snap.data}))
  //         .catch(err => console.log(err))
  //     }
  // })
  let recentStampMarkup = stamps ? (
    stamps.map((stamp) => (
      <StampCard
        key={stamp.id}
        shopName={stamp.shopName}
        eventName={stamp.eventName}
        number={stamp.number}
      />
    ))
  ) : (
    <p>loading</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentStampMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>profile</p>
      </Grid>
    </Grid>
  );
};

export default Home;
