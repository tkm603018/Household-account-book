import React from 'react';
import './Charts.css'
import { DB } from '../firebase'
import { BodyContainer } from '../actions/body';

import PieChart from '../components/charts/PieChart'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'
import Button from '@material-ui/core/Button';

import { Grid } from '@material-ui/core';
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
      <div className="home"
        style={{
          // paddingLeft: window.innerWidth * 0.0805,
          margin: `${window.innerWidth < 768 ? '17%' : '7%'} auto`,
          maxWidth: `95vw`, height:`auto`,
        }}>
        <h1>{`先月(${new Date().getMonth()===0? new Date().getFullYear()-1:new Date().getFullYear()}年${new Date().getMonth()===0?new Date().getMonth()+12:new Date().getMonth()}月)の記録`}</h1>
        <div style={{padding: `0 0 5% 0`}}>
          <Button
            variant="outlined"
            // color="primary"
            size="large"
            href={"/itemscreate/" + new Date().getFullYear() + new Date().getMonth()}
          >
          リストへ
          </Button>
        </div>
        <div style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height:`auto`,}}><PieChart items={data}/></div>
        <div style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height: `auto`, }}><BarChart items={data} /></div>
        {/* <div style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height:`auto`,}}><LineChart items={data}/></div> */}
      </div>
    </Grid>
  )
}

export default Home;

