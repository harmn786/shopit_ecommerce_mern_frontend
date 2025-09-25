import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({shipping,confirmOrder,payment}) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ? (
              <Link to="/shipping" className="col-12 col-md-3 col-lg-2 mt-2 mt-md-0">
    <div className="triangle2-active"></div>
    <div className="step active-step">Shipping</div>
    <div className="triangle-active"></div>
  </Link>
        ):(
              <Link to="#!" className="col-12 col-md-3 col-lg-2 mt-2 mt-md-0 disabled-link">
    <div className="triangle2-incomplete"></div>
    <div className="step incomplete">Shipping</div>
    <div className="triangle-incomplete"></div>
  </Link>
        )
        }
        {confirmOrder ?(
            <Link to="/confirm_order" className="col-12 col-md-4 col-lg-3 mt-2 mt-md-0">
    <div className="triangle2-active"></div>
    <div className="step active-step">Confirm Order</div>
    <div className="triangle-active"></div>
  </Link>
        ):(
              <Link to="#!" className="col-12 col-md-4 col-lg-3 mt-2 mt-md-0 disabled-link">
    <div className="triangle2-incomplete"></div>
    <div className="step incomplete">Confirm Order</div>
    <div className="triangle-incomplete"></div>
  </Link>
        )}
        {payment ?(
            <Link to="/payment_method" className="col-12 col-md-3 col-lg-2 mt-2 mt-md-0">
    <div className="triangle2-active"></div>
    <div className="step active-step">Payment</div>
    <div className="triangle-active"></div>
  </Link>
        ):(
              <Link to="#!" className="col-12 col-md-3 col-lg-2 mt-2 mt-md-0 disabled-link">
    <div className="triangle2-incomplete"></div>
    <div className="step incomplete">Payment</div>
    <div className="triangle-incomplete"></div>
  </Link>

        )

        }
</div>

  )
}

export default CheckoutSteps
