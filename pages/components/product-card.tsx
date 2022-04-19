import React from 'react';
import { ProductCardProps } from '../types/appTypes';
import {useDispatch} from 'react-redux';
import {addProductToCart, subtractProductFromCart, onChangeDropdownUnitType} from '../Redux/Actions/storeActions';

const ProductCard = function ({ product }: ProductCardProps) {

    const imageUrlBase = "https://s3.eu-central-1.amazonaws.com/images-il.rexail.com/";

    const dispatch = useDispatch();

    return (
        <div
            className="card-toggle-hover w-208px h-300px background-color-white-1 border-radius-8px p-t-10px p-r-10px p-b-39px p-l-18px relative ltr">
            <div className="w-172px h-40px flex justify-content-end">
                <div
                    className="h-18px p-r-5px p-l-5px border-radius-4px background-color-grey-3 flex justify-content-center aligns-items-center">
                    <p className="rubik font-s-10px font-w-normal font-stretch-normal font-style-normal line-h-normal letter-spacing-minus-0-1px text-align-center color-green-1">{product.productQuality.name}</p>
                </div>
            </div>
            <div className="product-image w-172px h-105px flex justify-content-center aligns-items-center">
                {
                    product.imageUrl ?
                        <img
                            src={imageUrlBase + product.imageUrl}
                            alt="product picture" className="w-172px h-105px"
                        /> :
                        <h3>No Image :(</h3>
                }
            </div>
            <div className="product-details">
                <div className="w-172px h-90px p-t-10px flex flex-direction-column">
                    <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-13 letter-spacing-minus-0-2px text-align-center color-black-1">{product.product.name}</p>
                    {
                        product.currentRelevancy &&
                        <div className="flex w-172px h-10px flex justify-content-center m-t-10px">
                            <svg className={"w-12px h-10px " + (product.currentRelevancy.name === 'high' ? ' fill-yellow ' : ' fill-grey ')}
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 576 512"
                            >
                                <path
                                    d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                            </svg>
                            <svg className="w-12px h-10px fill-grey"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 576 512"
                            >
                                <path
                                    d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                            </svg>
                            <svg className="w-12px h-10px fill-yellow"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 576 512"
                            >
                                <path
                                    d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                            </svg>
                        </div>
                    }
                </div>
                <div className="h-45px flex justify-content-center aligns-items-center flex-direction-column">
                    <div className="flex justify-content-center aligns-items-center">
                        <p className="heebo font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-black-1 p-t-3px">{product.selectedUnitType}</p>
                        <p className="heebo font-s-18px font-w-600 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-2px text-align-center color-black-1">₪{product.price}</p>
                    </div>
                    {
                        product.promoted &&
                        <div className="flex justify-content-center aligns-items-center color-grey-2 line-through">
                            <p className="heebo font-s-13px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-grey-2">{product.selectedUnitType}</p>
                            <p className="heebo font-s-13px font-w-600 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-2px text-align-center color-grey-2">₪{product.originalPrice}</p>
                        </div>
                    }
                </div>
            </div>
            <div className="product-price-buttons">
                <div className="flex h-45px flex justify-content-center aligns-items-center">
                    <p className="heebo font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-black-1 p-t-3px">{product.selectedUnitType}</p>
                    <p className="heebo font-s-18px font-w-600 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-2px text-align-center color-black-1">₪{product.price}</p>
                </div>
                <div
                    className="w-172px h-90px flex flex-direction-column aligns-items-center justify-content-center p-b-20px">
                    <div className="h-30px w-126px flex justify-content-center">
                        <form
                            className="h-25px flex justify-content-center aligns-items-center background-color-grey-5 border-radius-20px flex justify-content-center aligns-items-center">
                            {
                                product.productSellingUnits.map((sellingUnit, index) => {
                                    return (
                                        <label
                                            className={"w-min-50px flex justify-content-center aligns-items-center font-s-12px p-5px h-25px border-radius-20px " + (product.selectedUnitType === sellingUnit.sellingUnit.name ? ' radio-button-unit-type-selected ' : '')}
                                            key={index}
                                        >
                                            {sellingUnit.sellingUnit.name}
                                            <input className="display-none"
                                                   type="radio"
                                                   name="unitType"
                                                   value={sellingUnit.sellingUnit.name}
                                                   onClick={()=>{dispatch(onChangeDropdownUnitType(product, sellingUnit.sellingUnit.name))}}
                                            />
                                        </label>
                                    )
                                })
                            }
                        </form>
                    </div>
                    <div className="h-30px w-126px flex">
                        {
                            product.cart === 0 &&
                            <div className="w-126px flex">
                                <button
                                    className="plusMinusButtonsHover w-126px border-none background-color-green-2 rubik color-white-1 border-radius-20px flex justify-content-center aligns-items-center font-s-16px pointer rtl"
                                    onClick={()=>{dispatch(addProductToCart(product))}}
                                >+&nbsp;&nbsp;הוספה לסל
                                </button>
                            </div>
                        }
                        {
                            product.cart > 0 &&
                            <div className="w-126px flex">
                                <button
                                    className="plusMinusButtonsHover w-42px border-none background-color-green-2 rubik color-white-1 border-radius-bottom-left-20px border-radius-top-left-20px flex justify-content-center aligns-items-center font-s-20px pointer"
                                    onClick={()=>{dispatch(subtractProductFromCart(product))}}
                                >-
                                </button>
                                <p className="w-42px background-color-green-2 rubik color-white-1 flex justify-content-center aligns-items-center font-s-16px">{product.cart}</p>
                                <button
                                    className="plusMinusButtonsHover w-42px border-none background-color-green-2 rubik color-white-1 border-radius-top-right-20px border-radius-bottom-right-20px flex justify-content-center aligns-items-center font-s-20px pointer"
                                    onClick={()=>{dispatch(addProductToCart(product))}}
                                >+
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/*Sale Icon*/}
            {
                product.promoted &&
                <div
                    className="absolute background-color-green-1 w-30px h-40px top-minus-7px left-10px border-radius-bottom-right-6px border-radius-bottom-left-6px flex flex-direction-column justify-content-center aligns-items-center"

                >
                    <img src={"/icons/main-page/icon-discount.svg"}
                         alt="product with discount"
                         className="w-10px h-10px"
                    />
                    <p className="color-white-1 font-s-9px">מבצע</p>
                    <div className="small-triangle-black-card-sale"/>
                    <div className="small-triangle-white-card-sale"/>
                </div>
            }

            {/*Quantity Icon*/}
            {
                product.cart > 0 &&
                <div
                    className="absolute left-10px bottom-minus-7px h-40px w-30px flex justify-content-center aligns-items-center flex-direction-column background-color-green-2 border-radius-top-right-5px border-radius-top-left-5px"
                >
                    <p className="heebo font-s-12px font-w-bold color-white-1">{product.cart}</p>
                    <p className="heebo font-s-10px font-w-bold color-white-1 text-align-center line-h-9px">{product.selectedUnitType}</p>
                    <div className="small-triangle-black-card-quantity"/>
                </div>
            }

        </div>

);
}

export default ProductCard;

