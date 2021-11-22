
import React, { useEffect } from "react"
import './App.css';
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from './firecase';
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
function App() {
  const [{ user }, dispatch] = useStateValue();

  const promise = loadStripe('pk_test_51JZrQMSJRl1m3ljvQryfZdJZxyscbHseK0JiT4EbYBSL4CovhpmyTvYv1AHbzZ8jDSl5KT6O6w8O9ZxFbWxhwmLt00xQSXtFdf')

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
