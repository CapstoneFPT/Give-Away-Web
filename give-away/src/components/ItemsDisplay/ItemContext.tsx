import React, { createContext, useState, ReactNode } from 'react';

interface ItemContextProps {
  selectedItemId: number | null;
  setSelectedItemId: (id: number | null) => void;
}

export const ItemContext = createContext<ItemContextProps>({
  selectedItemId: null,
  setSelectedItemId: () => {},
});

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  return (
    <ItemContext.Provider value={{ selectedItemId, setSelectedItemId }}>
      {children}
    </ItemContext.Provider>
  );
};
