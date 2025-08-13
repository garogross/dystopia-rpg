import React, { useEffect } from "react";

const BARZHA_WIDGET_ID = 70;

const LoyalitySupportProjectAdMasterWidget = () => {
  useEffect(() => {
    try {
      const onAdsNotFound = (error: unknown) => {
        console.error("Объявления не найдены:", error);
      };

      if (typeof AdMaster !== "undefined") {
        const widgetInstance = new AdMaster(BARZHA_WIDGET_ID, {
          onAdsNotFound: onAdsNotFound,
        });

        widgetInstance.initWidget();
      } else {
        console.error("AdMaster SDK не загружен");
      }
    } catch (error) {}
  }, []);

  return <div id={`widget-id-${BARZHA_WIDGET_ID}`} />;
};

export default LoyalitySupportProjectAdMasterWidget;
