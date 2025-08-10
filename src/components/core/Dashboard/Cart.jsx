import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItems, resetCart } from "../../../Redux/Slices/cartSlice"; // ✅ fixed path
import { toast } from "react-hot-toast";

// Mock data (replace later with API)
const mockCourses = [
  {
    _id: "1",
    courseName: "React for Beginners",
    price: 299,
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    courseName: "Node.js Masterclass",
    price: 399,
    thumbnail: "https://via.placeholder.com/150",
  },
];

export default function Cart() {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const dispatch = useDispatch();
  const [cartCourses, setCartCourses] = useState([]);

  useEffect(() => {
    // Later replace this with API call to your backend
    setCartCourses(mockCourses.slice(0, totalItems));
  }, [totalItems]);

  const handleRemove = (courseId) => {
    dispatch(removeItems());
    setCartCourses((prev) => prev.filter((course) => course._id !== courseId));
    toast.success("Removed from cart");
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    // Navigate to payment page later
  };

  return (
    <div className="text-white w-full flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartCourses.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="w-3/4 space-y-4">
          {cartCourses.map((course) => (
            <div
              key={course._id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-20 h-20 rounded"
                />
                <div>
                  <h2 className="text-xl font-semibold">{course.courseName}</h2>
                  <p className="text-green-400">${course.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(course._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => dispatch(resetCart())}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
