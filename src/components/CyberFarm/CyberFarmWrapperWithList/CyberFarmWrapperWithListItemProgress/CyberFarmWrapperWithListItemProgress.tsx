import React from "react";

import styles from "./CyberFarmWrapperWithListItemProgress.module.scss";
import { IFarmField } from "../../../../models/CyberFarm/IFarmField";
import {
  Completedicon,
  InProgressIcon,
} from "../../../layout/icons/CyberFarm/CyberFarmWrapperWithList";
import { useFarmFieldProgress } from "../../../../hooks/useFarmFieldProgress";

interface Props {
  process: IFarmField["process"];
}

const CyberFarmWrapperWithListItemProgress: React.FC<Props> = ({ process }) => {
  const { progressPercent } = useFarmFieldProgress(process);

  return (
    <>
      <div className={styles.cyberFarmWrapperWithListItemProgress__status}>
        {progressPercent === 100 ? <Completedicon /> : <InProgressIcon />}
      </div>
      <div className={styles.cyberFarmWrapperWithListItemProgress}>
        <div
          style={{ width: `${progressPercent}%` }}
          className={styles.cyberFarmWrapperWithListItemProgress__inner}
        ></div>
      </div>
    </>
  );
};

export default CyberFarmWrapperWithListItemProgress;
