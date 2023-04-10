//Adjust API so it can run without RAPID API

// const optionsTest = {
// method: 'GET',
// headers: {
//   'Content-type': 'application/json;charset=UTF-8'
// }
// };

async function trigger(timeIndex, APISource = 'cash-flow-statement', period = 'annual') {
  const ticker = document.getElementById("inputTicker").innerText;
  if (!ticker) {
    alert("Please enter a ticker");
    return;
  }
  
  
  const urlCashFlow =  `https://eorqdv9pugwmyey.m.pipedream.net/?Ticker=${ticker}`
  const urlIncomeStatement = `https://eos7w7u9s47emvp.m.pipedream.net/?Ticker=${ticker}`
  const urlBalanceSheet =  `https://eomr6a8qmm0bgna.m.pipedream.net/?Ticker=${ticker}`
  const urlStockPrice = `https://eol73aj8sl2k982.m.pipedream.net/?Ticker=${ticker}`
  const urlDividends = `https://eo2gspvt1hdmirm.m.pipedream.net/?Ticker=${ticker}`
  // const urlDividendCalendar = 'https://eoh7352ondkby8s.m.pipedream.net/'
  const urlCompanyMetrics = `https://eofq9y2ys1nk1sa.m.pipedream.net/?Ticker=${ticker}`
  const urlFinancialGrowthMetrics = `https://eo3ng8atuqwl7it.m.pipedream.net/?Ticker=${ticker}`

  const responses = await Promise.all([fetch(urlCashFlow), fetch(urlIncomeStatement), fetch(urlBalanceSheet), fetch(urlStockPrice), fetch(urlDividends), fetch(urlCompanyMetrics), fetch(urlFinancialGrowthMetrics)])

  const dataCashFlow = await responses[0].json()
  const dataIncomeStatement = await responses[1].json()
  const dataBalance = await responses[2].json()
  const dataStockPrice =  await responses[3].json()
  const dataDividends = await responses[4].json()
  // const dataDividendCalendar = await responses[5].json()
  const dataCompanyMetrics = await responses[5].json()
  const dataGrowthMetrics = await responses[6].json()

  let marketCap = dataCompanyMetrics.map(
    function(index){
      return index.marketCapTTM;
    }
  )
  let enterpriseValue = dataCompanyMetrics.map(
    function(index){
      return index.enterpriseValueTTM;
    }
  )
  let peRatio = dataCompanyMetrics.map(
    function(index){
      return index.peRatioTTM;
    }
  )
  let freeCashFlowYield = dataCompanyMetrics.map(
    function(index){
      return index.freeCashFlowYieldTTM;
    }
  )
  let netDebtToEBITDA = dataCompanyMetrics.map(
    function(index){
      return index.netDebtToEBITDATTM;
    }
  )
  let roic = dataCompanyMetrics.map(
    function(index){
      return index.roicTTM;
    }
  )
  let dividendPercentage = dataCompanyMetrics.map(
    function(index){
      return index.dividendYieldPercentageTTM;
    }
  )
    let payoutRatio = dataCompanyMetrics.map(
    function(index){
      return index.payoutRatioTTM;
    }
  )
  let netIncomeRatio = dataIncomeStatement.map(
    function(index){
      return index.netIncomeRatio;
    })
  let balanceYear = dataBalance.map(
    function(index){
      return index.calendarYear;
    })
  let cash = dataBalance.map(
    function(index){
      return index.cashAndShortTermInvestments;
    })
  let debt = dataBalance.map(
    function(index){
      return index.longTermDebt;
    })
  let dateStockPriceImport = dataStockPrice.historical.map(
    function(index){
      return index.date;
    })
  let stockPrice = dataStockPrice.historical.map(
    function(index){
      return index.close;
    })  
  let year = dataCashFlow.map(
    function(index){
      return index.calendarYear;
    })
  let netIncome = dataCashFlow.map(
    function(index){
      return index.netIncome;
    })  
  let stockBasedCompensation = dataCashFlow.map(
    function(index){
      return index.stockBasedCompensation;
    }) 
  let cashAtEndOfPeriod = dataCashFlow.map(
    function(index){
      return index.cashAtEndOfPeriod;
    }) 
  let freeCashFlow = dataCashFlow.map(
    function(index){
      return index.freeCashFlow;
    }) 
  let yearIncome = dataIncomeStatement.map(
    function(index){
    return index.calendarYear;
    })
  let revenue = dataIncomeStatement.map(
    function(index){
    return index.revenue;
    })
  let ebitda = dataIncomeStatement.map(
    function(index){
    return index.ebitda;
    })         
  let operatingIncome = dataIncomeStatement.map(
    function(index){
    return index.operatingIncome;
    }) 
  let eps = dataIncomeStatement.map(
    function(index){
    return index.eps;
    }) 
  let weightedAverageShsOutDil = dataIncomeStatement.map(
    function(index){
    return index.weightedAverageShsOutDil;
    })
  let dividendDate = dataDividends.historical.map(
    function(index){
    return index.date;
    }) 
  let dividend = dataDividends.historical.map(
    function(index){
    return index.dividend;
    })
  let dividendsperShareGrowth = dataGrowthMetrics.map(
    function(index){
    return index.dividendsperShareGrowth;
    })
  let threeYDividendperShareGrowthPerShare = dataGrowthMetrics.map(
    function(index){
    return index.threeYDividendperShareGrowthPerShare;
    })
  let fiveYDividendperShareGrowthPerShare = dataGrowthMetrics.map(
    function(index){
    return index.fiveYDividendperShareGrowthPerShare;
    })

  // converts number to string representation with K and M.
  // toFixed(d) returns a string that has exactly 'd' digits
  // after the decimal place, rounding if necessary.
  function formatNum(num) {
    if(num > 1000000000000){
      return (num/1000000000000).toFixed(1) + 'T'; // convert to T for number from > 1 Trillion 
    }else if(num > 1000000000){
      return (num/1000000000).toFixed(1) + 'B'; // convert to B for number from > 1 Billion 
    }else if(num > 1000000){
      return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num > 999 && num < 1000000){
      return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num < 900){
      return num; // if value < 1000, nothing to do
    }
  }

  marketCap = formatNum(marketCap, 1);
  enterpriseValue = formatNum(enterpriseValue, 1);
  console.log(fiveYDividendperShareGrowthPerShare);
  //Display KPIs on top of the page
  document.getElementById("marketCap").innerHTML = marketCap;
  document.getElementById("enterpriseValue").innerHTML = enterpriseValue;
  document.getElementById("peRatio").innerHTML = (peRatio) + 'X';
  document.getElementById("freeCashFlowYield").innerHTML = (1*freeCashFlowYield).toFixed(2) + '%';
  document.getElementById("netDebtToEBITDA").innerHTML = (1*netDebtToEBITDA).toFixed(2) + 'X';
  document.getElementById("roic").innerHTML = (100*roic).toFixed(2) + '%';
  document.getElementById("payoutRatio").innerHTML = (100*payoutRatio).toFixed(2) + '%';
  document.getElementById("dividendYield").innerHTML = (1*dividendPercentage).toFixed(2) + '%';
  document.getElementById("dividendGrowth1Y").innerHTML = (100*dividendsperShareGrowth[0]).toFixed(2) + '%';
  // .toFixed(2) + '%';
  document.getElementById("dividendGrowth3Y").innerHTML = (100*threeYDividendperShareGrowthPerShare[0]).toFixed(2) + '%' ;
  // .toFixed(2) + '%';
  document.getElementById("dividendGrowth5Y").innerHTML = (100*fiveYDividendperShareGrowthPerShare[0]).toFixed(2) + '%';
  // toFixed(2) + '%';

  balanceYear = balanceYear.reverse();
  cash = cash.reverse();
  debt = debt.reverse();
  dateStockPriceImport = dateStockPriceImport.reverse();
  const convertedDates =  dateStockPriceImport.map(x => new Date(x).setHours(0,0,0,0));
  stockPrice = stockPrice.reverse();
  year = year.reverse();
  netIncome= netIncome.reverse();
  stockBasedCompensation = stockBasedCompensation.reverse();
  cashAtEndOfPeriod = cashAtEndOfPeriod.reverse();
  freeCashFlow= freeCashFlow.reverse();
  yearIncome = yearIncome.reverse();
  revenue= revenue.reverse();
  ebitda = ebitda.reverse();
  operatingIncome = operatingIncome.reverse();
  eps = eps.reverse();
  weightedAverageShsOutDil= weightedAverageShsOutDil.reverse();
  dividendDate = dividendDate.reverse();
  dividend = dividend.reverse();
  netIncomeRatio = netIncomeRatio.reverse();
  startGraph = 2013; 
  endGraph = 2023;
       
  //1st Graph - Revenue
  myChart.config.data.labels = yearIncome;  
  const filterDatesGraph = yearIncome.filter(date => date >= startGraph && date <= endGraph)
  //slice the array (pie) only showing the selected section / slice + replace the labels in the chart
  myChart.config.data.labels = filterDatesGraph;
  // filterDatesGraph;
  const startArrayGraph = yearIncome.indexOf(filterDatesGraph[0])
  const endArrayGraph = yearIncome.indexOf(filterDatesGraph[filterDatesGraph.lenght-1])
  // datapoints
  const copyRevenue = [...revenue];
  copyRevenue.splice(endArrayGraph +1, filterDatesGraph.lenght);
  copyRevenue.splice(0,startArrayGraph);
  myChart.config.data.datasets[0].data = copyRevenue;
  myChart.update()

  //2nd Graph - Ebitda
  myChart1.config.data.labels = yearIncome;
  myChart1.config.data.labels = filterDatesGraph;
  const copyEbitda = [...ebitda];
  copyEbitda.splice(endArrayGraph +1, filterDatesGraph.lenght);
  copyEbitda.splice(0,startArrayGraph);
  myChart1.config.data.datasets[0].data = copyEbitda;
  myChart1.update() 
  
  //3rd Graph - Net Income
  myChart2.config.data.labels = year;
  const filterDatesGraphCashFlow = year.filter(date => date >= startGraph && date <= endGraph)
  myChart2.config.data.labels = filterDatesGraphCashFlow;
  const CopyNetIncome = [...netIncome];
  const CopyNetIncomeRatio = [...netIncomeRatio];
  CopyNetIncome.splice(endArrayGraph +1, filterDatesGraph.lenght);
  CopyNetIncome.splice(0,startArrayGraph);
  CopyNetIncomeRatio.splice(endArrayGraph +1, filterDatesGraph.lenght);
  CopyNetIncomeRatio.splice(0,startArrayGraph);
  myChart2.config.data.datasets[0].data = CopyNetIncome;
  myChart2.config.data.datasets[1].data = CopyNetIncomeRatio;
  myChart2.update()

  //4th Graph - Free Cash Flow
  myChart3.config.data.labels = year;  
  myChart3.config.data.labels = filterDatesGraphCashFlow;
  const CopyfreeCashFlow = [...freeCashFlow];
  CopyfreeCashFlow.splice(endArrayGraph +1, filterDatesGraph.lenght);
  CopyfreeCashFlow.splice(0,startArrayGraph);
  myChart3.config.data.datasets[0].data = CopyfreeCashFlow;  
  myChart3.update()

 //5th Graph - Dividends  
  myChart4.config.data.labels = dividendDate;  
  myChart4.config.data.datasets[0].data = dividend;  
  myChart4.update()

  //6th Graph - Shares Outstanding
  myChart5.config.data.labels = yearIncome;
  myChart5.config.data.labels = filterDatesGraph;
  const copyWeightedAverageShsOutDil = [...weightedAverageShsOutDil];
  copyWeightedAverageShsOutDil.splice(endArrayGraph +1, filterDatesGraph.lenght);
  copyWeightedAverageShsOutDil.splice(0,startArrayGraph);
  myChart5.config.data.datasets[0].data = copyWeightedAverageShsOutDil;  
  myChart5.update()

  //7th Graph - Cash & Debt
  myChart6.config.data.labels = balanceYear;  
  const filterDatesGraphBalance = balanceYear.filter(date => date >= startGraph && date <= endGraph)
  myChart6.config.data.labels = filterDatesGraphBalance;
  const copyCash = [...cash];
  const copyDebt = [...debt];
  copyCash.splice(endArrayGraph +1, filterDatesGraph.lenght);
  copyCash.splice(0,startArrayGraph);
  copyDebt.splice(endArrayGraph +1, filterDatesGraph.lenght);
  copyDebt.splice(0,startArrayGraph);
  myChart6.config.data.datasets[0].data = copyCash;  
  myChart6.config.data.datasets[1].data = copyDebt;   
  myChart6.update()

  const dates2 = [...dateStockPriceImport];
  var startDate;
  var endDate;
  if (timeIndex == 1){
    startDate = new Date("1990-01-01");
    endDate = new Date("2023-03-31");
  } else if (timeIndex == 2){
    startDate = new Date("2018-01-01");
    endDate = new Date("2023-03-31");
  } else if (timeIndex == 3){
    startDate = new Date("2020-03-01");
    endDate = new Date("2023-03-31");
  } else if(timeIndex == 4){
    startDate = new Date("2022-03-01");
    endDate = new Date("2023-03-31");
  } else {
    startDate = new Date("2023-01-01");
    endDate = new Date("2023-03-31");
  };

  // get the index number array
  const start = startDate.setHours(0,0,0,0);
  const end = endDate.setHours(0,0,0,0);
  const filterDates = convertedDates.filter(date => date >= start && date <= end)

  //slice the array (pie) only showing the selected section / slice + replace the labels in the chart
  myChartStockPrice.config.data.labels = filterDates;
  const startArray = convertedDates.indexOf(filterDates[0])
  const endArray = convertedDates.indexOf(filterDates[filterDates.lenght-1])
  // datapoints
  const copyStockPrice = [...stockPrice];
  copyStockPrice.splice(endArray +1, filterDates.lenght);
  copyStockPrice.splice(0,startArray);
  myChartStockPrice.config.data.datasets[0].data = copyStockPrice;
  myChartStockPrice.update();
}


