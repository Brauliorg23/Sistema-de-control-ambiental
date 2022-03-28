import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';
import {  DownloadOutlined,} from '@ant-design/icons';
import {Button} from 'antd';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
);

export default function ListReportsGrafic(props) {
  const {are}=props;
  console.log(are);
  const labels = [];

  are.map(function (ar){
    labels.push(ar)
  })

  console.log(labels);

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgb(75, 192, 192)',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        label: 'Dataset 3',
        backgroundColor: 'rgb(53, 162, 235)',
        data: labels.map(() => faker.datatype.number({ min: -0, max: 100 })),
      },
    ],
  };

  return (
    <div className='Graf'>
      <Chart type='bar' data={data} />
      <Button type="primary" shape="round" icon={<DownloadOutlined />}>
      Download
      </Button>
    </div>  
  );
}