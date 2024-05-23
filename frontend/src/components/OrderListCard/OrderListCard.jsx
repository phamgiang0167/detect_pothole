import React,{useState, useEffect, Suspense} from 'react'
import classes from './OrderListCard.module.css';
import profilePic from '../../Assests/nishant.jpg';
export default function OrderListCard(props) {

    const[statusValue, setStatusValue]=useState("Confirm");
    const[statusColor, setStatusColor]=useState(false)


    
  const status = props.status;
  

  useEffect(() =>{
    if(status === 'cancel'){
        setStatusValue('Cancel');
        setStatusColor(true)
     };

  },[status])
  
 

    return (
        <div className={[props.isGrid?classes.MainContainerGrid:classes.MainContainer]}>
            <div className={[props.isGrid?classes.OrderIdGrid:classes.OrderIdContainer]}>
                {props.id}
            </div>
            <div className={props.isGrid?classes.CustomerMainContainerGrid:classes.CustomerMainContainer}>
                <div className={props.isGrid?classes.ImageContainerGrid:classes.ImageContainer}>
                <Suspense fallback={<div>Loading</div>}>
                    <img src={props.img} alt="profile"/>
                    </Suspense>
                </div>
                <div className={props.isGrid?classes.NameGrid:classes.Name}>
                   {props.name}
                </div>
            </div>
            <div className={props.isGrid?classes.DateContainerGrid:classes.DateContainer}>
               {props.date}
            </div>
            <div className={classes.OrderAmount}>
                ${props.amount}
            </div>
            <div className={props.isGrid?statusColor?classes.StatusGridColor:classes.StatusGrid:statusColor?classes.StatusColorList:classes.Status}>
               {statusValue}
            </div>
        </div>
    )
}
