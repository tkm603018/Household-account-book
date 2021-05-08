import React from 'react';
import {
  Table,
  TableContainer,
  TableHead, TableRow, TableCell,
  TableBody, Box, Button, CssBaseline
} from '@material-ui/core';

import { BodyContainer } from '../../actions/body';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";

const BodyList = ({ bodies }) => {

  const container = BodyContainer.useContainer()
  // container.handleBodies(bodies)

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: "dark",
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Box
        style={{
          width: `95vw`,
        }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">EDIT</TableCell>
                <TableCell align="center">link</TableCell>
                <TableCell align="center">DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                !bodies? null : bodies.slice().reverse().map((body,i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      <Button
                        size="small"
                        selected={container.selectedBody}
                        onClick={() => {
                          container.BodySelect(body)
                        }}
                        style={{
                          textDecoration: body.key === container.selectedBody ?
                            'line-through' : 'none'
                        }}
                        variant="outlined" color="primary"
                        title={body.key}
                      >
                        {body.key.substr(0, 7)}...</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="inherit"
                        href={"/ItemsCreate/" + body.link}
                        onClick={() => container.handleItemKey(body.link)}
                      >
                        {/* <Link to={`/ItemsCreate/${body.key}`}> */}
                          {body.link}
                        {/* </Link> */}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        style={{ marginLeft: 10, fontSize: 8, color: 'red' }}
                        onClick={() => container.BodyDelete(body)}
                        variant="outlined" color="secondary"
                      >
                        Delete
                  </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </ThemeProvider>
    </div>
  )
}
  
export default BodyList
