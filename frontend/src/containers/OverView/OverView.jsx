import React,{ useEffect,useState, Suspense } from 'react'
import classes from './OverView.module.css';
import OverviewSmallCards from '../../components/OverviewSmalCards/OverviewSmallCards';
import PerformanceChart from '../../components/PerformaceChart/PerformanceChart';
import StatisticsChart from '../../components/StatisticsChart/StatisticsChart';
import listIcon from '../../Assests/list.svg';
import listColor from '../../Assests/coloredList.svg';
import gridIcon from '../../Assests/grid.svg';
import gridColor from '../../Assests/coloredGrid.svg';
import OrderListCard from '../../components/OrderListCard/OrderListCard';
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import {orderListData} from '../../components/Constants/defaultValue';
import Axios from 'axios';
import { accessOrderList } from '../../Redux/reducer';
import { useDispatch, useSelector } from "react-redux";
import { Instagram } from 'react-content-loader';
import customerPic from '../../Assests/customerPic.png'
import purchasePic from '../../Assests/invoice.png';
import productPic from '../../Assests/product.png';
import profitPic from '../../Assests/profit.png'




export default function OverView() {



    const mainOrderListData = useSelector((state) => state.reducer.orderListData);
    const customerNumber = mainOrderListData.length;
    const profitList = mainOrderListData.filter((item) => item.status === "confirm") 
    const profitArray = profitList.map((item) => parseFloat(item.amount));
    const sumOfTotalProfit= profitArray.reduce((a,b) => a+b, 0);
    const topCardData = [
        {
            id:1,
            img:customerPic,
            detail:"Total Customer",
            number:customerNumber
        },
        {
            id:2,
            img:profitPic,
            detail:"Total Profit",
            number:sumOfTotalProfit
        },
        {
            id:3,
            img:purchasePic,
            detail:"Total Purchase",
            number:80
        },
        {
            id:4,
            img:productPic,
            detail:"Total Product",
            number:6
        },
       
    ]

 
   
    const dispatch = useDispatch();

    const [isGrid, setIsGrid] = useState(false);
    const[pageNumber, setPageNumber]=useState(0);
   const [listData, setListData]=useState([]);
   const[loading, setLoading]=useState(false)



    // pagination
    const userPerPage = 6;

    const pagesVisited = pageNumber * userPerPage
    //
    const displayListData = listData.slice(pagesVisited, pagesVisited + userPerPage).map((item) =>{
        return <OrderListCard id={item.id} key={item.id} name={item.name} 
        date={item.date} amount={item.amount} status={item.status} img={item.img} isGrid={isGrid} />
    })
    
   const pageCount = Math.ceil(listData.length / userPerPage);
         

   const changePage = ({selected}) =>{
    setPageNumber(selected)
   }

       // pagination

    const handleGridClick = () =>{
        setIsGrid(true)
    };
    const handleListClick = () =>{
        setIsGrid(false)
    };
    


    useEffect(()=>{
        setLoading(true)
       document.title="Easy Erp | Overview";
        const url = "https://5fe1862804f0780017de9d2e.mockapi.io/OrderList"
       Axios.get(url)
       .then(res =>{
        setLoading(false)
        setListData(res.data)
        dispatch(
            accessOrderList(res.data)
           )
       }).catch(err =>{
           console.log(err)
           setLoading(false)
       })
              
       
       
     

    },[])

    return (
        <div className={classes.MainContainer}>

      <motion.div   initial={{ y: "-120vw", transition: { type: "spring", duration: 1.5 } }}
             animate={{ y: 0, transition: { type: "spring", duration: 1.5 } }} className={classes.TopFlexWrapper}>
     {
         topCardData.map(item =>{
             return <OverviewSmallCards key={item.id} id={item.id} img={item.img} detail={item.detail} number={item.number} />
         })
     }
      </motion.div>

      <motion.div    initial={{ x: "-120vw", transition: { type: "spring", duration: 1.5 } }}
                  animate={{ x: 0, transition: { type: "spring", duration: 1.5 } }} className={classes.MiddleFlexWrapper}>
         <PerformanceChart/><StatisticsChart sumOfTotalProfit={sumOfTotalProfit}/>
      </motion.div>
      <motion.div   initial={{ x: "120vw", transition: { type: "spring", duration: 1.5 } }}
             animate={{ x: 0, transition: { type: "spring", duration: 1.5 } }}  className={classes.BottomFlexWrapper}>
      <div className={classes.OrderHeader}>
         <div className={classes.HeaderLeft}>Order List</div> 
         <div className={classes.HeaderRight}>
             <div onClick={handleListClick}  className={classes.ListContainer}>
              <div className={classes.ListSvgContainer}>
                  <img src={isGrid?listIcon:listColor} alt="List"/>
              </div>
              <div className={classes.HeaderList}>
                  List
              </div>
             </div>
             <div onClick={handleGridClick} className={classes.GridContainer}>
             <div  className={classes.GridSvgContainer}>
                  <img src={isGrid?gridColor:gridIcon} alt="Grid"/>
              </div>
              <div className={classes.HeaderGrid}>
                 Grid
              </div>
             </div>
             </div> 
      </div>
      <div className={[isGrid?classes.OrderSecondHederHidden:classes.OrderSecondHeader]}>
          <div className={classes.OrderId}>
              Order Id
          </div>
          <div className={classes.CustomerName}>
              Customer
          </div>
          <div className={classes.OrderDate}>
          Order Date
          </div>
          <div className={classes.OrderAmount}>
          Order Amount
          </div>
          <div className={classes.Status}>
          Status
          </div>
      </div>
     

   
      <div className={[isGrid?classes.OrderCardGrid:classes.OrderCardContainer]}>
          <Suspense fallback={<h1>Loading...</h1>}>
          
      {
       displayListData
      }
          </Suspense>
      
    
     
      <div className={classes.PaginationContainer}>
      <ReactPaginate 
       previousLabel={"Previous"}
       nextLabel={"Next"}
       pageCount={pageCount}
       onPageChange={changePage}
       containerClassName={classes.PaginationButtons}
       previousClassName={classes.PreviousBtn}
       nextLinkClassName={classes.NextBtn}
       disabledClassName={classes.PaginationDisabled}
       activeClassName={classes.PaginationActive}
      />
      </div>
        
  
      </div>
        
                   
      
      </motion.div>
        </div>
    )
}
