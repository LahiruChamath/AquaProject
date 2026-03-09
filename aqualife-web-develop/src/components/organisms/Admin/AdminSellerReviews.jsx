import { Typography, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSellerReviews } from "../../../services/admin_service";
import ReviewCard from "./ReviewCard";

const AdminSellerReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getSellerReviews(id)
        .then((res) => {
          if (res?.data?.result) {
            setReviews(res.data.reviews || []);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="h-full w-full">
      <div className="mb-8 p-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            Seller Reviews
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Check reviews accumulated by this seller across their products.
          </Typography>
        </div>
        <div className="flex flex-col gap-y-5 mt-10 max-w-4xl">
          {loading ? (
             <Spinner color="blue" />
          ) : reviews.length > 0 ? (
            reviews.map((rev, idx) => (
              <ReviewCard key={idx} review={rev} />
            ))
          ) : (
            <Typography className="text-gray-500 italic">No reviews found for this seller's products.</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSellerReviews;
