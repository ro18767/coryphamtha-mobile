import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PopoverContextType = {
  popoverComponentRef: React.MutableRefObject<React.FunctionComponent<{
    data: any;
  }> | null>;
  popoverData: any | null;
  setPopoverData: Dispatch<SetStateAction<any | null>>;
  popoverVisible: boolean;
  setPopoverVisible: Dispatch<SetStateAction<boolean>>;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopoverContext = () => useContext(PopoverContext);

const PopoverProvider = ({ children }: { children: any }) => {
  useRef;
  const popoverComponentRef = useRef<React.FunctionComponent<{
    data: any;
  }> | null>(null);
  const [popoverData, setPopoverData] = useState<any | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

  return (
    <PopoverContext.Provider
      value={{
        popoverComponentRef,
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