const dataframe = [
  { year: '2018', keyfigures: { revenue: 0, ebitda: 0, netIncome:  0, netIncomeRatio : 0,  freeCashFlow : 0,  dividend : 0 , stockPrice: 0 , cash : 0, debt :0, shares: 0} },
  { year: '2019', keyfigures: { revenue: 0, ebitda: 0, netIncome:  0, netIncomeRatio : 0,  freeCashFlow : 0,  dividend : 0 , stockPrice: 0 , cash : 0, debt :0, shares: 0} },
  { year: '2020', keyfigures: { revenue: 0, ebitda: 0, netIncome:  0, netIncomeRatio : 0,  freeCashFlow : 0,  dividend : 0 , stockPrice: 0 , cash : 0, debt :0, shares: 0} },
  { year: '2021', keyfigures: { revenue: 0, ebitda: 0, netIncome:  0, netIncomeRatio : 0,  freeCashFlow : 0,  dividend : 0 , stockPrice: 0, cash : 0, debt :0, shares: 0} },
  { year: '2022', keyfigures: { revenue: 0, ebitda: 0, netIncome:  0, netIncomeRatio : 0,  freeCashFlow : 0,  dividend : 0 , stockPrice: 0, cash : 0, debt :0, shares: 0} }
  ];
  
