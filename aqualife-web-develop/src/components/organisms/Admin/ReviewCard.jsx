import {
  Card,
  CardBody,
  CardHeader,
  Rating,
  Typography,
} from "@material-tailwind/react";

const ReviewCard = ({ review }) => {
  const name = review?.name || "Unknown Reviewer";
  const rating = review?.rating || 0;
  const comment = review?.comment || "No comment provided.";
  const productName = review?.productName || "Unknown Product";

  return (
    <Card
      color="transparent"
      shadow={false}
      className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-blue-300 transition ease-in-out delay-75 py-2 px-10 bg-white"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-4"
      >
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {name}
            </Typography>
            <div className="5 flex items-center gap-0">
              <Rating value={Math.round(rating)} readonly size="sm" />
            </div>
          </div>
          <Typography color="blue-gray" className="text-sm font-semibold opacity-70">
            Reviewed product: {productName}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-2 p-0">
        <Typography className="italic text-gray-700">
          &quot;{comment}&quot;
        </Typography>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
