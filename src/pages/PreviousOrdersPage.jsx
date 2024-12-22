import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import api from "@/api/api";
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import { toast } from "react-toastify";

const OrderDetails = ({ products }) => (
  <div className="bg-gray-50 p-4 rounded-lg mt-2">
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="text-left text-sm font-semibold text-gray-600 p-2">
            Product
          </th>
          <th className="text-left text-sm font-semibold text-gray-600 p-2">
            Quantity
          </th>
          <th className="text-left text-sm font-semibold text-gray-600 p-2">
            Details
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td className="p-2">{product.product_id}</td>
            <td className="p-2">{product.count}</td>
            <td className="p-2">{product.detail || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState({});
  const user = useSelector((state) => state.client.user);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div
                  className="bg-white p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.order_date)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-blue-600 font-semibold">
                        ${order.price.toFixed(2)}
                      </span>
                      {expandedOrders[order.id] ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedOrders[order.id] && (
                  <OrderDetails products={order.products} />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PreviousOrdersPage;
