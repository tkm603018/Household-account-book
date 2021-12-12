import React from 'react';
import { DB } from '../firebase'
import { BodyContainer } from '../actions/body';

import PieChart from '../components/charts/PieChart'
import BarChart from '../components/charts/BarChart'
// import LineChart from '../components/charts/LineChart'

import { Box, Grid, Button } from '@material-ui/core';

const Home = (body) => {
  return (
    <BodyContainer.Provider>
      <HomeRender {...body}/>
    </BodyContainer.Provider>
  )
}
const HomeRender = (body) => {
  const [data, setData] = React.useState()
  const container = BodyContainer.useContainer()
  const itemKey = body.link
  const ref = DB.ref(`bodies-${new Date().getMonth()===0? new Date().getFullYear()-1:new Date().getFullYear()}${new Date().getMonth()===0?new Date().getMonth()+12:new Date().getMonth()}`);

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
  }, [data, container, itemKey, ref])
  
  return (
    <Grid className="Home">
      {data && data.length > 0 ? 
      <Box className="home" m={2} mt={3}
        style={{
          // paddingLeft: window.innerWidth * 0.0805,
          // margin: `${window.innerWidth < 768 ? '17%' : '7%'} auto`,
          // maxWidth: `95vw`, height:`auto`,
        }}>
        <Box fontWeight="bold" fontSize="1.5rem">
          {`先月(${new Date().getMonth() === 0 ?
            new Date().getFullYear() - 1 :
            new Date().getFullYear()}年${new Date().getMonth() === 0 ?
              new Date().getMonth() + 12 : new Date().getMonth()}月)の記録`}
        </Box>
        <Box m={1}>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href={"/itemscreate/" + new Date().getFullYear() + new Date().getMonth()}
          >
          リストへ
          </Button>
        </Box>
        <Box mt={2} style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height: `auto`, }}><PieChart items={data} /></Box>
        <Box mt={2} style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height: `auto`, }}><BarChart items={data} /></Box>
        {/* <div style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height:`auto`,}}><LineChart items={data}/></div> */}
        </Box>
        : <Box my={5}><h1>今月は未記入です。</h1></Box>
        }
    </Grid>
  )
}

export default Home;

