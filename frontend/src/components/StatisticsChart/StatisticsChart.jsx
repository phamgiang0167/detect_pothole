import React from 'react'
import classes from './StatisticsChart.module.css';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';


export default function StatisticsChart(props) {


  const totalStocks = useSelector(state => state.reducer.stockListData)

    const data = {
        labels: ['Sales','Purchase','Stock'],
        datasets: [
          {
            label: '# of Votes',
            data: [props.sumOfTotalProfit, 8000, totalStocks],
            backgroundColor: [
              'rgb(39,67,247)',
              'rgb(164,116,226)',
              'rgb(61,219,200)',
             
            ],
            borderColor: [
              'rgb(39,67,247)',
              'rgb(164,116,226)',
              'rgb(61,219,200)',
            
            ],
            borderWidth: 1,
          },
        ],
      };
      

    return (
        <div className={classes.MainContainer}>
            Statistics
              <Doughnut data={data} />
        </div>
    )
}