// setup 


const dataRevenue = {
  datasets: [
      {
      label: 'revenue',
      data: dataframe,
      backgroundColor: 'rgba(0, 184, 148, 0.72)',
      borderColor: 'rgba(0, 0, 0, 1)',
      }
  ]
  };

const dataEbitda = {
  datasets: [
      {
      label: 'ebitda',
      data: dataframe,
      backgroundColor: 'rgba(81, 133, 122, 0.52)',
      borderColor: 'rgba(0, 0, 0, 0.5)',
      }
  ]
  };

const dataNetIncome = {
  datasets: [
      {
      label: 'Net Income',
      data: dataframe,
      backgroundColor: 'rgba(49, 235, 93, 0.92)',
      borderColor: 'rgba(0, 0, 0, 0.5)',
      order: 2, 
      yAxisID: 'y'
      }, 
      {
      label: 'netIncomeRatio',
      data: dataframe,
      backgroundColor: 'rgba(49, 235, 93, 0.92)',
      borderColor: 'rgba(0, 0, 0, 0.5)',
      type: 'line',
      order: 1,
      yAxisID: 'Percentage'
      }
  ]
  };
const dataFreeCashFlow = {
  datasets: [
      {
      label: 'Free Cashflow',
      data: dataframe,
      backgroundColor: 'rgba(176, 20, 184, 0.72)',
      borderColor: 'rgba(75, 192, 192, 1)',
      }
  ]
  };  

