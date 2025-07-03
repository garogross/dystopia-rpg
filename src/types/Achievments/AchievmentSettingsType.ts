export type AchievmentSettingsType<T extends string> = {
  [key in T]: {
    desc: string;
    levels: number[];
    reward_per_level_hours: number;
  };
};
