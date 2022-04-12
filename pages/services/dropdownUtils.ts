import {ProductRawData} from '../types/appTypes';
import {GlobalContext} from "../context/context";

/**
 * Toggle On Dropdown - Unit Type
 * @param product The product it is belonged to.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Global Context
 */
export const toggleOnDropdownUnitType = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: (globalContext: GlobalContext) => void) {
    product.dropdownOpenState = true;                         // Unit Type <Dropdown>
    setGlobalContext({ ...globalContext });
}

/**
 * Toggle On Dropdown - Comment Type
 * @param product The product it is belonged to.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Global Context
 */
export const toggleOnDropdownCommentType = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: (globalContext: GlobalContext) => void) {
    if(product.commentType){
        product.commentType.dropdownOpenStateCommentType = true;  // Comment Type <Dropdown>
        setGlobalContext({ ...globalContext });
    }
}

/**
 * Toggle Off Dropdown
 * @param product The product it is belonged to.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Global Context
 */
export const toggleOffDropdown = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: (globalContext: GlobalContext) => void) {
    product.dropdownOpenState = false;                             // Unit Type <Dropdown>
    if(product.commentType){
        product.commentType.dropdownOpenStateCommentType = false;  // Comment Type <Dropdown>
    }
    setGlobalContext({ ...globalContext });
}

/**
 * Set selected Unit Type.
 * @param product product to update.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Global Context
 * @param unitType Unit Type (string).
 */
export const onChangeDropdownUnitType = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: (globalContext: GlobalContext) => void, unitType: string) {
    const previousUnitType = product.selectedUnitType; // Previous Selected Unit Type
    product.selectedUnitType = unitType;               // Newer Selected Unit Type

    if(product.cart > 0 && product.selectedUnitType !== previousUnitType){
        const sellingUnitIndex = product.productSellingUnits.findIndex(function(unit){ // find selected unit type index
            return unit.sellingUnit.name === product.selectedUnitType;
        });
         // extract unit jump amount
        product.cart = product.productSellingUnits[sellingUnitIndex].sellingUnit.amountJumps; // reset amount according to unit amount jump
    }

    setGlobalContext({ ...globalContext });

    toggleOffDropdown(product, globalContext, setGlobalContext);
}

/**
 * Set selected Comment type.
 * @param product The product it is belonged to.
 * @param commentType Comment type (string).
 * @param globalContext Global Context
 * @param setGlobalContext for updating Global Context
 */
export const onChangeDropdownCommentType = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: (globalContext: GlobalContext) => void, commentType: string) {
    product.commentType.selectedCommentType = commentType;
    setGlobalContext({ ...globalContext });
    toggleOffDropdown(product, globalContext, setGlobalContext);
}