const dataSharesOut = {
  datasets: [
      {
      label: 'weightedAverageShsOutDil',
      data: dataframe,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      }
  ]
  };

const dataDividends = {
  datasets: [
      {
      label: 'Dividends',
      data: dataframe,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      }
  ]
  };

const dataStockPrice = {
  datasets: [
      {
      label: 'Stock price',
      data: dataframe,
      // spanGaps: false,
      // backgroundColor: 'rgba(0, 0, 0, 0.92)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 1,
      pointRadius: 0,
      }
  ]
  };

const dataCash = {
  datasets: [
      {
      label: 'Cash And Short-Term Investments',
      data: dataframe,
      // spanGaps: false,
      // backgroundColor: 'rgba(0, 0, 0, 0.92)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 1,
      pointRadius: 0,
      },
      {
        label: 'Long-term Debt',
        data: dataframe,
        // spanGaps: false,
        // backgroundColor: 'rgba(0, 0, 0, 0.92)',
        borderColor: 'rgba(176, 20, 184, 0.72)',
        borderWidth: 1,
        pointRadius: 0,
        }
  ]
  };

const configStockPrice = {
  type: 'line',
  data: dataStockPrice,
  options: {
  // spanGaps: true,
  // tension: 0.01,
  // borderwith: 0.04,
  parsing: {
      // xAxisKey: 'dateStockPrice', 
      // filterDate dateStockPrice
      yAxisKey: 'keyfigures.stockPrice'
  },
  scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month'
      }},
      y: {
      beginAtZero: true
      }
  }
  }
  };
  

