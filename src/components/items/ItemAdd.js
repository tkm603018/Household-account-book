import React from 'react'
import { TextField, Button, Grid, Box, Select, Input, MenuItem, InputLabel, FormControl } from '@material-ui/core';

import { BodyContainer } from '../../actions/body';

const ItemAdd = () => {

  const container = BodyContainer.useContainer();
  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  //   const MenuProps = {
  //     PaperProps: {
  //       style: {
  //         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //         width: 250,
  //       },
  //     },
  //   };
  const categories = [
    "食費",
    "日用品",
    "趣味・娯楽",
    "交通費",
    "服・美容",
    "健康・医療",
    "大学・部費・教材",
    "水道・光熱費",
    "口座",
  ]

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
            onSubmit={container.selectedItem ? container.ItemEdit : container.ItemAdd}>
            <Grid item xs={12} m={3}>
              <TextField
                label={"year (default: " + (new Date().getMonth()===0? new Date().getFullYear()-1:new Date().getFullYear()) + ")"}
                variant="filled"
                fullWidth
                type="number"
                value={container.inputMonth===0? container.inputYear-1:container.inputYear}
                onChange={container.handleYear}
              />
            </Grid>
            <Grid item xs={12} m={3}>
              <TextField
                label={"month (default: " + (new Date().getMonth()===0? new Date().getMonth()+12:new Date().getMonth()) + ")"}
                variant="filled"
                fullWidth
                type="number"
                value={container.inputMonth===0? container.inputMonth+12:container.inputMonth}
                onChange={container.handleMonth}
              />
            </Grid>
            <Grid item xs={12} m={3}>
              <TextField
                label="day"
                variant="filled"
                color="secondary"
                fullWidth
                type="text"
                value={container.inputDay}
                onChange={container.handleDay}
                required
                // InputProps={{inputProps: { max: 100000, min: 10 }}}
              />
            </Grid>
            <Grid item xs={12} m={3}>
              <TextField
                label="text"
                variant="filled"
                color="secondary"
                fullWidth
                type="text"
                value={container.inputText}
                onChange={container.handleText}
                required
              />
            </Grid>
            <Grid item >
              <FormControl fullWidth variant="filled" >
              <InputLabel id="category">category</InputLabel>
              <Select
                  labelId="category"
                  variant="filled"
                  color="secondary"
                  input={<Input style={{ lineHeight: `2.0rem`, padding: `6% 10% 6% 5%` }}/>}
                  value={container.inputCategory}
                  onChange={container.handleCategory}
                  fullWidth
                  required
              >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
                  {categories.map((name, i) => (
                    <MenuItem
                      key={i}
                      value={name}
                    >{name}
                    </MenuItem>
                  ))}
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} m={3}>
              <TextField
                label="price"
                variant="filled"
                color="secondary"
                fullWidth
                type="text"
                value={container.inputNumber}
                onChange={container.handleNumber}
                placeholder="price"
                required
                // InputProps={{inputProps: { max: 100000, min: 10 }}}
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

export default ItemAdd;
