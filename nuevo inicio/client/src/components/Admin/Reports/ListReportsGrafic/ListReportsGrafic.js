import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const labels = [100, 200, 300, 400, 500, 600, 700];

const options = {
  responsive: true,
}

export default function ListReportsGrafic(){
  const data = useMemo(function () {
    return{
      datasets: [
        {
          type: 'bar',
          label: "mis datos",
          data: scores,          
        }
      ],
      labels
    }
  }, []);

  return <Line data={data} options={options} />
}