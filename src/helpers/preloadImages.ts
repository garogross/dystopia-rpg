export const preloadImages = (imageArray: string[]) => {
    return Promise.all(
        imageArray.map(
            (src) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = reject;
                })
        )
    );
};