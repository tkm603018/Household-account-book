import React from 'react';

import { Grid, Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Setting = () => {
  return (
    <Box className="body" m={1}>
      <Grid container spacing={0}
        style={{
          margin: `${window.innerWidth < 768 ? '17%' : '7%'} auto`,
          maxWidth: `95vw`, height: `auto`,
          // textAlign: `center`
        }}
      >
      <center>
          <Grid item align="left">
            <Grid item>
              <Typography variant="title">
                  おすすめの記事
              </Typography>
            </Grid>
            <Grid item>
              <a href="https://note.com/nariaki0296/n/n5b50a842af4f">新時代</a>
            </Grid>
            <Grid item>
              <a href="https://i-d.vice.com/jp/article/v74wdx/licaxxx-keep-distance-in-solidarity?utm_campaign=sharebutton">カルチャーを損なわないためにも..</a>
            </Grid>
            <Grid item>
              <a href="https://note.com/ktrgt_/n/nfc61f6bab00f">フェスをイチから企画</a>
            </Grid>
            <Grid item></Grid>
        </Grid>
      </center>
    </Grid>
    </Box>
  )
}

export default Setting;
