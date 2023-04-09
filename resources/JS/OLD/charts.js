const options = {
method: 'GET',
headers: {
    'X-RapidAPI-Key': 'f5329210d1msh0da6314a1debe23p123271jsnbafb671446a2',
    'X-RapidAPI-Host': 'fmpcloud.p.rapidapi.com'
}
};

//   let ticker = function handleChange(val) {
//   console.log(`The value is ${val}`);
//   return val
// }


function updateChart(ticker = "AAPL") {
    async function fetchData() {
        const url = 'https://fmpcloud.p.rapidapi.com/income-statement/' + ticker + '?apikey=bbc6c7abb96d9e77dd30eaa0088f0bb8&period=annual';
        console.log(url)
        const response = await fetch(url, options);
        // wait until the request has been completed
        const datapoints  = await response.json();
        console.log(datapoints);
        return datapoints;
    };

    fetchData().then(datapoints => {
    let year = datapoints.map(
        function(index){
        return index.calendarYear;
        })
    let weightedAverageShsOutDil = datapoints.map(
    function(index){
        return index.weightedAverageShsOutDil;
        })  
    let ebitda = datapoints.map(
    function(index){
        return index.ebitda;
        }) 
        
    console.log(year);
    year = year.reverse();
    weightedAverageShsOutDil= weightedAverageShsOutDil.reverse();
    ebitda= ebitda.reverse();

    myChart.config.data.labels = year;        
    myChart.config.data.datasets[0].data = weightedAverageShsOutDil;

    myChart1.config.data.labels = year;  
    myChart1.config.data.datasets[0].data = ebitda;

    myChart.update()
    myChart1.update()

    });
}

const sharesOutstanding = [
{ year: '2018', shares: { total: 0, weightedAverageShsOutDil: 0, ebitda:  0} },
{ year: '2019', shares: { total: 0, weightedAverageShsOutDil: 0, ebitda:  0} },
{ year: '2020', shares: { total: 0, weightedAverageShsOutDil: 0, ebitda:  0} },
{ year: '2021', shares: { total: 0, weightedAverageShsOutDil: 0, ebitda:  0} },
{ year: '2022', shares: { total: 0, weightedAverageShsOutDil: 0, ebitda:  0} }
];

// setup 
const data = {
//labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
datasets: [
    {
    label: 'weightedAverageShsOutDil',
    data: sharesOutstanding,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    //parsing: {
    //    yAxisKey: 'shares.weightedAverageShsOutDil'
        //yAxisKey: 'ebitda'
    //}
    }
]
};

const ebitdaData = {
datasets: [
    {
    label: 'ebitda',
    data: sharesOutstanding,
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    }
]
};

// config 
const config = {
type: 'bar',
data: data,
options: {
tension: 0.4,
parsing: {
    xAxisKey: 'calendarYear',
    yAxisKey: 'shares.weightedAverageShsOutDil'
},
scales: {
    y: {
    beginAtZero: true
    }
}
}
};

const config1 = {
    type: 'bar',
    data: ebitdaData,
    options: {
    tension: 0.4,
    parsing: {
        xAxisKey: 'calendarYear',
        yAxisKey: 'shares.ebitda'
    },
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
    };

// render init block commonStockRepurchased commonStockIssued Weighted Average Shares Outstanding (Diluted)	
const myChart = new Chart(
document.getElementById('myChart'),
config
);

const myChart1 = new Chart(
document.getElementById('myChart1'),
config1
);

function toggleChart(index){
    console.log(index.value)
    const chartBox = document.querySelectorAll('.chartBox')[index.value];
    chartBox.classList.toggle('fullScreen')
    console.log(chartBox)
}