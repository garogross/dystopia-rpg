import React from "react";
import CyberFarmEvoFieldsWrapper from "../CyberFarmEvoFieldsWrapper/CyberFarmEvoFieldsWrapper";
import {
  fabricBuildImage,
  fabricBuildWebpImage,
  fabricBuildWorkingImage,
  fabricBuildWorkingWebpImage,
  fabricFieldImage,
} from "../../../assets/imageMaps";

const CyberFarmEvoFabric = () => {
  return (
    <>
      <CyberFarmEvoFieldsWrapper
        fieldBg={fabricFieldImage}
        slotFields={[
          {
            id: "1",
            curImage: {
              src: fabricBuildWorkingImage,
              srcSet: fabricBuildWorkingWebpImage,
            },
          },
          {
            id: "2",
            curImage: {
              src: fabricBuildImage,
              srcSet: fabricBuildWebpImage,
            },
          },
        ]}
        onClickField={function (item: {
          id: string;
          disabled?: boolean;
          isEmpty?: boolean;
          curImage?: { src: string; srcSet: string };
          blocked?: boolean;
          level?: number;
          process?: { startDate: number; endDate: number } | undefined;
        }): void {}}
        gameAction={"farm_collect_ready"}
      />
    </>
  );
};

export default CyberFarmEvoFabric;
