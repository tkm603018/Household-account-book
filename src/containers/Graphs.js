import React from 'react';

import { Grid, Box } from '@material-ui/core';

const Setting = () => {
  console.log("hello")
  return (
    <Box className="body" m={1}>
      <Grid container spacing={0}
        style={{
          margin: `${window.innerWidth < 768 ? '17%' : '7%'} auto`,
          maxWidth: `95vw`, height: `auto`,
        }}
      >
      <center>
          <Grid item align="left">
            <Grid item>
              <Box variant="title" fontSize={50}>
                  毎月の光熱費の推移
              </Box>
            </Grid>
        </Grid>
      </center>
    </Grid>
    </Box>
  )
}

export default Setting;
