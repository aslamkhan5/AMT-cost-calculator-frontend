import React, { useEffect, useState } from 'react'
import Logo from '../utils/assets/img/logo.png'
import { Box } from './Box'
import TableBox from './TableBox'
import { useSelector } from 'react-redux'
import { IoMoonSharp } from "react-icons/io5";
import { IoSunnySharp } from "react-icons/io5";

const Banner = () => {

    const [mode, setMode] = useState('light')

    const feedData = useSelector(state => state.headFeed.filterFeed)
    const selectedFeed = useSelector(state => state.headFeed.data_feed)

    const setDarkmode = () => {
        document.querySelector("body").setAttribute("data-theme","dark")
        localStorage.setItem('theme-mode','dark')
        setMode('dark')

    }
  
    const setLightmode = () => {
      document.querySelector("body").setAttribute("data-theme","light")
      localStorage.setItem('theme-mode','light')
      setMode('light')

    }
  
    const toggleMode = (e) => {
      if(e.target.checked)
      {
        setDarkmode()
  
      }else{
        setLightmode()
  
      }
    }

    useEffect(() => {
        const mode = localStorage.getItem('theme-mode')
        if(mode == null)
        {
            localStorage.setItem('theme-mode','dark')
            document.querySelector("body").setAttribute("data-theme","dark")
            setMode('dark')
        }else{
            document.querySelector("body").setAttribute("data-theme",mode)
            setMode(mode)
        }

    },[])
    
    
  return (
   <>
        <div className='banner__area'>
            <div className='mode-area'>
               <div className='pt-2 d-flex align-items-center gap-2'>
                 <span className='mode-text mode-dark-text'>Dark</span>
                    <div className='mode-action'>
                        <input type="checkbox" class="checkbox" id="checkbox" checked={mode == "dark" ? true : false} onChange={toggleMode} />
                        <label for="checkbox" class="checkbox-label">
                            <IoSunnySharp className='mode-sun' />
                            <IoMoonSharp className='mode-moon' />
                            <span class="ball"></span>
                        </label>
                    </div>
                    <span className='mode-text mode-sun-text'>Light</span>
               </div>
            </div>
            <div className='banner__box d-flex flex-column align-items-center'>
                    <img src={Logo} alt="" className='banner__logo img-fluid' />
                <div className='banner__middle'>
                        <h1 className='text-center'>AMP ALL-IN Cost Calculator - We have done all the Math For You!</h1> 
                        <p className='head__unlike text-center'>Unlike other brokers, that separate their commissions from all other fees such as Exchange, NFA & Platform and Routing Fees – AMP has combined all the fees into this Simple, <br /> Easy to Use Exact Cost Calculator. This will be the Total All Fees Included Cost you will see on your AMP Trading Statement.</p>
                </div>
                    <p className='head__follow text-center'>Please follow this wizard below to view the <br />
                    <span>Exact All-In Cost</span> for your preferred trading platform.</p>
            </div>
        </div>

        <div className='banner__platform__box'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8' style={{margin: '0 auto'}}>
                        <Box />
                    
                        
                    </div>
                </div>
            </div>
        </div>
   </>
  )
}

export default Banner