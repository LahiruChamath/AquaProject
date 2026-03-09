import { Typography } from "@material-tailwind/react";
import ReviewCard from "./ReviewCard";

const AdminSellerReviews = () => {
  return (
    <div className="h-full w-full">
      <div className="mb-8 p-4">
        <div>
          <Typography variant="h5" color="blue-gray">
            Reviews
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Check reviews of seller
          </Typography>
        </div>
        <div className="flex flex-col gap-y-5 mt-10">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
};

export default AdminSellerReviews;
