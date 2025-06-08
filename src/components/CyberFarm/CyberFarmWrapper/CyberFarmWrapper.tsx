import React, { useEffect, useState } from 'react'
import styles from "./CyberFarmWrapper.module.scss"
import AppLoader from '../../AppLoader/AppLoader'
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { setGameInited } from '../../../store/slices/uiSlice';
import CyberFarmHeader from '../CyberFarmHeader/CyberFarmHeader';
import CyberFarmBottomNavbar from '../CyberFarmBottomNavbar/CyberFarmBottomNavbar';

const CyberFarmWrapper = () => {
    const dispatch = useAppDispatch()
    const imagesLoading = false; // useImageLoader();
    const [loading] = useState(false); //true
    const [loaderTimerFinished, setLoaderTimerFinished] = useState(false);

    const appLoading = imagesLoading || loading;

    useEffect(() => {
        if (loaderTimerFinished && !appLoading) {
          dispatch(setGameInited(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [appLoading, loaderTimerFinished]);
    


  return (
    <div className={`${styles.cyberFarmWrapper}`}>
    <div className={`${styles.cyberFarmWrapper__container} gameContainer`}>
      <AppLoader
        loading={appLoading}
        timerFinished={loaderTimerFinished}
        setTimerFinished={setLoaderTimerFinished}
      />
      <CyberFarmHeader />
      <div className={styles.cyberFarmWrapper__main}>
        <Outlet />
      </div>
      <CyberFarmBottomNavbar />
    </div>
  </div>
  )
}


export default CyberFarmWrapper
