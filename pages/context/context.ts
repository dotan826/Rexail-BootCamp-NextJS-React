import { createContext } from "react";
import { StoreRawData, ProductRawData } from '../types/appTypes';

export interface GlobalContext {
    storeData: StoreRawData;
    catalogData: ProductRawData[];
    categoriesWithProductsList: [];
    cart: ProductRawData[];
    cartSum: number;
    searchValue: string;
    preparationNotes: string;
}

export interface GlobalContextType {
    globalContext: GlobalContext;
    setGlobalContext: (globalContext: GlobalContext) => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);


