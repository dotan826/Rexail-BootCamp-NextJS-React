import {ProductRawData} from '../../types/appTypes';

// Search Input - Action Constants :
const UPDATE_SEARCH_INPUT = "UPDATE_SEARCH_INPUT";
const RESET_SEARCH_INPUT = "RESET_SEARCH_INPUT";

// Preparation Notes - Action Constants :
const UPDATE_PREPARATION_NOTES = "UPDATE_PREPARATION_NOTES";

// Cart Operations - Action Constants :
const EMPTY_CART = "EMPTY_CART";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const SUBTRACT_PRODUCT_FROM_CART = "SUBTRACT_PRODUCT_FROM_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const CALCULATE_CART_SUM = "CALCULATE_CART_SUM";

// Toggle Operations - Action Constants :
const TOGGLE_ON_DROPDOWN_UNIT_TYPE = "TOGGLE_ON_DROPDOWN_UNIT_TYPE";
const TOGGLE_ON_DROPDOWN_COMMENT_TYPE = "TOGGLE_ON_DROPDOWN_COMMENT_TYPE";
const TOGGLE_OFF_DROPDOWN = "TOGGLE_OFF_DROPDOWN";

// onChange Operations - Action Constants :
const ON_CHANGE_DROPDOWN_UNIT_TYPE = "ON_CHANGE_DROPDOWN_UNIT_TYPE";
const ON_CHANGE_DROPDOWN_COMMENT_TYPE = "ON_CHANGE_DROPDOWN_COMMENT_TYPE";

// Search Input - Action Creators :
export const updateSearchInput = function (input: string) {
    return {
        type: UPDATE_SEARCH_INPUT,
        payload: {
            searchValue: input
        }
    };
}

export const resetSearchInput = function () {
    return {
        type: RESET_SEARCH_INPUT
    };
}

// Preparation Notes - Action Creators :
export const updatePreparationNotes = function (input: string) {
    return {
        type: UPDATE_PREPARATION_NOTES,
        payload: {
            preparationNotes: input
        }
    };
}

// Cart Operations - Action Creators :
export const emptyCart = function () {
    return {
        type: EMPTY_CART
    };
}

export const addProductToCart = function (product: ProductRawData) {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: {
            product: product
        }
    };
}

export const subtractProductFromCart = function (product: ProductRawData) {
    return {
        type: SUBTRACT_PRODUCT_FROM_CART,
        payload: {
            product: product
        }
    };
}

export const removeProductFromCart = function (product: ProductRawData) {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: {
            product: product
        }
    };
}

export const calculateCartSum = function () {
    return {
        type: CALCULATE_CART_SUM
    };
}

// Toggle Operations - Action Creators :
export const toggleOnDropdownUnitType = function (product: ProductRawData) {
    return {
        type: TOGGLE_ON_DROPDOWN_UNIT_TYPE,
        payload: {
            product: product
        }
    };
}

export const toggleOnDropdownCommentType = function (product: ProductRawData) {
    return {
        type: TOGGLE_ON_DROPDOWN_COMMENT_TYPE,
        payload: {
            product: product
        }
    };
}

export const toggleOffDropdown = function (product: ProductRawData) {
    return {
        type: TOGGLE_OFF_DROPDOWN,
        payload: {
            product: product
        }
    };
}

// onChange Operations - Action Creators :
export const onChangeDropdownUnitType = function (product: ProductRawData, unitType: string) {
    return {
        type: ON_CHANGE_DROPDOWN_UNIT_TYPE,
        payload: {
            product: product,
            unitType: unitType
        }
    };
}

export const onChangeDropdownCommentType = function (product: ProductRawData, commentType: string) {
    return {
        type: ON_CHANGE_DROPDOWN_COMMENT_TYPE,
        payload: {
            product: product,
            commentType: commentType
        }
    };
}
