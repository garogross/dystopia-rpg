import React from "react";
import { IFarmField } from "../../../../models/CyberFarm/IFarmField";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { useAppSelector } from "../../../../hooks/redux";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { EFarmSlotTypes } from "../../../../constants/cyberfarm/EFarmSlotTypes";

const { titleText, emptyText } = TRANSLATIONS.cyberFarm.factories;

const CyberFarmFactories = () => {
  const language = useAppSelector((state) => state.ui.language);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);

  const fields: IFarmField[] = slots
    ? Object.entries(slots).map(([key, slot]) => ({
        id: key,
        type: slot.type,
      }))
    : [];

  const data: IFarmField[] = [
    ...fields.filter((item) => item.type === EFarmSlotTypes.FACTORY),
  ];
  return (
    <main className="cyberFarmContainer fullheight">
      <CyberFarmWrapperWithList
        title={titleText[language]}
        emptyText={emptyText[language]}
        data={data}
        productsType={"factory"}
      />
    </main>
  );
};

export default CyberFarmFactories;
