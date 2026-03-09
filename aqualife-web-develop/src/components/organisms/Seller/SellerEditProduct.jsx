import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { editProduct } from "../../../services/product_service";
import { getProductById } from "../../../services/seller_service";
import { SELLER_PRODUCTS_PATH } from "../../constants";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  productPrice: Yup.number().required("Product Price is required"),
  productQuantity: Yup.number().required("Product Quantity is required"),
  productCurrency: Yup.string().required("Product Currency is required"),
  productDescription: Yup.string().required("Product Description is required"),
});

const SellerEditProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditloading, setIsEditloading] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getProductById(productId)
      .then((res) => {
        if (res.data.result) {
          setProduct(res.data.product);
          setSelectedImage(res.data.product.imgURL);
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  }, [productId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // You can use FileReader to read the selected image file as a data URL
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const submitData = (formdata) => {
    setIsEditloading(true);
    var obj = {
      _id: product._id,
      name: formdata.productName,
      price: formdata.productPrice,
      quantity: formdata.productQuantity,
      currency: formdata.productCurrency,
      description: formdata.productDescription,
    };

    editProduct(obj)
      .then(() => {
        setIsEditloading(false);
        navigate(SELLER_PRODUCTS_PATH);
      })
      .catch(() => setIsEditloading(false));
  };
  return (
    <>
      {isLoading ? (
        <div className="w-full mt-20 flex justify-center items-center">
          <Spinner color="blue" />
        </div>
      ) : (
        <Formik
          initialValues={{
            productName: product?.name ?? "",
            productPrice: product?.price ?? "",
            productQuantity: product?.quantity ?? "",
            productCurrency: product?.currency ?? "",
            productDescription: product?.description ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Form values:", values);
            setSubmitting(false);
            submitData(values);
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
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-3/12 flex justify-center bg-blue-500"
                fullWidth
                disabled={isEditloading}
              >
                {isEditloading ? <Spinner color="white" /> : "Edit product"}
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default SellerEditProduct;
