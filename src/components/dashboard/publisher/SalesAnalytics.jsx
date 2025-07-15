import { Bar } from 'react-chartjs-2'

export default function SalesAnalytics() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000],
        backgroundColor: '#6366F1',
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Monthly Sales Report',
        color: '#333',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666',
        },
      },
      x: {
        ticks: {
          color: '#666',
        },
      },
    },
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📈 Sales Analytics</h2>
      <Bar data={data} options={options} />
    </div>
  )
}
