import React from 'react'
import {Link} from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
const productItem = ({product,columnSize}) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
                <div className="card p-3 rounded">
                  <img
                    className="card-img-top mx-auto"
                    src={product?.images[0] ?product?.images[0]?.url : './images/default_product.png'}
                    alt={product?.name}
                  />
                  <div
                    className="card-body ps-3 d-flex justify-content-center flex-column"
                  >
                    <h5 className="card-title">
                      <Link  to={`/product/${product?._id}`}>{product?.name}</Link>
                    </h5>
                    <div className="ratings mt-auto d-flex">
                     <Rating
                          initialValue={product?.ratings} // same as rating prop
                          size={20} // size of each star in px
                          readonly // makes it non-editable like your previous component
                          allowFraction // allows decimal ratings like 4.5
                          fillColor="#ffb829" // star color
                          emptyColor="#ccc" // empty star color
                        />
                      <span id="no_of_reviews" className="pt-2 ps-2"> ({product?.numOfReviews}) </span>
                    </div>
                    <p className="card-text mt-2">${product?.price}</p>
                     <Link id='view_btn' to={`/product/${product?._id}`} className='btn btn-block'>
                      View Details
                      </Link>
                  </div>
                </div>
              </div>
  )
}

export default productItem
