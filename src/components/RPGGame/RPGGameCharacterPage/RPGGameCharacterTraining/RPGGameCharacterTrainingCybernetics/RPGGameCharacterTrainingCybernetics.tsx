import RPGGameCharacterTrainingAccordionList, {
  TrainingCategory,
} from "../RPGGameCharacterTrainingAccordionList/RPGGameCharacterTrainingAccordionList";

const data: TrainingCategory[] = [
  {
    name: "Характеристики",
    price: 100,
    items: [
      {
        name: "Сила",
        level: 5,
      },
      {
        name: "Ловкость",
        level: 4,
      },
      {
        name: "Меткость",
        level: 3,
      },
      {
        name: "Выносливость",
        level: 2,
      },
      {
        name: "Инициатива",
        level: 1,
      },
    ],
  },
  {
    name: "Параметры",
    price: 333,
    items: [
      {
        name: "Здоровье",
        level: 5,
      },
      {
        name: "Урон",
        level: 4,
      },
      {
        name: "Уворот",
        level: 3,
      },
      {
        name: "Контрудар",
        level: 2,
      },
    ],
  },
  {
    name: "Приёмы",
    price: 100,
    unavailableUpgrades: true,
    items: [
      {
        name: "Приём А",
        condition: "Использований 10/20",
      },
      {
        name: "Приём Б",
        condition: "Использований 10/20",
      },
    ],
  },
  {
    name: "Навыки",
    price: 100,
    unavailableUpgrades: true,
    items: [
      {
        name: "Ближний бой",
        condition: "Очки навыков 10/20",
      },
      {
        name: "Тяжелая броня",
        condition: "Очки навыков 10/20",
      },
    ],
  },
];

export const RPGGameCharacterTrainingCybernetics = () => {
  return <RPGGameCharacterTrainingAccordionList data={data} />;
};

export default RPGGameCharacterTrainingCybernetics;
