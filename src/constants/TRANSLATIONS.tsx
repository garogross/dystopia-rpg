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
    willBeAvailableFromSecondText: {
      [ELanguages.en]: "Will be available from NUMBER minute",
      [ELanguages.ru]: "Будет доступно через NUMBER минуту",
    },
    dailyLimitReachedText: {
      [ELanguages.en]: "Daily ad view limit reached (100/day)",
      [ELanguages.ru]: "Достигнут дневной лимит просмотров рекламы (100/сутки)",
    },
    hourlyLimitReachedText: {
      [ELanguages.en]: "Hourly ad view limit reached (10/hour)",
      [ELanguages.ru]: "Достигнут почасовой лимит просмотров рекламы (10/час)",
    },
    adAvailableInSecondsText: {
      [ELanguages.en]: (seconds: number) =>
        `Ad will be available in ${seconds} sec.`,
      [ELanguages.ru]: (seconds: number) =>
        `Реклама будет доступна через ${seconds} сек.`,
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
  tutorialPopup: {
    closeText: {
      [ELanguages.en]: "Close",
      [ELanguages.ru]: "Закрыть",
    },
    nextText: {
      [ELanguages.en]: "Next",
      [ELanguages.ru]: "Далее",
    },
    cyberFarmSlides: {
      welcomeText: {
        [ELanguages.en]: (
          <>
            <b>Welcome to the Cyber Farm!</b> <br />
            Here you can grow products, process resources, and sell goods for
            TON. I'll help you get started.
            <br />
            Now we're in the "Fields" section. On fields, you can grow products,
            or build a <b>farm</b> or <b>factory</b> (after building, you'll
            find them in other sections). As you can see, you have no fields
            yet—let's buy your first one, I'll make it free for you.
          </>
        ),
        [ELanguages.ru]: (
          <>
            <b>Добро пожаловать на киберферму!</b>
            <br />
            Здесь ты можешь выращивать продукцию, перерабатывать ресурсы и
            продавать продукты за TON, я помогу тебе разобраться.
            <br />
            Сейчас мы в разделе «Поля». На полях можно выращивать продукцию, а
            также построить <b>ферму</b> или <b>завод</b> (после постройки
            найдешь их в других разделах). Как видишь, у тебя нет полей, давай
            купим первое, для тебя я сделаю его бесплатным.
          </>
        ),
      },
      plantCactusText: {
        [ELanguages.en]: <>Now let's plant a metal cactus there.</>,
        [ELanguages.ru]: <>Теперь давай посадим туда металлокактус.</>,
      },
      needResourcesText: {
        [ELanguages.en]: (
          <>
            You need certain resources to grow crops. You can buy them
            separately in the warehouse, or all at once from this menu.
            Especially for you, the first resources are free.
          </>
        ),
        [ELanguages.ru]: (
          <>
            Видишь, для выращивания необходимы определенные ресурсы, их можно
            купить на складе по отдельности, а также из этого меню сразу все.
            Специально для тебя первые ресурсы дам тебе бесплатно.
          </>
        ),
      },
      speedUpText: {
        [ELanguages.en]: (
          <>
            Everything grows for 1 hour on fields (8 hours on farms, 12 hours in
            factories). Let's speed it up so you don't have to wait. I'll make
            this speed-up free for you.
          </>
        ),
        [ELanguages.ru]: (
          <>
            На полях все растет 1 час (на фермах 8 часов, на заводе
            перерабатывается 12 часов), давай ускорим, чтобы не ждать. Это
            ускорение я сделаю для тебя бесплатным.
          </>
        ),
      },
      speedUpCostText: {
        [ELanguages.en]: (
          <>
            Speed-up costs: 0.1 Cash Point (CP) on fields, 0.5 CP on farms, 1 CP
            in factories. You can also speed up by watching an ad—one view pays
            for 1 CP, so after speeding up on fields or farms, you'll get some
            change back. Also, if some time has passed, the speed-up cost
            decreases.
            <br />
            After harvesting, all products go to the warehouse. Let's go there.
          </>
        ),
        [ELanguages.ru]: (
          <>
            Ускорение на полях стоит 0,1 Cash Point (CP), на ферме 0,5 CP, на
            заводе 1 СР. Можно ускорить за просмотр рекламы, один просмотр
            оплачивает 1 СР, поэтому после ускорений на полях или ферме ты
            получишь сдачу. Также, если прошло некоторые время, стоимость
            ускорения снижается.
            <br />
            Посла сбора все продукты попадают на склад, давай перейдем туда.
          </>
        ),
      },
      warehouseText: {
        [ELanguages.en]: (
          <>
            Here you can sell products for TON and buy missing items for
            production with CP. If you complete a few tasks for CP in the
            Support Center (don't forget to check in daily for your bonus!) and
            put in a little effort, by tomorrow you can produce and sell bio gel
            for TON. It's even more profitable to produce edible bricks and
            meat, but that takes more time and resources.
            <br />
            Now let's go to the social store.
          </>
        ),
        [ELanguages.ru]: (
          <>
            Мы на складе, здесь ты можешь продать за TON продукцию и докупить
            недостающие вещи для производства за СР. Если выполнишь несколько
            заданий за СР в Центре Поддержке (не забывай заглядывать туда каждый
            день и собирать ежедневный бонус) и приложишь немного усилий, то уже
            завтра ты сможешь произвести и продать за TON биогель. Гораздо
            выгоднее производить съедобные брикеты и мясо, но это потребует
            больше времени и ресурсов.
            <br />
            Теперь перейдем в социальный магазин.
          </>
        ),
      },
      socialStoreText: {
        [ELanguages.en]: (
          <>
            This is a special place to help new players. From time to time, you
            can exchange regular cacti for CP or more complex products like
            repair kits or energy.
          </>
        ),
        [ELanguages.ru]: (
          <>
            Это специальное место для помощи начинающим игрокам. Раз в
            определенное время ты можешь обменять обычные кактусы на СР или
            более сложные продукты, такие как ремкомплекты или энергия.
          </>
        ),
      },
      finishText: {
        [ELanguages.en]: (
          <>
            That's it—develop your farm and have fun! If you have any questions,
            you can ask them in the chat. For successfully completing the
            tutorial, I'll give you 10 CP. Spend them wisely.
          </>
        ),
        [ELanguages.ru]: (
          <>
            На этом все, развивай ферму, получай удовольствие! Если возникнут
            вопросы, можешь задавать их в чате. За успешное прохождение обучения
            я дам тебе 10 СР, трать их с умом.
          </>
        ),
      },
    },
  },
  settings: {
    titleText: {
      [ELanguages.en]: "Settings",
      [ELanguages.ru]: "Настройки",
    },
    languageText: {
      [ELanguages.en]: "Language",
      [ELanguages.ru]: "Язык",
    },
    goToChatText: {
      [ELanguages.en]: "Go to Chat",
      [ELanguages.ru]: "Перейти в Чат",
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

      comingSoonText: {
        [ELanguages.en]: "(Coming soon)",
        [ELanguages.ru]: "(Совсем скоро)",
      },
      pay2EarnText: {
        [ELanguages.en]: "(Pay2Earn)",
        [ELanguages.ru]: "(Pay2Earn)",
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
      withdrawCompletedText: {
        [ELanguages.en]: "Withdraw completed",
        [ELanguages.ru]: "Вывод завершён",
      },
      withdrawFailedText: {
        [ELanguages.en]: "Failed to complete withdraw",
        [ELanguages.ru]: "Не удалось выполнить вывод",
      },
      setAllText: {
        [ELanguages.en]: "Set all",
        [ELanguages.ru]: "Ставить все",
      },
      amountAfterCommissionMustBeGreaterThanZeroText: {
        [ELanguages.en]: "Amount after commission must be greater than 0",
        [ELanguages.ru]: "Сумма после вычета комиссии должна быть больше 0",
      },
      amountExceedsTonBalanceText: {
        [ELanguages.en]: "Amount exceeds your TON balance",
        [ELanguages.ru]: "Сумма превышает ваш баланс TON",
      },
      walletAddressRequiredText: {
        [ELanguages.en]: "Wallet address is required",
        [ELanguages.ru]: "Требуется адрес кошелька",
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
      farmEstimatedValueText: {
        [ELanguages.en]: "Farm estimated value",
        [ELanguages.ru]: "Оценочная стоимость фермы",
      },
      sellForText: {
        [ELanguages.en]: "Sell for",
        [ELanguages.ru]: "Продажа за",
      },
      buyForText: {
        [ELanguages.en]: "Buy for",
        [ELanguages.ru]: "Покупка за",
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
        [ELanguages.ru]: "Пополнение недостающих ресурсов обойдется в ",
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
          [ELanguages.en]: "Visit the store NUMBER times",
          [ELanguages.ru]: "Посетить магазин NUMBER раз",
        },
        desc3: {
          [ELanguages.en]: "Visit the store NUMBER times",
          [ELanguages.ru]: "Посетить магазин NUMBER раз",
        },
        desc4: {
          [ELanguages.en]: "Visit the store NUMBER times",
          [ELanguages.ru]: "Посетить магазин NUMBER раз",
        },
        desc5: {
          [ELanguages.en]: "Visit the store NUMBER times",
          [ELanguages.ru]: "Посетить магазин NUMBER раз",
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
        rewardReceivedText: {
          [ELanguages.en]: "Reward received",
          [ELanguages.ru]: "Награда получена",
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

      partnerTasksText: {
        [ELanguages.en]: "Additional partner tasks",
        [ELanguages.ru]: "Дополнительные задания от партнеров",
      },
      openText: {
        [ELanguages.en]: "Open",
        [ELanguages.ru]: "Перейти",
      },
      claimAdText: {
        [ELanguages.en]: "Claim",
        [ELanguages.ru]: "Забрать",
      },
      doneText: {
        [ELanguages.en]: "Done",
        [ELanguages.ru]: "Готово",
      },
      adNotAvailableText: {
        [ELanguages.en]: "Ad not available",
        [ELanguages.ru]: "Реклама недоступна",
      },
      taskNotCompletedText: {
        [ELanguages.en]: "Task not completed",
        [ELanguages.ru]: "Задание не выполнено",
      },
      taskCompletedText: {
        [ELanguages.en]: "Task completed successfully",
        [ELanguages.ru]: "Задание выполнено успешно",
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
      collectingButtonText: {
        [ELanguages.en]: "Collecting...",
        [ELanguages.ru]: "Собирается...",
      },
      rewardCollectedSuccessfullyText: {
        [ELanguages.en]: "CP collected successfully",
        [ELanguages.ru]: "CP успешно получена",
      },
      failedToCollectRewardText: {
        [ELanguages.en]: "Failed to collect CP",
        [ELanguages.ru]: "Не удалось получить CP",
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
        [ELanguages.en]: ["You receive 10% of your referrals' CP spending"],
        [ELanguages.ru]: ["Вам начисляется 10% от трат СР ваших рефералов"],
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
