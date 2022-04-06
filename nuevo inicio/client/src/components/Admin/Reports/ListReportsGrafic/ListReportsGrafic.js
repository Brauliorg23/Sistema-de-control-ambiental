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



class Modulo {
  constructor(modulo, porsentaje) {
    this.modulo = modulo;
    this.porsentaje = porsentaje;
  }
}

export default function ListReportsGrafic(props) {
  const {are, porM}=props;
  const labels = [];
  var misModulos = [];
  for (let i = 0; i < porM.length; i++) {
    var modulo = "";
    var porsentaje = 0;
    
    if (i === 0) {
      modulo = porM[i];
      porsentaje = porM[i+1];
      var modul = new Modulo(modulo, porsentaje);
      misModulos.push(modul);
      i++;
    }else{
      if(porM[i]===porM[i-2]){
      }else{
        modulo = porM[i];
        porsentaje = porM[i+1];
        var modul = new Modulo(modulo, porsentaje);
        misModulos.push(modul);
        i++;
      }
    }
    
  }
  are.map(function (ar){
    labels.push(ar)
  })
  const data = {
    labels,
    datasets: [
      
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgb(75, 192, 192)',
        data: misModulos.map((modul) => modul.porsentaje),
        borderColor: 'white',
        borderWidth: 2,
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