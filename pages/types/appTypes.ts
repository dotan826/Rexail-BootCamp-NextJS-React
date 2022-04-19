import {GlobalContext} from "../context/context";

/**
 * Store Raw Data (From Server)
 */
export interface StoreRawData {
    name:                            string;
    businessAddressFormatted:        string;
    businessEmail:                   string;
    businessPhone:                   string;
    store:                           Store;
    domain:                          string;
    jsonWebEncryption:               string;
    captchaType:                     null;
    themeJson:                       string;
    logoPath:                        null;
    favoriteIconPath:                null;
    coverDesktopImagePath:           null;
    coverMobileImagePath:            null;
    genericProductsDefaultImagePath: null;
    mainCategoryMobileLogoPath:      null;
    facebookLink:                    string;
    descriptionForCustomers:         string;
    promotionalText:                 string;
    externalWebTrackingAccounts:     string;
    banners:                         any[];
    contentPages:                    ContentPage[];
    metadataJson:                    string;
    settingsJson:                    string;
    updateDate:                      number;
}

export interface ContentPage {
    name:      string;
    type:      string;
    published: boolean;
    id:        string;
}

export interface Store {
    id:                                    number;
    name:                                  string;
    businessEmail:                         string;
    businessNumber:                        string;
    businessPhone:                         string;
    businessFullAddressWithCity:           string;
    addressCoordinates:                    string;
    worksWithStoreCoupons:                 boolean;
    performSellingUnitsEstimationLearning: boolean;
}


/**
 * Product Raw Data (From Server)
 */
export interface ProductRawData {
    id:                           number;
    obfuscatedId:                 string;
    fullName:                     string;
    product:                      Product;
    productCategory:              ProductCategory;
    soldByWeight:                 boolean;
    productQuality:               ProductQuality;
    imageUrl:                     null;
    storeProductSellingUnitsJson: null;
    productSellingUnits:          ProductSellingUnit[];
    bagOfProducts:                boolean;
    bagOfProductsJson:            null;
    genericProduct:               boolean;
    price:                        number;
    originalPrice:                null;
    supplier:                     null;
    supplierDisplayedToClients:   boolean;
    promoted:                     boolean;
    secondaryName:                string;
    productExtraDetails:          string;
    currentRelevancy:             CurrentRelevancy;
    currentRelevancyFreeText:     null;
    localizationJson:             null;
    commentType:                  CommentType;
    metadataJson:                 null;
    cart:                         number;
    unitType:                     string[];
    selectedUnitType:             string;
    dropdownOpenState:            boolean;
    $$hashKey:                    string;

}

export interface CurrentRelevancy {
    name: string;
}

export interface CommentType {
    name:                         string;
    comments:                     Comment[];
    id:                           string;
    selectedCommentType:          string;
    dropdownOpenStateCommentType: boolean;
}

export interface Comment {
    name: string;
    id:   string;
}

export interface Product {
    id:                  number;
    name:                string;
    sortOrder:           number;
    primaryQuantityUnit: null;
    defaultSellingUnit:  null;
}

export interface ProductCategory {
    id:                  number;
    name:                string;
    sortOrder:           number;
    parent:              null;
    mediaFilePath:       string;
    mobileMediaFilePath: string;
    metadataJson:        string;
}

export interface ProductQuality {
    id:             number;
    name:           string;
    displayQuality: boolean;
    imagePath:      string;
}

export interface ProductSellingUnit {
    id:                  number;
    sellingUnit:         SellingUnit;
    maxAmount:           number;
    estimatedUnitWeight: null;
    $$hashKey:           string;
}

export interface SellingUnit {
    id:          number;
    name:        string;
    sortOrder:   number;
    amountJumps: number;
}


/**
 * General Web Site Props (props)
 */
export interface WebProps {
    storeDataResponse?: any;
    catalogDataResponse?: any;
    categoriesWithProductsListSorted?: any;
    isServer?: boolean;
}

/**
 * Main Page Props
 */
export interface MainPageProps {

}

/**
 * Cart Page Props
 */
export interface CartPageProps {

}

/**
 * Checkout Page Props
 */
export interface CheckoutPageProps {

}

/**
 * Product Card Props
 */
export interface ProductCardProps {
    product: ProductRawData;
}

/**
 * Small Cart Row Props
 */
export interface SmallCartRowProps {
    product: ProductRawData;
}

/**
 * Big Cart Row Props
 */
export interface BigCartRowProps {
    product: ProductRawData;
}

/**
 * Small Header Props
 */
export interface SmallHeaderProps {
    mainPage?: boolean;
    cartPage?: boolean;
    checkoutPage?: boolean;
}







