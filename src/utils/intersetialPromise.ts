export function interstitialPromise(
  showInterstitial: () => Promise<any>,
  timeoutMs: number = 4000
): Promise<any> {
  let timeoutId: NodeJS.Timeout | number | undefined;
  let resolved = false;

  return new Promise<any>((resolve, reject) => {
    timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        reject(
          new Error(
            `No response from interstitial after ${timeoutMs / 1000} seconds`
          )
        );
      }
    }, timeoutMs);

    showInterstitial()
      .then((success: any) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeoutId);
          resolve(success);
        }
      })
      .catch((err: any) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeoutId);
          reject(err);
        }
      });
  });
}
