import React, { useEffect, useState } from 'react'
import { useGetProductDetailsQuery } from '../../redux/api/productApi';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../../redux/features/cartSlice';
import NewReview from '../reviews/NewReview';
import ReviewsList from '../reviews/ReviewsList';

const ProductDetails = () => {
    const params = useParams();
    const [activeImg, setActiveImg] = React.useState('');
    const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);
    const [quantity, setQuantity] = useState(1)
    const product = data;
    const {isAuthenticated} = useSelector((state)=>state.auth)
    const dispatch =  useDispatch();
    const increaseQuantity = () => {
        if (quantity >= product?.stock) return;
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity((prev) => prev - 1);
    }
    const setItemToCart = () =>{
        const cartItem = {
            product:product?._id,
            name:product?.name,
            price:product?.price,
            image:product?.images[0]?.url,
            stock:product?.stock,
            quantity
        }
        dispatch(setCartItem(cartItem))
        toast.success("Item added to the cart");

    }
    useEffect(() => {
        setActiveImg(product?.images[0] ? product?.images[0]?.url : './images/default_product.png');
    }, [product])
    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    }, [error])
    if (isLoading) return <Loader />
    return (
        <>
        <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <div className="p-3">
                    <img
                        className="d-block w-100"
                        src={activeImg}
                        alt={product?.name}
                        width="340"
                        height="390"
                    />
                </div>
                <div className="row justify-content-start mt-5">
                    {product?.images?.map((img,index) => (
                        <div className="col-2 ms-4 mt-2" key={index}>
                            <a role="button">
                                <img
                                    className={`d-block border rounded p-3 cursor-pointer ${img?.url === activeImg ? 'border-warning' : ''}`}
                                    height="100"
                                    width="100"
                                    src={img?.url}
                                    alt={product?.name}
                                    onClick={(e) => { setActiveImg(img?.url) }}
                                />
                            </a>
                        </div>
                    )
                    )}

                </div>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product?.name}</h3>
                <p id="product_id">{product?._id}</p>

                <hr />

                <div className="d-flex">
                    <Rating
                        initialValue={product?.ratings} // same as rating prop
                        size={20} // size of each star in px
                        readonly // makes it non-editable like your previous component
                        allowFraction // allows decimal ratings like 4.5
                        fillColor="#ffb829" // star color
                        emptyColor="#ccc" // empty star color
                    />
                    <span id="no-of-reviews" className="pt-1 ps-2"> ({product?.numOfReviews}) Reviews </span>
                </div>
                <hr />

                <p id="product_price">{product?.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQuantity}>-</span>
                    <input
                        type="number"
                        className="form-control count d-inline"
                        value={quantity}
                        readOnly
                    />
                    <span className="btn btn-primary plus" onClick={increaseQuantity}>+</span>
                </div>
                <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ms-4"
                    disabled={product?.stock === 0}
                    onClick={setItemToCart}
                >
                    Add to Cart
                </button>

                <hr />

                <p>
                    Status: <span id="stock_status" className={product?.stock > 0 ? 'greenColor' : 'redColor'}>{product?.stock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>
                    {product?.description}
                </p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product?.seller}</strong></p>
                {isAuthenticated ? <NewReview productId={product?._id} /> :
                <div className="alert alert-danger my-5" type="alert">
                    Login to post your review.
                </div>
                }
            </div>
        </div>
        {product?.reviews?.length > 0 && <ReviewsList reviews={product?.reviews} />}
        </>

    )
}

export default ProductDetails
