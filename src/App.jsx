import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import "./App.css";

export default function App() {

  const [csv, setCsv] = useState([]);
  
  function csvToArray(str, delimiter = ",") {

    const headers = str.slice(0, str.indexOf("\n")).trim().split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
      const values = row.trim().split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    return arr;
  }
  
  useEffect(() => {
      fetch(`/test.csv`, {
        method: "GET",
        headers: {
          'content-type': 'text/csv;charset=UTF-8'
        }
      })
        .then(res => res.text())
        .then(data => {
          setCsv(csvToArray(data));
        })
  }, []);
  
  let data = csv;

  return (
    <div>
      <h4>Salary</h4>
      <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="salary" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <p>Age</p>
      <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="age" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </div>
  );
}
