
import React from 'react'
import classes from './ProductCard.module.css';

export default function ProductCard(props) {
  const idNumber =() =>{
    props.handleIdFetching(props.id)
  }

    return (
        <div 
          onClick={idNumber}
        className={classes.MainContainer}>
            <div className={classes.TopContainer}>
               <img src={props.img} alt="product"/>
            </div>
            <div className={classes.BottomContainer}>
                <div className={classes.Name}>{props.name}</div>
                <div className={classes.Quantity}>Quantity:{props.quantity}</div>
            </div>
        </div>
    )
}
