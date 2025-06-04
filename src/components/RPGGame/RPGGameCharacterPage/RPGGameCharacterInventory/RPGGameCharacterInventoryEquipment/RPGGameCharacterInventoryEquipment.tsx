import React from 'react'
import WrapperWithFrame from '../../../../layout/WrapperWithFrame/WrapperWithFrame'
import InventoryList, { InventoryListItem } from '../../../../layout/InventoryList/InventoryList'
import { tool15Image, tool19Image, tool20Image } from '../../../../../assets/imageMaps'
import styles from './RPGGameCharacterInventoryEquipment.module.scss'

const data: InventoryListItem[] = [
    {
        id: '1',
        image: tool15Image,
        count: 2,
        active: true
    },
    {
        id: '2',
        image: tool19Image,
        count: 4,
        active: true
    },
    {
        id: '3',
        image: tool20Image,
        count: 3,
        active: true
    },
    {
        id: '4',
        disabled: true,
    },
    {
        id: '5',
        disabled: true,
    },
]

const RPGGameCharacterInventoryEquipment = () => {
  return (
    <WrapperWithFrame   >
      <div className={styles.rpgGameCharacterInventoryEquipment}>
        <h6 className={styles.rpgGameCharacterInventoryEquipment__title}>Раходная эпикировка</h6>
        <InventoryList data={data} />
      </div>
    </WrapperWithFrame>
  )
}

export default RPGGameCharacterInventoryEquipment
