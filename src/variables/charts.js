
const chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.0)",
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 14,
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
    xAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
  },
};

const chart3_4_options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(0,242,195,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
};

function generateDataset1(canvas, data) {
  let ctx = canvas.getContext("2d");

  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
  gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
  gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

  return {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ],
    datasets: [
      {
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data,
      },
    ],
  };
}

async function fetchChartData() {
  try {
    const response = await fetch('https://ec2-13-239-43-135.ap-southeast-2.compute.amazonaws.com/chart_query');
    const data = await response.json();

    return {
      pHValues: data.map(entry => entry.pH),
      tempValues: data.map(entry => entry.temp),
      TDSValues: data.map(entry => entry.tds),
      turbidityValues: data.map(entry => entry.turb),
      DOValues: data.map(entry => entry.do)
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
}

async function fetchAnalyticsData() {
  try {
    const response = await fetch('https://ec2-13-239-43-135.ap-southeast-2.compute.amazonaws.com/analytics');
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
}

function generateDataset2(canvas, data) {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    return {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
        {
          label: "Deviation Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        },
      ],
    };
  }

function findSuccessiveDifferences(arr) {
  let differences = [];
  for (let i = 0; i < arr.length - 1; i++) {
      differences.push(arr[i + 1] - arr[i]);
  }
  return differences;
}


const chartData = await fetchChartData();
const analyticsData = await fetchAnalyticsData();

console.log(analyticsData);

let chartExample1 = {
  data1: (canvas) => generateDataset1(canvas, chartData.pHValues),
  data2: (canvas) => generateDataset1(canvas, chartData.tempValues),
  data3: (canvas) => generateDataset1(canvas, chartData.TDSValues),
  data4: (canvas) => generateDataset1(canvas, chartData.turbidityValues),
  data5: (canvas) => generateDataset1(canvas, chartData.DOValues),
  options: chart1_2_options,
}; // Initialize chartExample1

let chartExample4 = {
  data1: (canvas) => generateDataset2(canvas, findSuccessiveDifferences(chartData.pHValues)),
  data2: (canvas) => generateDataset2(canvas, findSuccessiveDifferences(chartData.tempValues)),
  data3: (canvas) => generateDataset2(canvas, findSuccessiveDifferences(chartData.TDSValues)),
  data4: (canvas) => generateDataset2(canvas, findSuccessiveDifferences(chartData.turbidityValues)),
  data5: (canvas) => generateDataset2(canvas, findSuccessiveDifferences(chartData.DOValues)),
  options: chart3_4_options,
}; // Initialize chartExample4

let chartExample3 = {
  data1: (canvas) => generateDataset2(canvas, analyticsData.anomalies),
  options: chart3_4_options,
};

let chartExample2 = {
  data1: (canvas) => generateDataset2(canvas, analyticsData.predictions),
  options: chart3_4_options,
};

export { chartExample1, chartExample4, chartData, chartExample2, chartExample3};