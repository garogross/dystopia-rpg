import React, {FC} from 'react';

interface ImageWebpProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    srcSet: string;
    src: string;
    pictureClass?: string;
    forwardedRef?: React.Ref<HTMLImageElement>;
    alt: string;
}

const ImageWebp: FC<ImageWebpProps> = ({srcSet,pictureClass,forwardedRef,alt,...properties}) =>  {
    return (
        <picture className={pictureClass ? pictureClass : ''} style={{display: "flex"}}>
            <source srcSet={srcSet} type="image/webp"/>
            <img
                alt={alt}
                ref={forwardedRef}
                loading="eager"
                {...properties}
            />
        </picture>
    );
}

export default ImageWebp;