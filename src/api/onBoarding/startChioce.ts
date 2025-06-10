import { fetchRequest } from "../../store/tools/fetchTools";
import { AppGameMode } from "../../types/AppGameMode";

const setStartChoiceUrl = "/set_start_choice"
export const setStartChoice = async (
    start_choice: AppGameMode
  ) => {
    await fetchRequest(
        setStartChoiceUrl,
      "POST",
      {
        start_choice
      }
    );
  };