import { DYSTOPIA_GAME_MEDIA_BASE_PATH } from "./splash";

export const postLog = (body: Record<string, any>) => {
  fetch(`${DYSTOPIA_GAME_MEDIA_BASE_PATH}/log-error`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, date: new Date() }),
  });
};
