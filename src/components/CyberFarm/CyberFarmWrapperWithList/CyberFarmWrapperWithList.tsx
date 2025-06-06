import React from "react";

import styles from "./CyberFarmWrapperWithList.module.scss";
import { HeaderWings } from "../../layout/icons/RPGGame/Common";
import { IFarmField } from "../../../models/IFarmField";
import ImageWebp from "../../layout/ImageWebp/ImageWebp";
import {
  cyberFarmEmptyFieldImage,
  cyberFarmEmptyFieldImageWebp,
  cyberFarmFactoryImage,
  cyberFarmFactoryImageWebp,
} from "../../../assets/imageMaps";
import { plantImages } from "../../../constants/cyberfarm/plantImages";
import { IWarehouseProduct } from "../../../models/IWarehouseProduct";
import { productImages } from "../../../constants/cyberfarm/productImages";
import {
  Blockedicon,
  Completedicon,
  InProgressIcon,
} from "../../layout/icons/CyberFarm/CyberFarmWrapperWithList";

interface Props {
  title: string;
  data: IFarmField[] | IWarehouseProduct[];
  isWarehouse?: boolean;
}

const CyberFarmWrapperWithList: React.FC<Props> = ({
  title,
  data,
  isWarehouse,
}) => {
  return (
    <section className={styles.cyberFarmWrapperWithList}>
      <div className={styles.cyberFarmWrapperWithList__header}>
        <div className={styles.cyberFarmWrapperWithList__headerWings}>
          <HeaderWings />
        </div>
        <h2 className={styles.cyberFarmWrapperWithList__titleText}>{title}</h2>
      </div>
      <div
        className={`${styles.cyberFarmWrapperWithList__main} ${
          isWarehouse ? styles.cyberFarmWrapperWithList__main_warehouse : ""
        }`}
      >
        {data.map((field) => {
          let curImage = {
            src: cyberFarmEmptyFieldImage,
            srcSet: cyberFarmEmptyFieldImageWebp,
          };

          let progressPercent =
            !("count" in field) && field.process
              ? ((Date.now() - new Date(field.process.startDate).getTime()) /
                  (new Date(field.process.endDate).getTime() -
                    new Date(field.process.startDate).getTime())) *
                100
              : null;
          if (progressPercent && progressPercent > 100) progressPercent = 100;

          if ("count" in field) {
            // check if IWarehouseProduct
            curImage = productImages[field.product];
          } else if (field.type === "factory") {
            curImage = {
              src: cyberFarmFactoryImage,
              srcSet: cyberFarmFactoryImageWebp,
            };
          } else if (field.plant) {
            curImage =
              plantImages[field.plant][
                field.type === "farm" ? "inFarm" : "onField"
              ];
          }

          return (
            <div
              key={field.id}
              className={styles.cyberFarmWrapperWithList__item}
            >
              <ImageWebp
                src={curImage.src}
                alt={field.type}
                className={styles.cyberFarmWrapperWithList__itemImg}
                pictureClass={styles.cyberFarmWrapperWithList__itemPicture}
                srcSet={curImage.srcSet}
              />
              {"count" in field ? (
                <span className={styles.cyberFarmWrapperWithList__itemCount}>
                  {field.count}
                </span>
              ) : (
                <>
                  {field.process && (
                    <>
                      <div
                        className={styles.cyberFarmWrapperWithList__itemStatus}
                      >
                        {progressPercent === 100 ? (
                          <Completedicon />
                        ) : (
                          <InProgressIcon />
                        )}
                      </div>
                      <div
                        className={
                          styles.cyberFarmWrapperWithList__itemProgress
                        }
                      >
                        <div
                          style={{ width: `${progressPercent}%` }}
                          className={
                            styles.cyberFarmWrapperWithList__itemProgressInner
                          }
                        ></div>
                      </div>
                    </>
                  )}
                  {field.blocked && (
                    <div
                      className={
                        styles.cyberFarmWrapperWithList__itemBlockOverlay
                      }
                    >
                      <Blockedicon />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CyberFarmWrapperWithList;
