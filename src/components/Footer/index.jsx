import React from "react";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        
            <div className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.footer_col}>
                            <h4>company</h4>
                            <ul>
                                <li>
                                    <a href="#">about us</a>
                                </li>
                                <li>
                                    <a href="#">our services</a>
                                </li>
                                <li>
                                    <a href="#">privacy policy</a>
                                </li>
                                <li>
                                    <a href="#">affiliate program</a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.footer_col}>
                            <h4>get help</h4>
                            <ul>
                                <li>
                                    <a href="#">FAQ</a>
                                </li>
                                <li>
                                    <a href="#">shipping</a>
                                </li>
                                <li>
                                    <a href="#">returns</a>
                                </li>
                                <li>
                                    <a href="#">order status</a>
                                </li>
                                <li>
                                    <a href="#">payment options</a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.footer_col}>
                            <h4>online shop</h4>
                            <ul>
                                <li>
                                    <a href="#">watch</a>
                                </li>
                                <li>
                                    <a href="#">bag</a>
                                </li>
                                <li>
                                    <a href="#">shoes</a>
                                </li>
                                <li>
                                    <a href="#">dress</a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.footer_col}>
                            <h4>follow us</h4>
                            <div className={styles.social_links}>
                                <a href="#">
                                    <FontAwesomeIcon icon={faFacebookF}/>
                                    
                                </a>
                                <a href="#">
                                <FontAwesomeIcon icon={faTwitter}/>

                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </a>
                                <a href="#">
                                    <FontAwesomeIcon icon={faLinkedinIn}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.copyrightContainer}>
                        
                        <p>© 2021 DUTARA. All rights reserved</p>
                        
                    </div>
         </div>
        
    );
};

export default Footer;
