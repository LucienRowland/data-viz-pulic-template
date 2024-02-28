import react, {PureComponent} from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function ({crashPlace}){
  return(
    <BarChart
    width={2000}
    height={300}
    data={crashPlace}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5
    }}
    >
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="name"/>
    <YAxis/>
    <Tooltip/>
    <Legend/>
    <Bar dataKey="crashes" fill="Green"/>
    </BarChart>
  )
}