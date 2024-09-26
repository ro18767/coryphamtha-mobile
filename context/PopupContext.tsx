import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PopupContextType = {
  popupComponentRef: React.MutableRefObject<React.FunctionComponent<{
    data: any;
  }> | null>;
  popupData: any | null;
  setPopupData: Dispatch<SetStateAction<any | null>>;
  popupVisible: boolean;
  setPopupVisible: Dispatch<SetStateAction<boolean>>;
};

const PopupContext = createContext<PopupContextType | null>(null);

export const usePopupContext = () => useContext(PopupContext);

const PopupProvider = ({ children }: { children: any }) => {
  useRef;
  const popupComponentRef = useRef<React.FunctionComponent<{
    data: any;
  }> | null>(null);
  const [popupData, setPopupData] = useState<any | null>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  return (
    <PopupContext.Provider
      value={{
        popupComponentRef,
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
