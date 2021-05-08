import React from 'react';
import { BarChart as Chart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Brush, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';
import { Box } from '@material-ui/core';

const BarChart = ({ items }) => {
  const [data, setData] = React.useState()

  let a = []
  
  React.useEffect(() => {
    if (!data && items) {
      items && items.map((item, i) => {
        if (item.category === "口座") {
          a.push({
            day: item.day,
            category: item.category,
            in: item.number
          })
        } else {
          a.push({
            day: item.day,
            category: item.category,
            out: item.number * -1
          })
        }
        return items
      })
      setData(a)
    }
  }, [data, a, items])

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
  
    return <span style={{ color,fontSize: `0.6rem` }}>{value}</span>;
  }

  const itemsSort = (ar) => {
    return ar && ar.sort((a, b) => a.day - b.day )
  }
  
  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;
  };

  const renderToolTipsText = (value) => {
    let a = ''
    if (value > 0) {
      a = '収入'
    } else {
      a = '支出'
    }

    return [`${value}円`, a]
    // return [`${value}円`, `${name}日`]
  }
  
  return (
    <div className="BarChart" style={{ margin: `0 auto`}}>
      <div style={{ border: `solid 1px #aaaaaa`, width: `${window.innerWidth < 768 ? `92vw`  : '520px'}`, height: `430px`}}>
        <Box m={3}><h3 style={{ fontSize: `1.25rem` }}>利用推移</h3></Box>
        <center style={{ margin: `0 auto`, padding: `3% 0`, border: `solid 1px #fff`, background: `#303030`}}>
          <ResponsiveContainer
            // width={400}
            height={240}>
            <Chart data={itemsSort(data)}>
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis stroke="#fff" dataKey="day" tick={{fontSize: 12}} label={{ stroke: "#fff", value: "日", position: "insideBottomRight", dy: 5}}/>
              <YAxis stroke="#fff" tick={{ fontSize: 12 }} label={{  stroke: "#fff", value: "金額", position: "insideLeft", angle: -90, dy: 0 }}/>
              <Tooltip formatter={renderToolTipsText} />
              <Legend verticalAlign="top" formatter={renderColorfulLegendText}/>
              <ReferenceLine y={0} stroke="#fff" />
              <Brush dataKey='name' y={220} height={20} stroke="#3f51b5" />
              <Bar dataKey="out" barSize={5} fill="#e91e63"/>
              <Bar dataKey="in" barSize={5} fill="#3f51b5"/>
            </Chart>
          </ResponsiveContainer>
          <div>
            <span style={{
              fontSize: `0.2rem`,
              // marginRight: `20%`
            }}>※グラフをタッチすると金額が表示されます</span>
          </div>
        </center>
      </div>
      </div>
  )
}

export default BarChart;

