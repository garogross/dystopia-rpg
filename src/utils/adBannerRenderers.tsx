import { initOnClicka } from "./onClicka";


export const adBannerRenderers =  {
    onclicka: {
        init: (id: string) => initOnClicka(id),
        render: (id: string) => <div data-banner-id={id}></div>,
      },
}