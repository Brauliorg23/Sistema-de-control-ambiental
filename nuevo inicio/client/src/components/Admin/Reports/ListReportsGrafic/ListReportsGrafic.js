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
import { jsPDF } from "jspdf";
import { renderToString } from "react-dom/server";

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

  // downloadBtn.addEventListener("click", function() {
  //   var d = new Date();
  //   var n = d.toISOString();
  //   // only jpeg is supported by jsPDF
  //   var imgData = Chart.toDataURL("image/png", 1.0);
  //   var pdf = new jsPDF();
  //   pdf.addImage(imgData, "JPEG", 0, 0);
  //   pdf.save(n+"-graf01.pdf");
  // }, false);

  // function downloadBtn (){
  //   var d = new Date();
  //   var n = d.toISOString();
  //   var imgData = Chart.toDataURL("image/png", 1.0);
  //   var pdf = new jsPDF();
  //   pdf.addImage(imgData, "JPEG", 0, 0);
  //   pdf.save(n+"-graf01.pdf");
  // }

  const downloadBtn = () => {
    var d = new Date();
    var n = d.toISOString();
    const string = renderToString(<Chart type='bar' data={data} />);
    const pdf = new jsPDF("p", "mm", "a4");
    const columns = [
      "SOW Creation Date",
      "SOW Start Date",
      "Project",
      "Last Updated",
      "SOW End Date"
    ];
    var rows = [
      [
        "Dec 13, 2017",
        "Jan 1, 2018",
        "ABC Connect - ABCXYZ",
        "Dec 13, 2017",
        "Dec 31, 2018"
      ]
    ];
    pdf.addImage(string, "JPEG", 0, 0);
    pdf.save(n+"pdf");
  };

  return (
    <div className='Graf'>
      <Chart type='bar' data={data} />
      <Button onClick={() => downloadBtn()} type="primary" shape="round" icon={<DownloadOutlined />}>
      Download
      </Button>
    </div>  
  );
}