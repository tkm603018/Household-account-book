import React from 'react';
import { Grid, Button } from '@material-ui/core';

import './Charts.css'
import { DB } from '../firebase'
import { BodyContainer } from '../actions/body';

import PieChart from '../components/charts/PieChart'
import BarChart from '../components/charts/BarChart'
// import LineChart from '../components/charts/LineChart'

const Charts = (body) => {
  return (
    <BodyContainer.Provider>
      <ChartRender {...body}/>
    </BodyContainer.Provider>
  )
}

const ChartRender = (body) => {
  const [data, setData] = React.useState()
  const container = BodyContainer.useContainer()
  const itemKey = body.link
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
  }, [data, container, itemKey, ref])
  
  return (
    <Grid className="Charts">
      <div className="charts"
        style={{
          // paddingLeft: window.innerWidth * 0.0805,
          margin: `${window.innerWidth < 768 ? '17%' : '7%'} auto`,
          maxWidth: `95vw`, height:`auto`,
        }}>
        <h1>{`${body.link.substr(0, 4)}年${body.link.slice(4)}月の記録`}</h1>
        <div style={{padding: `0 0 5% 0`}}>
          <Button
          variant="outlined"
          size="large"
          href={"/itemscreate/" + body.link}
          >
          編集する
          </Button>
        </div>
        <div style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height: `auto`, }}><PieChart items={data} /></div>
        <div style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height:`auto`,}}><BarChart items={data}/></div>
        {/* <div style={{ display: `inline-flex`, padding: `0.5% 0.5% 0.5% 0.5% `, height:`auto`,}}><LineChart items={data}/></div> */}

      </div>
    </Grid>
  )
}

export default Charts;
