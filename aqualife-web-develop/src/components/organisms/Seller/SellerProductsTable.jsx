import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Rating,
  Spinner,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
  getSearchedProducts,
} from "../../../services/seller_service";
import {
  SELLER_PRODUCTS_ADD_PATH,
  SELLER_PRODUCTS_EDIT_PATH,
} from "../../constants";
import ProductDeleteModal from "./ProductDeleteModal";

const SellerProductsTable = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [deletingId, setdeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleDeleteModalOpen = () => setDeleteModalOpen(!deleteModalOpen);

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Approved",
      value: "approved",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
  ];

  const TABLE_HEAD = ["Products", "Rating", "Quantity", "Status", "Created date", ""];

  const TABLE_ROWS = [
    {
      img: "/products/fish -3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "48",
      online: true,
      date: "23/04/18",
    },
    {
      img: "/products/fish -3.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: "77",
      online: false,
      date: "23/04/18",
    },
    {
      img: "/products/fish- 1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: "33",
      online: false,
      date: "19/09/17",
    },
    {
      img: "/products/fish- 2.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: "71",
      online: true,
      date: "24/12/08",
    },
    {
      img: "/products/fish -3.jpg",
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      job: "71",
      online: false,
      date: "04/10/21",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((res) => {
        if (res.data.result) {
          setProducts(res.data.products);
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  }, []);

  const searchProduct = (value) => {
    if (value !== "") {
      const obj = {
        productName: value,
      };

      getSearchedProducts(obj).then((res) => {
        if (res.data.result) {
          setProducts(res.data.products);
        }
      });
    } else {
      getProducts().then((res) => {
        if (res.data.result) {
          setProducts(res.data.products);
        }
      });
    }
  };

  const deleteProductbyId = (id) => {
    deleteProduct(id).then((res) => {
      setDeleteModalOpen(false);
      setIsLoading(true);
      getProducts()
        .then((res) => {
          if (res.data.result) {
            setProducts(res.data.products);
            setIsLoading(false);
          }
        })
        .catch(() => setIsLoading(false));
    });
  };

  return (
    <div className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Products
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to={SELLER_PRODUCTS_ADD_PATH}>
              <Button
                className="flex items-center gap-2 bg-blue-500 p-3"
                size="sm"
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add product
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={activeTab} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              onChange={(e) => searchProduct(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <div>
        {isLoading ? (
          <div className="w-full h-40 flex justify-center items-center">
            <Spinner color="blue" />
          </div>
        ) : (
          <div className="border border-gray-400 rounded-lg mt-10 overflow-hidden">
            <CardBody className="overflow-scroll px-0">
              <table className="-mt-6 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {products
                    .filter((product) => {
                      if (activeTab === "all") return true;
                      if (activeTab === "approved") return product.status === 4;
                      if (activeTab === "pending") return product.status === 0;
                      if (activeTab === "rejected") return product.status !== 4 && product.status !== 0;
                      return true;
                    })
                    .map(
                    (
                      {
                        imgURL,
                        name,
                        status,
                        currency,
                        price,
                        quantity,
                        rating = 0,
                        numReviews = 0,
                        createdAt,
                        _id,
                      },
                      index
                    ) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={name}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar src={imgURL} alt={name} size="sm" />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {name}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {currency} {price}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col gap-1 w-max">
                              <Rating value={Math.round(rating || 0)} readonly size="sm" />
                              <Typography variant="small" color="blue-gray" className="text-xs font-normal opacity-70">
                                {numReviews || 0} {numReviews === 1 ? 'review' : 'reviews'}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {quantity}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={
                                  status === 4
                                    ? "Accepted"
                                    : status === 0
                                    ? "Pending"
                                    : "Rejected"
                                }
                                color={
                                  status === 4
                                    ? "green"
                                    : status === 0
                                    ? "blue-gray"
                                    : "red"
                                }
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {createdAt}
                            </Typography>
                          </td>
                          <td className={`${classes} flex space-x-5`}>
                            <Tooltip content="Edit Product">
                              <Link to={`${SELLER_PRODUCTS_EDIT_PATH}${_id}`}>
                                <IconButton variant="text">
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Link>
                            </Tooltip>
                            <Tooltip content="Delete Product">
                              <IconButton
                                variant="text"
                                onClick={() => {
                                  setDeleteModalOpen(true);
                                  setdeletingId(_id);
                                }}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
          </div>
        )}
      </div>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of {Math.ceil(products.length / 10) || 1}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      <ProductDeleteModal
        handleOpen={handleDeleteModalOpen}
        open={deleteModalOpen}
        id={deletingId}
        deleteProduct={deleteProductbyId}
      />
    </div>
  );
};

export default SellerProductsTable;
