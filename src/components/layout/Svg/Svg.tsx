import React, {FC} from 'react'
import {svgSprite} from "../../../assets/svgSprite";

interface SvgProps {
    className?: string,
    id: SvgId
}

export type SvgId = keyof ReturnType<typeof svgSprite>

const Svg: FC<SvgProps> = ({className, id}) => {
    return (
        <>{svgSprite(className)[id]}</>
    )
}

export default Svg