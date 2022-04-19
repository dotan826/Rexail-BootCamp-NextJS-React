import type {AppProps} from 'next/app';
import App from 'next/app';
import {WebProps} from './types/appTypes';
import {fetchStoreDetails, fetchCatalog, sortCatalog} from './services/initServerCalls';
import "../styles/style.css";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './Redux/Reducers/index';
import {InitialStoreState} from "./Redux/reduxTypes";
import {useMemo} from "react";

function MyApp({Component, pageProps}: AppProps) {

    // Will Always create the store and keep the same reference
    const store = useMemo(()=>{
        const initialStoreStateObject: InitialStoreState = {
            storeData: (pageProps as WebProps).storeDataResponse,
            catalogData: (pageProps as WebProps).catalogDataResponse,
            categoriesWithProductsList: (pageProps as WebProps).categoriesWithProductsListSorted,
            cart: [],
            cartSum: 0,
            searchValue: "",
            preparationNotes: ""
        }

        // const store = createStore(storeReducer, initialStoreStateObject);
        return createStore(rootReducer, {storeReducer: initialStoreStateObject});

    }, []);

    // Per-Page Props (pages initialization)
    pageProps = {
        ...pageProps,
    }

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}


MyApp.getInitialProps = async function (appContext: any) {

    let pagePropsValues = {};

    if (typeof window === "undefined") { // RUN ONLY ON SERVER (First Load)

        const storeData = await fetchStoreDetails();
        const storeCatalog = await fetchCatalog(storeData.jsonWebEncryption);
        const catalogSorted = await sortCatalog(await storeCatalog);

        pagePropsValues = {
            storeDataResponse: storeData,
            catalogDataResponse: storeCatalog,
            categoriesWithProductsListSorted: catalogSorted,
            isServer: true
        }

    } else { // RUN ONLY ON CLIENT (Every Other Load)

        pagePropsValues = {
            isServer: false
        };

    }

    const initialProps = await App.getInitialProps(appContext);

    return {pageProps: pagePropsValues, ...initialProps.pageProps};
}

export default MyApp;



