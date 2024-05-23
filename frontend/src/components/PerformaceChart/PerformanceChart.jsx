import React,{useEffect} from 'react'
import classes from './PerformanceChart.module.css';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux'

export default function PerformanceChart() {

   const mainGraphData = useSelector((state) => state.reducer.orderListData);
   const confirmYears = mainGraphData.filter((item) => item.status === "confirm")  ;
   
   const yearSortTwenty = confirmYears.filter((item) => item.date.slice(0,4) === "2020") 
   const yearSortTwentyOne = confirmYears.filter((item) => item.date.slice(0,4) === "2021") ;
      

   useEffect(() =>{

    

   },[mainGraphData])

  //year 2020
  const twentyJan = yearSortTwenty.filter((item) => item.date.slice(5,7) === "01")
  const twentyFeb = yearSortTwenty.filter((item) => item.date.slice(5,7) === "02")
  const twentyMar = yearSortTwenty.filter((item) => item.date.slice(5,7) === "03")
  const twentyApr = yearSortTwenty.filter((item) => item.date.slice(5,7) === "04")
   const twentyMay = yearSortTwenty.filter((item) => item.date.slice(5,7) === "05")
   const twentyJune = yearSortTwenty.filter((item) => item.date.slice(5,7) === "06")
   const twentyJuly = yearSortTwenty.filter((item) => item.date.slice(5,7) === "07")
   const twentyAug = yearSortTwenty.filter((item) => item.date.slice(5,7) === "08")
   const twentySept = yearSortTwenty.filter((item) => item.date.slice(5,7) === "09")
   const twentyOct = yearSortTwenty.filter((item) => item.date.slice(5,7) === "10")
   const twentyNov = yearSortTwenty.filter((item) => item.date.slice(5,7) === "11")
   const twentyDec = yearSortTwenty.filter((item) => item.date.slice(5,7) === "12")
 
   
   const novTwentyProfit = twentyNov.map((item) => parseFloat(item.amount));
 
   const sumOfNovTwenty = novTwentyProfit.reduce((a,b) => a+b, 0);

   const janTwentyProfit = twentyJan.map((item) => parseFloat(item.amount));
 
   const sumOfJanTwenty = janTwentyProfit.reduce((a,b) => a+b, 0);

   const febTwentyProfit = twentyFeb.map((item) => parseFloat(item.amount));
 
   const sumOfFebTwenty = febTwentyProfit.reduce((a,b) => a+b, 0);

   const marTwentyProfit = twentyMar.map((item) => parseFloat(item.amount));
 
   const sumOfMarTwenty = marTwentyProfit.reduce((a,b) => a+b, 0);

   const aprTwentyProfit = twentyApr.map((item) => parseFloat(item.amount));
 
   const sumOfAprTwenty = aprTwentyProfit.reduce((a,b) => a+b, 0);

   const mayTwentyProfit = twentyMay.map((item) => parseFloat(item.amount));
 
   const sumOfMayTwenty = mayTwentyProfit.reduce((a,b) => a+b, 0);

   const juneTwentyProfit = twentyJune.map((item) => parseFloat(item.amount));
 
   const sumOfJuneTwenty = juneTwentyProfit.reduce((a,b) => a+b, 0);

   const julyTwentyProfit = twentyJuly.map((item) => parseFloat(item.amount));
 
   const sumOfJulyTwenty = julyTwentyProfit.reduce((a,b) => a+b, 0);

   const augTwentyProfit = twentyAug.map((item) => parseFloat(item.amount));
 
   const sumOfAugTwenty = augTwentyProfit.reduce((a,b) => a+b, 0);

   const septTwentyProfit = twentySept.map((item) => parseFloat(item.amount));
 
   const sumOfSeptTwenty = septTwentyProfit.reduce((a,b) => a+b, 0);

   const octTwentyProfit = twentyOct.map((item) => parseFloat(item.amount));
 
   const sumOfOctTwenty = octTwentyProfit.reduce((a,b) => a+b, 0);

   const decTwentyProfit = twentyDec.map((item) => parseFloat(item.amount));
 
   const sumOfDecTwenty = decTwentyProfit.reduce((a,b) => a+b, 0);
      //year 2020
    

    //year 2021
    const twentyOneFeb = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "02")
    const twentyOneJan = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "01")
    const twentyOneMar = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "03")
    const twentyOneApr = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "04")
     const twentyOneMay = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "05")
     const twentyOneJune = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "06")
     const twentyOneJuly = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "07")
     const twentyOneAug = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "08")
     const twentyOneSept = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "09")
     const twentyOneOct = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "10")
     const twentyOneNov = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "11")
     const twentyOneDec = yearSortTwentyOne.filter((item) => item.date.slice(5,7) === "12");


     const novTwentyOneProfit = twentyOneNov.map((item) => parseFloat(item.amount));
 
   const sumOfNovTwentyOne = novTwentyOneProfit.reduce((a,b) => a+b, 0);

   const janTwentyOneProfit = twentyOneJan.map((item) => parseFloat(item.amount));
 
   const sumOfJanTwentyOne = janTwentyOneProfit.reduce((a,b) => a+b, 0);

   const febTwentyOneProfit = twentyOneFeb.map((item) => parseFloat(item.amount));
 
   const sumOfFebTwentyOne = febTwentyOneProfit.reduce((a,b) => a+b, 0);

   const marTwentyOneProfit = twentyOneMar.map((item) => parseFloat(item.amount));
 
   const sumOfMarTwentyOne = marTwentyOneProfit.reduce((a,b) => a+b, 0);

   const aprTwentyOneProfit = twentyOneApr.map((item) => parseFloat(item.amount));
 
   const sumOfAprTwentyOne = aprTwentyOneProfit.reduce((a,b) => a+b, 0);

   const mayTwentyOneProfit = twentyOneMay.map((item) => parseFloat(item.amount));
 
   const sumOfMayTwentyOne = mayTwentyOneProfit.reduce((a,b) => a+b, 0);

   const juneTwentyOneProfit = twentyOneJune.map((item) => parseFloat(item.amount));
 
   const sumOfJuneTwentyOne = juneTwentyOneProfit.reduce((a,b) => a+b, 0);

   const julyTwentyOneProfit = twentyOneJuly.map((item) => parseFloat(item.amount));
 
   const sumOfJulyTwentyOne = julyTwentyOneProfit.reduce((a,b) => a+b, 0);

   const augTwentyOneProfit = twentyOneAug.map((item) => parseFloat(item.amount));
 
   const sumOfAugTwentyOne = augTwentyOneProfit.reduce((a,b) => a+b, 0);

   const septTwentyOneProfit = twentyOneSept.map((item) => parseFloat(item.amount));
 
   const sumOfSeptTwentyOne = septTwentyOneProfit.reduce((a,b) => a+b, 0);

   const octTwentyOneProfit = twentyOneOct.map((item) => parseFloat(item.amount));
 
   const sumOfOctTwentyOne = octTwentyOneProfit.reduce((a,b) => a+b, 0);

   const decTwentyOneProfit = twentyOneDec.map((item) => parseFloat(item.amount));
 
   const sumOfDecTwentyOne = decTwentyOneProfit.reduce((a,b) => a+b, 0);

 //year 2021

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June','July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2020',
        data: [sumOfJanTwenty,sumOfFebTwenty,sumOfMarTwenty,sumOfAprTwenty,sumOfMayTwenty,sumOfJuneTwenty,sumOfJulyTwenty,sumOfAugTwenty,sumOfSeptTwenty,sumOfOctTwenty,sumOfNovTwenty,sumOfDecTwenty],
        backgroundColor: 'rgb(39,67,247)',
       
      },
      {
        label: '2021',
        data: [sumOfJanTwentyOne,sumOfFebTwentyOne,sumOfMarTwentyOne,sumOfAprTwentyOne,sumOfMayTwentyOne,sumOfJuneTwentyOne,sumOfJulyTwentyOne,sumOfAugTwentyOne,sumOfSeptTwentyOne,sumOfOctTwentyOne,sumOfNovTwentyOne,sumOfDecTwentyOne],
        backgroundColor: 'rgb(61,219,200)',

      },
     
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

    return (
        <div className={classes.MainContainer}>
          Report
          <Bar data={data} options={options} />
         
            
        </div>
    )
}
