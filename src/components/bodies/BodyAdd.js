import React from 'react'
import { TextField, Button, Grid, Box } from '@material-ui/core';

import { BodyContainer } from '../../actions/body';

const BodyAdd = ({ bodies }) => {

  const container = BodyContainer.useContainer();

    return(
      <Box m={3}
        style={{
          padding: `10px`,
          maxWidth: `100%`,
        }}>
        <Grid container>
          <form
            style={{
              border: `solid 0.1rem #212121`,
              padding: `2%`
            }}
            onSubmit={container.selectedBody ? container.BodyEdit : container.BodyAdd}>
            <Grid item xs={12} m={3}>
              <TextField
                label={"year (default: " + new Date().getFullYear() + "/" + new Date().getMonth() + ")"}
                variant="filled"
                color="secondary"
                fullWidth
                type="text"
                value={container.inputLink}
                onChange={container.handleLink}
              />
            </Grid>
            <br></br>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              追加する
            </Button>
          </form>
        </Grid>
      </Box>
    )
  }

export default BodyAdd;
