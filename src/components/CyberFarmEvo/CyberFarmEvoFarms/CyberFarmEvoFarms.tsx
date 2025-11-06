import React, { useState } from "react";
import {
  cybefarmEvoFieldImage,
  evoFactoryImage,
  evoFactoryWebpImage,
  evoFactoryWorkingImage,
  evoFactoryWorkingWebpImage,
  evoFarmImage,
  evoFarmWebpImage,
} from "../../../assets/imageMaps";

import { IFarmField } from "../../../models/CyberFarm/IFarmField";
import { v4 } from "uuid";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { useAppSelector } from "../../../hooks/redux";
import { getFarmFieldsFromSlots } from "../../../utils/getFarmFieldsFromSlots";
import { evoPlantImages } from "../../../constants/cyberfarm/evoPlantImages";
import { useFarmFieldsProgressCheck } from "../../../hooks/useFarmFieldsProgressCheck";
import CyberFarmFieldsBuildModal from "../../CyberFarm/CyberFarmFieldsPage/CyberFarmFieldsBuildModal/CyberFarmFieldsBuildModal";
import CyberFarmFieldsBuildOptionsModal from "../../CyberFarm/CyberFarmFieldsPage/CyberFarmFieldsBuildOptionsModal/CyberFarmFieldsBuildOptionsModal";
import CyberFarmFieldsBuyModal from "../../CyberFarm/CyberFarmFieldsPage/CyberFarmFieldsBuyModal/CyberFarmFieldsBuyModal";
import CyberFarmEvoOptionsModal from "./CyberFarmEvoOptionsModal/CyberFarmEvoOptionsModal";
import CyberFarmEvoProcessModal from "./CyberFarmEvoProcessModal/CyberFarmEvoProcessModal";
import CyberFarmBuildingPlantOptionsModal from "../../CyberFarm/CyberFarmBuildingPlantOptionsModal/CyberFarmBuildingPlantOptionsModal";
import CyberFarmUpgradeBuildModal from "../../CyberFarm/CyberFarmUpgradeBuildModal/CyberFarmUpgradeBuildModal";
import CyberFarmEvoFieldsWrapper from "../CyberFarmEvoFieldsWrapper/CyberFarmEvoFieldsWrapper";

const isOdd = (i: number) => !(i % 2);

