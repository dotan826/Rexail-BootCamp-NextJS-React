import React from 'react';

const SmallFooter = function () {



    return (
        <div
            className="h-60px background-color-grey-1 flex justify-content-center aligns-items-center bottom-0px w-100p">
            <div className="w-1260px flex justify-content-center">
                <div className="w-33p flex pointer">
                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 flex aligns-items-end h-20px">
                        Powered by</p>
                    <img src={"/images/footer/footer-logo.png"} alt="Software Company Logo" className="h-18px" />
                </div>
                <div className="w-33p flex justify-content-center">
                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 m-r-10px pointer">
                        תנאי שימוש</p>
                    <div className="color-white-1 m-r-10px">|</div>
                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1 pointer">
                        הצהרת נגישות</p>
                </div>
                <div className="w-33p flex justify-content-end">
                    <p className="rubik font-s-14px font-w-normal font-stretch-normal font-style-normal line-h-1-29 letter-spacing-minus-0-1px text-align-right color-white-1">
                        @ קמעונאי און ליין בע’’מ, 2021. כל הזכויות שמורות.</p>
                </div>
            </div>
        </div>
    );
}

export default SmallFooter;

