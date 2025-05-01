import React from 'react'
import GameStore from '../../GameStore/GameStore'
import styles from './GameLoyalityStore.module.scss'
import HeaderWings from '../../../layout/icons/game/Common/HeaderWings'
const GameLoyalityStore = () => {
  return (
    <div className={styles.gameLoyalityStore}>
      <GameStore isDualColumns />
      <div className={styles.gameLoyalityStore__wings}>
        <HeaderWings reversed/>
      </div>
    </div>
  )
}

export default GameLoyalityStore
