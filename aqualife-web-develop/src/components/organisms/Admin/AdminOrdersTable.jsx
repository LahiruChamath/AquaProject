import {
  Card,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getOrders, updateOrderToDelivered } from "../../../services/order_service";

const TABLE_HEAD = ["Order ID", "Customer", "Date", "Total", "Status", "Actions"];

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await getOrders();
      if (res.result) {
        setOrders(res.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeliver = async (id) => {
    try {
      const res = await updateOrderToDelivered(id);
      if (res.result) {
        fetchOrders();
      }
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  return (
    <Card className="h-full w-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <Typography variant="h5" color="blue-gray">
            Recent Orders
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Manage and track all customer purchases.
          </Typography>
        </div>
      </div>
      <CardBody className="px-0 pt-0 pb-2">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner className="h-10 w-10 text-blue-500" />
          </div>
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center">
                    <Typography color="gray">No orders found.</Typography>
                  </td>
                </tr>
              ) : (
                orders.map(
                  ({ _id, user, createdAt, totalPrice, isDelivered }, index) => {
                    const isLast = index === orders.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-mono font-bold"
                          >
                            #{_id.slice(-8).toUpperCase()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {user ? `${user.firstName} ${user.lastName}` : "Unknown"}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70 text-xs"
                            >
                              {user?.email || "No email"}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(createdAt).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold text-blue-500"
                          >
                            LKR {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={isDelivered ? "Delivered" : "Processing"}
                              color={isDelivered ? "green" : "blue"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          {!isDelivered && (
                            <Button
                              variant="gradient"
                              color="blue"
                              size="sm"
                              onClick={() => handleDeliver(_id)}
                            >
                              Mark Delivered
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of {Math.ceil(orders.length / 10) || 1}
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
    </Card>
  );
};

export default AdminOrdersTable;
