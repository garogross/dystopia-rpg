export type FarmSlotsUpgradeLevelType = {
  [key in string]: {
    bonus: number;
    upgrade_cost_farm: number;
    upgrade_cost_factory: number;
  };
};
