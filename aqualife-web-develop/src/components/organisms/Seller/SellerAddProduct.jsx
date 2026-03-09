import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { addProduct } from "../../../services/product_service";
import { SELLER_PRODUCTS_PATH } from "../../constants";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  productPrice: Yup.number().required("Product Price is required"),
  productQuantity: Yup.number().required("Product Quantity is required"),
  productCurrency: Yup.string().required("Product Currency is required"),
  productDescription: Yup.string().required("Product Description is required"),
});

const SellerAddProduct = () => {
  const [isLoading, setIsloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const submitData = (formdata) => {
    setSubmitError("");

    if (!selectedImage) {
      setSubmitError("Please select a product image before submitting.");
      setIsloading(false);
      return;
    }

    var obj = {
      name: formdata.productName,
      price: formdata.productPrice,
      quantity: formdata.productQuantity,
      currency: formdata.productCurrency,
      file: selectedImage,
      description: formdata.productDescription,
    };

    addProduct(obj)
      .then((res) => {
        setIsloading(false);
        if (res?.data?.result) {
          navigate(SELLER_PRODUCTS_PATH);
        } else {
          setSubmitError(res?.data?.message || "Failed to add product.");
        }
      })
      .catch((err) => {
        setIsloading(false);
        setSubmitError("Network error. Could not add product.");
      });
  };

  return (
    <Formik
      initialValues={{
        productName: "",
        productPrice: "",
        productQuantity: "",
        productCurrency: "",
        productDescription: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setIsloading(true);
        submitData(values);
        setSubmitting(false);
        // Handle form submission here (e.g., make an API request)
      }}
    >
      <Form className="mt-8 mb-2">
        <div className="w-full flex gap-x-10">
          <div className="w-1/2 mb-1 flex flex-col gap-y-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product Name
            </Typography>
            <Field
              type="text"
              name="productName"
              as={Input}
              size="lg"
              placeholder="Product Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <ErrorMessage
              name="productName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/2 mb-1 flex flex-col gap-y-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product Price
            </Typography>
            <Field
              type="number"
              name="productPrice"
              as={Input}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <ErrorMessage
              name="productPrice"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>

        <div className="w-full flex gap-x-10">
          <div className="w-1/2 mb-1 flex flex-col gap-6 mt-10">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product Quantity
            </Typography>
            <Field
              type="number"
              name="productQuantity"
              as={Input}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <ErrorMessage
              name="productQuantity"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/2 mb-1 flex flex-col gap-6 mt-10">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Product Currency
            </Typography>
            <Field
              type="text"
              name="productCurrency"
              as={Input}
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <ErrorMessage
              name="productCurrency"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>

        <div className="mb-1 flex flex-col gap-6 mt-10">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Description
          </Typography>
          <Field
            name="productDescription"
            as={Textarea}
            size="lg"
            placeholder="Product Description"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 h-40"
          />
          <ErrorMessage
            name="productDescription"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mb-1 flex flex-col gap-6 mt-10">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-input"
          />
          {selectedImage ? (
            <label htmlFor="image-input" className="cursor-pointer">
              <img
                src={selectedImage}
                alt="Product"
                className="object-cover rounded-xl w-[500px] h-[300px]"
              />
            </label>
          ) : (
            <label htmlFor="image-input" className="cursor-pointer">
              <img
                src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                alt="Placeholder"
                className="object-cover rounded-xl w-[500px] h-[300px]"
              />
            </label>
          )}
        </div>
        {submitError && (
          <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700 text-sm">
            {submitError}
          </div>
        )}
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="mt-6 w-3/12 flex justify-center bg-blue-500"
            fullWidth
          >
            {isLoading ? <Spinner color="white" /> : "Add product"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default SellerAddProduct;
