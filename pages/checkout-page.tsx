import React, { useContext } from 'react';
import { useFormik } from 'formik';

import { GlobalContext, GlobalContextType } from './context/context';

import SmallHeader from "./components/small-header";
import SmallFooter from "./components/small-footer";

import { CheckoutPageProps } from './types/appTypes';

interface ErrorsType {
    clientName?: string;
    clientId?: string;
    creditCardNumber?: string;
    cvvNumber?: string;
    expirationDate?: string;
}

const validate = (values: any) => {
    const errors: ErrorsType = {};
    if (!values.clientName) {
        errors.clientName = 'Required';
    } else if (values.clientName.length > 20) {
        errors.clientName = 'Must be 20 characters or less';
    }

    if (!values.clientId) {
        errors.clientId = 'Required';
    } else if (!/^([1-9][0-9]{0,8})$/.test(values.clientId)) {
        errors.clientId = 'Invalid ID Number';
    }

    if (!values.creditCardNumber) {
        errors.creditCardNumber = 'Required';
    } else if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(values.creditCardNumber)) {
        errors.creditCardNumber = 'Invalid Credit Card Number';
    }

    if (!values.cvvNumber) {
        errors.cvvNumber = 'Required';
    } else if (!/^([1-9][0-9]{2})$/.test(values.cvvNumber)) {
        errors.cvvNumber = 'Invalid CVV Number';
    }

    if (!values.expirationDate) {
        errors.expirationDate = 'Required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-3][0-9])$/.test(values.expirationDate)) {
        errors.expirationDate = 'Invalid Expiration Date';
    }

    return errors;
};

