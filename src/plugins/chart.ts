import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineController,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'

Chart.register(
  BarController,
  LineController,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
)

Chart.defaults.color = window.theme['gray-600']
Chart.defaults.font.family = "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
window.Chart = Chart

export default Chart
