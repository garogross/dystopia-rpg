import React from "react";
import { IFarmField } from "../../../../models/CyberFarm/IFarmField";
import CyberFarmWrapperWithList from "../../CyberFarmWrapperWithList/CyberFarmWrapperWithList";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import { useAppSelector } from "../../../../hooks/redux";
import { EFarmSlotTypes } from "../../../../constants/cyberfarm/EFarmSlotTypes";

const { titleText, emptyText } = TRANSLATIONS.cyberFarm.farms;
const CyberFarmFarms = () => {
  const language = useAppSelector((state) => state.ui.language);
  const slots = useAppSelector((state) => state.cyberfarm.slots.slots);

  const farms: IFarmField[] = slots
    ? Object.entries(slots).map(([key, slot]) => ({
        id: key,
        type: slot.type,
      }))
    : [];

  const data: IFarmField[] = [
    ...farms.filter((item) => item.type === EFarmSlotTypes.FARM),
  ];
  return (
    <main className="cyberFarmContainer fullheight">
      <CyberFarmWrapperWithList
        title={titleText[language]}
        emptyText={emptyText[language]}
        data={data}
        productsType={"plant"}
      />
    </main>
  );
};

export default CyberFarmFarms;
