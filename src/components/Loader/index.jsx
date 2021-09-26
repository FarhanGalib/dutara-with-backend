import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./loader.module.css";

const Loader = ({ children }) => {
    const dispatch = useDispatch();
    const loader = useSelector((state) => state.LoaderReducer);
    
    return (
        <div>
            {loader &&
            <div className={Styles.container}>
                <div className={Styles.flex}>
                    <div className={Styles.loader}></div>
                </div>
                <div className={Styles.load_text}>Loading...</div>
            </div>}
          
        </div>
    );
};

export default Loader;
