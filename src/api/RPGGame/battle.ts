import { IBattle } from "../../models/IBattle";
import { ICharacter } from "../../models/ICharacter";
import { fetchRequest } from "../../store/tools/fetchTools";

type ActivateBattleResponse = Omit<IBattle, "type" | "location">;

const activateBattleUrl = "/activate_battle";

const configureBattle = (data: IBattle["fighters"]) => {
  const addIdToCharacters = (team: typeof data.team1) =>
    Object.fromEntries(
      Object.entries(team).map(([key, value]) => [
        key,
        {
          ...value,
          id: key,
        },
      ])
    );

  return {
    fighters: {
      team1: addIdToCharacters(data.team1),
      team2: addIdToCharacters(data.team2),
    },
  };
};

export const activateBattle = async (
  type: IBattle["type"],
  location: IBattle["location"]
) => {
  const data = await fetchRequest<ActivateBattleResponse>(
    activateBattleUrl,
    "POST",
    {
      type,
      location,
    }
  );

  const configuredBattle: IBattle = {
    ...data,
    ...configureBattle(data.fighters),
    type,
    location,
  };

  return configuredBattle;
};

const updateBattleSettingsUrl = "/battle_settings";

export const updateBattleSettings = async (
  battle_id: IBattle["battle_id"],
  line: ICharacter["line"],
  target_id: ICharacter["target_id"],
  hit_zone: ICharacter["hit_zone"],
  defend_zone: ICharacter["defend_zone"]
) => {
  const data = await fetchRequest<ActivateBattleResponse>(
    updateBattleSettingsUrl,
    "POST",
    {
      battle_id,
      line,
      target_id,
      hit_zone,
      defend_zone,
    }
  );

  const configuredBattle = configureBattle(data.fighters);

  return { ...data, ...configuredBattle };
};

const startBattleFightsUrl = "/battle_fight";

export const startBattleFight = async (battle_id: IBattle["battle_id"]) => {
  const data = await fetchRequest<
    IBattle["fighters"] & { battle_log: IBattle["battle_log"] }
  >(startBattleFightsUrl, "POST", {
    battle_id,
  });

  const configuredBattle = configureBattle(data);

  return { ...configuredBattle, battle_log: data.battle_log };
};
