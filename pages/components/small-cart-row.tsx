import React, { useContext } from 'react';

import { SmallCartRowProps } from '../types/appTypes';
import { GlobalContext, GlobalContextType } from "../context/context";

const SmallCartRow = function ({
    product, toggleOffDropdown, toggleOnDropdownUnitType, onChangeDropdownUnitType, addProductToCart, subtractProductFromCart, removeProductFromCart
                               }: SmallCartRowProps) {

    const imageUrlBase = "https://s3.eu-central-1.amazonaws.com/images-il.rexail.com/";

    const {
        globalContext, setGlobalContext
    } = useContext(GlobalContext) as GlobalContextType;

    return (
        <div
            className="small-cart-toggle-hover w-315px h-100px p-t-10px p-r-10px p-b-10px p-l-10px flex justify-content-space-between aligns-items-center border-w-b-0-5px border-color-b-light-grey border-style-b-solid relative ltr">

            <div className="w-90px flex justify-content-center aligns-items-center">
                <p className="heebo font-s-16px font-w-600 font-stretch-normal font-style-normal line-h-1-13 letter-spacing-minus-0-3px text-align-center color-black-1">
                    ₪{(product.cart * product.price).toFixed(2)}
                </p>
            </div>

            <div
                className="w-60px flex flex-direction-column aligns-items-center"
                onMouseLeave={()=>{toggleOffDropdown(product, globalContext, setGlobalContext)}}
            >
                <button
                    className="small-cart-buttons w-20px h-20px m-b-5px border-none background-color-white-1 pointer"
                    onClick={()=>{addProductToCart(product, globalContext, setGlobalContext)}}
                >
                    <img src={"/icons/main-page/icon-plus-circled.svg"} alt="add 1 to product" />
                </button>

                <p className="m-b-5px heebo font-s-16px font-w-600 font-stretch-normal font-style-normal line-h-1-13 letter-spacing-minus-0-3px text-align-center color-black-1">{product.cart}</p>


                <p className="small-cart-quantity m-b-5px font-s-12px border-radius-15px w-65px flex justify-content-center background-color-grey-5 rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-grey-3">{product.selectedUnitType}</p>

                {/*Dropdown Unit Type*/}
                {
                    product.productSellingUnits.length > 1 &&
                    <div className="small-cart-dropdown dropdown-unit-type m-b-5px">
                        <button
                            className="dropdown-unit-type-button"
                            onClick={()=>{toggleOnDropdownUnitType(product, globalContext, setGlobalContext)}}
                        >{product.selectedUnitType}</button>
                        <div className={"dropdown-unit-type-content " + (product.dropdownOpenState ? ' show-flex ' : '')}>
                            {
                                product.productSellingUnits.map((value, index) => {
                                    return (
                                        <a
                                            key={index}
                                            onClick={()=>{onChangeDropdownUnitType(product, globalContext, setGlobalContext, value.sellingUnit.name)}}
                                        >{value.sellingUnit.name}</a>
                                    )
                                })
                            }
                        </div>
                        <img className={"dropdown-unit-type-arrow-up " + (product.dropdownOpenState ? ' show-block ' : '')}
                             src={"/icons/main-page/icon-arrow-up.svg"}
                             alt="Arrow pointing up"
                        />
                        <img className={"dropdown-unit-type-arrow-down " + (product.dropdownOpenState ? ' show-none ' : '')}
                             src={"/icons/main-page/icon-arrow-down.svg"}
                             alt="Arrow pointing down"
                        />
                    </div>
                }

                {
                    product.productSellingUnits.length === 1 &&
                    <p className="small-cart-unit-type m-b-5px font-s-12px border-radius-15px w-65px flex justify-content-center background-color-grey-5 rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-grey-3">{product.selectedUnitType}</p>
                }

                <button
                    className="small-cart-buttons w-20px h-20px border-none background-color-white-1 pointer"
                    onClick={()=>{subtractProductFromCart(product, globalContext, setGlobalContext)}}
                >
                    <img src={"/icons/main-page/icon-minus-circled.svg"} alt="remove 1 from product" />
                </button>
            </div>

            <div className="w-85px flex justify-content-center aligns-items-center">
                <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-black-1 text-align-right">
                    {product.product.name}
                </p>
            </div>

            <div className="w-80px flex justify-content-center aligns-items-center">
                {
                    product.imageUrl ?
                        <img
                            src={imageUrlBase + product.imageUrl}
                            alt="product picture"
                            className="w-70px h-60px"
                        /> :
                        <h3>No Image :(</h3>
                }
            </div>

            <button
                className="small-cart-buttons absolute top-40px right-20px border-none w-20px h-20px border-radius-10px color-white-1 background-color-red-1 pointer"
                onClick={()=>{removeProductFromCart(product, globalContext, setGlobalContext)}}
            >X
            </button>

            {/*Sale Icon*/}
            {
                product.promoted &&
                <div className="absolute background-color-green-1 w-55px h-18px flex justify-content-center aligns-items-center top-5px right-minus-14px border-radius-top-left-3px border-radius-bottom-left-3px">
                    <p className="color-white-1 font-s-9px m-r-3px">מבצע</p>
                    <img src={"/icons/main-page/icon-discount.svg"}
                         alt="product with discount"
                         className="w-10px h-10px"
                    />
                    <div className="small-triangle-black-row-sale"/>
                    <div className="small-triangle-white-row-sale"/>
                </div>
            }

        </div>

);
}

export default SmallCartRow;

