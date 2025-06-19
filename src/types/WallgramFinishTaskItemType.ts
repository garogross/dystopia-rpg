export type WallgramFinishTaskItemType = {
  data: {
    telegramId: number;
    taskId: string;
    rewards: [
      {
        name: string;
        value: number;
      }
    ];
  };
  hash: string;
};
