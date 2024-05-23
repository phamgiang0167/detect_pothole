import React,{useState, useEffect} from 'react'
import classes from './SideBarLeft.module.css';
import { Link, useHistory } from 'react-router-dom';
import MainLogo from '../../Assests/MainLogo.png';
import OverView from '../../Assests/overview.svg';
import Purchase from '../../Assests/purchase.svg';
import Customer from '../../Assests/customer.svg';
import Product from '../../Assests/product.svg';
import Lofi from '../../Assests/wallpaper.jpg';
import ReactAudioPlayer from 'react-audio-player';

export default function SideBarLeft() {
  
    const history = useHistory();
   const [activeOverview, setActiveOverview] = useState(false);
   const [activeCustomer, setActiveCustomer] = useState(false);
   const [activeProduct, setActiveProduct] = useState(false);
   const [activePurchase, setActivePurchase] = useState(false);
   const [animate, setAnimate] = useState(true)

   useEffect(()=>{
        if(history.location.pathname === "/dashboard"){
            setActiveOverview(true)
            setActiveCustomer(false)
            setActiveProduct(false)
            setActivePurchase(false)
        }
        if(history.location.pathname === "/dashboard/customer"){
            setActiveOverview(false)
            setActiveCustomer(true)
            setActiveProduct(false)
            setActivePurchase(false)
        }
        if(history.location.pathname === "/dashboard/customer"){
            setActiveOverview(false)
            setActiveCustomer(true)
            setActiveProduct(false)
            setActivePurchase(false)
        }
        if(history.location.pathname === "/dashboard/product"){
            setActiveOverview(false)
            setActiveCustomer(false)
            setActiveProduct(true)
            setActivePurchase(false)
        }
        if(history.location.pathname === "/dashboard/purchase"){
            setActiveOverview(false)
            setActiveCustomer(false)
            setActiveProduct(false)
            setActivePurchase(true)
        }
   },[history.location.pathname])

   const handleActiveOverview = () =>{
           setActiveOverview(true);
           setActiveCustomer(false)
           setActiveProduct(false)
           setActivePurchase(false)
   }
   const handleActiveCustomer = () =>{
    setActiveOverview(false);
    setActiveCustomer(true)
    setActiveProduct(false)
    setActivePurchase(false)
}
const handleActiveProduct = () =>{
    setActiveOverview(false);
    setActiveCustomer(false)
    setActiveProduct(true)
    setActivePurchase(false)
}
const handleActivePurchase = () =>{
    setActiveOverview(false);
    setActiveCustomer(false)
    setActiveProduct(false)
    setActivePurchase(true)
}
  const handlePlay = () =>{
    setAnimate(!animate)
    
  }
  const handlePause = () =>{
    setAnimate(!animate)
   
  }


    return (
        <div className={classes.HeaderContent}>
        <div className={classes.LogoContainer}>
          <img src={MainLogo} alt="company logo"/>
        </div>
        <nav className={classes.NavMainContainer}>
            <div className={classes.NavLinkContainer}>
               <Link onClick={handleActiveOverview} to="/dashboard" className={`${classes.NavLinkFlexWrapper} ${activeOverview ? classes.Active : ''}`}>
                  <img className={classes.NavLinkIcons} src={OverView} alt="overview" />
                   <p>Overview</p>
               </Link>
               <Link onClick={handleActiveCustomer} to="/dashboard/customer" className={`${classes.NavLinkFlexWrapper} ${activeCustomer ? classes.Active : ''}`}>
                  <img className={classes.NavLinkIcons} src={Customer} alt="customer" />
                   <p>Customer</p>
               </Link>
               <Link onClick={handleActiveProduct} to="/dashboard/product" className={`${classes.NavLinkFlexWrapper} ${activeProduct ? classes.Active : ''}`}>
                  <img className={classes.NavLinkIcons} src={Product} alt="product" />
                   <p>Products</p>
               </Link>
               <Link onClick={handleActivePurchase} to="/dashboard/purchase" className={`${classes.NavLinkFlexWrapper} ${activePurchase ? classes.Active : ''}`}>
                  <img className={classes.NavLinkIcons} src={Purchase} alt="purchase" />
                   <p>Purchase</p>
               </Link>
            </div>
        </nav>
        <div className={[animate?classes.MusicPlayer:classes.MusicPlayerPlay]}>
            <div className={[animate?classes.Zen:classes.ZenHighlighted]}>Zen Mode</div>
        <div className={classes.HoverCircle}></div>
        <img className={[animate ? classes.CircularAlbum:classes.Rotate]} src={Lofi} alt="Lofi"/>
       
        <ReactAudioPlayer className={classes.PlayerMain}
  src="https://nishbuck878.s3.ap-south-1.amazonaws.com/'Workday'+Productive+Chill+Music+Mix.mp3"
  onPlay={handlePlay}
  controls
  onPause={handlePause}
 
/>
      
           
        </div>
      
    </div>
    )
}