const CheckoutPage = function ({}: CheckoutPageProps) {

    const {
        globalContext
    } = useContext(GlobalContext) as GlobalContextType;

    const formik = useFormik({
        initialValues: {
            clientName: '',
            clientId: '',
            creditCardNumber: '',
            cvvNumber: '',
            expirationDate: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="h-min-100vh">

            <header>
                <SmallHeader checkoutPage={true}/>
            </header>

            <div
                className="h-min-900px flex flex-direction-column justify-content-center aligns-items-center background-color-grey-3 p-t-105px p-b-130px relative">

                <div className="w-100p h-210px background-color-green-2 absolute top-80px z-index-3"/>

                <div
                    className="w-1140px h-70px flex justify-content-center z-index-4 border-radius-8px background-color-green-3">

                    <div className="w-555px flex justify-content-space-between aligns-items-center">
                        <div className="h-36px flex aligns-items-center">
                            <p className="rubik font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-normal text-align-right color-white-1 m-r-8px">תשלום</p>
                            <div
                                className="w-36px h-36px background-color-white-1 flex justify-content-center aligns-items-center border-radius-20px">
                                <p className="heebo font-s-18px font-w-bold font-stretch-normal font-style-normal line-h-1-22 letter-spacing-normal text-align-center color-green-1">3</p>
                            </div>
                        </div>
                        <div className="h-36px flex aligns-items-center">
                            <p className="rubik font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-normal text-align-right color-white-1 m-r-8px">תיאום
                                הגעה</p>
                            <img src={"/icons/checkout-page/progress-bar-completed.svg"}
                                 alt="Progress bar step complete indication"
                                 className="w-36px h-36px"
                            />
                        </div>
                        <div className="h-36px flex aligns-items-center">
                            <p className="rubik font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-normal text-align-right color-white-1 m-r-8px">פרטים
                                אישיים</p>
                            <img src={"/icons/checkout-page/progress-bar-completed.svg"}
                                 alt="Progress bar step complete indication"
                                 className="w-36px h-36px"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-1140px h-min-720px flex justify-content-space-between z-index-4 m-t-25px">

                    {/*Order Summary*/}
                    <div
                        className="w-330px h-709px background-color-white-1 border-radius-8px p-t-13px p-r-15px p-b-30px p-l-16px">
                        <p>סיכום הזמנה</p>

                        <div
                            className="w-298px h-1px m-t-11px border-style-solid border-w-0-5px border-color-light-grey-4 m-t-11px m-b-17px"/>

                        <div className="h-min-50px flex justify-content-space-between aligns-items-center">
                            <img src={"/icons/checkout-page/icon-edit.svg"}
                                 alt="edit line"
                                 className="w-18px h-18px pointer"
                            />
                            <div className="w-250px align-self-start">
                                <p className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-23 letter-spacing-minus-0-2px text-align-right color-grey-1">הערות
                                    למכין ההזמנה</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">{globalContext.preparationNotes}</p>
                            </div>
                        </div>

                        <div
                            className="w-298px h-1px m-t-20px m-b-20px border-style-solid border-w-0-5px border-color-light-grey-4"/>

                        <div className="h-min-50px flex justify-content-space-between aligns-items-center">
                            <img src={"/icons/checkout-page/icon-edit.svg"}
                                 alt="edit line"
                                 className="w-18px h-18px pointer"
                            />
                            <div className="w-250px align-self-start">
                                <p className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-23 letter-spacing-minus-0-2px text-align-right color-grey-1">קוד
                                    קופון</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">sweetapple20%</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">חסכתם
                                    60 ש״ח (20%)</p>
                            </div>
                        </div>

                        <div
                            className="w-298px h-1px m-t-20px m-b-20px border-style-solid border-w-0-5px border-color-light-grey-4 m-b-17px"/>

                        <div className="h-min-50px flex justify-content-space-between aligns-items-center">
                            <img src={"/icons/checkout-page/icon-edit.svg"}
                                 alt="edit line"
                                 className="w-18px h-18px pointer"
                            />
                            <div className="w-250px align-self-start">
                                <p className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-23 letter-spacing-minus-0-2px text-align-right color-grey-1">פרטים
                                    אישיים</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">אינסה
                                    מלייב</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">inesa@rexail.com</p>
                            </div>
                        </div>

                        <div
                            className="w-298px h-1px m-t-20px m-b-20px border-style-solid border-w-0-5px border-color-light-grey-4 m-b-17px"/>

                        <div className="h-min-50px flex justify-content-space-between aligns-items-center">
                            <img src={"/icons/checkout-page/icon-edit.svg"}
                                 alt="edit line"
                                 className="w-18px h-18px pointer"
                            />
                            <div className="w-250px align-self-start">
                                <p className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-23 letter-spacing-minus-0-2px text-align-right color-grey-1">כתובת</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">דרך
                                    משה דיין 20, תל אביב</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">קומה
                                    3, דירה 10</p>
                            </div>
                        </div>

                        <div
                            className="w-298px h-1px m-t-20px m-b-20px border-style-solid border-w-0-5px border-color-light-grey-4 m-b-17px"/>

                        <div className="h-min-50px flex justify-content-space-between aligns-items-center">
                            <img src={"/icons/checkout-page/icon-edit.svg"}
                                 alt="edit line"
                                 className="w-18px h-18px pointer"
                            />
                            <div className="w-250px align-self-start">
                                <p className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-23 letter-spacing-minus-0-2px text-align-right color-grey-1">משלוח</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">חמישי
                                    22.10</p>
                                <p className="rubik font-s-15px font-w-normal font-stretch-normal font-style-normal line-h-1-4 letter-spacing-minus-0-2px text-align-right color-grey-3">בין
                                    השעות 12:00-16:00</p>
                            </div>
                        </div>

                        <div
                            className="w-298px h-1px m-t-20px m-b-20px border-style-solid border-w-0-5px border-color-light-grey-4 m-b-17px"/>

                        <div className="flex justify-content-space-between m-b-12px">
                            <p className="heebo font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-black-1">₪{globalContext.cartSum.toFixed(2)}</p>
                            <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-grey-1 text-align-right">סה״כ
                                סל קניות</p>
                        </div>

                        <div className="flex justify-content-space-between m-b-12px">
                            <p className="heebo font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-black-1">₪0</p>
                            <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-grey-1 text-align-right">הנחת
                                קופון</p>
                        </div>

                        <div className="flex justify-content-space-between m-b-12px">
                            <p className="heebo font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-black-1">₪30.00</p>
                            <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-grey-1 text-align-right">משלוח</p>
                        </div>

                        <div className="flex justify-content-space-between m-b-12px">
                            <p className="heebo font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px color-black-1">₪{(globalContext.cartSum + 30).toFixed(2)}</p>
                            <p className="rubik font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-1px color-black-1 text-align-right">סה״כ
                                לתשלום</p>
                        </div>

                        <div className="flex justify-content-center">
                            <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-center color-grey-2">שערוך.
                                עלות סופית לפי שקילה.</p>
                        </div>

                    </div>

                    {/*Checkout Details*/}
                    <div
                        className="w-788px h-688px border-radius-8px background-color-white-1 p-t-42px p-r-44px p-l-44px p-b-44px">

                        <div className="flex flex-direction-column aligns-items-end">
                            <h2 className="heebo font-s-30px font-w-bold font-stretch-normal font-style-normal line-h-1-13 letter-spacing-normal text-align-right color-green-1">תשלום</h2>
                            <p className="m-t-25px rubik font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-1px text-align-right color-grey-3">בחרו
                                אמצעי תשלום</p>
                        </div>

                        <div className="flex justify-content-space-between m-t-20px">
                            <div
                                className="w-159px h-80px p-t-12px p-r-34px p-l-34px p-b-14px border-radius-6px border-w-1-5px border-style-solid border-color-green-1 flex flex-direction-column aligns-items-center pointer">
                                <img src={"/icons/checkout-page/icon-no-payment.svg"}
                                     alt="no payment indication"
                                     className="w-32px h-32px"
                                />
                                <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-grey-4">ללא
                                    תשלום</p>
                            </div>
                            <div
                                className="w-159px h-80px p-t-12px p-r-34px p-l-34px p-b-14px border-radius-6px border-w-1-5px border-style-solid border-color-green-1 flex flex-direction-column aligns-items-center pointer">
                                <img src={"/icons/checkout-page/icon-cycle.svg"}
                                     alt="circle indication"
                                     className="w-32px h-32px"
                                />
                                <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-grey-4 w-95px">תשלום
                                    בהקפה</p>
                            </div>
                            <div
                                className="w-159px h-80px p-t-12px p-r-34px p-l-34px p-b-14px border-radius-6px border-w-1-5px border-style-solid border-color-green-1 flex flex-direction-column aligns-items-center pointer">
                                <img src={"/icons/checkout-page/icon-cash.svg"}
                                     alt="cash payment indication"
                                     className="w-32px h-32px"
                                />
                                <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-grey-4">מזומן</p>
                            </div>
                            <div
                                className="w-159px h-80px p-t-12px p-r-34px p-l-34px p-b-14px border-radius-6px border-w-1-5px border-style-solid border-color-green-1 flex flex-direction-column aligns-items-center background-color-green-2 pointer">
                                <img src={"/icons/checkout-page/icon-credit-card-2.svg"}
                                     alt="credit payment indication"
                                     className="w-32px h-32px"
                                />
                                <p className="rubik font-s-16px font-w-normal font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-2px text-align-center color-white-1">כרטיס
                                    אשראי</p>
                            </div>
                        </div>

                        <div
                            className="w-700px h-1px m-t-22px border-style-solid border-w-0-5px border-color-light-grey-4"/>

                        <form onSubmit={formik.handleSubmit}>

                            <p className="m-t-25px rubik font-s-16px font-w-500 font-stretch-normal font-style-normal line-h-1-25 letter-spacing-minus-0-1px text-align-right color-grey-3">פרטי
                                כרטיס אשראי</p>

                            <div className="w-700px m-t-12px">
                                <div className="flex justify-content-space-between">
                                    <div className="flex flex-direction-column">
                                        <label
                                            className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-15 letter-spacing-minus-0-1px text-align-right color-grey-1"
                                            htmlFor={"clientId"}
                                        >ת.ז.
                                            בעל הכרטיס *</label>
                                        <input
                                               className="w-335px h-40px border-radius-6px p-t-10px p-r-12px p-b-10px p-l-14px border-style-solid border-w-0-5px border-color-light-grey-3 m-t-7px rtl"
                                               id="clientId"
                                               name="clientId"
                                               type="text"
                                               onChange={formik.handleChange}
                                               value={formik.values.clientId}
                                               onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.clientId && formik.errors.clientId ? <div className={"error-message"}>{formik.errors.clientId}</div> : null}
                                    </div>
                                    <div className="flex flex-direction-column">
                                        <label
                                            className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-15 letter-spacing-minus-0-1px text-align-right color-grey-1"
                                            htmlFor={"clientName"}
                                        >שם
                                            בעל הכרטיס *</label>
                                        <input
                                               className="w-335px h-40px border-radius-6px p-t-10px p-r-12px p-b-10px p-l-14px border-style-solid border-w-0-5px border-color-light-grey-3 m-t-7px rtl"
                                               id="clientName"
                                               name="clientName"
                                               type="text"
                                               onChange={formik.handleChange}
                                               value={formik.values.clientName}
                                               onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.clientName && formik.errors.clientName ? <div className={"error-message"}>{formik.errors.clientName}</div> : null}
                                    </div>
                                </div>
                                <div className="flex justify-content-space-between m-t-20px">
                                    <div className="w-335px flex justify-content-space-between">
                                        <div className="flex flex-direction-column">
                                            <label
                                                className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-15 letter-spacing-minus-0-1px text-align-right color-grey-1"
                                                htmlFor={"expirationDate"}
                                            >תוקף
                                                *</label>
                                            <input
                                                   className="w-153px h-40px border-radius-6px p-t-10px p-r-12px p-b-10px p-l-14px border-style-solid border-w-0-5px border-color-light-grey-3 m-t-7px rtl"
                                                   id="expirationDate"
                                                   name="expirationDate"
                                                   type="text"
                                                   onChange={formik.handleChange}
                                                   value={formik.values.expirationDate}
                                                   onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.expirationDate && formik.errors.expirationDate ? <div className={"error-message"}>{formik.errors.expirationDate}</div> : null}
                                        </div>
                                        <div className="flex flex-direction-column">
                                            <label
                                                className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-15 letter-spacing-minus-0-1px text-align-right color-grey-1"
                                                htmlFor={"cvvNumber"}
                                            >*
                                                CVV</label>
                                            <input
                                                   className="w-153px h-40px border-radius-6px p-t-10px p-r-12px p-b-10px p-l-14px border-style-solid border-w-0-5px border-color-light-grey-3 m-t-7px rtl"
                                                   id="cvvNumber"
                                                   name="cvvNumber"
                                                   type="text"
                                                   onChange={formik.handleChange}
                                                   value={formik.values.cvvNumber}
                                                   onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.cvvNumber && formik.errors.cvvNumber ? <div className={"error-message"}>{formik.errors.cvvNumber}</div> : null}
                                        </div>
                                    </div>
                                    <div className="flex flex-direction-column">
                                        <label
                                            className="rubik font-s-13px font-w-normal font-stretch-normal font-style-normal line-h-1-15 letter-spacing-minus-0-1px text-align-right color-grey-1"
                                            htmlFor={"creditCardNumber"}
                                        >מספר
                                            כרטיס אשראי *</label>
                                        <input
                                               className="w-335px h-40px border-radius-6px p-t-10px p-r-12px p-b-10px p-l-14px border-style-solid border-w-0-5px border-color-light-grey-3 m-t-7px rtl"
                                               id="creditCardNumber"
                                               name="creditCardNumber"
                                               type="text"
                                               onChange={formik.handleChange}
                                               value={formik.values.creditCardNumber}
                                               onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.creditCardNumber && formik.errors.creditCardNumber ? <div className={"error-message"}>{formik.errors.creditCardNumber}</div> : null}
                                    </div>
                                </div>
                            </div>

                            <div className="w-700px m-t-12px flex justify-content-end aligns-items-center">
                                <img src={"/icons/checkout-page/icon-info-2.svg"}
                                     alt="information icon to see more details"
                                     className="w-16px h-16px m-r-8px"
                                />
                                <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-grey-3 m-r-9px">שמור
                                    את פרטי כרטיס האשראי להזמנות עתידיות</p>
                                <input type="checkbox"
                                       className="w-24px h-24px border-radius-4px background-color-green-2 pointer"
                                />
                            </div>

                            <div
                                className="w-700px h-56px m-t-24px background-color-grey-3 p-t-10px p-r-10px p-b-10px p-l-17px border-radius-6px flex aligns-items-center">
                                <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-2px text-align-right color-grey-3 m-r-8px">הסליקה
                                    מתבצעת בצורה מאובטחת, פרטי התשלום מוגנים על ידי טכנולוגיות אבטחת מידע המתקדמות ביותר
                                    בשיתוף פעולה עם חברת Credit Guard. למד עוד</p>
                                <img src={"/icons/checkout-page/icon-lock.svg"}
                                     alt="lock icon indicating high security payment"
                                     className="w-34px h-34px"
                                />
                            </div>

                            <div className="w-700px flex justify-content-space-between aligns-items-center m-t-40px">
                                <button
                                    className="w-335px h-46px p-t-12px p-r-59px p-b-12px p-l-61px border-radius-4px background-color-green-2 border-none flex justify-content-center aligns-items-center pointer"
                                    type={"submit"}
                                >
                                    <label
                                        className="rubik font-s-18px font-w-500 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-1px text-align-center color-white-1 m-r-5px">₪{(globalContext.cartSum + 30).toFixed(2)} | סיום הזמנה</label>
                                    <img src={"/icons/checkout-page/icon-lock-small.svg"}
                                         alt="smlla icon lock indicating secure payment"
                                         className="w-20px h-20px"
                                    />
                                </button>
                                <button
                                    className="w-199px h-46px p-t-12px p-b-12px p-l-30px p-r-30px border-radius-6px border-style-solid border-w-1-5px border-color-green-1 background-color-white-1 pointer"
                                    type={"submit"}
                                >
                                    <p className="rubik font-s-18px font-w-500 font-stretch-normal font-style-normal line-h-1-22 letter-spacing-minus-0-2px text-align-center color-green-2">חזרה
                                        לתיאום הגעה</p>
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

            <footer>
                <SmallFooter/>
            </footer>

        </div>
    );
}

export default CheckoutPage;

