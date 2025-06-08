import { CHARACTER_MODELS } from "../constants/rpgGame/characterModels";

export const getCharacterModel = (id: string | undefined, isNpc?: boolean) => {
  const curModel = CHARACTER_MODELS.find((model) => model.id === id);
  if (curModel) return curModel;
  else {
    const defaultModel = CHARACTER_MODELS.find(
      (model) => !!model.npc === !!isNpc
    );
    return defaultModel!;
  }
};
