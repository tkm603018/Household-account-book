import React from 'react';
import { Grid, Button, Box } from '@material-ui/core';

import { BodyContainer } from '../../actions/body';
import ItemAdd from '../../components/items/ItemAdd';
import ItemList from '../../components/items/ItemList';

import './Create.css';

const ItemsCreate = (body) => {
  const [toggle, setToggle] = React.useState(false)

  return (
    <div className="Create">
      <BodyContainer.Provider>
      <Box className="body" m={1}>
        
          <Grid container spacing={0}
            style={{
          margin: `${window.innerWidth < 768 ? '19%' : '7%'} auto`,
          maxWidth: `95vw`, height:`auto`,
            }}
          >
            <Grid item >
              <Box m={2}>
                <Button
                  variant="outlined"
                  size="large"
                  href={"/charts/" + body.link}
                  fullWidth
                >チャートへ
                </Button>
              </Box>
              {window.innerWidth < 768 ?
                <>
                  <Box m={2}>
                    <Button
                      variant="outlined"
                      size="large"
                      value={toggle}
                      onClick={() => { setToggle(!toggle) }}
                    >記録する
                    </Button>
                  </Box>
                  {toggle ? <ItemAdd /> : null}
                  <br></br>
                </>
                :
                <ItemAdd />
              }
            </Grid>
            <Grid item style={{border: `solid 0.05rem`,}}>
              <ItemList items={body} className="ItemList"/>
            </Grid>
          </Grid>
      </Box>
      </BodyContainer.Provider>
    </div>
  )
}

export default ItemsCreate;
