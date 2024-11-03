import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { popoverMap } from "./popoverMap";

type PopoverContextType = {
  popoverComponentName: React.MutableRefObject<keyof typeof popoverMap | null>;
  popoverData: any | null;
  setPopoverData: Dispatch<SetStateAction<any | null>>;
  popoverVisible: boolean;
  setPopoverVisible: Dispatch<SetStateAction<boolean>>;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopoverContext = () => useContext(PopoverContext);

const PopoverProvider = ({ children }: { children: any }) => {
  useRef;
  const popoverComponentName = useRef<keyof typeof popoverMap | null>(null);
  const [popoverData, setPopoverData] = useState<any | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

  return (
    <PopoverContext.Provider
      value={{
        popoverComponentName,
        popoverData,
        setPopoverData,
        popoverVisible,
        setPopoverVisible,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

export default PopoverProvider;
