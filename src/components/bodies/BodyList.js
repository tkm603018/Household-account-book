import React from 'react'
import {
  Table,
  TableContainer,
  TableHead, TableRow, TableCell,
  TableBody, Box, Button, Link
} from '@material-ui/core'

import { BodyContainer } from '../../actions/body'

const BodyList = ({ bodies }) => {

  const container = BodyContainer.useContainer()
  // container.handleBodies(bodies)

  return (
    <div>
      <Box
        style={{
          width: `95vw`,
        }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">EDIT</TableCell>
                <TableCell align="center">LINK</TableCell>
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
                        variant="contained" color="primary"
                        title={body.key}
                      >
                        {body.key.substr(0, 7)}...</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="inherit"
                        href={"/ItemsCreate/" + body.link}
                        onClick={() => container.handleItemKey(body.link)}
                        components={Link}
                      >
                        {/* <Link to={`/ItemsCreate/${body.key}`}> */}
                          {body.link}
                        {/* </Link> */}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        onClick={() => container.BodyDelete(body)}
                        variant="contained" color="secondary"
                      >
                        削除する
                  </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}
  
export default BodyList
