import React from 'react'
import GameReferalsBackIcon from '../icons/game/GameReferalsPage/GameReferalsBackIcon'
import styles from './HeaderWithBackButton.module.scss'
interface Props {
    onClose: () => void ;
    className?: string;
}
const HeaderWithBackButton: React.FC<Props> = ({onClose, className}) => {
  return (
    <div className={`${styles.headerWithBackButton} ${className}`}>
    <button
      className={styles.headerWithBackButton__backBtn}
      onClick={onClose}
    >
      <div className={styles.headerWithBackButton__backBtnInner}>
        <GameReferalsBackIcon />
      </div>
    </button>
    <div className={styles.headerWithBackButton__wind}></div>
  </div>
  )
}

export default HeaderWithBackButton
