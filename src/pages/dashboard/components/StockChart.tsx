import React from "react";
import './StockChart.css'
import { PieChart, Pie, Cell,Legend, ResponsiveContainer } from "recharts";

interface StockChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div id="stock-chart">
      <header>
        <h3>Stock Overview</h3>
      </header>
      <main>
         <p className="total-stock">Total Stock: <strong>{total}</strong></p>
        <ResponsiveContainer height={280} >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      </main>
    </div>
  );
};

export default StockChart;
