import {
  AchievmentField1Level,
  AchievmentField2Level,
  AchievmentField3Level,
  AchievmentField4Level,
  AchievmentField5Level,
} from "../../components/layout/icons/Achievments/cyberfarm/Fields";
import {
  AchievmentFarm1Level,
  AchievmentFarm2Level,
  AchievmentFarm3Level,
  AchievmentFarm4Level,
  AchievmentFarm5Level,
} from "../../components/layout/icons/Achievments/cyberfarm/Farm";
import {
  AchievmentFactory1Level,
  AchievmentFactory2Level,
  AchievmentFactory3Level,
  AchievmentFactory4Level,
  AchievmentFactory5Level,
} from "../../components/layout/icons/Achievments/cyberfarm/Factory";

import { TRANSLATIONS } from "../TRANSLATIONS";
import { EFarmAchievments } from "./EFarmAchievments";

const { field, farm, factory } = TRANSLATIONS.cyberFarm.achievments;

export const CYBER_FARM_ACHIEVMENTS = {
  // [EFarmAchievments.SOCIAL_SHOP]: [
  //   {
  //     icon: <AchievmentStore1Level />,
  //     title: store.level1,
  //     description: store.desc1,
  //   },
  //   {
  //     icon: <AchievmentStore2Level />,
  //     title: store.level2,
  //     description: store.desc2,
  //   },
  //   {
  //     icon: <AchievmentStore3Level />,
  //     title: store.level3,
  //     description: store.desc3,
  //   },
  //   {
  //     icon: <AchievmentStore4Level />,
  //     title: store.level4,
  //     description: store.desc4,
  //   },
  //   {
  //     icon: <AchievmentStore5Level />,
  //     title: store.level5,
  //     description: store.desc5,
  //   },
  // ],
  [EFarmAchievments.HARVEST_FIELD]: [
    {
      icon: <AchievmentField1Level />,
      title: field.level1,
      description: field.desc1,
    },
    {
      icon: <AchievmentField2Level />,
      title: field.level2,
      description: field.desc2,
    },
    {
      icon: <AchievmentField3Level />,
      title: field.level3,
      description: field.desc3,
    },
    {
      icon: <AchievmentField4Level />,
      title: field.level4,
      description: field.desc4,
    },
    {
      icon: <AchievmentField5Level />,
      title: field.level5,
      description: field.desc5,
    },
  ],
  [EFarmAchievments.HARVEST_FARM]: [
    {
      icon: <AchievmentFarm1Level />,
      title: farm.level1,
      description: farm.desc1,
    },
    {
      icon: <AchievmentFarm2Level />,
      title: farm.level2,
      description: farm.desc2,
    },
    {
      icon: <AchievmentFarm3Level />,
      title: farm.level3,
      description: farm.desc3,
    },
    {
      icon: <AchievmentFarm4Level />,
      title: farm.level4,
      description: farm.desc4,
    },
    {
      icon: <AchievmentFarm5Level />,
      title: farm.level5,
      description: farm.desc5,
    },
  ],
  [EFarmAchievments.HARVEST_FACTORY]: [
    {
      icon: <AchievmentFactory1Level />,
      title: factory.level1,
      description: factory.desc1,
    },
    {
      icon: <AchievmentFactory2Level />,
      title: factory.level2,
      description: factory.desc2,
    },
    {
      icon: <AchievmentFactory3Level />,
      title: factory.level3,
      description: factory.desc3,
    },
    {
      icon: <AchievmentFactory4Level />,
      title: factory.level4,
      description: factory.desc4,
    },
    {
      icon: <AchievmentFactory5Level />,
      title: factory.level5,
      description: factory.desc5,
    },
  ],
};
