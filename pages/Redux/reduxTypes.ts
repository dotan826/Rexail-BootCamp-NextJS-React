import { ProductRawData, StoreRawData } from "../types/appTypes";

export interface InitialStoreState {
    storeData: StoreRawData;
    catalogData: ProductRawData[];
    categoriesWithProductsList: [any, any][];
    cart: ProductRawData[];
    cartSum: number;
    searchValue: string;
    preparationNotes: string;
}

export interface RootReducer {
    storeReducer: InitialStoreState
}

export interface Action {
    type: string;
    payload?: Payload;
}

export interface Payload {
    searchValue?: string;
    preparationNotes?: string;
    product?: ProductRawData;
    unitType?: string;
    commentType?: string;
}
