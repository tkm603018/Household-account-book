
import React from 'react';

import { Box, List } from '@material-ui/core';
import { PieChart as Chart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';

const PieChart = ({ items }) => {
  const [data, setData] = React.useState()

    const COLORS = [
    "#f50057",
    "#ffc400",
    "#f44336",
    "#8bc34a",
    "#4caf50",
    "#00bcd4",
    "#2979ff",
    "#ffffff"
  ];
  
  let a = [
    { category: "食費", number: 0},
    { category: "日用品", number: 0},
    { category: "交通費", number: 0},
    { category: "趣味・娯楽", number: 0},
    { category: "服・美容", number: 0},
    { category: "健康・医療", number: 0},
    { category: "大学・部費・教材", number: 0},
    { category: "水道・光熱費", number: 0}
  ]
  
  React.useEffect(() => {
    if (!data && items) {
      items && items.map((item) => {
        if (item.category === "食費") a[0].number += item.number
        else if (item.category === "日用品") a[1].number += item.number
        else if (item.category === "交通費") a[2].number += item.number
        else if (item.category === "趣味・娯楽") a[3].number += item.number
        else if (item.category === "服・美容") a[4].number += item.number
        else if (item.category === "健康・医療") a[5].number += item.number
        else if (item.category === "大学・部費・教材") a[6].number += item.number
        else if (item.category === "水道・光熱費") a[7].number += item.number
        return items
      })
      setData(a)
    }
  }, [data, a, items])

  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({cx,cy,midAngle,innerRadius,outerRadius,percent,index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.9;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#212121"
        textAnchor={x > cx ? "start" : "end"} dominantBaseline="central"
        style={{
          fontSize: `0.8rem`,
          color: `#fff`,
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
        {/* {data[index].number}円 */}
      </text>
    );
  };

    const renderColorfulLegendText = (category, item, index) => {
      const { color } = item;
      
      return <span
        title={data[index].category}
        style={{ lineHeight: `1.5rem`, color, fontSize: `0.6rem` }}
      >
        {data[index].category}
      </span>
    }
  const renderToolTipsText = (value, index) => {

    return [`${value}円`, data[index].category]
  }

  const renderCustomizedLabel1 =
    ({ cx, cy, midAngle, innerRadius, outerRadius, value, percent }) => {
    const RADIAN = Math.PI / 180;
    // eslint-disable-next-line
    let radius = 20 + innerRadius + (outerRadius - innerRadius) * 0.85;
    // eslint-disable-next-line
    let x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
    let y = cy + radius * Math.sin(-midAngle * RADIAN);
    if ((percent * 100)<4.5){
        return null;
    }
    return (
        <text
          x={x}
          y={y}
          fill="#ffffff"
          fontWeight="300"
          fontSize="13px"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          style={{
            fontSize: `0.8rem`,
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
  
  const renderCustomizedLabelLine =
    ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    // eslint-disable-next-line
    let radius1 = 20 + innerRadius + (outerRadius - innerRadius) * 0.8;

    let radius2 = innerRadius + (outerRadius - innerRadius);
    // eslint-disable-next-line
    let x2 = cx + radius1 * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
    let y2 = cy + radius1 * Math.sin(-midAngle * RADIAN);

    let x1 = cx + radius2 * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
      let y1 = cy + radius2 * Math.sin(-midAngle * RADIAN);

    if ((percent * 100)<4.5){
      return null;
    }

    return(
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS[index % COLORS.length]} strokeWidth={1}></line>
    )
  }

  return (
    <div className="PieChart" style={{ margin: `0 auto`}}>
      <div style={{ border: `solid 1px #aaaaaa`, width: `${window.innerWidth < 768 ? `92vw`  : '520px'}`, height: `430px`}}>
        <Box m={3}><h3 style={{fontSize: `1.25rem`}}>カテゴリ別割合</h3></Box>
        <center style={{ margin: `0 auto`, padding: `3% 0`, border: `solid 1px #ddd`, background: `#303030`}}>
          <ResponsiveContainer
            // width={400}
            height={240}
          >
            <Chart>
              <Tooltip formatter={renderToolTipsText} />
              <Legend
                dataKey="category"
                formatter={renderColorfulLegendText}
                layout="vertical"
                verticalAlign="top"
                align="right"
                width={105}
                height={200}
                iconSize={9}
                wrapperStyle={{ position: `absolute`, top: `12%`, right: "3%"}}
              />
              <Pie
                data={data}
                dataKey="number"
                startAngle={90}
                endAngle={-270}
                cx={100}
                cy={125}
                labelLine={renderCustomizedLabelLine}
                label={renderCustomizedLabel1}
                outerRadius={70}
                fill="#8884d8"
              >
                {data && data.map((item, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                ))}
            </Pie>
          </Chart>
          </ResponsiveContainer>
          <div>
            <span style={{
              fontSize: `0.2rem`,
              color: `#ffffff`
            }}>※グラフをタッチするとカテゴリと合計金額が表示されます</span>
          </div>
          </center>
      </div>
    </div>
  )
}
export default PieChart;
