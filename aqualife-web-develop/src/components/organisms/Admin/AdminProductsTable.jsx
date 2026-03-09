import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Spinner,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  getProducts,
  getSearchedProducts,
  updateProductStatus,
} from "../../../services/admin_service";
import ProductApproveModal from "./ProductApproveModal";
import ProductDeclineModal from "./ProductDeclineModal";

const AdminProductsTable = () => {
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleApprovalModalOpen = () =>
    setApprovalModalOpen(!approvalModalOpen);
  const handleDeclineModalOpen = () => setDeclineModalOpen(!declineModalOpen);

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

  const TABLE_HEAD = ["Products", "Quantity", "Status", "Created date", ""];

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

  const fetchProducts = () => {
    setIsLoading(true);
    getProducts()
      .then((res) => {
        if (res.data.result) {
          setProducts(res.data.products);
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const searchProduct = (value) => {
    if (value != "") {
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

  const updateStatus = (id, status) => {
    const obj = {
      id,
      status,
    };

    updateProductStatus(obj).then((res) => {
      if (res.data.result) {
        fetchProducts();
      }
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
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
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
              <table className="w-full min-w-max table-auto text-left -mt-6">
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
                  {products.map(
                    (
                      {
                        imgURL,
                        name,
                        seller,
                        status,
                        currency,
                        price,
                        quantity,
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
                                  {seller?.email}
                                </Typography>
                              </div>
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
                            {status === 0 && (
                              <Tooltip content="Approve Product">
                                <IconButton
                                  variant="text"
                                  onClick={() => {
                                    setSelectedId(_id);
                                    setSelectedStatus(4);
                                    setApprovalModalOpen(true);
                                  }}
                                >
                                  <CheckIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {status === 0 && (
                              <Tooltip content="Decline Product">
                                <IconButton
                                  variant="text"
                                  onClick={() => {
                                    setSelectedId(_id);
                                    setSelectedStatus(404);
                                    setDeclineModalOpen(true);
                                  }}
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Page 1 of 10
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
          </div>
        )}
      </div>

      <ProductApproveModal
        handleStatus={() => updateStatus(selectedId, selectedStatus)}
        handleOpen={handleApprovalModalOpen}
        open={approvalModalOpen}
      />
      <ProductDeclineModal
        handleStatus={() => updateStatus(selectedId, selectedStatus)}
        handleOpen={handleDeclineModalOpen}
        open={declineModalOpen}
      />
    </div>
  );
};

export default AdminProductsTable;
