import React from 'react';
import {useDispatch} from 'react-redux';
import {addProductToCart, subtractProductFromCart, removeProductFromCart, toggleOffDropdown, toggleOnDropdownUnitType, toggleOnDropdownCommentType, onChangeDropdownUnitType, onChangeDropdownCommentType} from '../Redux/Actions/storeActions';

import { BigCartRowProps } from '../types/appTypes';

const BigCartRow = function ({ product }: BigCartRowProps) {

    const imageUrlBase = "https://s3.eu-central-1.amazonaws.com/images-il.rexail.com/";

    const dispatch = useDispatch();

    return (
        <div
            className="small-cart-toggle-hover h-100px flex justify-content-center aligns-items-center border-radius-top-left-8px border-radius-top-right-8px relative">

            <div className="w-85px flex justify-content-center">
                <button
                    className="border-none w-20px h-20px border-radius-10px color-white-1 background-color-red-1 pointer"
                    onClick={()=>{dispatch(removeProductFromCart(product))}}>X
                </button>
            </div>

            <div className="w-111px flex justify-content-center">
                <p className="heebo font-s-16px font-w-600 font-stretch-normal font-style-normal line-h-1-13 letter-spacing-minus-0-3px text-align-center color-black-1">₪{(product.cart * product.price).toFixed(2)}</p>
            </div>

            <div className="w-85px h-100px flex justify-content-center aligns-items-center"
                onMouseLeave={()=>{dispatch(toggleOffDropdown(product))}}
            >
                <div className="w-85p h-60px flex justify-content-center aligns-items-center flex-direction-column">

                    <div className="w-65px flex justify-content-center">
                        <button
                            className="small-cart-buttons w-20px h-20px border-none background-color-white-1 pointer"
                            onClick={()=>{dispatch(subtractProductFromCart(product))}}
                        >
                            <img src={"/icons/main-page/icon-minus-circled.svg"}
                                 alt="remove 1 from product"
                            />
                        </button>
                        <p className="m-r-10px m-l-10px heebo font-s-16px font-w-600 font-stretch-normal font-style-normal line-h-1-13 letter-spacing-minus-0-3px text-align-center color-black-1">{product.cart}</p>
                        <button
                            className="small-cart-buttons w-20px h-20px border-none background-color-white-1 pointer"
                            onClick={()=>{dispatch(addProductToCart(product))}}
                        >
                            <img src={"/icons/main-page/icon-plus-circled.svg"}
                                 alt="add 1 to product"
                            />
                        </button>
                    </div>

                    <p className="small-cart-quantity flex justify-content-center w-65px m-t-5px rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-23 letter-spacing-minus-0-2px text-align-center color-grey-1">{product.selectedUnitType}</p>

                    {/*Dropdown Unit Type*/}
                    {
                        product.productSellingUnits.length > 1 &&
                        <div className="small-cart-dropdown dropdown-unit-type-product-row m-b-5px w-65px">
                            <button className="dropdown-unit-type-button"
                                    onClick={()=>{dispatch(toggleOnDropdownUnitType(product))}}
                            >{product.selectedUnitType}</button>
                            <div className={"dropdown-unit-type-content " + (product.dropdownOpenState ? ' show-flex ' : '')}>
                                {
                                    product.productSellingUnits.map((value, index) => {
                                        return (
                                            <a
                                                key={index}
                                                onClick={()=>{dispatch(onChangeDropdownUnitType(product, value.sellingUnit.name))}}
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
                        <p className="small-cart-unit-type flex justify-content-center w-65px m-t-5px rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-23 letter-spacing-minus-0-2px text-align-center color-grey-1">{product.selectedUnitType}</p>
                    }

                </div>
            </div>

            <div className="w-145px flex justify-content-center">
                <p className="heebo font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-13 letter-spacing-minus-0-2px text-align-center color-black-1">₪{product.price}</p>
            </div>

            <div className="w-362px h-100px flex justify-content-end aligns-items-center p-r-20px"
                 onMouseLeave={()=>{dispatch(toggleOffDropdown(product))}}
            >
                <div className="flex flex-direction-column justify-content-center aligns-items-end">
                    <p className="m-r-10px flex justify-content-center aligns-items-center heebo font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-13 letter-spacing-minus-0-2px text-align-center color-black-1">{product.product.name}</p>

                    {/*Dropdown Comment Type*/}
                    {
                        product.commentType &&
                        <div className="dropdown-comment-type-product-row">
                            <button className="dropdown-comment-type-button"
                                    onClick={()=>{dispatch(toggleOnDropdownCommentType(product))}}
                            >{product.commentType.selectedCommentType}</button>
                            <div className={"dropdown-comment-type-content " + (product.commentType.dropdownOpenStateCommentType ? ' show-flex ' : '')}>
                                {
                                    product.commentType.comments.map((commentType, index) => {
                                        return (
                                            <a
                                                key={index}
                                                onClick={()=>{dispatch(onChangeDropdownCommentType(product, commentType.name))}}
                                            >{commentType.name}</a>
                                        )
                                    })
                                }
                            </div>
                            <img className={"dropdown-comment-type-arrow-up " + (product.commentType.dropdownOpenStateCommentType ? ' show-block ' : '')}
                                 src={"/icons/main-page/icon-arrow-up.svg"}
                                 alt="Arrow pointing up"
                            />
                                <img className={"dropdown-comment-type-arrow-down " + (product.commentType.dropdownOpenStateCommentType ? ' show-none ' : '')}
                                     src={"/icons/main-page/icon-arrow-down.svg"}
                                     alt="Arrow pointing down"
                                />
                                    <img className="dropdown-comment-type-knife"
                                         src={"/icons/cart-page/icon-knife.svg"}
                                         alt="knife icon"
                                    />
                        </div>
                    }
                </div>

                <img
                     src={imageUrlBase + product.imageUrl}
                     alt="product picture"
                     className="w-86px h-54px"
                />

            </div>

            {/*Sale Icon*/}
            {
                product.promoted &&
                <div
                    className="absolute background-color-green-1 w-55px h-18px flex justify-content-center aligns-items-center right-minus-7px top-5px border-radius-top-left-3px border-radius-bottom-left-3px"
                >
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

export default BigCartRow;

