import {
  ReactNode,
  useState,
  createContext,
  useContext,
  SetStateAction,
} from 'react';

export type GlobalButtonContextProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const BottomTabsContext = createContext<GlobalButtonContextProps | null>(
  null,
);

const BottomTabsProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomTabsContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </BottomTabsContext.Provider>
  );
};

export const useBottomTabsContext = () => {
  const context = useContext(BottomTabsContext);

  if (!context) {
    throw new Error(
      'BottomTabsProvider must be used within BottomTabsProvider',
    );
  }

  return context;
};

export default BottomTabsProvider;
