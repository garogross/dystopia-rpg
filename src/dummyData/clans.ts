import { IClan } from "../models/IClan";
import {
  clan1Image,
  clan2Image,
  clan3Image,
  clan4Image,
  clan5Image,
  clan6Image,
  clan7Image,
  clan8Image,
  clan9Image,
  clan10Image,
  clan11Image,
} from "../assets/imageMaps";
import { EStats } from "../constants/EStats";

export const CLANS: IClan[] = [
  {
    id: "1",
    name: "Зоркие стволы",
    level: 37,
    description:
      "Наша хватка крепка, наша верность - закон. Присоединяйся к сильным.",
    image: clan1Image,
    clanMessage: "Следующий рейд через 72 часов! Не пропадайте пацаны.",
    treasury: {
      [EStats.kredit]: 120000,
      [EStats.darkMatter]: 100000,
      [EStats.token]: 1000000,
    },
    participants: [
      { name: "Гарик2000", role: "Лидер", status: "в сети", level: 37 },
      { name: "JohnySilver", role: "Замлидер", status: "в сети", level: 81 },
      { name: "NeonVortex", role: "Дембель", status: "в сети", level: 37 },
      { name: "RustHawk", role: "Дембель", status: "в сети", level: 37 },
      { name: "CyberReaper", role: "Дух", status: "в сети", level: 37 },
      { name: "VoidSpecter", role: "Дух", status: "в сети", level: 37 },
      { name: "IronReign", role: "Лидер", status: "в сети", level: 37 },
      { name: "IronReign", role: "Лидер", status: "не в сети(1ч)", level: 37 },
      { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
      { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
      { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
      { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
      { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
      { name: "IronReign", role: "Черпак", status: "не в сети(1ч)", level: 37 },
    ],
    participantsLimit: 90,
  },
  {
    id: "2",
    name: "Стальные псы",
    level: 45,
    description: "Мы охотники, мы выживаем. Присоединяйся к стае.",
    image: clan2Image,
    clanMessage: "Готовимся к атаке на базу противника!",
    treasury: {
      [EStats.kredit]: 150000,
      [EStats.darkMatter]: 80000,
      [EStats.token]: 950000,
    },
    participants: [
      { name: "SteelWolf", role: "Лидер", status: "в сети", level: 45 },
      { name: "IronFang", role: "Замлидер", status: "в сети", level: 42 },
    ],
    participantsLimit: 80,
  },
  {
    id: "3",
    name: "Кибер лихачи",
    level: 30,
    description: "Скорость, стиль и хаос. Мы живем на грани.",
    image: clan3Image,
    clanMessage: "Собираемся на гонки через 2 часа!",
    treasury: {
      [EStats.kredit]: 100000,
      [EStats.darkMatter]: 50000,
      [EStats.token]: 700000,
    },
    participants: [
      { name: "CyberRider", role: "Лидер", status: "в сети", level: 30 },
      { name: "NeonDrift", role: "Замлидер", status: "в сети", level: 28 },
    ],
    participantsLimit: 70,
  },
  {
    id: "4",
    name: "1ый Доминион",
    level: 50,
    description: "Мы первые, мы лучшие. Доминируем во всем.",
    image: clan4Image,
    clanMessage: "Встреча лидеров через 24 часа.",
    treasury: {
      [EStats.kredit]: 200000,
      [EStats.darkMatter]: 120000,
      [EStats.token]: 1500000,
    },
    participants: [
      { name: "DominionKing", role: "Лидер", status: "в сети", level: 50 },
      { name: "DominionGuard", role: "Замлидер", status: "в сети", level: 48 },
    ],
    participantsLimit: 100,
  },
  {
    id: "5",
    name: "ЧВК “Радуга”",
    level: 40,
    description: "Мы разноцветные, но смертельно опасные.",
    image: clan5Image,
    clanMessage: "Тренировка на полигоне через 3 часа.",
    treasury: {
      [EStats.kredit]: 180000,
      [EStats.darkMatter]: 90000,
      [EStats.token]: 1200000,
    },
    participants: [
      { name: "RainbowLeader", role: "Лидер", status: "в сети", level: 40 },
      { name: "RainbowSniper", role: "Замлидер", status: "в сети", level: 38 },
    ],
    participantsLimit: 85,
  },
  {
    id: "6",
    name: "Черный Протокол",
    level: 55,
    description: "Тайна, стратегия и победа. Мы - Черный Протокол.",
    image: clan6Image,
    clanMessage: "Собрание в темной комнате через 1 час.",
    treasury: {
      [EStats.kredit]: 250000,
      [EStats.darkMatter]: 150000,
      [EStats.token]: 2000000,
    },
    participants: [
      { name: "BlackCode", role: "Лидер", status: "в сети", level: 55 },
      { name: "ShadowAgent", role: "Замлидер", status: "в сети", level: 53 },
    ],
    participantsLimit: 95,
  },
  {
    id: "7",
    name: "Терминус Ноль",
    level: 60,
    description: "Мы конец и начало. Терминус Ноль.",
    image: clan7Image,
    clanMessage: "Готовимся к финальной битве!",
    treasury: {
      [EStats.kredit]: 300000,
      [EStats.darkMatter]: 200000,
      [EStats.token]: 2500000,
    },
    participants: [
      { name: "ZeroLeader", role: "Лидер", status: "в сети", level: 60 },
      { name: "VoidWalker", role: "Замлидер", status: "в сети", level: 58 },
    ],
    participantsLimit: 100,
  },
  {
    id: "8",
    name: "Бастион Пепла",
    level: 35,
    description: "Мы восстаем из пепла. Бастион надежды.",
    image: clan8Image,
    clanMessage: "Собрание у костра через 2 часа.",
    treasury: {
      [EStats.kredit]: 120000,
      [EStats.darkMatter]: 70000,
      [EStats.token]: 800000,
    },
    participants: [
      { name: "AshBastion", role: "Лидер", status: "в сети", level: 35 },
      { name: "PhoenixGuard", role: "Замлидер", status: "в сети", level: 33 },
    ],
    participantsLimit: 75,
  },
  {
    id: "9",
    name: "Миллениялы",
    level: 25,
    description: "Мы новое поколение. Мы - будущее.",
    image: clan9Image,
    clanMessage: "Собрание в виртуальной реальности через 1 час.",
    treasury: {
      [EStats.kredit]: 80000,
      [EStats.darkMatter]: 40000,
      [EStats.token]: 600000,
    },
    participants: [
      { name: "MillennialLeader", role: "Лидер", status: "в сети", level: 25 },
      { name: "FutureGuard", role: "Замлидер", status: "в сети", level: 23 },
    ],
    participantsLimit: 60,
  },
  {
    id: "10",
    name: "Техзорцисти",
    level: 42,
    description: "Мы изгоняем слабость. Мы - Техзорцисты.",
    image: clan10Image,
    clanMessage: "Технический апгрейд через 3 часа.",
    treasury: {
      [EStats.kredit]: 140000,
      [EStats.darkMatter]: 60000,
      [EStats.token]: 900000,
    },
    participants: [
      { name: "TechExorcist", role: "Лидер", status: "в сети", level: 42 },
      { name: "CyberPriest", role: "Замлидер", status: "в сети", level: 40 },
    ],
    participantsLimit: 80,
  },
  {
    id: "11",
    name: "Континиюм",
    level: 50,
    description: "Мы вечны. Мы - Континиюм.",
    image: clan11Image,
    clanMessage: "Собрание в бесконечности через 5 часов.",
    treasury: {
      [EStats.kredit]: 220000,
      [EStats.darkMatter]: 110000,
      [EStats.token]: 1700000,
    },
    participants: [
      { name: "ContinuumLeader", role: "Лидер", status: "в сети", level: 50 },
      { name: "InfinityGuard", role: "Замлидер", status: "в сети", level: 48 },
    ],
    participantsLimit: 90,
  },
];
