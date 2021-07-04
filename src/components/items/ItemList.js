import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Box, Button, Typography } from '@material-ui/core';
import { DB } from '../../firebase'
import { BodyContainer } from '../../actions/body';

const ItemList = ({ items }) => {
  const [data, setData] = React.useState()
  const container = BodyContainer.useContainer()
  const itemKey = items.link
  const ref = DB.ref('bodies-'+ itemKey);

  React.useEffect(() => {
    if(!data)  {
      ref.on('value', snapshotObj => {
        let data = []
        if (snapshotObj.val()) {
          Object.keys(snapshotObj.val()).forEach((childSnapshotKey) => {
            data.push(JSON.parse(snapshotObj.val()[childSnapshotKey]));
          });
        }
        setData(data)
        container.handleItemKey(itemKey)
    })}
  },[data, container, itemKey, ref])
  
  return (
    <Box
      style={{
        width: `95vw`,
      }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">EDIT</TableCell>
              <TableCell align="center">DATE</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">TITLE</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">CATEGORY</TableCell>
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data ? null : data.slice().reverse().map((item,i) => (
                <TableRow key={i}>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      selected={container.selectedItem}
                      onClick={() => {
                        container.ItemSelect(item)
                      }}
                      style={{
                        textDecoration: item.key === container.selectedItem ?
                        'line-through' : 'none'
                      }}
                      title={item.key}
                    >
                      {item.key.substr(0, 7)}...</Button>
                  </TableCell>
                  <TableCell align="center">{item.year}/{item.month}/{item.day}</TableCell>
                  <TableCell align="center"colSpan={5}>{item.text}</TableCell>
                  <TableCell align="center">{item.category}</TableCell>
                  <TableCell align="center">{item.number}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      // style={{ marginLeft: 10, fontSize: 8, color: 'red' }}
                      onClick={() => container.ItemDelete(item)}
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
    )
}
  
export default ItemList
