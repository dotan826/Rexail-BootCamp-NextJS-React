
const baseURL = "https://test.rexail.co.il";

/**
 * Fetch Store Details
 */
export const fetchStoreDetails = async function() {
    let storeDateURL = "/client/public/store/website?domain=testeitan.rexail.co.il";

    const res = await fetch(baseURL + storeDateURL);
    const resJSON = await res.json();
    return resJSON.data;
}

/**
 * Fetch Store Catalog
 * @param jsonWebEncryption Serial Number for store products
 */
export const fetchCatalog = async function(jsonWebEncryption: string) {
    let catalogURL = `/client/public/store/catalog?s_jwe=${jsonWebEncryption}`;

    const res = await fetch(baseURL + catalogURL);
    const resJSON = await res.json();
    return resJSON.data;
}

/**
 * Sort Catalog Categories + Products
 * @param catalogData Catalog Data from server
 */
export const sortCatalog = async function sortCatalog(catalogData: any) {
    const categories = new Map();
    for(let i=0; i<catalogData.length; i++){

        // Adds Special Properties
        catalogData[i].cart = 0; // reset sum of product in cart
        catalogData[i].unitType = ["ק״ג", "יחידה", "מארז"];
        catalogData[i].selectedUnitType = catalogData[i].productSellingUnits[0].sellingUnit.name;
        catalogData[i].dropdownOpenState = false;
        if(catalogData[i].commentType){ // if product has comments type then initialize select
            catalogData[i].commentType.selectedCommentType = catalogData[i].commentType.name;
            catalogData[i].commentType.dropdownOpenStateCommentType = false;
        }

        const categoryName = catalogData[i].productCategory.name;

        if(categories.has(categoryName)){
            const productsList = categories.get(categoryName); // get
            productsList.push(catalogData[i]);                 // push
            categories.set(categoryName, productsList);        // set
        }
        else{
            categories.set(categoryName, [catalogData[i]]);    // create new
        }
    }

    return Array.from(categories);
}



