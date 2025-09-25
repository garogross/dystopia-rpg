import React, { useState } from "react";
import { IFarmField } from "../../../../models/CyberFarm/IFarmField";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import CyberFarmFieldsBuyModal from "../CyberFarmFieldsBuyModal/CyberFarmFieldsBuyModal";
import CyberFarmFieldsBuildModal from "../CyberFarmFieldsBuildModal/CyberFarmFieldsBuildModal";
import CyberFarmFieldsBuildOptionsModal from "../CyberFarmFieldsBuildOptionsModal/CyberFarmFieldsBuildOptionsModal";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import { EFarmSlotTypes } from "../../../../constants/cyberfarm/EFarmSlotTypes";
import { v4 } from "uuid";
import { getFarmFieldsFromSlots } from "../../../../utils/getFarmFieldsFromSlots";
import CloneFixedElementProvider from "../../../../providers/CloneFixedElementProvider";
import { ECyberfarmTutorialActions } from "../../../../constants/cyberfarm/tutorial";
import { getFarmFieldProgress } from "../../../../utils/getFarmFieldProgress";
import { useFarmFieldsProgressCheck } from "../../../../hooks/useFarmFieldsProgressCheck";

const { titleText, emptyText } = TRANSLATIONS.cyberFarm.fields;

const CyberFarmFields = () => {
  const language = useAppSelector((state) => state.ui.language);

  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [buyingSlotId, setBuyingSlotId] = useState<string | null>(null);
  const [buildSlotId, setBuildSlotId] = useState<string | null>(null);
  const [producingSlotId, setProducingSlotId] = useState<string | null>(null);
  const [buildModalOpened, setBuildModalOpened] = useState(false);
  const [plantOptionsModalOpened, setPlantOptionsModalOpened] = useState(false);
  const [buildOptionsModalOpened, setBuildOptionsModalOpened] = useState(false);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);
  const slotCosts = useAppSelector((state) => state.cyberfarm.slots.slotCosts);

  const fields = getFarmFieldsFromSlots(slots);

  const maxSlotCount =
    slotCosts && slotCosts.fields[slotCosts.fields.length - 1].range[1];

  const filteredFields = fields.filter(
    (item) => item.type === EFarmSlotTypes.FIELDS
  );
  const firstEmptyFieldIndex = filteredFields.findIndex(
    (item) => !item.blocked && !item.process
  );
  const firstEmptyField = filteredFields.find(
    (item) => !item.blocked && !item.process
  );
  const firstInProgressFieldIndex = filteredFields.findIndex(
    (item) =>
      !item.blocked &&
      item.process &&
      getFarmFieldProgress(item.process.startDate, item.process.endDate)
        .progress < 100
  );

  if (firstEmptyFieldIndex !== -1) {
    filteredFields[firstEmptyFieldIndex] = {
      ...filteredFields[firstEmptyFieldIndex],
      idArg: ECyberfarmTutorialActions.openProduceModal,
    };
  }

  if (firstInProgressFieldIndex !== -1) {
    filteredFields[firstInProgressFieldIndex] = {
      ...filteredFields[firstInProgressFieldIndex],
      idArg: ECyberfarmTutorialActions.openProgressModal,
    };
  }
  const showBlockedField =
    maxSlotCount && slots && maxSlotCount > Object.keys(slots).length;

  const data: IFarmField[] = [
    ...filteredFields,
    ...(showBlockedField
      ? [
          {
            id: v4(),
            type: EFarmSlotTypes.FIELDS,
            blocked: true,
            idArg: ECyberfarmTutorialActions.openBuySlot,
          },
        ]
      : []),
  ];

  useFarmFieldsProgressCheck(filteredFields);

  const onBuy = (field: IFarmField) => {
    setBuyingSlotId(field.id);
    setBuyModalOpened(true);
  };

  return (
    <main className="cyberFarmContainer fullheight">
      <CyberFarmWrapperWithList
        title={titleText[language]}
        emptyText={emptyText[language]}
        data={data}
        onBuyItem={onBuy}
        onBuildItem={(item) => {
          setBuildSlotId(item.id);
          setBuildModalOpened(true);
        }}
        onCloseOptionsModal={() => setPlantOptionsModalOpened(false)}
        optionsModalOpenedArg={plantOptionsModalOpened}
        producingSlotIdArg={producingSlotId}
        productsType={EFarmSlotTypes.FIELDS}
      />
      ;
      {buyingSlotId && (
        <CyberFarmFieldsBuyModal
          buyingSlotId={buyingSlotId}
          show={buyModalOpened}
          onClose={() => setBuyModalOpened(false)}
        />
      )}
      <CyberFarmFieldsBuildModal
        show={buildModalOpened}
        onClose={() => setBuildModalOpened(false)}
        onBuild={() => setBuildOptionsModalOpened(true)}
        onPlant={() => {
          setProducingSlotId(buildSlotId);
          setPlantOptionsModalOpened(true);
        }}
      />
      {buildSlotId && (
        <CyberFarmFieldsBuildOptionsModal
          show={buildOptionsModalOpened}
          slotId={buildSlotId}
          onClose={() => setBuildOptionsModalOpened(false)}
        />
      )}
      <CloneFixedElementProvider
        id={ECyberfarmTutorialActions.openBuySlot}
        onClick={() => {
          const field = data[data.length - 1]; // blocked
          onBuy(field);
        }}
      />
      {firstEmptyFieldIndex !== -1 && !!firstEmptyField && (
        <CloneFixedElementProvider
          id={ECyberfarmTutorialActions.openProduceModal}
          onClick={() => {
            setProducingSlotId(firstEmptyField.id);

            setPlantOptionsModalOpened(true);
          }}
        />
      )}
    </main>
  );
};

export default CyberFarmFields;
