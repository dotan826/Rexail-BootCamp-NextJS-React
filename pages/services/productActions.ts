import { ProductRawData } from '../types/appTypes';
import { GlobalContext } from "../context/context";
import React from "react";

/**
 * Add product to cart.
 * @param product Product Object to add.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Cart inside Global Context
 */
export const addProductToCart = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContext>>) {

    // return [index] if product exist in cart - otherwise return [-1]
    const productIndex = globalContext.cart.findIndex(function (item) {
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
        // setGlobalContext({ ...globalContext });
        setGlobalContext(((prevState) => {
            return (
                { ...prevState }
            );
        }));
    }
    else{ // if product NOT exist in cart
        product.cart = sellingUnitAmountJump;
        const currentCart = globalContext.cart;
        currentCart.push(product);
        // setGlobalContext({ ...globalContext, cart: [ ...currentCart, product ] });
        setGlobalContext((prevState) => {
            return (
                { ...prevState, cart: [ ...currentCart, product ] }
            );
        });
    }

    calculateCartSum(globalContext, setGlobalContext); // update cart sum
}

/**
 * Subtract product from cart.
 * @param product Product Object to subtract.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Cart inside Global Context
 */
export const subtractProductFromCart = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContext>>) {

    const sellingUnitIndex = product.productSellingUnits.findIndex(function(unit){ // find selected unit type index
        return unit.sellingUnit.name === product.selectedUnitType;
    });
    const sellingUnitAmountJump = product.productSellingUnits[sellingUnitIndex].sellingUnit.amountJumps; // extract unit jump amount

    if(product.cart > sellingUnitAmountJump){ // if quantity is bigger then 0.5
        product.cart = product.cart - sellingUnitAmountJump;
        // setGlobalContext({ ...globalContext });
        setGlobalContext(((prevState) => {
            return (
                { ...prevState }
            );
        }));
        calculateCartSum(globalContext, setGlobalContext); // update cart sum
    }
    else if(product.cart <= sellingUnitAmountJump){
        removeProductFromCart(product, globalContext, setGlobalContext);
    }
}

/**
 * Remove product from cart.
 * @param product Product Object to remove.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Cart inside Global Context
 */
export const removeProductFromCart = function (product: ProductRawData, globalContext: GlobalContext, setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContext>>) {

    const productIndex = globalContext.cart.findIndex(function (item) { // get product index in cart
        return item.id === product.id;
    });
    product.cart = 0; // reset product sum in cart
    // setGlobalContext({ ...globalContext, cart: globalContext.cart.splice(productIndex, 1) }); // remove product from cart
    setGlobalContext(((prevState) => {
        return (
            { ...prevState, cart: prevState.cart.splice(productIndex, 1) }
        );
    }));
    calculateCartSum(globalContext, setGlobalContext); // update cart sum
}

/**
 * Calculate Cart Sum.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Cart inside Global Context
 */
export const calculateCartSum = function (globalContext: GlobalContext, setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContext>>) {
    let sum: number = 0;
    globalContext.cart.forEach(function (product) {
        sum = sum + (product.cart * product.price);
    });
    // setGlobalContext({ ...globalContext, cartSum: sum });
    setGlobalContext((prevState) => {
        return (
            { ...prevState, cartSum: sum }
        );
    });
}

/**
 * Remove all products from the cart.
 * @param globalContext Global Context
 * @param setGlobalContext for updating Cart inside Global Context
 */
export const emptyCart = function (globalContext: GlobalContext, setGlobalContext: React.Dispatch<React.SetStateAction<GlobalContext>>) {
    for(let i=globalContext.cart.length-1; i>=0; i--){ // reset each product in the cart + pop out !
        globalContext.cart[i].cart = 0;
        globalContext.cart.pop();
    }
    // setGlobalContext({ ...globalContext, cartSum: 0 });
    setGlobalContext((prevState) => {
        return (
            { ...prevState, cartSum: 0 }
        );
    });
}





