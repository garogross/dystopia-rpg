interface RewardClaim {
  rewardId: string | number;
  userId: string;
  projectId: string | number;
  hash: string;
  amount: number;
  description?: string;
}

export const useOfferwallSdk = () => {
  return () => {
    const gigapubProjectId = process.env.REACT_APP_GIGAPUB_PROJECT_ID;

    if (!gigapubProjectId) return;

    (window.loadGigaSDKCallbacks || (window.loadGigaSDKCallbacks = [])).push(
      () => {
        (window.loadOfferWallSDK as any)({
          projectId: gigapubProjectId,
        })
          .then((sdk: typeof window.gigaOfferWallSDK) => {
            console.log({ sdk });

            if (!sdk) return;
            // Save SDK reference
            window.gigaOfferWallSDK = sdk;

            // Listen for reward claims
            sdk.on("rewardClaim", async (data: RewardClaim) => {
              console.log("Reward claim received:", data);

              // Process reward with your backend
              const confirmationHash = "HASH"; // await verifyWithYourBackend(data);

              // Confirm the reward
              if (confirmationHash) {
                sdk.confirmReward(data.rewardId, confirmationHash);
              }
            });
          })
          .catch((error: Error) => {
            console.error("Error loading SDK:", error);
          });
      }
    );
  };
};
