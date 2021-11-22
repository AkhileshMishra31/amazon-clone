import React, { useState, useEffect } from 'react'
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from "./Reducer"
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom"
import axios from './axios'
import './payment.css'
const Payment = () => {
    const [{ user, basket }, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setprocessing] = useState("")
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setclientSecret] = useState(true);


    useEffect(() => {
        //generate thr special stripe sectrete which allow us to charge a costomer
        const getClientSecrete = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setclientSecret(response.data.clientSecret)
        }
        getClientSecrete()
    }, [basket])

    console.log(clientSecret);
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setprocessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true);
            setError(null);
            setprocessing(false);

            history.replace('/order')
        })
    };

    const handleChange = async (event) => {
        // Block native form submission.
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    };

    
    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    checkOut{<Link to="/checkout">{basket.length} items </Link>}
                </h1>
                {/* payment section- dilevery address */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h1>dilevery Adress</h1>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>Ucl Colony </p>
                        <p>Satna(m.p)</p>
                    </div>
                </div>
                {/* {payment-section-Review Items} */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h1>Review Items and dilevery</h1>
                    </div>
                    <div className="payment_items">
                        {
                            basket.map((item) => {
                                return (
                                    <>
                                        <CheckoutProduct
                                            id={item.id}
                                            title={item.title}
                                            image={item.image}
                                            price={item.price}
                                            rating={item.rating}
                                        />
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                {/* {payment-section_payment items} */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h1>payment method</h1>
                    </div>
                    <div className="payment_deatils">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                {/* Part of the homework */}
                                                Subtotal ({basket?.length}items): <strong>{value}</strong>
                                            </p>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                            </div>
                            <button type="submit" disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>processing</p> : "BuyNow"}</span>
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
