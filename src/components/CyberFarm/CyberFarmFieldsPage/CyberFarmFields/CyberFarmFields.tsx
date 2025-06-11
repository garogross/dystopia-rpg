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
import { EPlants } from "../../../../constants/cyberfarm/EPlants";
import { EFactoryProducts } from "../../../../constants/cyberfarm/EFactoryProducts";

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

  const fields: IFarmField[] = slots
    ? Object.entries(slots).map(([key, slot]) => ({
        id: key,
        type: slot.type,
        plant:
          slot.type === EFarmSlotTypes.FACTORY
            ? undefined
            : (slot.product as EPlants),
        factoryProduct:
          slot.type !== EFarmSlotTypes.FACTORY
            ? undefined
            : (slot.product as EFactoryProducts),
        process:
          slot.start_time && slot.finish_time
            ? {
                startDate: slot.start_time,
                endDate: slot.finish_time,
              }
            : undefined,
      }))
    : [];

  const data: IFarmField[] = [
    ...fields.filter((item) => item.type === EFarmSlotTypes.FIELDS),
    {
      id: v4(),
      type: EFarmSlotTypes.FIELDS,
      blocked: true,
    },
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
        onCloseOptionsModal={() => setBuildOptionsModalOpened(false)}
        optionsModalOpenedArg={plantOptionsModalOpened}
        producingSlotIdArg={producingSlotId}
        productsType={"plant"}
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
