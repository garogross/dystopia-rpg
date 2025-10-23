export async function getUserIp(): Promise<string | null> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip as string;
  } catch (error) {
    console.error("Failed to get user IP:", error);
    return null;
  }
}
