import React, {FC, memo, ReactNode} from 'react';

import styles from "./MainBtn.module.scss"

interface Props extends React.ButtonHTMLAttributes<any> {
    className?: string,
    children: ReactNode
    negative?: boolean
}

const MainBtn: FC<Props> = memo(({className, children,negative, ...properties}) => {
    return (
        <button
            className={`${styles.mainBtn} ${negative ? styles.mainBtn_negative : ""} ${className ? className : ''}`}
            {...properties}
        >{children}</button>
    );
})

export default MainBtn;