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

  const data: IFarmField[] = [
    ...fields.filter((item) => item.type === EFarmSlotTypes.FIELDS),
    ...(maxSlotCount && slots && maxSlotCount > Object.keys(slots).length
      ? [
          {
            id: v4(),
            type: EFarmSlotTypes.FIELDS,
            blocked: true,
          },
        ]
      : []),
  ];

  return (
    <main className="cyberFarmContainer fullheight">
      <CyberFarmWrapperWithList
        title={titleText[language]}
        emptyText={emptyText[language]}
        data={data}
        onBuyItem={(field) => {
          setBuyingSlotId(field.id);
          setBuyModalOpened(true);
        }}
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
    </main>
  );
};

export default CyberFarmFields;
