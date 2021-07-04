import React from 'react';
import { Grid, Button, Box } from '@material-ui/core';

import { BodyContainer } from '../../actions/body';

import BodyAdd from '../../components/bodies/BodyAdd';
import BodyList from '../../components/bodies/BodyList';

import './Create.css';

const BodiesCreate = ({ bodies }) => {
  
  const [toggle, setToggle] = React.useState(false)

  React.useEffect(() => {
    
  }, [bodies])
  
  return (
    <div className="Create">
      <BodyContainer.Provider>
      <Box className="body" m={1}>
        
          <Grid container spacing={0}
            style={{
              margin: `${window.innerWidth < 768 ? '17%' : '7%'} auto`,
              maxWidth: `95vw`, height:`auto`,
            }}
          >
            <Grid item >
              {window.innerWidth < 768 ?
                <>
                  <div>
                    <Button
                      variant="outlined"
                      // color="primary"
                      size="large"
                      value={toggle}
                      onClick={() => { setToggle(!toggle) }}
                    >新しい月を追加
                    </Button>
                  </div>
                  {toggle ? <BodyAdd bodies={bodies} /> : null}
                  <br></br>
                  </>
                :
                <BodyAdd bodies={bodies} />
              }
            </Grid>
            <Grid item style={{border: `solid 0.05rem`,}}>
              <BodyList bodies={bodies} className="ItemList"/>
            </Grid>
          </Grid>
      </Box>
      </BodyContainer.Provider>
    </div>
  )
}

export default BodiesCreate;
