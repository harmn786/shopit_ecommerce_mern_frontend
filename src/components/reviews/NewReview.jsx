import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating';
import { useCanUserReviewQuery, useSubmitReviewMutation } from '../../redux/api/productApi';
import toast from 'react-hot-toast';
const NewReview = ({productId}) => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation()
    const { data } = useCanUserReviewQuery(productId);
    console.log(data);
    const canReview = data?.canReview;
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const submitHandler = () => {
        const reviewData = {rating,comment,productId}
     submitReview(reviewData);

    }
    useEffect(() => {
            if (error) {
                toast.error(error?.data?.message || "Something went wrong");
            }
            if(isSuccess){
                toast.success('Review Submitted Successfully')
            }
        }, [error,isSuccess])
    return (
        <div>
            {canReview && (
                 <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-bs-toggle="modal"
                data-bs-target="#ratingModal"
            >
                Submit Your Review
            </button>
            )}

            <div className="row mt-2 mb-5">
                <div className="rating w-50">
                    <div
                        className="modal fade"
                        id="ratingModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="ratingModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">
                                        Submit Review
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="star-ratings">
                                        <Rating
                                            initialValue={0} // same as rating prop
                                            size={20} // size of each star in px
                                            //   readonly // makes it non-editable like your previous component
                                            allowFraction // allows decimal ratings like 4.5
                                            fillColor="#ffb829" // star color
                                            emptyColor="#ccc" // empty star color
                                            onClick={(rate) => setRating(rate)}
                                        />
                                    </div>

                                    <textarea
                                        name="review"
                                        id="review"
                                        className="form-control mt-4"
                                        placeholder="Enter your comment"
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                    <button
                                        id="new_review_btn"
                                        className="btn w-100 my-4 px-4"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={submitHandler}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewReview
