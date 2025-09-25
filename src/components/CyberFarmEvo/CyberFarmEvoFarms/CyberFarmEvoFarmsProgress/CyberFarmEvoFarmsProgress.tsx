import React from "react";

import styles from "./CyberFarmEvoFarmsProgress.module.scss";
import { IFarmField } from "../../../../models/CyberFarm/IFarmField";
import { useFarmFieldProgress } from "../../../../hooks/useFarmFieldProgress";
import { CompletedProducticon } from "../../../layout/icons/CyberFarmEvo/Farms";

interface Props {
  process: IFarmField["process"];
}

const CyberFarmEvoFarmsProgress: React.FC<Props> = ({ process }) => {
  const { progressPercent } = useFarmFieldProgress(process);

  return (
    <div
      style={{
        background: `linear-gradient(90deg, #00FF88 ${Math.max(
          0,
          progressPercent === 100 ? 100 : (progressPercent || 0) - 2
        )}%, rgba(15, 14, 16, 0.79) ${Math.min(
          100,
          (progressPercent || 0) + 2
        )}%)`,
      }}
      className={styles.cyberFarmEvoFarmsProgress}
    >
      {progressPercent === 100 && (
        <div className={styles.cyberFarmEvoFarmsProgress__completed}>
          <CompletedProducticon />
        </div>
      )}
    </div>
  );
};

export default CyberFarmEvoFarmsProgress;
