import React, { useState } from 'react';
import {  Link, useHistory } from 'react-router-dom'
import classes from './Register.module.css';
import MainLogo from '../../Assests/Easy.png';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';
import fire from '../../Config/fire'

const eye = <FontAwesomeIcon icon={faEye} />;
export default function Register() {

    const history = useHistory()

    const [passwordShownColor, setPasswordShownColor] = useState("inActive");
    const [passwordShown, setPasswordShown] = useState(false);
    const [isSubmitted, setIsSubmitted]=useState(false)

    const togglePasswordVisiblity = (e) => {

        setPasswordShown(passwordShown ? false : true);
        if (passwordShownColor === "inActive") {
            setPasswordShownColor("ActivePassword")

        }
        else {
            setPasswordShownColor("inActive")

        }
    };

    const { register, handleSubmit } = useForm(
       
        );


        const onSubmit  = (data) =>{
           
            fire.auth().createUserWithEmailAndPassword(data.email, data.password).then(res =>{
                setIsSubmitted(true);
                setTimeout(function(){ history.push("/login") }, 1000);
            })
            .catch((err)=>{
              console.log(err)
            })
         
        }

    return (
        <div
    
        className={classes.MainContainer}>
            <div className={classes.MainLogoContainer}>
                <motion.div 
                  initial={{ x: "-120vw", transition: { type: "spring", duration: 1.5 } }}
                  animate={{ x: 0, transition: { type: "spring", duration: 1.5 } }}
                className={classes.LogoSpinner}>
                <img src={MainLogo} alt="Company Logo"/>
                </motion.div>
            
            </div>
            <div className={classes.SecondaryContainer}>
            <motion.div 
             initial={{ x: "120vw", transition: { type: "spring", duration: 1.5 } }}
             animate={{ x: 0, transition: { type: "spring", duration: 1.5 } }}
            className={classes.HeaderContainer}>
                <h1>Welcome !</h1>
                <h2>Let's get started</h2>
            </motion.div >
            <motion.div 
              initial={{ x: "120vw", transition: { type: "spring", duration: 2 } }}
              animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
            className={[isSubmitted?classes.FormContainerSubmit:classes.FormContainer]}>
                <form autoComplete="off" className={classes.RegisterForm} onSubmit={handleSubmit(onSubmit)} >
                <div className={classes.InputBox}>
                   <input
                                            className={classes.InputTag}
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            {...register("name")}
                                            required
                                        />
                   </div>
                  <div className={classes.InputBox}>
                  <input
                                      className={classes.InputTag}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        {...register("email")}
                                        required
                                    />
                  </div>
                  <div className={classes.InputBox}>
                   <input
                                       className={classes.InputTag}
                                            name="password"
                                            type={passwordShown ? "text" : "password"}
                                            placeholder="Password"
                                            {...register("password")}
                                            required
                                        />
                                         <i onClick={(e) => { togglePasswordVisiblity(e) }} className={passwordShownColor === "inActive" ? classes.EyeIcons : [classes.EyeIcons, classes.ActivePassword].join(' ')}>{eye}</i>
                   </div>
                   <div className={classes.InputBox}>
                   <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                   className={classes.Btn} type="submit">Register</motion.button>
                  </div>
                  <div className={classes.LinkContainer}>
                      <p>Already registered ? <Link className={classes.LinkSeg} to="/login">Login</Link> </p>
                  </div>
                </form>
            </motion.div>
            </div>
            <div className={[isSubmitted?classes.SuccessContainer:classes.SuccessContainerHidden]}>Form Submitted</div>
        </div >
    )
}
