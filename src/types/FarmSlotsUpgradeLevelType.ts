export type FarmSlotsUpgradeLevelType = {
  [key in string]: {
    // key = "1","2",...
    bonus: number;
    upgrade_cost_farm: number;
    upgrade_cost_factory: number;
  };
};
