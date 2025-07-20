import React, { useEffect, useRef, useState } from "react";
import styles from "./InfluenceMap.module.scss";
import DragAndZoomProvider, {
  OffsetType,
} from "../../../../providers/DragAndZoomProvider";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { IHex } from "../../../../models/Influence/IHex";
import { attackHex, getMap } from "../../../../store/slices/influence/mapSlice";
import { useTooltip } from "../../../../hooks/useTooltip";
import { TRANSLATIONS } from "../../../../constants/TRANSLATIONS";
import Tooltip from "../../../layout/Tooltip/Tooltip";
import InfluenceMapControllModal from "../InfluenceMapControllModal/InfluenceMapControllModal";
import { getHexPixelPositions } from "../../../../utils/influence/getHexPixelPositions";
import { generateRandomColorsForHexOwners } from "../../../../utils/influence/generateRandomColorsForHexOwners";
import InfluenceMapBonusAreas from "../InfluenceMapBonusAreas/InfluenceMapBonusAreas";
import InfluenceMapHexVector from "../InfluenceMapHexVector/InfluenceMapHexVector";
import { findBonusAreaBorders } from "../../../../utils/influence/findBonusAreaBorders";

const COLOR_OPACITY = "0.44";

const {
  notEnoughActionPointsText,
  actionWillEnableInText,
  hexOccupiedText,
  hexAttackedText,
} = TRANSLATIONS.influence.map;
const { somethingWentWrong } = TRANSLATIONS.errors;

const HEX_SIZE = 24;

const InfluenceMap = () => {
  const dispatch = useAppDispatch();
  const gameInited = useAppSelector((state) => state.ui.gameInited);
  const language = useAppSelector((state) => state.ui.language);
  const tgId = useAppSelector((state) => state.profile.tgId);
  const mapId = useAppSelector((state) => state.influence.map.mapId);
  const hexes = useAppSelector((state) => state.influence.map.hexes);
  const nextAttackTs = useAppSelector(
    (state) => state.influence.map.nextAttackTs
  );
  const actionPoints = useAppSelector(
    (state) => state.influence.influence.actionPoints
  );
  const attackEnemyHexWithoutBuilding = useAppSelector(
    (state) => state.influence.settings.attackEnemyHexWithoutBuilding
  );
  const attackNeutralHex = useAppSelector(
    (state) => state.influence.settings.attackNeutralHex
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleHexes, setVisibleHexes] = useState<IHex[]>([]);
  const [offset, setOffset] = useState<OffsetType>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);
  const [tooltipText, setTooltipText] = useState(hexOccupiedText[language]);
  const { show: showTooltip, openTooltip } = useTooltip();

  const hexesWithBorders = findBonusAreaBorders(visibleHexes);

  const [ownerIdColors, setOwnerIdColors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    dispatch(getMap({ id: "1" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hexes && !Object.keys(ownerIdColors).length) {
      setOwnerIdColors(generateRandomColorsForHexOwners(hexes, COLOR_OPACITY));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hexes]);

  useEffect(() => {
    if (gameInited && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width + HEX_SIZE;
      const containerHeight = containerRect.height + HEX_SIZE;
      // Center the map so that (0,0) is in the center of the container
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      const visibleHexes = hexes.filter((hex) => {
        const { left, top } = getHexPixelPositions(
          { x: hex.x, z: hex.z },
          HEX_SIZE * scale
        );

        // Adjust so that (0,0) is at the center, then apply offset
        const screenLeft = left + offset.x + centerX;
        const screenTop = top + offset.y + centerY;

        return (
          screenLeft + HEX_SIZE * 2 > 0 &&
          screenLeft < containerWidth &&
          screenTop + HEX_SIZE * 2 > 0 &&
          screenTop < containerHeight
        );
      });
      setVisibleHexes(visibleHexes);
    }
  }, [gameInited, containerRef, hexes, scale, offset.x, offset.y]);

  const onAttack = async ({
    x,
    y,
    z,
    owner_id,
  }: {
    x: IHex["x"];
    y: IHex["y"];
    z: IHex["z"];
    owner_id: IHex["owner_id"];
  }) => {
    if (!mapId || owner_id === tgId) return;

    // check timer enable
    if (nextAttackTs && Date.now() < nextAttackTs) {
      setTooltipText(
        actionWillEnableInText[language].replace(
          "SECONDS",
          Math.ceil((nextAttackTs - Date.now()) / 1000).toString()
        )
      );
      openTooltip();
      return;
    }

    // check enough AP
    if (
      (owner_id &&
        actionPoints < attackEnemyHexWithoutBuilding.actionPointsCost) ||
      (!owner_id && actionPoints < attackNeutralHex.actionPointsCost)
    ) {
      setTooltipText(notEnoughActionPointsText[language]);
      openTooltip();
      return;
    }
    try {
      const res = await dispatch(attackHex({ x, y, z, mapId: mapId })).unwrap();

      setTooltipText(
        (res.captured ? hexOccupiedText : hexAttackedText)[language]
      );

      openTooltip();
    } catch (error) {
      setTooltipText(somethingWentWrong[language]);
      openTooltip();
    }
  };

  return (
    <div ref={containerRef} className={styles.influenceMap}>
      <InfluenceMapControllModal />
      <DragAndZoomProvider
        className={styles.influenceMap__inner}
        onUpdateEnd={(offset, scale) => {
          setOffset(offset);
          setScale(scale);
        }}
      >
        <InfluenceMapBonusAreas
          hexesWithBorders={hexesWithBorders}
          hexSize={HEX_SIZE}
        />
        {hexesWithBorders.map(
          ({ x, y, z, owner_id, ownerBorders, bonusAreaBorders }) => {
            const { left, top } = getHexPixelPositions({ x, z }, HEX_SIZE);
            const size = HEX_SIZE * 2;
            return (
              <button
                title={owner_id?.toString() || ""}
                onClick={() => onAttack({ x, y, z, owner_id })}
                key={`${x},${y},${z}`}
                className={styles.influenceMap__hex}
                style={{
                  left,
                  top,
                  width: size,
                  height: size,
                }}
              >
                <div
                  style={{
                    backgroundColor: owner_id
                      ? owner_id === tgId
                        ? "#0F9E604D"
                        : ownerIdColors[owner_id]
                      : undefined,
                  }}
                  className={`${styles.influenceMap__hexInner} ${
                    x % 2 ? styles.influenceMap__hexInner_rotated : ""
                  }`}
                ></div>

                <InfluenceMapHexVector
                  className={styles.influenceMap__bonusAreaStroke}
                  stroke={(isBorder) => (isBorder ? "#7F5CFF" : "transparent")}
                  strokeDash={(isBorder) => (isBorder ? "6,4" : undefined)}
                  borders={bonusAreaBorders}
                  size={size}
                />
                <InfluenceMapHexVector
                  className={styles.influenceMap__ownerAreaStroke}
                  stroke={(isBorder) =>
                    isBorder && owner_id
                      ? owner_id === tgId
                        ? "#0f9e60"
                        : ownerIdColors[owner_id]?.replace(COLOR_OPACITY, "1")
                      : "transparent"
                  }
                  borders={ownerBorders}
                  size={size}
                />
              </button>
            );
          }
        )}
        {/* <div className={styles.influenceMap__hex}></div> */}
      </DragAndZoomProvider>
      <Tooltip show={showTooltip} text={tooltipText} />
    </div>
  );
};

export default InfluenceMap;
