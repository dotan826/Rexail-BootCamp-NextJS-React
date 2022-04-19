import { InitialStoreState, Action } from '../reduxTypes';
import { Reducer } from 'redux';
import {ProductRawData} from "../../types/appTypes";

const storeReducer: Reducer = function (state: any ={} , action: Action) {
    const storeState: InitialStoreState = state;

    switch (action.type) {
        case "UPDATE_SEARCH_INPUT":
            return { ...storeState, searchValue: action.payload?.searchValue };

        case "RESET_SEARCH_INPUT":
            return { ...storeState, searchValue: "" };

        case "UPDATE_PREPARATION_NOTES":
            return { ...storeState, preparationNotes: action.payload?.preparationNotes };

        case "EMPTY_CART":
            for(let i=storeState.cart.length-1; i>=0; i--){ // reset each product in the cart + pop out !
                storeState.cart[i].cart = 0;
                storeState.cart.pop();
            }
            return { ...storeState, cartSum: 0, cart: [] };

        case "ADD_PRODUCT_TO_CART":
            if(action.payload?.product){
                const product: ProductRawData = action.payload?.product;

                // return [index] if product exist in cart - otherwise return [-1]
                const productIndex = storeState.cart.findIndex(function (item) {
                    return item.id === product.id;
                });

                // find selected unit type index
                const sellingUnitIndex = product.productSellingUnits.findIndex(function(unit){
                    return unit.sellingUnit.name === product.selectedUnitType;
                });
                // extract unit jump amount
                const sellingUnitAmountJump = product.productSellingUnits[sellingUnitIndex].sellingUnit.amountJumps;

                if(productIndex !== -1){ // if product exist in cart
                    product.cart = product.cart + sellingUnitAmountJump;
                    const currentCart = storeState.cart;

                    // Calculate Cart Sum
                    let sum: number = 0;
                    storeState.cart.forEach(function (product) {
                        sum = sum + (product.cart * product.price);
                    });

                    return { ...storeState, cart: [ ...currentCart ], cartSum: sum };
                }
                else{ // if product NOT exist in cart
                    product.cart = sellingUnitAmountJump;
                    const currentCart = storeState.cart;
                    currentCart.push(product);

                    // Calculate Cart Sum
                    let sum: number = 0;
                    storeState.cart.forEach(function (product) {
                        sum = sum + (product.cart * product.price);
                    });

                    return { ...storeState, cart: [ ...currentCart ], cartSum: sum };
                }

            }
            return { ...storeState };

        case "SUBTRACT_PRODUCT_FROM_CART":
                if(action.payload?.product){
                    const product: ProductRawData = action.payload?.product;

                    const sellingUnitIndex = product.productSellingUnits.findIndex(function(unit){ // find selected unit type index
                        return unit.sellingUnit.name === product.selectedUnitType;
                    });
                    const sellingUnitAmountJump = product.productSellingUnits[sellingUnitIndex].sellingUnit.amountJumps; // extract unit jump amount

                    if(product.cart > sellingUnitAmountJump){ // if quantity is bigger then 0.5
                        product.cart = product.cart - sellingUnitAmountJump;
                        const currentCart = storeState.cart;

                        // Calculate Cart Sum
                        let sum: number = 0;
                        storeState.cart.forEach(function (product) {
                            sum = sum + (product.cart * product.price);
                        });

                        return { ...storeState, cart: [ ...currentCart ], cartSum: sum };
                    }
                    else if(product.cart <= sellingUnitAmountJump){
                        const productIndex = storeState.cart.findIndex(function (item) { // get product index in cart
                            return item.id === product.id;
                        });
                        product.cart = 0; // reset product sum in cart
                        const currentCart = storeState.cart;
                        currentCart.splice(productIndex, 1); // Delete Product

                        // Calculate Cart Sum
                        let sum: number = 0;
                        storeState.cart.forEach(function (product) {
                            sum = sum + (product.cart * product.price);
                        });

                        return { ...storeState, cart: [ ...currentCart ], cartSum: sum };
                    }
                }
                return { ...storeState };

        case "REMOVE_PRODUCT_FROM_CART":
            if(action.payload?.product){
                const product: ProductRawData = action.payload?.product;

                const productIndex = storeState.cart.findIndex(function (item) { // get product index in cart
                    return item.id === product.id;
                });
                product.cart = 0; // reset product sum in cart
                const currentCart = storeState.cart;
                currentCart.splice(productIndex, 1); // Delete Product

                // Calculate Cart Sum
                let sum: number = 0;
                storeState.cart.forEach(function (product) {
                    sum = sum + (product.cart * product.price);
                });

                return { ...storeState, cart: [ ...currentCart ], cartSum: sum };
            }
            return { ...storeState };

        case "CALCULATE_CART_SUM":
            let sum: number = 0;
            storeState.cart.forEach(function (product) {
                sum = sum + (product.cart * product.price);
            });
            return { ...storeState, cartSum: sum };

        case "TOGGLE_ON_DROPDOWN_UNIT_TYPE":
            if(action.payload?.product){
                const product: ProductRawData = action.payload?.product;
                product.dropdownOpenState = true; // Unit Type <Dropdown>

                const currentCart = storeState.cart;
                return { ...storeState, cart: [ ...currentCart ] };
            }
            break;

        case "TOGGLE_ON_DROPDOWN_COMMENT_TYPE":
            if(action.payload?.product){
                const product: ProductRawData = action.payload?.product;
                if(product.commentType){
                    product.commentType.dropdownOpenStateCommentType = true;  // Comment Type <Dropdown>

                    const currentCart = storeState.cart;
                    return { ...storeState, cart: [ ...currentCart ] };
                }
            }
            break;

        case "TOGGLE_OFF_DROPDOWN":
            if(action.payload?.product){
                const product: ProductRawData = action.payload?.product;
                product.dropdownOpenState = false;                             // Unit Type <Dropdown>
                if(product.commentType){
                    product.commentType.dropdownOpenStateCommentType = false;  // Comment Type <Dropdown>
                }

                const currentCart = storeState.cart;
                return { ...storeState, cart: [ ...currentCart ] };
            }
            break;

        case "ON_CHANGE_DROPDOWN_UNIT_TYPE":
            if(action.payload?.product && action.payload?.unitType){
                const product: ProductRawData = action.payload?.product;
                const unitType: string = action.payload?.unitType;

                const previousUnitType = product.selectedUnitType; // Previous Selected Unit Type
                product.selectedUnitType = unitType;               // Newer Selected Unit Type

                if(product.cart > 0 && product.selectedUnitType !== previousUnitType){
                    const sellingUnitIndex = product.productSellingUnits.findIndex(function(unit){ // find selected unit type index
                        return unit.sellingUnit.name === product.selectedUnitType;
                    });
                    // extract unit jump amount
                    product.cart = product.productSellingUnits[sellingUnitIndex].sellingUnit.amountJumps; // reset amount according to unit amount jump
                }

                // Toggle Off
                product.dropdownOpenState = false;                             // Unit Type <Dropdown>
                if(product.commentType){
                    product.commentType.dropdownOpenStateCommentType = false;  // Comment Type <Dropdown>
                }

                const currentCart = storeState.cart;
                return { ...storeState, cart: [ ...currentCart ] };
            }
            break;

        case "ON_CHANGE_DROPDOWN_COMMENT_TYPE":
            if(action.payload?.product && action.payload?.commentType){
                const product: ProductRawData = action.payload?.product;
                const commentType: string = action.payload?.commentType;

                product.commentType.selectedCommentType = commentType;

                // Toggle Off
                product.dropdownOpenState = false;                             // Unit Type <Dropdown>
                if(product.commentType){
                    product.commentType.dropdownOpenStateCommentType = false;  // Comment Type <Dropdown>
                }

                const currentCart = storeState.cart;
                return { ...storeState, cart: [ ...currentCart ] };
            }
            break;

        case "":
            return { ...storeState };
        case "":
            return { ...storeState };
        case "":
            return { ...storeState };

        default:
            return storeState;
    }

}

export default storeReducer;