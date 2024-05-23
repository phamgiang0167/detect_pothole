import React, { useState } from 'react';
import {  Link, useHistory } from 'react-router-dom'
import classes from './Login.module.css'
import MainLogo from '../../Assests/Easy.png';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';
import fire from '../../Config/fire';
import { userCred } from '../../Redux/cred';
import { useDispatch }  from 'react-redux'


const eye = <FontAwesomeIcon icon={faEye} />;
export default function Login() {


    const [passwordShownColor, setPasswordShownColor] = useState("inActive");
    const [passwordShown, setPasswordShown] = useState(false);

    const history = useHistory()

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

        const dispatch = useDispatch();


        const onSubmit  = (data) =>{
           console.log(data)
            fire.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((u) =>{
               
                localStorage.setItem('log', "loggedIn");
                if(u.user.email){
                  dispatch(
                      userCred(
                        u.user.email
                  )
                  )
                }
            
                history.push('/dashboard')
            })
            .catch((err) =>{
               alert(err.message)
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
            className={classes.FormContainer}>
                <form autoComplete="off" className={classes.RegisterForm} onSubmit={handleSubmit(onSubmit)}>
             
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
                   className={classes.Btn} type="submit">Login</motion.button>
                  </div>
                  <div className={classes.LinkContainer}>
                      <p>Already registered ? <Link className={classes.LinkSeg} to="/">Register</Link> </p>
                  </div>
                </form>
            </motion.div>
            </div>
           
        </div >
    )
}
