import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { auth } from './firecase';
function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    function handleAuthhentication() {
        if (user) {
            auth.signOut()
        }
    }
    return (
        <div className="header">
            {/* logo part */}
            <Link to="/">
                <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                />
            </Link>
            {/* this is earch part*/}
            <div className="header_search">
                <input className="header_search_input" type="text" />
                {/* logo */}
                <SearchIcon className="header_searchIcon" />
            </div>

            {/* this is Last nav part */}
            <div className="header_nav">
                <Link to={!user && '/logIn'}>
                    <div onClick={handleAuthhentication} className="header_option">
                        <span className="header_optionLineone">
                            {user ? user.email:'guest'}
                        </span>
                        <span className="header_optionLineTwo">
                            {user ? 'SignOut' : 'SignIn'}
                        </span>
                    </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineone">
                        Returns
                    </span>
                    <span className="header_optionLineTwo">
                        &Orders
                    </span>
                </div>

                <div className="header_option">
                    <span className="header_optionLineone">
                        Your
                    </span>
                    <span className="header_optionLineTwo">
                        Primes
                    </span>
                </div>
                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingCartIcon />
                        <span className="header_optionLineTwo header_BasketCount">
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Header