import React from 'react';

const BigFooter = function () {

    return (
        <div
            className="h-235px background-color-green-1 flex justify-content-center aligns-items-center w-100p">
            <div className="w-1260px flex justify-content-center relative">
                <div className="h-150px w-430px flex justify-content-end aligns-items-center">
                    <div className="m-r-100px">
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-b-15px pointer">
                            פרטי חשבון</p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-b-15px pointer">
                            אמצעי תשלום</p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-b-15px pointer">
                            מנויים שלי</p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 pointer">
                            היסטוריית הזמנות</p>
                    </div>
                    <div className="m-r-50px">
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-b-15px pointer">
                            אודות החנות</p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-b-15px pointer">
                            יצירת מנוי</p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-b-15px pointer">
                            אזורי חלוקה</p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 pointer">
                            יצירת קשר</p>
                    </div>
                </div>
                <div className="h-150px w-330px flex flex-direction-column aligns-items-center justify-content-center">
                    <div className="flex w-195px h-18px m-b-15px justify-content-end">
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-r-5px">
                            עיר שמש 73, תל אביב</p>
                        <img src={"/icons/footer/icon-location.svg"} alt="Location Icon" className="w-16px h-16px" />
                    </div>
                    <div className="flex w-195px h-18px m-b-15px justify-content-end">
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-r-5px">
                            08-6909026</p>
                        <img src={"/icons/footer/icon-phone.svg"} alt="Phone Icon" className="w-16px h-16px" />
                    </div>
                    <div className="flex w-195px h-18px m-b-15px justify-content-end">
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-r-5px">
                            sweetveg2015@gmail.com</p>
                        <img src={"/icons/footer/icon-mail.svg"} alt="Mail Icon" className="w-16px h-13px" />
                    </div>
                    <div className="flex w-195px h-18px justify-content-end">
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-r-5px">
                            מתוק התפוח</p>
                        <img src={"/icons/footer/icon-facebook.svg"} alt="Facebook Icon" className="w-16px h-16px" />
                    </div>
                </div>
                <div className="h-150px w-500px flex">
                    <div className="flex flex-direction-column justify-content-center m-r-15px">
                        <p className="heebo font-s-22px font-w-bold font-stretch-normal font-style-normal line-h-1-09 letter-spacing-minus-0-2px text-align-right color-white-1">
                            מתוק התפוח
                        </p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 opacity-0-8 m-t-10px">
                            אצלנו תוכלו למצוא מגוון רחב של מוצרים בניהם ירקות ופירות מובחרים וטריים, מגשי פירות מעוצבים,
                            חמוצים
                            ביתיים וכו’.
                        </p>
                        <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 opacity-0-8">
                            אנו שמים לעצמו מטרה לתת לכם קהל לקוחותינו את המוצרים הטובים והטריים ביותר וכמובן את השירות
                            הטוב
                            ביותר.
                        </p>
                        <p className="opacity-0-8 rubik font-s-12px font-w-normal font-stretch-normal font-style-normal line-h-1-5 letter-spacing-minus-0-09px text-align-right color-white-1 m-t-5px">
                            ״מתוק התפוח״, ע.מ. 028490076
                        </p>
                    </div>
                    <img src={"/images/footer/store-logo.png"} alt="Store Logo" className="w-125px h-125px" />
                </div>
                <img src={"/images/footer/nana.png"} alt="Nana Picture"
                     className="w-86px h-70px absolute top-minus-68px right-0px" />
                    <img src={"/images/footer/red-orange.png"} alt="Red Orange Picture"
                         className="w-100px h-85px absolute bottom-minus-65px left-0px z-index-1" />
            </div>
        </div>
    );
}

export default BigFooter;

