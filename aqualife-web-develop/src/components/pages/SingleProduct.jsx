import { ArrowSmallLeftIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { Button, Chip, Rating, Spinner, Textarea } from "@material-tailwind/react";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, createProductReview } from "../../services/product_service";
import { PRODUCTS_PATH, LOGIN_PATH } from "../constants";
import { CartContext } from "../../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratingVal, setRatingVal] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  const token = localStorage.getItem("token");
  
  const fetchProductData = () => {
    if (!id) return;
    getProduct(id)
      .then((res) => {
        if (res?.data?.result) {
          setProduct(res.data.product);
        } else {
          setError("Product not found.");
        }
      })
      .catch(() => setError("Network error. Could not load product."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError("");
    setReviewSuccess(false);

    createProductReview(id, { rating: ratingVal, comment })
      .then((res) => {
        if (res.data.result) {
          setReviewSuccess(true);
          setRatingVal(0);
          setComment("");
          fetchProductData(); // Refresh product to show new review
        } else {
          setReviewError(res.data.message || "Failed to submit review.");
        }
      })
      .catch((err) => {
        setReviewError(err.response?.data?.message || err.message || "Failed to submit review.");
      })
      .finally(() => {
        setReviewLoading(false);
      });
  };

  return (
    <div className="single-product min-h-screen w-screen bg-center bg-cover bg-no-repeat flex justify-center items-center">
      <div className="container w-9/12">
        <div className="bg-opacity-30 backdrop-blur-md bg-white p-7 rounded-2xl shadow-xl">
          <Link to={PRODUCTS_PATH}>
            <Button
              color="white"
              variant="outlined"
              className="flex items-center gap-3"
            >
              <ArrowSmallLeftIcon className="h-4 w-4" />
              Go back
            </Button>
          </Link>

          {loading && (
            <div className="w-full flex justify-center items-center h-64">
              <Spinner className="h-10 w-10" />
            </div>
          )}

          {error && (
            <div className="w-full text-center text-red-400 mt-10 text-lg">
              {error}
            </div>
          )}

          {!loading && !error && product && (
            <div className="w-full mt-5 flex items-center space-x-10">
              <div className="w-6/12">
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src={product.imgURL || "/placeholder.jpg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="w-6/12 flex flex-col justify-between min-h-[400px]">
                <div>
                  <div className="text-white font-bold text-xl line-clamp-2">
                    {product.name}
                  </div>
                  <p className="text-white text-sm mt-3">
                    {product.description}
                  </p>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                  <div className="flex w-full justify-center">
                    <div className="w-1/2">
                      <div className="flex flex-col justify-between space-y-3">
                        <div className="flex space-x-3 items-center">
                          <span className="text-white font-medium">
                            Availability :
                          </span>{" "}
                          <Chip
                            color={product.quantity > 0 ? "green" : "red"}
                            value={product.quantity > 0 ? "In stock" : "Out of stock"}
                          />
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="text-white font-medium">
                            Quantity :
                          </span>
                          <Chip color="black" value={product.quantity} />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-white text-xs">Seller</div>
                      <div className="text-white text-base font-semibold mb-2">
                        {product.seller?.firstName
                          ? `${product.seller.firstName} ${product.seller.lastName}`
                          : "Unknown Seller"}
                      </div>
                      <div className="w-full flex justify-end flex-col items-end">
                        <Rating value={Math.round(product.rating || 0)} readonly />
                        <span className="text-white text-xs mt-1">{product.numReviews} review(s)</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end mt-6 gap-4 items-center border-t border-gray-200 pt-4 border-opacity-30">
                    <span className="text-white text-2xl font-bold">
                      {product.currency || "LKR"} {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.quantity <= 0}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {!loading && !error && product && (
            <div className="mt-16 pt-8 border-t border-white border-opacity-20">
              <h3 className="text-2xl font-bold text-white mb-6">Customer Reviews</h3>
              <div className="flex flex-col md:flex-row gap-10">
                {/* Review List */}
                <div className="flex-1 space-y-4">
                  {product.reviews?.length === 0 ? (
                    <div className="bg-white bg-opacity-10 p-4 rounded-lg text-white">
                      No reviews yet. Be the first to review this product!
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {product.reviews?.map((review) => (
                        <div key={review._id} className="bg-white bg-opacity-20 p-5 rounded-xl shadow-sm text-white">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold">{review.name}</span>
                            <Rating value={review.rating} readonly size="sm" />
                          </div>
                          <span className="text-xs text-blue-100 block mb-3">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                          <p className="text-sm border-l-2 border-blue-400 pl-3 italic">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Write a Review */}
                <div className="w-full md:w-5/12">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-lg font-bold text-blue-900 mb-4">Write a Review</h4>
                    {token ? (
                      <form onSubmit={submitReviewHandler} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <Rating 
                            value={ratingVal} 
                            onChange={(value) => setRatingVal(value)} 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                          <Textarea 
                            rows={3}
                            label="What did you think?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                          />
                        </div>
                        {reviewError && <p className="text-red-500 text-sm mt-2">{reviewError}</p>}
                        {reviewSuccess && <p className="text-green-500 text-sm mt-2">Review submitted successfully!</p>}
                        <Button 
                          type="submit" 
                          color="blue" 
                          fullWidth 
                          disabled={reviewLoading || ratingVal === 0 || !comment.trim()}
                        >
                          {reviewLoading ? <Spinner className="mx-auto" /> : "Submit Review"}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-6 bg-blue-50 rounded-lg">
                        <p className="text-gray-600 mb-4">Please log in to write a review</p>
                        <Link to={LOGIN_PATH}>
                          <Button color="blue" size="sm">Login Now</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
