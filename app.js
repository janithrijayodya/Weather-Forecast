//===============config==============

const myChart = {
  type: 'line',
  data: data,
};


//=================set up=====================

// Generate an array of dates for the last 7 days
const labels = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i)); // Adjust for last 7 days
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
});

const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [28, 30, 29, 31, 32, 27, 28],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
