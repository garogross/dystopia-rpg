export enum EMediationStatuses {
  AdAvailable = "ad_available", // есть доступная реклама для показа
  SlotCooldown = "slot_cooldown", // слот на кулдауне, реклама недоступна
  SlotLimit = "slot_limit", // достигнут лимит показов в слоте
  AdLimit = "ad_limit", // лимит по конкретной рекламе, подробности в ads_limit_info
  Inactive = "inactive", // слот неактивен
  NoAds = "no_ads", // нет доступной рекламы
}
