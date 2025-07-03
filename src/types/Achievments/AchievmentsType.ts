export type AchievmentsType<T extends string> = {
  [key in T]?: {
    count: number;
    level: number;
  };
};
