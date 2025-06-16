import { ELanguages } from "./ELanguages";

export const TRANSLATIONS = {
  errors: {
    somethingWentWrong: {
      [ELanguages.en]: "Something went wrong",
      [ELanguages.ru]: "Что-то пошло не так",
    },
    notEnoughResourcesText: {
      [ELanguages.en]: "You don't have enough",
      [ELanguages.ru]: "У тебя не хватает",
    },
  },
  common: {
    orText: {
      [ELanguages.en]: "or",
      [ELanguages.ru]: "или",
    },
  },
  home: {
    titleText: {
      [ELanguages.en]:
        "the game is in development, but we're already playing big",
      [ELanguages.ru]: "игра в разработке, но мы уже играем по-крупному",
    },
    descriptionText: {
      [ELanguages.en]:
        "No promises. Only screenshots, style, and gameplay that we sharpen with blood and metal. Take a look — and subscribe so you don't miss the launch.",
      [ELanguages.ru]:
        "Никаких обещаний. Только скрины, стиль и геймплей, который мы затачиваем под кровь и металл. Посмотри — и подпишись, чтобы не проспать запуск.",
    },
  },
  onBoarding: {
    header: {
      titleText: {
        [ELanguages.en]: "Welcome to",
        [ELanguages.ru]: "Добро пожаловать в",
      },
      appNameText: {
        [ELanguages.en]: "Dystopia Game",
        [ELanguages.ru]: "Dystopia Game",
      },
      subtitleText: {
        [ELanguages.en]: "Here, we play by our own rules!",
        [ELanguages.ru]: "Здесь играют по своим правилам!",
      },
    },
    main: {
      talkText: {
        [ELanguages.en]:
          "Hey there, darling, want to play with me? I have different options for you: a Play2Earn game (Ton Cyber Farm), mini games, and RPG, but it's still in development. Choose any one, and I'll make sure everything goes smoothly 💋",
        [ELanguages.ru]:
          "Привет, дорогуша, хочешь поиграть со мной? У меня для тебя есть различные варианты: Play2Earn игра (Тон Кибер Ферма), мини игры и RPG, но она пока еще в разработке. Выбирай любую, а я прослежу, чтобы всё пошло гладко 💋",
      },

      titleTonCyberFarm: {
        [ELanguages.en]: "Ton Cyber Farm",
        [ELanguages.ru]: "Тон Кибер Ферма",
      },

      titleMiniGames: {
        [ELanguages.en]: "Mini Games",
        [ELanguages.ru]: "Мини-игры",
      },

      titleRPG: {
        [ELanguages.en]: "RPG (In Dev.)",
        [ELanguages.ru]: "RPG (В разработке)",
      },

      titleStrategy: {
        [ELanguages.en]: "Strategy",
        [ELanguages.ru]: "Стратегия",
      },
    },
    saveSelectBlock: {
      rememberChoiceLabel: {
        [ELanguages.en]: "Remember choice",
        [ELanguages.ru]: "Запомнить выбор",
      },
      descriptionText: {
        [ELanguages.en]: [
          "Next time, you'll go straight to your chosen place. Don't worry — you can always change it in the settings.",
          "By launching games you automatically agree to the terms of service.",
        ],
        [ELanguages.ru]: [
          "В следующий раз ты сразу попадёшь туда, что выбрал. Не волнуйся — в любой момент можно изменить в настройках.",
          "Запуская игры ты автоматически соглашаешься с пользовательским соглашением.",
        ],
      },
    },
  },
  cyberFarm: {
    header: {
      balancesText: {
        [ELanguages.en]: "Balances",
        [ELanguages.ru]: "Балансы",
      },
    },
    bonuses: {
      bonusesText: {
        [ELanguages.en]: "Bonuses",
        [ELanguages.ru]: "Бонусы",
      },
      walletText: {
        [ELanguages.en]: "Your wallet",
        [ELanguages.ru]: "Ваш кошелёк",
      },
      walletPlaceholder: {
        [ELanguages.en]: "Enter wallet number...",
        [ELanguages.ru]: "Вставлять номер кошелька...",
      },
      withdrawAmountText: {
        [ELanguages.en]: "Withdrawal amount (TON)",
        [ELanguages.ru]: "Сумма вывода (TON)",
      },
      withdrawAmountPlaceholder: {
        [ELanguages.en]: "0.5",
        [ELanguages.ru]: "0,5",
      },
      commissionText: {
        [ELanguages.en]: "Commission",
        [ELanguages.ru]: "Комиссия",
      },
      totalToReceiveText: {
        [ELanguages.en]: "Total to receive",
        [ELanguages.ru]: "Итого к получению",
      },
      totalToReceivePlaceholder: {
        [ELanguages.en]: "Auto-calculate = amount - commission...",
        [ELanguages.ru]: "Авторасчёт = сумма - комиссия...",
      },
      watchAdText: {
        [ELanguages.en]: "Get +1 CP for watching ads",
        [ELanguages.ru]: "Получайте +1 CP за просмотр рекламы",
      },
      depositText: {
        [ELanguages.en]: "Deposit",
        [ELanguages.ru]: "Пополнить",
      },
      withdrawText: {
        [ELanguages.en]: "Withdraw",
        [ELanguages.ru]: "Вывести",
      },
    },
    fields: {
      titleText: {
        [ELanguages.en]: "Fields",
        [ELanguages.ru]: "Поля",
      },
      emptyText: {
        [ELanguages.en]: "You don't have any fields",
        [ELanguages.ru]: "У вас нет полей",
      },
      buyModal: {
        titleText: {
          [ELanguages.en]: "Are you sure you want to buy this field for",
          [ELanguages.ru]: "Вы точно хотите купить этот участок за",
        },
        buyByCpButtonText: {
          [ELanguages.en]: "Buy by CP",
          [ELanguages.ru]: "Купить за CP",
        },
        buyByMetalButtonText: {
          [ELanguages.en]: "Buy by Metal",
          [ELanguages.ru]: "Купить за Металл",
        },
        cancelButtonText: {
          [ELanguages.en]: "Cancel",
          [ELanguages.ru]: "Отмена",
        },
        successText: {
          [ELanguages.en]: "Field purchase completed",
          [ELanguages.ru]: "Покупка участка выполнена",
        },
      },
      buildModal: {
        titleText: {
          [ELanguages.en]: "Choose how to use the field",
          [ELanguages.ru]: "Выберите способ использования поля",
        },
        plantButtonText: {
          [ELanguages.en]: "Plant",
          [ELanguages.ru]: "Посадить",
        },
        buildButtonText: {
          [ELanguages.en]: "Build",
          [ELanguages.ru]: "Построить",
        },
      },
      buildOptionsModal: {
        titleText: {
          [ELanguages.en]: "Choose what to build",
          [ELanguages.ru]: "Выберите что построить",
        },
        farmButtonText: {
          [ELanguages.en]: "Farm",
          [ELanguages.ru]: "Ферма",
        },
        factoryButtonText: {
          [ELanguages.en]: "Factory",
          [ELanguages.ru]: "Завод",
        },
        successText: {
          [ELanguages.en]: "Building completed",
          [ELanguages.ru]: "Постройка выполнена",
        },
        buildByCpButtonText: {
          [ELanguages.en]: "Build by CP",
          [ELanguages.ru]: "Построить за CP",
        },
        buildByMetalButtonText: {
          [ELanguages.en]: "Build by Metal",
          [ELanguages.ru]: "Построить за Металл",
        },
      },
    },
    farms: {
      titleText: {
        [ELanguages.en]: "Farms",
        [ELanguages.ru]: "Фермы",
      },
      emptyText: {
        [ELanguages.en]: "You don't have any farms",
        [ELanguages.ru]: "У вас нет ферм",
      },
    },
    factories: {
      titleText: {
        [ELanguages.en]: "Factories",
        [ELanguages.ru]: "Заводы",
      },
      emptyText: {
        [ELanguages.en]: "You don't have any factories",
        [ELanguages.ru]: "У вас нет заводов",
      },
    },
    warehouse: {
      titleText: {
        [ELanguages.en]: "Warehouse",
        [ELanguages.ru]: "Склад",
      },
      emptyText: {
        [ELanguages.en]: "Warehouse is empty",
        [ELanguages.ru]: "Склад пуст",
      },
      socialStoreButtonText: {
        [ELanguages.en]: "Social Store",
        [ELanguages.ru]: "Социальный магазин",
      },
      productInfo: {
        youHaveText: {
          [ELanguages.en]: "You have:",
          [ELanguages.ru]: "У вас:",
        },
        priceText: {
          [ELanguages.en]: "Price:",
          [ELanguages.ru]: "Цена:",
        },
        youWillGetText: {
          [ELanguages.en]: "You will get:",
          [ELanguages.ru]: "Вы получите:",
        },
        youWillSpendText: {
          [ELanguages.en]: "You will spend:",
          [ELanguages.ru]: "Вы тратите:",
        },
        buyButtonText: {
          [ELanguages.en]: "Buy",
          [ELanguages.ru]: "Купить",
        },
        sellButtonText: {
          [ELanguages.en]: "Sell",
          [ELanguages.ru]: "Продать",
        },
        piecesText: {
          [ELanguages.en]: "pcs",
          [ELanguages.ru]: "шт.",
        },
        successText: {
          [ELanguages.en]: "Purchase completed successfully",
          [ELanguages.ru]: "Покупка выполнена успешно",
        },
      },
      socialStoreModal: {
        titleLgText: {
          [ELanguages.en]: "Social Store",
          [ELanguages.ru]: "Социальный магазин",
        },
        titleText: {
          [ELanguages.en]: "Choose item to exchange",
          [ELanguages.ru]: "Выберите предмет для обмена",
        },
        confirmButtonText: {
          [ELanguages.en]: "Confirm exchange",
          [ELanguages.ru]: "Подтвердить обмен",
        },
        exchangeOptions: {
          cactusToCp: {
            [ELanguages.en]: "-1 cactus for 1 CP",
            [ELanguages.ru]: "-1 кактус на 1 CP",
          },
          cactusToRepairKit: {
            [ELanguages.en]: "-2 cactus for 10 repair kits",
            [ELanguages.ru]: "-2 кактус на 10 ремкомплектов",
          },
          cactusToEnergy: {
            [ELanguages.en]: "-3 cactus for 20 energy",
            [ELanguages.ru]: "-3 кактус на 20 энергии",
          },
        },
      },
    },
    processModal: {
      titleText: {
        [ELanguages.en]: "Production in progress",
        [ELanguages.ru]: "Производство в процессе",
      },
      readyToCollectText: {
        [ELanguages.en]: "Ready to collect!",
        [ELanguages.ru]: "Урожай готов к сбору!",
      },
      timeRemainingText: {
        [ELanguages.en]: "Time remaining:",
        [ELanguages.ru]: "Осталось:",
      },
      collectButtonText: {
        [ELanguages.en]: "Collect harvest",
        [ELanguages.ru]: "Собрать урожай",
      },
      speedUpCpButtonText: {
        [ELanguages.en]: "Speed up for NUMBERCP",
        [ELanguages.ru]: "Ускорить за NUMBERCP",
      },
      speedUpAdButtonText: {
        [ELanguages.en]: "Speed up with ad",
        [ELanguages.ru]: "Ускорить за рекламу",
      },
      harvestCollectedText: {
        [ELanguages.en]: "Harvest collected!",
        [ELanguages.ru]: "Урожай собран!",
      },
      speedUpCompleteText: {
        [ELanguages.en]: "Speed up complete!",
        [ELanguages.ru]: "Ускорение завершено!",
      },
    },
    optionsModal: {
      titleText: {
        [ELanguages.en]: "Choose what to process",
        [ELanguages.ru]: "Выберите что переработать",
      },
      plantTitleText: {
        [ELanguages.en]: "Choose what to plant",
        [ELanguages.ru]: "Выберите что посадить",
      },
      successText: {
        [ELanguages.en]: "Processing started successfully!",
        [ELanguages.ru]: "Переработка выполнена успешно!",
      },
      plantSuccessText: {
        [ELanguages.en]: "Planting started successfully!",
        [ELanguages.ru]: "Посадка выполнена успешно!",
      },
    },
    products: {
      metal: {
        [ELanguages.en]: "Metal",
        [ELanguages.ru]: "Металл",
      },
      bioGel: {
        [ELanguages.en]: "Bio Gel",
        [ELanguages.ru]: "Биогель",
      },
      edibleBrick: {
        [ELanguages.en]: "Edible Brick",
        [ELanguages.ru]: "Съед. брикет",
      },
      energy: {
        [ELanguages.en]: "Energy",
        [ELanguages.ru]: "Энергия",
      },
      energyCore: {
        [ELanguages.en]: "Energy Core",
        [ELanguages.ru]: "Энергоядро",
      },
      organicMeat: {
        [ELanguages.en]: "Organic Meat",
        [ELanguages.ru]: "Орг. мясо",
      },
      plasma: {
        [ELanguages.en]: "Plasma",
        [ELanguages.ru]: "Плазма",
      },
      repairKit: {
        [ELanguages.en]: "Repair Kit",
        [ELanguages.ru]: "Ремкомплект",
      },
      metalCactus: {
        [ELanguages.en]: "Metal Cactus",
        [ELanguages.ru]: "Металокактусы",
      },
      plasmaMushroom: {
        [ELanguages.en]: "Plasma Mushroom",
        [ELanguages.ru]: "Плазмогрибы",
      },
      bioBacteria: {
        [ELanguages.en]: "Bio Bacteria",
        [ELanguages.ru]: "Биобактерии",
      },
      algae: {
        [ELanguages.en]: "Algae",
        [ELanguages.ru]: "Водоросли",
      },
      modifiedInsects: {
        [ELanguages.en]: "Modified Insects",
        [ELanguages.ru]: "ГМ насекомые",
      },
    },
  },
  loyality: {
    header: {
      titleText: {
        [ELanguages.en]: "Support Center",
        [ELanguages.ru]: "Центр Поддержки",
      },
    },
    tabs: {
      activity: {
        name: {
          [ELanguages.en]: "Activity",
          [ELanguages.ru]: "Активность",
        },
        title: {
          [ELanguages.en]: "Daily Activity",
          [ELanguages.ru]: "Ежедневная активность",
        },
        text: {
          [ELanguages.en]:
            "Get bonuses for daily login. Progressive system: the more consecutive days — the higher the reward.",
          [ELanguages.ru]:
            "Получаете бонусы за ежедневный вход. Система прогрессивная: чем больше дней подряд — тем выше награда.",
        },
        statText: {
          [ELanguages.en]: "Consecutive logins: NUMBER day",
          [ELanguages.ru]: "Входов подряд: NUMBER день",
        },
      },
      tasks: {
        name: {
          [ELanguages.en]: "Tasks",
          [ELanguages.ru]: "Задания",
        },
        title: {
          [ELanguages.en]: "Daily Tasks",
          [ELanguages.ru]: "Ежедневные задания",
        },
        text: {
          [ELanguages.en]:
            "Complete PvE, PvP and clan missions — get LP. The more tasks — the higher the reward.",
          [ELanguages.ru]:
            "Выполняете PvE, PvP и клановые миссии — получаете LP. Чем больше задач — тем выше награда.",
        },
        statText: {
          [ELanguages.en]: "Tasks completed: 1",
          [ELanguages.ru]: "Выполнено заданий: 1",
        },
      },
      supportProject: {
        name: {
          [ELanguages.en]: "Project Support",
          [ELanguages.ru]: "Поддержка проекта",
        },
        title: {
          [ELanguages.en]: "Project Support",
          [ELanguages.ru]: "Поддержка проекта",
        },
        text: {
          [ELanguages.en]:
            "Participate in the development of the Dystopia universe. Subscribe, follow projects, collect rewards",
          [ELanguages.ru]:
            "Участвуй в развитии вселенной Dystopia. Подписывайся, следи за проектами, забирай награды",
        },
        statText: {
          [ELanguages.en]: "Completed: 1 of 7",
          [ELanguages.ru]: "Выполнено: 1 из 7",
        },
      },
      store: {
        name: {
          [ELanguages.en]: "Store",
          [ELanguages.ru]: "Магазин",
        },
        title: {
          [ELanguages.en]: "Loyalty Store",
          [ELanguages.ru]: "Магазин лояльности",
        },
        text: {
          [ELanguages.en]:
            "Exchange your loyalty points (LP) for exclusive weapons, armor and skins! Support the project — unlock access to unique rewards unavailable for credits.",
          [ELanguages.ru]:
            "Обменивай свои очки лояльности (LP) на эксклюзивное оружие, броню и скины! Поддерживай проект — открывай доступ к уникальным наградам, недоступным за кредиты.",
        },
        statText: {
          [ELanguages.en]: "",
          [ELanguages.ru]: "",
        },
      },
    },
    info: {
      totalText: {
        [ELanguages.en]: "Total:",
        [ELanguages.ru]: "Всего:",
      },
    },
    activity: {
      availableInText: {
        [ELanguages.en]: "Available in: 22h 25m",
        [ELanguages.ru]: "Будет доступно через: 22ч 25м",
      },
      receivedText: {
        [ELanguages.en]: "Received",
        [ELanguages.ru]: "Получено",
      },
      lootboxForAdText: {
        [ELanguages.en]: "Lootbox for ad",
        [ELanguages.ru]: "Лутбокс за рекламу",
      },
      lootboxForLPText: {
        [ELanguages.en]: "Lootbox for LP",
        [ELanguages.ru]: "Лутбокс за ЛП",
      },
      dailyRewardReceivedText: {
        [ELanguages.en]: "Daily reward received",
        [ELanguages.ru]: "Ежедневная награда получена",
      },
      willBeAvailableInText: {
        [ELanguages.en]: "Will be available in:",
        [ELanguages.ru]: "Будет доступно через:",
      },
    },
    tasks: {
      availableInText: {
        [ELanguages.en]: "All available tasks will be updated in: 22h 25m",
        [ELanguages.ru]:
          "Все доступные задания будут обновляться через: 22ч 25м",
      },
      completedText: {
        [ELanguages.en]: "Completed",
        [ELanguages.ru]: "Выполнено",
      },
      pvpBattlesText: {
        [ELanguages.en]: "Complete PvP battles:",
        [ELanguages.ru]: "Проведите PvP боев:",
      },
      pveBattlesText: {
        [ELanguages.en]: "Complete PvE battles:",
        [ELanguages.ru]: "Проведите PvE боев:",
      },
      clanTerritoryText: {
        [ELanguages.en]: "Complete victorious clan territory captures:",
        [ELanguages.ru]: "Проведите победных клановых захватов территории:",
      },
    },
    supportProject: {
      availableInText: {
        [ELanguages.en]: "All available tasks will be updated in: 6d 12h",
        [ELanguages.ru]:
          "Все доступные задания будут обновляться через: 6д 12ч",
      },
      subscribeText: {
        [ELanguages.en]: "Subscribe",
        [ELanguages.ru]: "Подписаться",
      },
      subscribedText: {
        [ELanguages.en]: "Subscribed",
        [ELanguages.ru]: "Подписан",
      },
      visitText: {
        [ELanguages.en]: "Visit",
        [ELanguages.ru]: "Посетить",
      },
      getText: {
        [ELanguages.en]: "Get:",
        [ELanguages.ru]: "Получить:",
      },

      task1NameText: {
        [ELanguages.en]: "Subscribe to CryptoZver channel",
        [ELanguages.ru]: "Подпишитесь на канал CryptoZver",
      },
      task1DescriptionText: {
        [ELanguages.en]: "Channel about crypto",
        [ELanguages.ru]: "Канал про крипту",
      },
      task2NameText: {
        [ELanguages.en]: "Subscribe to KARIMOV channel",
        [ELanguages.ru]: "Подпишитесь на канал KARIMOV",
      },
      task2DescriptionText: {
        [ELanguages.en]: "Path from $100 to $500k",
        [ELanguages.ru]: "Путь со 100$ до 500k$",
      },
      task3NameText: {
        [ELanguages.en]: "Share the game in Telegram",
        [ELanguages.ru]: "Поделитесь игрой в Telegram",
      },
      task3DescriptionText: {
        [ELanguages.en]: "Tell your friends and get a bonus",
        [ELanguages.ru]: "Расскажи друзьям и получи бонус",
      },
      task4NameText: {
        [ELanguages.en]: "Visit partner website",
        [ELanguages.ru]: "Посетите сайт партнёров",
      },
      task4DescriptionText: {
        [ELanguages.en]: "One click - and you helped the project",
        [ELanguages.ru]: "Один клик — и ты помог проекту",
      },
      task5NameText: {
        [ELanguages.en]: "Subscribe to All COMBO TAP X",
        [ELanguages.ru]: "Подпишитесь на All COMBO TAP X",
      },
      task5DescriptionText: {
        [ELanguages.en]: "One click - and you helped the project",
        [ELanguages.ru]: "Один клик — и ты помог проекту",
      },
      partnerTasksText: {
        [ELanguages.en]: "Additional partner tasks",
        [ELanguages.ru]: "Дополнительные задания от партнеров",
      },
      openText: {
        [ELanguages.en]: "Open",
        [ELanguages.ru]: "Открыть",
      },
    },
    collectReward: {
      collectRewardText: {
        [ELanguages.en]: "Collect reward",
        [ELanguages.ru]: "Получить награду",
      },
    },
  },
};
