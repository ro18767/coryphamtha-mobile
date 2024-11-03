import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { popupMap } from "./popupMap";

type PopupContextType = {
  popupComponentName: React.MutableRefObject<keyof typeof popupMap | null>;
  popupData: any | null;
  setPopupData: Dispatch<SetStateAction<any | null>>;
  popupVisible: boolean;
  setPopupVisible: Dispatch<SetStateAction<boolean>>;
};

const PopupContext = createContext<PopupContextType | null>(null);

export const usePopupContext = () => useContext(PopupContext);

const PopupProvider = ({ children }: { children: any }) => {
  const popupComponentName = useRef<keyof typeof popupMap | null>(null);
  const [popupData, setPopupData] = useState<any | null>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  return (
    <PopupContext.Provider
      value={{
        popupComponentName,
        popupData,
        setPopupData,
        popupVisible,
        setPopupVisible,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
