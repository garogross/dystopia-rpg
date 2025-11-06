import React, { useState } from "react";
import CyberFarmEvoFieldsWrapper from "../CyberFarmEvoFieldsWrapper/CyberFarmEvoFieldsWrapper";
import {
  fabricBuildImage,
  fabricBuildWebpImage,
  fabricBuildWorkingImage,
  fabricBuildWorkingWebpImage,
  fabricFieldImage,
} from "../../../assets/imageMaps";
import CyberFarmFieldsBuyModal from "../../CyberFarm/CyberFarmFieldsPage/CyberFarmFieldsBuyModal/CyberFarmFieldsBuyModal";
import { useAppSelector } from "../../../hooks/redux";
import { FabricFieldType } from "../../../types/cyberfarm/FabricFieldType";
import { getFactoryFieldsFromSlots } from "../../../utils/getFactoryFieldsFromSlots";
import { v4 } from "uuid";
import CyberFarmEvoOptionsModal from "../CyberFarmEvoFarms/CyberFarmEvoOptionsModal/CyberFarmEvoOptionsModal";
import CyberFarmEvoProcessModal from "../CyberFarmEvoFarms/CyberFarmEvoProcessModal/CyberFarmEvoProcessModal";
import { useFarmFieldsProgressCheck } from "../../../hooks/useFarmFieldsProgressCheck";
import CyberFarmBuildingPlantOptionsModal from "../../CyberFarm/CyberFarmBuildingPlantOptionsModal/CyberFarmBuildingPlantOptionsModal";
import CyberFarmUpgradeBuildModal from "../../CyberFarm/CyberFarmUpgradeBuildModal/CyberFarmUpgradeBuildModal";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";

const isOdd = (i: number) => !(i % 2);

const CyberFarmEvoFabric = () => {
  const workshopSlots = useAppSelector(
    (state) => state.cyberfarm.slots.workshopSlots
  );
  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [buyingSlotId, setBuyingSlotId] = useState<string | null>(null);
  const [optionsModalOpened, setOptionsModalOpened] = useState(false);
  const [producingSlotId, setProducingSlotId] = useState<string | null>(null);
  const [progressModalOpened, setProgressModalOpened] = useState(false);
  const [activeProgresModalItemId, setActiveProgresModalItemId] = useState<
    FabricFieldType["id"] | null
  >(null);
  const [buildingPlantOptionsModalOpened, setBuildingPlantOptionsModalOpened] =
    useState(false);
  const [buildingPlantSlotId, setBuildingPlantSlotId] = useState<
    string | null
  >();
  const [upgradingSlotId, setUpgradingSlotId] = useState<string | null>(null);
  const [upgradeModalOpened, setUpgradeModalOpened] = useState(false);

  const slotFields = getFactoryFieldsFromSlots(workshopSlots).sort((a, b) => {
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
    id: v4(),
    blocked: true,
  });

  useFarmFieldsProgressCheck(slotFields);

  const activeProgresModalItem = slotFields.find(
    (field) => field.id === activeProgresModalItemId
  );

  const producingSlot =
    producingSlotId && slotFields.find((item) => item.id === producingSlotId);

  const buildingPlantSlot =
    buildingPlantSlotId &&
    slotFields.find((item) => item.id === buildingPlantSlotId);
  const upgradingSlot =
    upgradingSlotId && slotFields.find((item) => item.id === upgradingSlotId);
  const addBlockedFields = (initialFields: FabricFieldType[][]) => {
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
            id: v4(),
            blocked: true,
          };
        }
      }
    }
    return initialFields;
  };
  const onClickSlot = (field: FabricFieldType) => {
    if (field.blocked) {
      setBuyingSlotId(field.id);
      setBuyModalOpened(true);
    } else if (field.process) {
      setActiveProgresModalItemId(field.id);
      setProgressModalOpened(true);
    } else {
      setBuildingPlantSlotId(field.id);
      setBuildingPlantOptionsModalOpened(true);
    }

    // else if (field.process) {
    //   setActiveProgresModalItemId(field.id);
    //   setProgressModalOpened(true);
    // } else {
    //   if (field.type === EFarmSlotTypes.FIELDS) {
    //     setBuildSlotId(field.id);
    //     setBuildModalOpened(true);
    //   } else {
    //     setBuildingPlantSlotId(field.id);
    //     setBuildingPlantOptionsModalOpened(true);
    //   }
    // }
  };
  const slotFieldsWithImage = slotFields.map((field) => {
    let curImage:
      | {
          src: string;
          srcSet: string;
        }
      | undefined = undefined;

    if (field.level) {
      if (field.process) {
        curImage = {
          src: fabricBuildWorkingImage,
          srcSet: fabricBuildWorkingWebpImage,
        };
      } else {
        curImage = {
          src: fabricBuildImage,
          srcSet: fabricBuildWebpImage,
        };
      }
    }
    return {
      ...field,
      isEmpty: false,
      curImage,
    };
  });
  return (
    <>
      <CyberFarmEvoFieldsWrapper
        fieldBg={fabricFieldImage}
        slotFields={slotFieldsWithImage}
        onClickField={onClickSlot}
        gameAction={"workshop_collect_ready"}
        modifyInitialFields={addBlockedFields}
      />
      {buyingSlotId && (
        <CyberFarmFieldsBuyModal
          evoMode
          isWorkshop
          buyingSlotId={buyingSlotId}
          show={buyModalOpened}
          onClose={() => setBuyModalOpened(false)}
        />
      )}
      {producingSlot && (
        <CyberFarmEvoOptionsModal
          show={optionsModalOpened}
          onClose={() => setOptionsModalOpened(false)}
          type={EFarmSlotTypes.WORKSHOP}
          slotId={producingSlotId}
          level={producingSlot.level}
          isWorkshop
        />
      )}
      {activeProgresModalItem && !("count" in activeProgresModalItem) && (
        <CyberFarmEvoProcessModal
          show={progressModalOpened}
          onClose={() => setProgressModalOpened(false)}
          item={activeProgresModalItem}
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
          type={EFarmSlotTypes.WORKSHOP}
        />
      )}
      {upgradingSlot && (
        <CyberFarmUpgradeBuildModal
          show={upgradeModalOpened}
          onClose={() => setUpgradeModalOpened(false)}
          type={EFarmSlotTypes.WORKSHOP} // this is same for all
          slotId={upgradingSlotId}
          level={upgradingSlot.level}
          evoMode
          modules={upgradingSlot.modules}
        />
      )}
    </>
  );
};

export default CyberFarmEvoFabric;
