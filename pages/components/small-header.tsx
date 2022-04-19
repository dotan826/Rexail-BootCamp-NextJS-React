import React from 'react';
import Link from 'next/link';

import {SmallHeaderProps} from '../types/appTypes';
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../Redux/reduxTypes";
import {updateSearchInput} from '../Redux/Actions/storeActions';

const SmallHeader = function ({mainPage = false, cartPage = false, checkoutPage = false}: SmallHeaderProps) {

    const storeData = useSelector((state: RootReducer) => state.storeReducer.storeData);
    const searchValue = useSelector((state: RootReducer) => state.storeReducer.searchValue);
    const dispatch = useDispatch();

    const handleInputSearchChange = function (e: HTMLInputElement) {
        dispatch(updateSearchInput(e.value));
    }

    return (
        <div className="h-80px background-color-green-1 flex justify-content-center fixed top-0px w-100p z-index-5">
            <div className="w-1260px flex justify-content-center">

                {
                    mainPage &&
                    <div className="w-33p flex aligns-items-center">
                        <div
                            className="w-97px h-32px flex aligns-items-center justify-content-space-between m-r-40px pointer">
                            <p className="w-57px h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1">
                                התחברות</p>
                            <img src={"/icons/header/icon-user.svg"} alt="User Icon"/>
                        </div>
                        <div className="w-95px h-19px flex aligns-items-center justify-content-space-between pointer">
                            <p className="w-72px h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1">
                                לאן מגיעים ?</p>
                            <img src={"/icons/header/icon-navigation.svg"} alt="Navigation Icon"/>
                        </div>
                    </div>
                }

                {
                    cartPage &&
                    <div className="w-33p flex aligns-items-center">
                        <div
                            className="w-125px h-32px flex aligns-items-center justify-content-space-between m-r-40px pointer">
                            <img src={"/icons/header/icon-arrow-down.svg"} alt="Arrow pointing down Icon" className=""/>
                            <p className="h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1">היי
                                אינסה !</p>
                            <img src={"/icons/header/icon-user.svg"} alt="User Icon"/>
                        </div>
                        <div className="w-190px h-19px flex aligns-items-center justify-content-space-between pointer">
                            <div>
                                <p className="h-18px rubik font-s-14px font-w-500 font-stretch-normal font-w-bold line-h-1-29 letter-spacing-normal text-align-right color-white-1">דרך
                                    משה דיין 20, תל אביב</p>
                                <p className="h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1">מחר,
                                    12:00-16:00</p>
                            </div>
                            <img src={"/icons/header/icon-delivery-rounded.svg"} alt="Delivery Truck Icon"
                                 className=""/>
                        </div>
                    </div>
                }

                {
                    checkoutPage &&
                    <div className="w-33p flex aligns-items-center">
                        <Link href={"/cart-page"}>
                            <div
                                className="w-125px h-32px flex aligns-items-center justify-content-space-between m-r-40px pointer"
                            >
                                <img
                                    src={"/icons/header/icon-arrow-left.svg"}
                                    alt="Arrow pointing left Icon"
                                />
                                <p className="h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1">
                                    חזרה לסל הקניות</p>
                            </div>
                        </Link>
                    </div>
                }

                <div className="w-33p flex justify-content-center aligns-items-center">
                    {
                        (mainPage || cartPage) &&
                        <label className="big-header-input relative">
                            <input
                                type="text"
                                placeholder="חיפוש מוצר"
                                className="rtl w-300px h-32px border-w-1-5px border-style-solid border-color-white border-radius-20px background-color-trans color-white-1 p-r-40px opacity-0-8 rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px"
                                onChange={(e)=>{handleInputSearchChange(e.target)}}
                                value={searchValue}
                            />
                            <img src={"/icons/header/icon-search.svg"} alt="Search Icon"
                                 className="absolute top-9px right-13px"/>
                        </label>
                    }
                </div>

                <div className="w-33p flex justify-content-end aligns-items-center">
                    <p className="heebo font-s-30px font-w-bold font-stretch-normal font-style-normal line-h-1-13 letter-spacing-normal text-align-right color-white-1 m-r-15px">
                        {storeData.store.name}
                    </p>
                    <Link href={"/"}>
                        <img src={"/images/header/big-header-logo.png"} alt="Store Logo"
                             className="w-60px h-60px pointer"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SmallHeader;

