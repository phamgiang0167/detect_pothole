import React,{useState} from 'react'
import classes from './OverviewSmallCards.module.css';
import customer from '../../Assests/customerColor.png'
export default function OverviewSmallCards(props) {
   
    const[active, setActive] = useState(false);

    const handleActive = () =>{
        setActive(!active)
    }

    return (
        <div onClick={handleActive} className={classes.Card}>
           
           <div className={classes.IconWrapper}>
               <img src={props.img} alt="customer"/>
           </div>
           <div className={classes.DetailWrapper}>
               <div className={classes.Detail}>{props.detail}</div>
               <div className={classes.Number}>{props.number}</div>
           </div>
           <div className={[active?classes.BorderWrapper:classes.NonBorder]}></div>
        </div>
    )
}
