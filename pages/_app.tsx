import type { AppProps } from 'next/app';
import App from 'next/app';
import { useState } from 'react';
import { GlobalContext, GlobalContextType } from './context/context';

import { WebProps } from './types/appTypes';

import { fetchStoreDetails, fetchCatalog, sortCatalog } from './services/initServerCalls';

import "../styles/style.css";

function MyApp({ Component, pageProps }: AppProps) {

  const [globalContext, setGlobalContext] = useState<GlobalContext>({
    storeData: (pageProps as WebProps).storeDataResponse,
    catalogData: (pageProps as WebProps).catalogDataResponse,
    categoriesWithProductsList: (pageProps as WebProps).categoriesWithProductsListSorted,
    cart: [],
    cartSum: 0,
    searchValue: "",
    preparationNotes: ""
  });

  // Context Provider Value Object
  const globalContextValues: GlobalContextType = {
    globalContext: globalContext,
    setGlobalContext: setGlobalContext
  }

  // Per-Page Props (pages initialization)
  pageProps = {
    ...pageProps,
  }

  return (
      <GlobalContext.Provider value={globalContextValues}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
  );
}






MyApp.getInitialProps = async function (appContext: any) {

  let pagePropsValues = {};

  if(typeof window === "undefined"){ // RUN ONLY ON SERVER (First Load)

    const storeData = await fetchStoreDetails();
    const storeCatalog = await fetchCatalog(storeData.jsonWebEncryption);
    const catalogSorted = await sortCatalog(await storeCatalog);

    pagePropsValues = {
      storeDataResponse: storeData,
      catalogDataResponse: storeCatalog,
      categoriesWithProductsListSorted: catalogSorted
    }

  }
  else{ // RUN ONLY ON CLIENT (Every Other Load)


  }

  const initialProps = await App.getInitialProps(appContext);

  return { pageProps: pagePropsValues , ...initialProps.pageProps };
}

export default MyApp;



