import React,{useEffect,useState} from 'react'
import classes from './Customers.module.css';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { pictureList } from '../../components/Constants/defaultValue';
import {  Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion';




export default function Customers() {

    const [isSubmitted, setIsSubmitted]=useState(false)
    
    
 

  

   const getRandom = () =>{
    let pictures = pictureList
    return pictures[Math.floor((Math.random()*pictures.length))];
   }

   const history = useHistory();

    useEffect(()=>{
        document.title="Easy Erp | Customers"
     },[]);


     const { register, handleSubmit } = useForm(
       
        );

        
        const onSubmit  = (data) =>{
           
           setIsSubmitted(true)
           var config = {
            method: 'post',
            url: "https://5fe1862804f0780017de9d2e.mockapi.io/OrderList",

            data:{
                "id": Date.now(),
                "name": data.name,
                "date": data.date,
                "amount":data.amount,
                "status": data.category,
                "img": getRandom()
            }
        };

        Axios(config).then(res =>{
           
           if(res.status === 201){
            
            // setTimeout(function(){ history.push('/dashboard') }, 1000)
           
            history.push('/dashboard')
          
               
           
           }
           
        }).catch(err =>{
            console.log(err)
        });
        

         
        }
      


    return (
        <div className={classes.MainContainer}>
            <div className={[isSubmitted?classes.SuccessContainer:classes.SuccessContainerHidden]}>Form Submitted</div>
          <h3 className={classes.Header}>Customer Information</h3>
          <motion.form    initial={{ y: "-120vw", transition: { type: "spring", duration: 1.5 } }}
             animate={{ y: 0, transition: { type: "spring", duration: 1.5 } }}
                         
 className={[isSubmitted?classes.CustomerInfoFormSubmit:classes.CustomerInfoForm]} autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
             <div className={classes.InputContainer}>
                 <input 
                 className={classes.NameInput} 
                 name="name"
                 type="text"
                 placeholder="Name"
                 {...register("name")}
                 required
                 />
             </div>
             <div className={classes.InputContainer}>
                 <input 
                 className={classes.DateInput} 
                 name="date"
                 type="date"
                 pattern="\d{2}\\d{2}\\d{4}"
               {...register("date")}
                 required
                 />
             </div>
             <div className={classes.InputContainer}>
                 <input 
                 className={classes.AmountInput} 
                 name="amount"
                 type="text"
                placeholder="Enter Amount"
               {...register("amount")}
                 required
                 />
             </div>
             <div className={classes.InputContainer}>
             <select className={classes.StatusInput} required {...register("category")}>
        <option value="">Select status</option>
        <option value="confirm">Confirm</option>
        <option value="cancel">Cancel</option>
      </select>
               
             </div>
             <input className={classes.SubmitBtn} type="submit" />
          </motion.form>
        </div>
    )
}
