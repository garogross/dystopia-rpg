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
    loadAdText: {
      [ELanguages.en]: "Failed to load ad",
      [ELanguages.ru]: "Не удалось загрузить рекламу",
    },
  },
  common: {
    orText: {
      [ELanguages.en]: "or",
      [ELanguages.ru]: "или",
    },
    cpText: {
      [ELanguages.en]: "cp",
      [ELanguages.ru]: "cp",
    },
    watchAdAndGetCpText: {
      [ELanguages.en]: "Watch an ad and get 1 CP",
      [ELanguages.ru]: "Посмотри рекламу и получи 1 CP",
    },
    watchAdText: {
      [ELanguages.en]: "Watch",
      [ELanguages.ru]: "Посмотреть",
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
          "💾 ...Receiving. Glad to see you online, stranger. Looking for a thrill? My channels are open:\n• Play2Earn (TON Cyber Farm);\n• Mini-Games Archive: tons of ways to kill time.\n• RPG: coming soon, but I promise it's worth the wait.\nGive me a signal. I'll make sure your session is... unforgettable. 🌀",
        [ELanguages.ru]:
          "💾 ...Прием. Рада видеть тебя в сети, незнакомец. Ищешь острых ощущений? Мои каналы открыты:\n• Play2Earn (ТОН Кибер Ферма);\n• Архив Мини-Игр: куча способов убить время.\n• RPG: скоро, но обещаю, оно того стоит.\nДай сигнал. Я позабочусь, чтобы твой сеанс был... незабываемым. 🌀",
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
        exchangeSuccessText: {
          [ELanguages.en]: "Exchange completed successfully",
          [ELanguages.ru]: "Обмен выполнен успешно",
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
          toText: {
            [ELanguages.en]: "for",
            [ELanguages.ru]: "на",
          },
        },
        exchangeCompleteText: {
          [ELanguages.en]: "Exchange completed",
          [ELanguages.ru]: "Обмен выполнен",
        },
        availableInText: {
          [ELanguages.en]: "Available in:",
          [ELanguages.ru]: "Доступно через:",
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
      notEnoughResourcesText: {
        [ELanguages.en]: "You don't have enough resources for production",
        [ELanguages.ru]: "У вас недостаточно ресурсов для производства",
      },
      missingResourcesCostText: {
        [ELanguages.en]: "Replenishing missing resources costs: ",
        [ELanguages.ru]: "Пополнение недостающих ресурсов обходятся: ",
      },
      buyAllButtonText: {
        [ELanguages.en]: "Buy all",
        [ELanguages.ru]: "Докупать всё",
      },
      confirmButtonText: {
        [ELanguages.en]: "Confirm",
        [ELanguages.ru]: "Потвердить",
      },
      productionText: {
        [ELanguages.en]: "Production",
        [ELanguages.ru]: "Выработка",
      },
      requiredText: {
        [ELanguages.en]: "Required",
        [ELanguages.ru]: "Требуется",
      },
      youHaveText: {
        [ELanguages.en]: "you have:",
        [ELanguages.ru]: "у вас:",
      },
    },
    products: {
      metal: {
        [ELanguages.en]: "Metal",
        [ELanguages.ru]: "Металл",
      },
      metalTwisted: {
        [ELanguages.en]: "Metal",
        [ELanguages.ru]: "металла",
      },
      bioGel: {
        [ELanguages.en]: "Bio Gel",
        [ELanguages.ru]: "Биогель",
      },
      bioGelTwisted: {
        [ELanguages.en]: "Bio Gel",
        [ELanguages.ru]: "биогеля",
      },
      edibleBrick: {
        [ELanguages.en]: "Edible Brick",
        [ELanguages.ru]: "Съед. брикет",
      },
      edibleBrickTwisted: {
        [ELanguages.en]: "Edible Brick",
        [ELanguages.ru]: "съед. брикета",
      },
      energy: {
        [ELanguages.en]: "Energy",
        [ELanguages.ru]: "Энергия",
      },
      energyTwisted: {
        [ELanguages.en]: "Energy",
        [ELanguages.ru]: "энергии",
      },
      energyCore: {
        [ELanguages.en]: "Energy Core",
        [ELanguages.ru]: "Энергоядро",
      },
      energyCoreTwisted: {
        [ELanguages.en]: "Energy Core",
        [ELanguages.ru]: "энергоядра",
      },
      organicMeat: {
        [ELanguages.en]: "Organic Meat",
        [ELanguages.ru]: "Орг. мясо",
      },
      organicMeatTwisted: {
        [ELanguages.en]: "Organic Meat",
        [ELanguages.ru]: "орг. мяса",
      },
      plasma: {
        [ELanguages.en]: "Plasma",
        [ELanguages.ru]: "Плазма",
      },
      plasmaTwisted: {
        [ELanguages.en]: "Plasma",
        [ELanguages.ru]: "плазмы",
      },
      repairKit: {
        [ELanguages.en]: "Repair Kit",
        [ELanguages.ru]: "Ремкомплект",
      },
      repairKitTwisted: {
        [ELanguages.en]: "Repair Kit",
        [ELanguages.ru]: "ремкомплектов",
      },
      metalCactus: {
        [ELanguages.en]: "Metal Cactus",
        [ELanguages.ru]: "Металокактусы",
      },
      metalCactusTwisted: {
        [ELanguages.en]: "Metal Cactus",
        [ELanguages.ru]: "металокактусов",
      },
      plasmaMushroom: {
        [ELanguages.en]: "Plasma Mushroom",
        [ELanguages.ru]: "Плазмогрибы",
      },
      plasmaMushroomTwisted: {
        [ELanguages.en]: "Plasma Mushroom",
        [ELanguages.ru]: "плазмогрибов",
      },
      bioBacteria: {
        [ELanguages.en]: "Bio Bacteria",
        [ELanguages.ru]: "Биобактерии",
      },
      bioBacteriaTwisted: {
        [ELanguages.en]: "Bio Bacteria",
        [ELanguages.ru]: "биобактерий",
      },
      algae: {
        [ELanguages.en]: "Algae",
        [ELanguages.ru]: "Водоросли",
      },
      algaeTwisted: {
        [ELanguages.en]: "Algae",
        [ELanguages.ru]: "водорослей",
      },
      modifiedInsects: {
        [ELanguages.en]: "Modified Insects",
        [ELanguages.ru]: "ГМ насекомые",
      },
      modifiedInsectsTwisted: {
        [ELanguages.en]: "Modified Insects",
        [ELanguages.ru]: "ГМ насекомых",
      },
    },
    achievments: {
      store: {
        level1: {
          [ELanguages.en]: "Curious Visitor",
          [ELanguages.ru]: "Любопытный заглянувший",
        },
        level2: {
          [ELanguages.en]: "Purposeful Shopper",
          [ELanguages.ru]: "Зашёл по делу",
        },
        level3: {
          [ELanguages.en]: "Regular Customer",
          [ELanguages.ru]: "Постоянный клиент",
        },
        level4: {
          [ELanguages.en]: "Benefit Appreciator",
          [ELanguages.ru]: "Ценитель выгод",
        },
        level5: {
          [ELanguages.en]: "Store Tycoon",
          [ELanguages.ru]: "Магазинный магнат",
        },
        desc1: {
          [ELanguages.en]: "Visit the store NUMBER time",
          [ELanguages.ru]: "Посетить магазин NUMBER раз",
        },
        desc2: {
          [ELanguages.en]: "Visit the store NUMBER days in a row",
          [ELanguages.ru]: "Посетить магазин NUMBER д. подряд",
        },
        desc3: {
          [ELanguages.en]: "Visit the store NUMBER days in a row",
          [ELanguages.ru]: "Посетить магазин NUMBER д. подряд",
        },
        desc4: {
          [ELanguages.en]: "Visit the store NUMBER days in a row",
          [ELanguages.ru]: "Посетить магазин NUMBER д. подряд",
        },
        desc5: {
          [ELanguages.en]: "Visit the store NUMBER days in a row",
          [ELanguages.ru]: "Посетить магазин NUMBER д. подряд",
        },
      },
      field: {
        level1: {
          [ELanguages.en]: "First Sprout",
          [ELanguages.ru]: "Первое прорастание",
        },
        level2: {
          [ELanguages.en]: "Confident Gardener",
          [ELanguages.ru]: "Уверенный садовод",
        },
        level3: {
          [ELanguages.en]: "Cyber Agronomist",
          [ELanguages.ru]: "Киберагроном",
        },
        level4: {
          [ELanguages.en]: "Soil Master",
          [ELanguages.ru]: "Повелитель почвы",
        },
        level5: {
          [ELanguages.en]: "Field Master",
          [ELanguages.ru]: "Мастер поля",
        },
        desc1: {
          [ELanguages.en]: "Collect NUMBER harvests from fields",
          [ELanguages.ru]: "Собрать NUMBER урожая на полях",
        },
        desc2: {
          [ELanguages.en]: "Collect NUMBER harvests from fields",
          [ELanguages.ru]: "Собрать NUMBER урожая на полях",
        },
        desc3: {
          [ELanguages.en]: "Collect NUMBER harvests from fields",
          [ELanguages.ru]: "Собрать NUMBER урожая на полях",
        },
        desc4: {
          [ELanguages.en]: "Collect NUMBER harvests from fields",
          [ELanguages.ru]: "Собрать NUMBER урожая на полях",
        },
        desc5: {
          [ELanguages.en]: "Collect NUMBER harvests from fields",
          [ELanguages.ru]: "Собрать NUMBER урожая на полях",
        },
      },
      farm: {
        level1: {
          [ELanguages.en]: "Breeder's Apprentice",
          [ELanguages.ru]: "Ученик заводчика",
        },
        level2: {
          [ELanguages.en]: "Biofarm Overseer",
          [ELanguages.ru]: "Надсмотрщик биофермы",
        },
        level3: {
          [ELanguages.en]: "Fauna Engineer",
          [ELanguages.ru]: "Инженер по фауне",
        },
        level4: {
          [ELanguages.en]: "Life Cycle Controller",
          [ELanguages.ru]: "Контролёр жизненного цикла",
        },
        level5: {
          [ELanguages.en]: "Genetic Baron",
          [ELanguages.ru]: "Генетический барон",
        },
        desc1: {
          [ELanguages.en]: "Collect NUMBER harvests from farms",
          [ELanguages.ru]: "Собрать NUMBER урожая на фермах",
        },
        desc2: {
          [ELanguages.en]: "Collect NUMBER harvests from farms",
          [ELanguages.ru]: "Собрать NUMBER урожая на фермах",
        },
        desc3: {
          [ELanguages.en]: "Collect NUMBER harvests from farms",
          [ELanguages.ru]: "Собрать NUMBER урожая на фермах",
        },
        desc4: {
          [ELanguages.en]: "Collect NUMBER harvests from farms",
          [ELanguages.ru]: "Собрать NUMBER урожая на фермах",
        },
        desc5: {
          [ELanguages.en]: "Collect NUMBER harvests from farms",
          [ELanguages.ru]: "Собрать NUMBER урожая на фермах",
        },
      },
      factory: {
        level1: {
          [ELanguages.en]: "First Launch",
          [ELanguages.ru]: "Первый запуск",
        },
        level2: {
          [ELanguages.en]: "Production Operator",
          [ELanguages.ru]: "Оператор производства",
        },
        level3: {
          [ELanguages.en]: "Industrial Engineer",
          [ELanguages.ru]: "Индустриальный инженер",
        },
        level4: {
          [ELanguages.en]: "Mechanic Synthesizer",
          [ELanguages.ru]: "Механик-синтезатор",
        },
        level5: {
          [ELanguages.en]: "Cyber Tycoon",
          [ELanguages.ru]: "Кибермагнат",
        },
        desc1: {
          [ELanguages.en]: "Get NUMBER products from factories",
          [ELanguages.ru]: "Получить NUMBER продукции с заводов",
        },
        desc2: {
          [ELanguages.en]: "Get NUMBER products from factories",
          [ELanguages.ru]: "Получить NUMBER продукции с заводов",
        },
        desc3: {
          [ELanguages.en]: "Get NUMBER products from factories",
          [ELanguages.ru]: "Получить NUMBER продукции с заводов",
        },
        desc4: {
          [ELanguages.en]: "Get NUMBER products from factories",
          [ELanguages.ru]: "Получить NUMBER продукции с заводов",
        },
        desc5: {
          [ELanguages.en]: "Get NUMBER products from factories",
          [ELanguages.ru]: "Получить NUMBER продукции с заводов",
        },
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
            "Ежедневные бонусы: чем больше дней подряд — тем лучше награда.",
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
            "Support the Dystopia universe! Complete sponsor tasks and get rewards.",
          [ELanguages.ru]:
            "Поддержи вселенную Dystopia! Выполняй задания спонсоров и получай награды.",
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
        [ELanguages.ru]: "Перейти",
      },
      taskNotCompletedText: {
        [ELanguages.en]: "Task not completed",
        [ELanguages.ru]: "Задание не выполнено",
      },
      supportProjectText: {
        [ELanguages.en]: "Support the sponsor's project and get 5 CP",
        [ELanguages.ru]: "Поддержите проект спонсора и получите 5 CP",
      },
    },
    collectReward: {
      collectRewardText: {
        [ELanguages.en]: "Collect reward",
        [ELanguages.ru]: "Получить награду",
      },
    },
  },
  referals: {
    main: {
      titleText: {
        [ELanguages.en]: "Friends",
        [ELanguages.ru]: "Друзья",
      },
    },
    totalEarnings: {
      availableToCollectText: {
        [ELanguages.en]: "Available to collect",
        [ELanguages.ru]: "Доступно к сбору",
      },
      collectButtonText: {
        [ELanguages.en]: "Collect",
        [ELanguages.ru]: "Собрать",
      },
    },
    totalCount: {
      titleText: {
        [ELanguages.en]: "Referrals for all time",
        [ELanguages.ru]: "Рефералы за всё время",
      },
    },
    history: {
      titleText: {
        [ELanguages.en]: "Referrals",
        [ELanguages.ru]: "Рефералы",
      },
      totalText: {
        [ELanguages.en]: "Total",
        [ELanguages.ru]: "Всего",
      },
    },
    shareButtons: {
      copyLinkText: {
        [ELanguages.en]: "Copy link",
        [ELanguages.ru]: "Копировать ссылку",
      },
      copiedText: {
        [ELanguages.en]: "Copied",
        [ELanguages.ru]: "Скопировано",
      },
      inviteFriendText: {
        [ELanguages.en]: "Invite friend",
        [ELanguages.ru]: "Пригласить друга",
      },
    },
    info: {
      infoTexts: {
        [ELanguages.en]: [
          "Referral rewards are credited once a day.",
          "Daily token accrual depends on the activity of your referrals.",
          "10% of your referrals' credit spending",
        ],
        [ELanguages.ru]: [
          "Реферальные награды начисляются раз в сутке.",
          "Ежедневное начисление жетонов зависит от активности ваших рефералов.",
          "10% от трат кредитов вашими рефералами",
        ],
      },
    },
  },
  achievments: {
    progressText: {
      [ELanguages.en]: "Progress",
      [ELanguages.ru]: "Прогресс",
    },
  },
};
