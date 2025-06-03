import { Game } from "../canvasModels/Game";
import { PositionLine } from "../canvasModels/PositionLine";
import { IBattle } from "../models/IBattle";
import { IBattleAction } from "../models/IBattleAction";
import { getCharacterModel } from "./getCharacterModel";

type AddCharactersToPlacesArg = Parameters<
  PositionLine["addCharactersToPlaces"]
>[0];

export const generateOrder = (
  orderInitials: IBattleAction[] | IBattle["battle_log"]["turn_order"],
  fighters: IBattle["fighters"],
  tgId: string | number
) => {
  if (!orderInitials) return [];

  const allFighters = { ...fighters.team1, ...fighters.team2 };

  return orderInitials.map((action) => {
    let id: string;
    if ("attacker_id" in action) {
      id = action.attacker_id;
    } else if ("id" in action) {
      id = action.id;
    } else {
      id = "";
    }
    return {
      ...allFighters[id],
      owned: id === tgId.toString(),
    };
  });
};

export const generateGameCharactersArr = (
  characters: IBattle["fighters"]["team1"],
  tgId: string | number
) => {
  return Object.keys(characters).reduce((acc, cur, index) => {
    const lineIndex = Math.floor(index / 3);
    const placeIndex = index % 3;
    if (!acc[lineIndex]) acc[lineIndex] = [];

    const char = characters[cur];
    const model = getCharacterModel(char.modelId, !!char.mob_name);
    acc[lineIndex][placeIndex] = {
      uuid: cur,
      index: placeIndex,
      image: model.modelAsset,
      type: model.type,
      owned: cur === tgId.toString(),
      death: !char.battle_parameters.max_hp,
    };
    return acc;
  }, [] as AddCharactersToPlacesArg[]);
};

export const checkLooserTeam = (battle: IBattle, game: Game) => {
  const checkTeamHps = (team: keyof IBattle["fighters"]) => {
    const teamChars = Object.values(battle.fighters[team]);
    const looserChars = teamChars.filter(
      (char) => !char.battle_parameters.max_hp
    );

    looserChars.forEach((looserChar) => {
      if (looserChar?.id) {
        game?.death(looserChar.id);
      }
    });

    return looserChars.length === teamChars.length;
  };

  return [checkTeamHps("team1"), checkTeamHps("team2")];
};