// config 
const config = {
  type: 'bar',
  data: dataRevenue,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumSignificantDigits: 6,
              currencyDisplay: 'narrowSymbol'
            }).format(context.parsed.y/1000_000) + "M"; 
          }
        }
      }
    },
    locale: 'en-US',
  tension: 0.4,
  parsing: {
      xAxisKey: 'calendarYear',
      yAxisKey: 'keyfigures.revenue'
  },
  scales: {
    y: {
      ticks: {
        callback: (value, index, values) => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumSignificantDigits: 6,
            currencyDisplay: 'narrowSymbol'
          }).format(value/1000_000) + "M"; 
        }
      },
      beginAtZero: true
    }
}
}
};

const config1 = {
  type: 'bar',
  data: dataEbitda,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumSignificantDigits: 6,
              currencyDisplay: 'narrowSymbol'
            }).format(context.parsed.y/1000_000) + "M"; 
          }
        }
      }
    },
    locale: 'en-US',
    tension: 0.4,
    parsing: {
        xAxisKey: 'calendarYear',
        yAxisKey: 'keyfigures.ebitda'
    },
    scales: {
        y: {
          ticks: {
            callback: (value, index, values) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits: 6,
                currencyDisplay: 'narrowSymbol'
              }).format(value/1000_000) + "M"; 
            }
          },
          beginAtZero: true
        }
    }
    }
  };

const config2 = {
  type: 'bar',
  data: dataNetIncome,
  options: {
  tension: 0.4,
  parsing: {
      xAxisKey: 'calendarYear',
      yAxisKey: 'keyfigures.netIncome'
  },
  scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
      },
      Percentage: {
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: function(value, index, values){
            return `${value} %`
          }
        }
      }
  }
  }
  };

const config3 = {
  type: 'bar',
  data: dataFreeCashFlow,
  options: {
  tension: 0.4,
  parsing: {
      xAxisKey: 'calendarYear',
      yAxisKey: 'keyfigures.freeCashFlow'
  },
  scales: {
      y: {
      beginAtZero: true
      }
  }
  }
  };

const config4 = {
  type: 'bar',
  data: dataDividends,
  options: {
  tension: 0.4,
  parsing: {
      xAxisKey: 'calendarYear',
      yAxisKey: 'keyfigures.dividend'
  },
  scales: {
      y: {
      beginAtZero: true
      }
  }
  }
  };

const config5 = {
  type: 'bar',
  data: dataSharesOut,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumSignificantDigits: 6,
              currencyDisplay: 'narrowSymbol'
            }).format(context.parsed.y/1000_000) + "M"; 
          }
        }
      }
    },
    locale: 'en-US',
    tension: 0.4,
    parsing: {
        xAxisKey: 'calendarYear',
        yAxisKey: 'keyfigures.shares'
    },
    scales: {
        y: {
          ticks: {
            callback: (value, index, values) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits: 6,
                currencyDisplay: 'narrowSymbol'
              }).format(value/1000_000) + "M"; 
            }
          },
          beginAtZero: true
        }
    }
    }
  };

const config6 = {
  type: 'bar',
  data: dataCash,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumSignificantDigits: 6,
              currencyDisplay: 'narrowSymbol'
            }).format(context.parsed.y/1000_000) + "M"; 
          }
        }
      }
    },
    locale: 'en-US',
    tension: 0.4,
    parsing: {
        xAxisKey: 'balanceYear',
        yAxisKey: 'keyfigures.cash'
    },
    scales: {
        y: {
          ticks: {
            callback: (value, index, values) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits: 6,
                currencyDisplay: 'narrowSymbol'
              }).format(value/1000_000) + "M"; 
            }
          },
          beginAtZero: true
        }
    }
    }
  };

// render init block commonStockRepurchased commonStockIssued Weighted Average Shares Outstanding (Diluted)	
const myChartStockPrice = new Chart(
  document.getElementById('StockPriceChart'),
  configStockPrice
);

const myChart = new Chart(
  document.getElementById('myChart'),
  config
  );
  
const myChart1 = new Chart(
  document.getElementById('myChart1'),
  config1
);

const myChart2 = new Chart(
  document.getElementById('myChart2'),
  config2
);

const myChart3 = new Chart(
  document.getElementById('myChart3'),
  config3
);

const myChart4 = new Chart(
  document.getElementById('myChart4'),
  config4
);

const myChart5 = new Chart(
  document.getElementById('myChart5'),
  config5
);

const myChart6 = new Chart(
  document.getElementById('myChart6'),
  config6
);


function toggleChart(index){
  const chartBox = document.querySelectorAll('.chartBox')[index.value];
  chartBox.classList.toggle('fullScreen')
}

