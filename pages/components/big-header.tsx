import React, {useContext} from 'react';
import Link from 'next/link';

import {GlobalContext, GlobalContextType} from '../context/context';

const BigHeader = function () {

    const {
        globalContext, setGlobalContext
    } = useContext(GlobalContext) as GlobalContextType;

    const handleInputSearchChange = function (e: HTMLInputElement) {
        setGlobalContext({ ...globalContext, searchValue: e.value });
    }

    return (
        <div className="h-300px flex justify-content-center big-header-background relative z-index-10">
            <div className="w-1260px">
                <div className="h-75px flex">
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
                    <div className="w-33p flex justify-content-center aligns-items-center">
                        <label className="big-header-input relative">
                            <input
                                type="text"
                                placeholder="חיפוש מוצר"
                                className="rtl w-300px h-32px border-w-1-5px border-style-solid border-color-white border-radius-20px background-color-trans color-white-1 p-r-40px opacity-0-8 rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px"
                                onChange={(e)=>{handleInputSearchChange(e.target)}}
                                value={globalContext.searchValue}
                            />
                            <img src={"/icons/header/icon-search.svg"} alt="Search Icon"
                                 className="absolute top-9px right-13px"/>
                        </label>
                    </div>
                    <div className="w-33p">

                    </div>
                </div>
                <div className="h-225px flex justify-content-end">
                    <div className="flex aligns-items-center">
                        <div className="flex flex-direction-column aligns-items-end m-r-15px">
                            <p className="heebo font-s-30px h-34px font-w-bold font-stretch-normal font-style-normal line-h-1-13 letter-spacing-normal text-align-right color-white-1">
                                {globalContext.storeData.store.name}</p>
                            <div className="flex m-t-10px">
                                <p className="w-49px h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1 m-r-10px pointer">
                                    מתכונים</p>
                                <div className="color-white-1 m-r-10px">|</div>
                                <p className="w-63px h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1 m-r-10px pointer">
                                    יצירת קשר</p>
                                <div className="color-white-1 m-r-10px">|</div>
                                <p className="w-71px h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1 m-r-10px pointer">
                                    אזורי חלוקה</p>
                                <div className="color-white-1 m-r-10px">|</div>
                                <p className="w-34px h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1 m-r-10px pointer">
                                    אודות</p>
                                <img src={"/icons/header/icon-info.svg"} alt="Information Icon"/>
                            </div>
                            <div className="flex m-t-5px">
                                <p className="h-18px rubik font-s-14px font-w-500 font-stretch-normal font-style-normal line-h-1-29 letter-spacing-normal text-align-right color-white-1 m-r-10px pointer">
                                    {globalContext.storeData.store.businessFullAddressWithCity}</p>
                                <img src={"/icons/header/icon-location.svg"} alt="Location Icon"/>
                            </div>
                        </div>
                        <Link href={"/"}>
                            <img src={"/images/header/big-header-logo.png"} alt="Store Logo"
                                 className="w-160px h-160px pointer"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BigHeader;

