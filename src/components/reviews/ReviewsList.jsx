import React from 'react'

import { Rating } from 'react-simple-star-rating';
const ReviewsList = ({ reviews }) => {
    return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews?.map((review) => (
                <div className="review-card my-3">
                    <div className="row">
                        <div className="col-1">
                            <img
                                src={review?.user?.avatar ? review?.user?.avatar?.url : "../images/default_avatar.jpg"}
                                alt="User Name"
                                width="50"
                                height="50"
                                className="rounded-circle"
                            />
                        </div>
                        <div className="col-11">
                            <div className="star-ratings">
                                <Rating
                                    initialValue={review?.rating} // same as rating prop
                                    size={20} // size of each star in px
                                    //   readonly // makes it non-editable like your previous component
                                    allowFraction // allows decimal ratings like 4.5
                                    fillColor="#ffb829" // star color
                                    emptyColor="#ccc" // empty star color

                                />
                            </div>
                            <p className="review_user">by {review?.user?.name}</p>
                            <p className="review_comment">{review?.comment}</p>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>

    )
}

export default ReviewsList
