import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface NewPortalProviderProps {
  id?: string;
  children: ReactNode;
}

const NewPortalProvider: FC<NewPortalProviderProps> = (props) => {
  const portalId = props.id ? props.id : "modals";
  return createPortal(
    props.children,
    document.getElementById(portalId) as Element
  );
};

export default NewPortalProvider;