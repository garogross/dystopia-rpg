const TESTER_IDS =
  process.env.REACT_TESTER_IDS?.split(",").map((id) => Number(id)) || [];

export const checkTesterAccount = (tgid: number | string) => {
  return TESTER_IDS.includes(+tgid);
};