const CyberFarmEvoFarms = () => {
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [buyingSlotId, setBuyingSlotId] = useState<string | null>(null);
  const [buildSlotId, setBuildSlotId] = useState<string | null>(null);
  const [buildingPlantSlotId, setBuildingPlantSlotId] = useState<
    string | null
  >();
  const [upgradingSlotId, setUpgradingSlotId] = useState<string | null>(null);
  const [buildModalOpened, setBuildModalOpened] = useState(false);
  const [buildOptionsModalOpened, setBuildOptionsModalOpened] = useState(false);
  const [progressModalOpened, setProgressModalOpened] = useState(false);
  const [buildingPlantOptionsModalOpened, setBuildingPlantOptionsModalOpened] =
    useState(false);
  const [upgradeModalOpened, setUpgradeModalOpened] = useState(false);
  const [activeProgresModalItemId, setActiveProgresModalItemId] = useState<
    IFarmField["id"] | null
  >(null);
  const [optionsModalOpened, setOptionsModalOpened] = useState(false);
  const [producingSlotId, setProducingSlotId] = useState<string | null>(null);

  const slotFields = getFarmFieldsFromSlots(slots).sort((a, b) => {
    // Sort first by type using custom order, then by level (ascending)
    const order = {
      [EFarmSlotTypes.FIELDS]: 2,
      [EFarmSlotTypes.FARM]: 1,
      [EFarmSlotTypes.FACTORY]: 0,
      [EFarmSlotTypes.WORKSHOP]: -1, // added to avoid type error
    };

    if (order[a.type] !== order[b.type]) {
      return order[a.type] - order[b.type];
    }

    // Fallback: sort by level property if present
    // Handles undefined level as lower than defined
    if (a.level !== undefined && b.level !== undefined) {
      return b.level - a.level;
    }
    if (a.level !== undefined) return 1;
    if (b.level !== undefined) return -1;
    return 0;
  });

  slotFields.push({
    type: EFarmSlotTypes.FIELDS,
    id: v4(),
    blocked: true,
  });

  const producingSlot =
    producingSlotId && slotFields.find((item) => item.id === producingSlotId);
  const upgradingSlot =
    upgradingSlotId && slotFields.find((item) => item.id === upgradingSlotId);
  const buildingPlantSlot =
    buildingPlantSlotId &&
    slotFields.find((item) => item.id === buildingPlantSlotId);

  const activeProgresModalItem = slotFields.find(
    (field) => field.id === activeProgresModalItemId
  );

  useFarmFieldsProgressCheck(slotFields);

  const addBlockedFields = (initialFields: IFarmField[][]) => {
    const lastFieldsColIndex = initialFields.findLastIndex((col) =>
      col.find((item) => !item.disabled)
    );

    if (lastFieldsColIndex !== -1) {
      const lastColFilledItemsCount = initialFields[lastFieldsColIndex].filter(
        (item) => !item.disabled
      ).length;
      const availableFilledCountInRow = isOdd(lastFieldsColIndex) ? 2 : 3;
      const fillableItemIndex = initialFields[lastFieldsColIndex].findLastIndex(
        (item) => !item.disabled
      );
      if (lastColFilledItemsCount < availableFilledCountInRow) {
        for (
          let i = 0;
          i < availableFilledCountInRow - lastColFilledItemsCount;
          i++
        ) {
          initialFields[lastFieldsColIndex][fillableItemIndex + i + 1] = {
            type: EFarmSlotTypes.FIELDS,
            id: v4(),
            blocked: true,
          };
        }
      }
    }
    return initialFields;
  };

  const onClickSlot = (field: IFarmField) => {
    if (field.blocked) {
      setBuyingSlotId(field.id);
      setBuyModalOpened(true);
    } else if (field.process) {
      setActiveProgresModalItemId(field.id);
      setProgressModalOpened(true);
    } else {
      if (field.type === EFarmSlotTypes.FIELDS) {
        setBuildSlotId(field.id);
        setBuildModalOpened(true);
      } else {
        setBuildingPlantSlotId(field.id);
        setBuildingPlantOptionsModalOpened(true);
      }
    }
  };

  return (
    <>
      <CyberFarmEvoFieldsWrapper
        fieldBg={cybefarmEvoFieldImage}
        slotFields={slotFields.map((field) => {
          let curImage:
            | {
                src: string;
                srcSet: string;
              }
            | undefined = undefined;

          if (field.type === "factory") {
            curImage = {
              src: field.process ? evoFactoryWorkingImage : evoFactoryImage,
              srcSet: field.process
                ? evoFactoryWorkingWebpImage
                : evoFactoryWebpImage,
            };
          } else if (field.plant) {
            curImage =
              evoPlantImages[field.plant][
                field.type === "farm" ? "inFarm" : "onField"
              ];
          } else if (field.type === "farm" && !field.plant) {
            curImage = {
              src: evoFarmImage,
              srcSet: evoFarmWebpImage,
            };
          }
          return {
            ...field,
            isEmpty:
              field.type === EFarmSlotTypes.FIELDS &&
              !field.plant &&
              !field.factoryProduct &&
              !field.blocked &&
              !field.disabled,
            curImage,
          };
        })}
        onClickField={onClickSlot}
        gameAction={"farm_collect_ready"}
        initialFieldData={{ type: EFarmSlotTypes.FIELDS }}
        modifyInitialFields={addBlockedFields}
      />
      {buyingSlotId && (
        <CyberFarmFieldsBuyModal
          evoMode
          buyingSlotId={buyingSlotId}
          show={buyModalOpened}
          onClose={() => setBuyModalOpened(false)}
        />
      )}
      <CyberFarmFieldsBuildModal
        evoMode
        show={buildModalOpened}
        onClose={() => setBuildModalOpened(false)}
        onBuild={() => setBuildOptionsModalOpened(true)}
        onPlant={() => {
          setProducingSlotId(buildSlotId);
          setOptionsModalOpened(true);
        }}
      />
      {buildSlotId && (
        <CyberFarmFieldsBuildOptionsModal
          evoMode
          show={buildOptionsModalOpened}
          slotId={buildSlotId}
          onClose={() => setBuildOptionsModalOpened(false)}
        />
      )}
      {buildingPlantSlot && (
        <CyberFarmBuildingPlantOptionsModal
          evoMode
          show={buildingPlantOptionsModalOpened}
          onClose={() => setBuildingPlantOptionsModalOpened(false)}
          onUpgrade={function (): void {
            setUpgradingSlotId(buildingPlantSlotId);
            setUpgradeModalOpened(true);
          }}
          onPlant={function (): void {
            setProducingSlotId(buildingPlantSlotId);
            setOptionsModalOpened(true);
          }}
          level={buildingPlantSlot.level}
          type={buildingPlantSlot.type}
        />
      )}
      {producingSlot && (
        <CyberFarmEvoOptionsModal
          show={optionsModalOpened}
          onClose={() => setOptionsModalOpened(false)}
          type={producingSlot.type}
          slotId={producingSlotId}
          level={producingSlot.level}
        />
      )}
      {upgradingSlot && (
        <CyberFarmUpgradeBuildModal
          show={upgradeModalOpened}
          onClose={() => setUpgradeModalOpened(false)}
          type={upgradingSlot.type}
          slotId={upgradingSlotId}
          level={upgradingSlot.level}
          modules={upgradingSlot.modules}
          evoMode
        />
      )}
      {activeProgresModalItem && !("count" in activeProgresModalItem) && (
        <CyberFarmEvoProcessModal
          show={progressModalOpened}
          onClose={() => setProgressModalOpened(false)}
          item={activeProgresModalItem as IFarmField}
        />
      )}
    </>
  );
};

export default CyberFarmEvoFarms;
