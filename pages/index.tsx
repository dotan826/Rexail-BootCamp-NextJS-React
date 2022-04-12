import React, {useContext, useEffect, useMemo, useState} from 'react';
import {GetStaticProps} from 'next';
import {useRouter} from 'next/router';

import {GlobalContext, GlobalContextType} from './context/context';

import BigHeader from './components/big-header';
import SmallHeader from './components/small-header';
import BigFooter from './components/big-footer';
import SmallFooter from './components/small-footer';
import SmallCartRow from './components/small-cart-row';
import ProductCard from './components/product-card';

import {WebProps, MainPageProps, ProductRawData, ProductCardProps} from './types/appTypes';

import { addProductToCart, subtractProductFromCart, removeProductFromCart, emptyCart } from './services/productActions';
import { onChangeDropdownUnitType, toggleOffDropdown, toggleOnDropdownUnitType } from './services/dropdownUtils';

const Home = function ({}: MainPageProps) {

    const {
        globalContext, setGlobalContext
    } = useContext(GlobalContext) as GlobalContextType;

    const [selectedCategory, setSelectedCategory] = useState<string>("כל המוצרים");
    const [categoryPopupHover, setCategoryPopupHover] = useState<boolean>(false);
    const [productListToShow, setProductListToShow] = useState<ProductRawData[]>(globalContext.catalogData);
    const [dropdownSelectedSortType, setDropdownSelectedSortType] = useState<string>("מיין לפי");
    const [toggleDropdownSort, setToggleDropdownSort] = useState<boolean>(false);

    useEffect(()=>{
        const debounce = setTimeout(()=>{
            let filteredSearch: any[];
            if(selectedCategory === "כל המוצרים"){
                // Get All Products & filter names :
                filteredSearch = globalContext.catalogData.filter((product)=>{
                    return (product.product.name.includes(globalContext.searchValue));
                });
            }
            else if(selectedCategory === "מבצעים"){
                // Get Sales Products :
                let currentCategoryProducts: ProductRawData[] = globalContext.catalogData.filter(function (product) {
                    return product.promoted;
                });
                // Filter by Names :
                filteredSearch = currentCategoryProducts.filter((product)=>{
                    return (product.product.name.includes(globalContext.searchValue));
                });
            }
            else{
                // Get Current Category Index :
                const categoryIndex: number = globalContext.categoriesWithProductsList.findIndex(function (category) {
                    return category[0] === selectedCategory;
                });
                // Get Current Category Products :
                let currentCategoryProducts: ProductRawData[] = globalContext.categoriesWithProductsList[categoryIndex][1];
                // Filter by Names :
                filteredSearch = currentCategoryProducts.filter((product)=>{
                    return (product.product.name.includes(globalContext.searchValue));
                });
            }
            setProductListToShow(filteredSearch);
        }, 800);

        return function cleanup(){
            clearTimeout(debounce);
        }
    }, [globalContext.searchValue]);

    const router = useRouter();

    /**
     * Navigate to Category.
     * @param categoryName Category Name.
     */
    const navigateToCategory = function (categoryName: string) {
        setDropdownSelectedSortType("מיין לפי"); // reset sort option
        setSelectedCategory(categoryName);
        if(categoryName === "כל המוצרים"){
            setProductListToShow(globalContext.catalogData);
        }
        else if(categoryName === "מבצעים"){
            setProductListToShow(globalContext.catalogData.filter(function (product) {
                return product.promoted;
            }));
        }
        else {
            const categoryIndex = globalContext.categoriesWithProductsList.findIndex(function (category) {
                return category[0] === categoryName;
            });
            setProductListToShow((globalContext.categoriesWithProductsList)[categoryIndex as number][1]);
        }
    }

    /**
     * Save selected sort type (used for filter function) & Sort the array with comparator function for each sort type !
     * @param sortType Sort type (string).
     */
    const changeSortType = function (sortType: string) {
        setDropdownSelectedSortType(sortType);

        if(sortType === "שם מוצר"){
            productListToShow.sort(function (a, b) {
                if(a.product.name < b.product.name) {
                    return -1;
                }
                else if(a.product.name > b.product.name) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if(sortType === "מחיר מהנמוך לגבוה"){
            productListToShow.sort(function (a, b) {
                if(a.price < b.price) {
                    return -1;
                }
                else if(a.price > b.price) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if(sortType === "מחיר מהגבוה לנמוך"){
            productListToShow.sort(function (a, b) {
                if(a.price > b.price) {
                    return -1;
                }
                else if(a.price < b.price) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
        else if(sortType === "מוצרים במבצע"){
            productListToShow.sort(function (a, b) {
                if(a.promoted) {
                    return -1;
                }
                else if(b.promoted) {
                    return 1;
                }
                else {
                    return 0;
                }

            });
        }
    }


    return (

        <div className="h-min-100vh">

            <header>
                <BigHeader/>
                <SmallHeader mainPage={true}/>
            </header>

            <div
                className="h-min-1300px flex flex-direction-column aligns-items-center p-b-395px background-color-grey-2">

                {/*Products Navigation*/}
                <div
                    className="w-100p background-color-white-1 flex justify-content-center box-shadow-1 sticky top-80px z-index-5"
                    onMouseLeave={()=>{setCategoryPopupHover(false)}}
                >
                    <nav
                        className="w-1260px h-60px flex justify-content-space-between aligns-items-center flex-direction-row-reverse relative">
                        <div
                            className={"category-hover-effect w-100p h-100p p-5px flex justify-content-center aligns-items-center pointer white-space-nowrap rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-grey-3 " + (selectedCategory === "כל המוצרים" ? ' category-active-effect ' : '')}
                            onClick={()=>{navigateToCategory("כל המוצרים")}}
                        >כל
                            המוצרים
                        </div>
                        <div
                            className={"category-hover-effect w-100p h-100p p-5px flex justify-content-center aligns-items-center pointer white-space-nowrap rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-grey-3 " + (selectedCategory === "מבצעים" ? ' category-active-effect ' : '')}
                            onClick={()=>{navigateToCategory("מבצעים")}}
                        >מבצעים
                        </div>

                        {
                            globalContext.categoriesWithProductsList.slice(0, 10).map((value, index) => {
                                return (
                                    <p
                                        className={"category-hover-effect w-100p h-100p p-5px flex justify-content-center aligns-items-center pointer rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-grey-3 white-space-nowrap " + (selectedCategory === value[0] ? ' category-active-effect ' : '')}
                                        key={index}
                                        onClick={()=>{navigateToCategory(value[0])}}
                                    >
                                        {value[0]}
                                    </p>
                                )
                            })
                        }

                        <div
                            className="w-100p pointer h-100p p-5px flex justify-content-center aligns-items-center pointer white-space-nowrap rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-grey-3"
                            onMouseEnter={()=>{setCategoryPopupHover(true)}}
                        >
                            עוד
                        </div>
                        <div
                            className={"absolute left-minus-120px top-50px w-190px h-400px " + (categoryPopupHover ? ' category-more-show-popup ' : ' category-more-hide-popup ')}
                        >
                            <div
                                className="background-color-white-1 flex flex-direction-column aligns-items-end box-shadow-2 border-radius-10px p-10px"
                                onMouseLeave={()=>{setCategoryPopupHover(false)}}
                            >

                                {
                                    globalContext.categoriesWithProductsList.slice(10).map((value, index) => {
                                        return (
                                            <p
                                                className={"category-hover-effect w-100p pointer p-5px white-space-nowrap rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-grey-3 " + (selectedCategory === value[0] ? ' category-active-effect ' : '')}
                                                key={index}
                                                onClick={()=>{navigateToCategory(value[0])}}
                                            >
                                                {value[0]}
                                            </p>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </nav>
                </div>

                <div className="w-1260px flex justify-content-space-between h-min-1240px p-t-10px">

                    {/*Small Shopping Cart*/}
                    <div className="w-330px h-532px sticky top-150px">
                        <div className="box-shadow-2 w-320px h-532px border-radius-8px background-color-white-1">
                            <div
                                className="flex w-320px h-70px background-color-green-1 border-radius-top-right-8px border-radius-top-left-8px p-t-12px p-b-12px p-r-16px p-l-16px flex justify-content-space-between aligns-items-center">
                                <button
                                    className="w-85px h-46px p-t-5px p-r-15px p-b-7px p-l-16px border-radius-6px m-r-45px border-none background-color-green-2 pointer color-white-1"
                                    onClick={() => {
                                        router.push("/cart-page")
                                    }}
                                    disabled={globalContext.cart.length === 0}
                                >
                                    המשך לתשלום
                                </button>
                                <div className="h-46px flex flex-direction-column justify-content-center">
                                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 w-82px">סל
                                        הקניות שלי</p>
                                    <p className="heebo font-s-18px font-w-600 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-4px text-align-right color-white-1">₪{globalContext.cartSum.toFixed(2)}</p>
                                </div>
                                <div className="w-37px h-32px relative">
                                    <img src={"/icons/main-page/busket.svg"}
                                         alt="Basket with number indicating sum of products in the cart"
                                         width="37"
                                         height="32"
                                    />
                                    <p className="absolute top-14px left-15px font-s-13px color-white-1">{globalContext.cart.length}</p>
                                </div>
                                <img src={"/icons/main-page/button-arrow-up.svg"}
                                     alt="Arrow pointing up for hiding the basket"
                                     width="22px"
                                     height="22px"
                                />
                            </div>
                            <div
                                className="w-320px h-32px flex justify-content-space-between aligns-items-center p-r-16px p-l-16px background-color-grey-3">
                                <div className="flex w-144px">
                                    {
                                        globalContext.cart.length >= 1 &&
                                        <div
                                            className="flex pointer"
                                            onClick={()=>{emptyCart(globalContext, setGlobalContext)}}
                                        >
                                            <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-grey-3 m-r-5px">מחיקת
                                                סל</p>
                                            <img src={"/icons/main-page/icon-trash.svg"}
                                                 alt="Clear basket"
                                                 width="18px"
                                                 height="18px"
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="flex w-144px pointer">
                                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-grey-3 m-r-5px">טעינת
                                        הזמנה קודמת</p>
                                    <img src={"/icons/main-page/icon-refresh.svg"}
                                         alt="reload earlier shopping order"
                                         width="18px"
                                         height="18px"
                                    />
                                </div>
                            </div>

                            <div className="w-330px h-310px p-r-17px background-color-special-small-cart-row overflow-y-auto overflow-x-hide rtl">
                                {
                                    globalContext.cart.length === 0 &&
                                    <div className="w-320px h-310px relative">
                                        <img src={"/images/main-page/empty-basket.png"}
                                             alt="empty basket picture"
                                             className="absolute top-60px left-70px"
                                             width="172px"
                                             height="204px"
                                        />
                                    </div>
                                }

                                {/*Small Cart Rows*/}
                                {/*{*/}
                                {/*    globalContext.cart.map((value, index) => {*/}
                                {/*        return (*/}
                                {/*            <SmallCartRow*/}
                                {/*                key={index}*/}
                                {/*                product={value}*/}
                                {/*                toggleOffDropdown={toggleOffDropdown}*/}
                                {/*                toggleOnDropdownUnitType={toggleOnDropdownUnitType}*/}
                                {/*                onChangeDropdownUnitType={onChangeDropdownUnitType}*/}
                                {/*                addProductToCart={addProductToCart}*/}
                                {/*                subtractProductFromCart={subtractProductFromCart}*/}
                                {/*                removeProductFromCart={removeProductFromCart}*/}
                                {/*            />*/}
                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}

                            </div>

                            <div
                                className="w-320px h-120px background-color-white-1 flex flex-direction-column aligns-items-center border-radius-8px p-t-20px">
                                <button
                                    className="w-288px h-46px flex aligns-items-center border-none border-radius-6px pointer"
                                    onClick={() => {
                                        router.push("/cart-page")
                                    }}
                                    disabled={globalContext.cart.length === 0}
                                >
                                    <p className="w-104px border-radius-bottom-left-6px border-radius-top-left-6px background-color-green-3 h-100p flex justify-content-center aligns-items-center rubik font-s-18px font-w-500 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-1px color-white-1">₪{globalContext.cartSum.toFixed(2)}</p>
                                    <p className="w-184px border-radius-top-right-6px border-radius-bottom-right-6px background-color-green-2 h-100p flex justify-content-center aligns-items-center heebo font-s-18px font-w-600 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-4px color-white-1">המשך
                                        לתשלום</p>
                                </button>
                                <p className="m-t-8px rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-grey-2">שערוך.
                                    עלות סופית לפי שקילה.</p>
                            </div>
                        </div>
                    </div>


                    {/*Product Cards Area*/}
                    <div className="w-900px m-t-35px">

                        <div className="flex justify-content-space-between aligns-items-center">

                            {/*Dropdown Sort*/}
                            <div
                                className="h-45px flex aligns-items-center"
                                onMouseLeave={()=>{setToggleDropdownSort(false)}}
                            >
                                <div className="dropdown-sort">
                                    <button
                                        className="dropdown-sort-button"
                                        onClick={()=>{setToggleDropdownSort(true)}}
                                    >
                                        {dropdownSelectedSortType}
                                    </button>
                                    <div
                                        className={"dropdown-sort-content " + (toggleDropdownSort ? ' show-flex ' : '')}
                                        onClick={()=>{setToggleDropdownSort(false)}}
                                    >
                                        <a onClick={()=>{changeSortType("שם מוצר")}}>שם מוצר</a>
                                        <a onClick={()=>{changeSortType("מחיר מהנמוך לגבוה")}}>מחיר מהנמוך לגבוה</a>
                                        <a onClick={()=>{changeSortType("מחיר מהגבוה לנמוך")}}>מחיר מהגבוה לנמוך</a>
                                        <a onClick={()=>{changeSortType("מוצרים במבצע")}}>מוצרים במבצע</a>
                                    </div>
                                    <img className={"dropdown-arrow-up " + (toggleDropdownSort ? ' show-block ' : '')}
                                         src={"/icons/main-page/icon-arrow-up.svg"}
                                         alt="Arrow pointing up"
                                         width="20px"
                                         height="20px"
                                    />
                                    <img className={"dropdown-arrow-down " + (toggleDropdownSort ? ' show-none ' : '')}
                                         src={"/icons/main-page/icon-arrow-down.svg"}
                                         alt="Arrow pointing down"
                                         width="20px"
                                         height="20px"
                                    />
                                </div>
                            </div>

                            <h2 className="heebo font-s-36px font-w-bold font-stretch-normal font-style-normal line-h-1-06 letter-spacing-normal text-align-right color-green-1">{selectedCategory}</h2>
                        </div>

                        <div className="flex justify-content-start gap-22px flex-wrap rtl m-t-35px">

                            {/*Product Cards*/}
                            {
                                productListToShow.map((value, index) => {
                                    return (
                                        // <ProductCard
                                        //     key={index}
                                        //     onChangeDropdownUnitType={onChangeDropdownUnitType}
                                        //     product={value}
                                        //     addProductToCart={addProductToCart}
                                        //     subtractProductFromCart={subtractProductFromCart}
                                        //     removeProductFromCart={removeProductFromCart}
                                        // />

                                        <ProductCardComponentMemo
                                            key={index}
                                            product={value}
                                            addProductToCart={addProductToCart}
                                            subtractProductFromCart={subtractProductFromCart}
                                            removeProductFromCart={removeProductFromCart}
                                            onChangeDropdownUnitType={onChangeDropdownUnitType}
                                        />

                                    )
                                })
                            }

                        </div>
                    </div>


                </div>
            </div>

            <footer>
                <BigFooter/>
                <SmallFooter/>
            </footer>

        </div>


    );

}


export const getStaticProps: GetStaticProps = async function () {

    return {
        props: {} as WebProps
    };
}


const ProductCardComponentMemo = function ({ product, onChangeDropdownUnitType, addProductToCart, subtractProductFromCart, removeProductFromCart }: ProductCardProps) {
    const ProductCardComponentMemo = useMemo(()=><ProductCard product={product} onChangeDropdownUnitType={onChangeDropdownUnitType} addProductToCart={addProductToCart} subtractProductFromCart={subtractProductFromCart} removeProductFromCart={removeProductFromCart} />, [product]);
    return (
        <>
            {ProductCardComponentMemo}
        </>
    );
}


export default Home;
