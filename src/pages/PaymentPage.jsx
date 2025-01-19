import React from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderSummary from "@/components/ui/PaymentPage/orderSummary";
import Footer from "@/layouts/footer";
import Navbar from "@/layouts/navbar";
import CardList from "@/components/ui/PaymentPage/CardList";
import CardForm from "@/components/ui/PaymentPage/CardForm";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import api from "@/api/api";
import { clearCart } from "@/redux/actions/shoppingCartActions";
import confetti from "canvas-confetti";

function Payment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.shoppingCart.cart);
  const selectedAddress = useSelector((state) => state.shoppingCart.address);
  const shippingAddress = useSelector((state) => state.shoppingCart.address);

  const [cards, setCards] = React.useState([]);
  const [showCardForm, setShowCardForm] = React.useState(false);
  const [editingCard, setEditingCard] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  console.log("Shipping Address:", shippingAddress);
  React.useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await api.get("/user/card");
      setCards(response.data);
    } catch (error) {
      toast.error("Failed to fetch cards");
    }
  };

  const handleAddCard = async (data) => {
    try {
      if (editingCard) {
        await api.put("/user/card", { ...data, id: editingCard.id });
        toast.success("Card updated successfully");
      } else {
        await api.post("/user/card", data);
        toast.success("Card added successfully");
      }
      fetchCards();
      setShowCardForm(false);
      setEditingCard(null);
    } catch (error) {
      toast.error("Failed to save card");
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await api.delete(`/user/card/${cardId}`);
        toast.success("Card deleted successfully");
        fetchCards();
      } catch (error) {
        toast.error("Failed to delete card");
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedAddress.id) {
      toast.error("Please select a shipping address first");
      history.push("/order");
      return;
    }
    if (!selectedCard) {
      toast.error("Please select a payment method");
      return;
    }

    try {
      const selectedItems = cart.filter((item) => item.checked);

      if (selectedItems.length === 0) {
        toast.error("Please select items to order");
        return;
      }

      const totalPrice = selectedItems.reduce(
        (sum, item) => sum + item.product.price * item.count,
        0
      );

      const orderPayload = {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),
        card_no: parseInt(selectedCard.card_no),
        card_name: selectedCard.name_on_card,
        card_expire_month: parseInt(selectedCard.expire_month),
        card_expire_year: parseInt(selectedCard.expire_year),
        card_ccv: parseInt(selectedCard.card_ccv),
        price: totalPrice,
        products: selectedItems.map((item) => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.detail || "",
        })),
      };

      console.log("Order Payload:", orderPayload);

      const response = await api.post("/order", orderPayload);

      if (response.data) {
        toast.success(
          "🎉 Congratulations! Your order has been successfully placed!"
        );
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        dispatch(clearCart());
        localStorage.setItem("cart", JSON.stringify([]));
        setTimeout(() => {
          history.push("/");
        }, 6000);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Payment</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  <button
                    onClick={() => {
                      setShowCardForm(true);
                      setEditingCard(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add New Card
                  </button>
                </div>

                {showCardForm ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingCard ? "Edit Card" : "Add New Card"}
                    </h3>
                    <CardForm
                      onSubmit={handleAddCard}
                      initialData={editingCard}
                      onCancel={() => {
                        setShowCardForm(false);
                        setEditingCard(null);
                      }}
                    />
                  </div>
                ) : (
                  <CardList
                    cards={cards}
                    selectedCard={selectedCard}
                    onSelectCard={setSelectedCard}
                    onEditCard={(card) => {
                      setEditingCard(card);
                      setShowCardForm(true);
                    }}
                    onDeleteCard={handleDeleteCard}
                  />
                )}
              </div>
            </div>
            <div className="lg:w-1/3">
              <OrderSummary
                buttonText="Place Order"
                buttonDisabled={!selectedCard}
                onButtonClick={handlePlaceOrder}
                showSecurityBadges={true}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Payment;
