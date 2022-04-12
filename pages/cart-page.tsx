import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {GlobalContext, GlobalContextType} from './context/context';

import SmallHeader from "./components/small-header";
import SmallFooter from "./components/small-footer";
import BigCartRow from "./components/big-cart-row";
import ProductCard from "./components/product-card";

import { CartPageProps, ProductRawData} from './types/appTypes';

import { toggleOffDropdown, toggleOnDropdownUnitType, toggleOnDropdownCommentType, onChangeDropdownCommentType, onChangeDropdownUnitType } from './services/dropdownUtils';
import { addProductToCart, subtractProductFromCart, removeProductFromCart } from './services/productActions';

const CartPage = function ({}: CartPageProps) {

    const [youMissedItemsData, setYouMissedItemsData] = useState<ProductRawData[]>([]);
    const [youMissedItemsView, setYouMissedItemsView] = useState<ProductRawData[]>([]);
    const [missedItemsStartIndex, setMissedItemsStartIndex] = useState<number>(2);
    const [missedItemsEndIndex, setMissedItemsEndIndex] = useState<number>(5);

    const {
        globalContext
    } = useContext(GlobalContext) as GlobalContextType;

    const router = useRouter();

    /**
     * Grill n Random Products.
     * @param n Number of products to randomly grill.
     */
    const grillRandomProducts = function (n: number) {
        const sumOfAllProducts = globalContext.catalogData.length; // how many products do we have ?
        const randomNumbers: number[] = [];
        for(let i=0; i<n; ){
            const randomNumber = Math.floor(Math.random() * sumOfAllProducts);
            if(!(randomNumbers.includes(randomNumber))){ // if we don't have this random number already
                randomNumbers.push(randomNumber); // save random number
                youMissedItemsData.push(globalContext.catalogData[randomNumber]);
                i = i + 1;
            }
        }
        setYouMissedItemsView(youMissedItemsData.slice(missedItemsStartIndex, missedItemsEndIndex + 1));
    }

    /**
     * Swip Left Random Products.
     */
    const swipLeft = function () {
        if(missedItemsStartIndex > 0){
            setMissedItemsStartIndex(missedItemsStartIndex - 1);
            setMissedItemsEndIndex(missedItemsEndIndex - 1);
            setYouMissedItemsView(youMissedItemsData.slice(missedItemsStartIndex, missedItemsEndIndex + 1));
        }
    }

    /**
     * Swip Right Random Products.
     */
    const swipRight = function () {
        if(missedItemsEndIndex < youMissedItemsData.length - 1){
            setMissedItemsStartIndex(missedItemsStartIndex + 1);
            setMissedItemsEndIndex(missedItemsEndIndex + 1);
            setYouMissedItemsView(youMissedItemsData.slice(missedItemsStartIndex, missedItemsEndIndex + 1));
        }
    }

    useEffect(()=>{
        grillRandomProducts(4);
    }, []);

    return (
        <div className="h-min-100vh">

            <header>
                <SmallHeader cartPage={true}/>
            </header>

            <div
                className="h-min-900px flex flex-direction-column justify-content-center aligns-items-center background-color-grey-3 p-t-105px p-b-130px relative">

                <div className="w-100p h-210px background-color-green-2 absolute top-80px z-index-3"/>

                <div className="w-1140px flex justify-content-space-between h-min-900px z-index-4">

                    {/*Product Card Cart*/}
                    <div
                        className="box-shadow-2 w-330px h-488px border-radius-8px sticky top-200px p-t-12px p-r-15px p-b-30px p-l-16px flex flex-direction-column aligns-items-end background-color-white-1">
                        <p className="w-298px h-22px m-t-0 m-r-1px m-b-12px m-l-0 heebo font-w-bold font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-1px text-align-right color-green-1">סיכום
                            הזמנה</p>
                        <div
                            className="w-299px h-1px m-t-12px m-r-0 m-l-0 m-b-21px border-style-solid border-w-0-5px border-color-light-grey"/>
                        <p className="w-134px h-20px m-t-0 m-r-1px m-b-10px m-l-164px rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-right color-grey-1">הערות
                            למכין ההזמנה</p>
                        <textarea
                            className="w-298px h-180px m-t-10px m-r-0 m-b-0 m-l-0 border-radius-6px border-style-solid border-w-1px border-color-light-grey-2 background-color-white-1 text-align-right resize-none"
                            onChange={(event)=>{globalContext.preparationNotes = event.target.value}}
                        />
                        <div
                            className="w-299px h-1px m-b-26px m-t-26px m-r-0 m-l-0 border-style-solid border-w-0-5px border-color-light-grey"/>
                        <div className="flex justify-content-space-between w-299px">
                            <p className="w-64px h-20px m-b-26px heebo font-s-16px font-w-600 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-black-1">₪{globalContext.cartSum.toFixed(2)}</p>
                            <p className="w-94px h-20px m-b-26px rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-right color-grey-1">סה״כ
                                סל קניות</p>
                        </div>
                        <button
                            className="w-298px h-46px m-b-11px border-radius-6px background-color-green-2 rubik font-s-18px font-w-500 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-1px text-align-center color-white-1 border-none pointer"
                            onClick={() => {
                                router.push("/checkout-page")
                            }}
                        >המשך
                        </button>
                        <p className="w-299px h-18px m-t-12px rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-grey-2">שערוך.
                            עלות סופית לפי שקילה.</p>
                    </div>


                    {/*Products Cart*/}
                    <div className="flex flex-direction-column aligns-items-end">
                        <div className="flex aligns-items-center m-b-23px pointer"
                             onClick={() => {
                                 router.push("/")
                             }}
                        >

                            <p className="w-80px h-18px rubik font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-13 letter-spacing-normal text-align-right color-green-1 m-r-5px">
                                חזרה לחנות</p>
                            <img src={"/icons/cart-page/icon-arrow-right.svg"} alt="Arrow pointing to the right"
                                 className="w-8px h-13px"
                            />

                        </div>
                        <div className="flex m-b-23px">
                            <h2 className="w-232px h-38px m-r-12px heebo font-s-36px font-w-bold font-stretch-normal font-style-normal line-h-1-06 letter-spacing-normal text-align-center color-green-1">
                                סל הקניות שלי</h2>
                            <div className="relative w-37px h-32px">
                                <img src={"/icons/cart-page/basket.svg"}
                                     alt="Basket Image with number inside that indicate how many products are in the Cart"
                                     className="w-37px h-32px"/>
                                <p className="absolute top-14px left-15px font-s-13px color-green-2">{globalContext.cart.length}</p>
                            </div>

                        </div>
                        <div className="border-radius-8px background-color-white-1 w-788px h-min-100px">

                            {/*Products Table Headers*/}
                            <div
                                className="h-46px flex aligns-items-center background-color-grey-4 border-radius-top-left-8px border-radius-top-right-8px">
                                <div className="h-18px w-85px flex justify-content-center">
                                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-green-1">הסר</p>
                                </div>
                                <div className="h-18px w-111px flex justify-content-center">
                                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-green-1">סה״כ</p>
                                </div>
                                <div className="h-18px w-85px flex justify-content-center">
                                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-green-1">כמות</p>
                                </div>
                                <div className="h-18px w-145px flex justify-content-center">
                                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-green-1">מחיר
                                        ליחידה</p>
                                </div>
                                <div className="h-18px w-362px flex justify-content-end p-r-20px">
                                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-green-1">מוצר</p>
                                </div>
                            </div>

                            {/*Big Cart Row*/}
                            {
                                globalContext.cart.map((value, index) => {
                                    return (
                                        <BigCartRow
                                            key={index}
                                            product={value}
                                            toggleOffDropdown={toggleOffDropdown}
                                            toggleOnDropdownUnitType={toggleOnDropdownUnitType}
                                            toggleOnDropdownCommentType={toggleOnDropdownCommentType}
                                            onChangeDropdownUnitType={onChangeDropdownUnitType}
                                            onChangeDropdownCommentType={onChangeDropdownCommentType}
                                            addProductToCart={addProductToCart}
                                            subtractProductFromCart={subtractProductFromCart}
                                            removeProductFromCart={removeProductFromCart}
                                        />
                                    )
                                })
                            }

                        </div>
                    </div>

                </div>

                <div
                    className="w-1140px h-429px border-radius-8px background-color-grey-5 p-t-40px p-b-40px p-r-36px p-l-36px m-t-30px">
                    <h2 className="heebo font-s-30px font-w-bold font-stretch-normal font-style-normal line-h-1-13 letter-spacing-normal text-align-right color-green-1 m-r-47px m-b-10px">מוצרים
                        שאולי פספסת</h2>
                    <div className="flex aligns-items-center justify-content-space-evenly">
                        <img
                             className="p-10px pointer"
                             src={"/icons/cart-page/icon-arrow-left-green.svg"}
                             alt="Arrow pointing left"
                             onClick={()=>{swipLeft()}}
                        />

                        {/*Product Cards*/}
                        <div className="flex justify-content-space-between w-930px">
                            {
                                youMissedItemsView.map((value, index) => {
                                    return (
                                        <ProductCard
                                            key={index}
                                            onChangeDropdownUnitType={onChangeDropdownUnitType}
                                            product={value}
                                            addProductToCart={addProductToCart}
                                            subtractProductFromCart={subtractProductFromCart}
                                            removeProductFromCart={removeProductFromCart}
                                        />
                                    )
                                })
                            }
                        </div>

                        <img
                             className="p-10px pointer"
                             src={"/icons/cart-page/icon-arrow-right-green.svg"}
                             alt="Arrow pointing right"
                             onClick={()=>{swipRight()}}
                        />
                    </div>
                </div>

            </div>

            <footer>
                <SmallFooter/>
            </footer>

        </div>
    );
}

export default CartPage;

