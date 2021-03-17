import { Typography, Grid, Paper } from "@material-ui/core"
import React from "react"

const Home = () => {
  const style = {
    width: "80%",
    padding: "20px",
  }
  const paperStyle = {
    marginBottom: "20px",
    padding: "20px",
  }
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h2">Welcome to the blog app 😊</Typography>
        <Grid style={style} container justify="center">
          <Paper style={paperStyle}>
            <Typography variant="body1">
              This is a fullstack application made in the fullstack 2020 course.
              Frontend is made using ReactJS and styled with MaterialUI. Backend
              uses Express + Mongoose.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
