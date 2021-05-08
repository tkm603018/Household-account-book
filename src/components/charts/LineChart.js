
import React from 'react';
import { LineChart as Chart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Box } from '@material-ui/core';


const LineChart = ({ items }) => {

    const renderColorfulLegendText = (value, entry) => {
      const { color } = entry;
      
      return <span style={{ color,fontSize: `0.6rem` }}>{value}</span>;
    }
  
  const itemsSort = (ar) => {
    let array = []
    ar && ar.map((item) => {
      if (ar[0].day < item.day) {
        array.push(item)
      } else {
        array.unshift(item)
      }
      return array
    })
    return array
  }
  
  const renderToolTipsText = (value) => {

    return [`${value}円`, '利用額']
    // return [`${value}円`, `${name}日`]
  }

  return (
    <div className="LineChart" style={{ margin: `0 auto`}}>
      <div style={{ border: `solid 1px #aaaaaa`, width: `${window.innerWidth < 768 ? `92vw`  : '520px'}`, height: `430px`}}>
    <Box m={3}><h3 style={{ fontSize: `1.25rem` }}>利用推移</h3></Box>
        <center style={{ margin: `0 auto`, padding: `3% 0`, border: `solid 1px #ddd`}}>
          <ResponsiveContainer
            // width={400}
            height={240}>
            <Chart width={400} height={180} data={itemsSort(items)}>
              <Line type="monotone" dataKey="number" stroke="#8884d8" />
              <Legend
                formatter={renderColorfulLegendText}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip formatter={renderToolTipsText} />
            <XAxis dataKey="day" tick={{fontSize: 12}} label={{ value: "日", position: "insideBottomRight", dy: 10}}/>
            <YAxis tick={{fontSize: 12}} label={{ value: "金額", position: "insideLeft", angle: -90,   dy: 0}}/>
          </Chart>
        </ResponsiveContainer>
        </center>
      </div>
    </div>
  )
}

export default LineChart;
