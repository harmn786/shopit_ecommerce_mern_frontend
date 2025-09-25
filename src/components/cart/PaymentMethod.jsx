import React, { useEffect, useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { calculateOrderCost } from '../../helpers/helpers';
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PaymentMethod = () => {
    const [method, setMethod] = useState("COD");
    const navigate = useNavigate()
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateOrderCost(cartItems)
    const [createNewOrder, { isLoading, error, isSuccess }] = useCreateNewOrderMutation()
    const [stripeCheckoutSession,{ data:checkoutData ,error:checkoutError }] = useStripeCheckoutSessionMutation()
    useEffect(()=>{
        if(checkoutData){
            window.location.href =  checkoutData?.url
        }
        if(checkoutError){
            toast.error(checkoutError?.data?.message)
        }

    })
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success("Order Placed Successfully");
            navigate("/me/orders?order_success=true")
        }
    })
    const submitHandler = (e) => {
        e.preventDefault();
        if (method === "cod") {
            const orderData = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice,
                shippingAmount: shippingPrice,
                taxAmount: taxPrice,
                totalAmount: totalPrice,
                paymentInfo: {
                    status: "Not Paid"
                },
                paymentMethod: "cod"
            };
            createNewOrder(orderData)
        }
        if (method === "card") {
             const orderData = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice,
                shippingAmount: shippingPrice,
                taxAmount: taxPrice,
                totalAmount: totalPrice,
                
            };
            stripeCheckoutSession(orderData);

        }

    }
    return (
        <>
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Select Payment Method</h2>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="codradio"
                                value="cod"
                                onChange={(e) => setMethod(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="codradio">
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="cardradio"
                                value="card"
                                onChange={(e) => setMethod(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="cardradio">
                                Card - VISA, MasterCard
                            </label>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn py-2 w-100" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Continue"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PaymentMethod
