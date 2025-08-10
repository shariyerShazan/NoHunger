import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { MyContext } from '../context/Context';
import { toast, ToastContainer } from 'react-toastify';

function FoodDetails() {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = "FoodDetails | NoHunger"
  }, [])

  const { user } = useContext(MyContext);
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [foodReq, setFoodReq] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    
    const fetchFoodDetails = async () => {
      try {
        const res = await axios.get(`https://nohunger-project.vercel.app/api/food/get-post-by-id/${id}`);
        setFood(res.data.post);
      } catch (err) {
        console.error("Error fetching food details:", err);
      }
    };
    fetchFoodDetails();
  }, [id]);

  useEffect(() => {
    if (!user?._id) return;
    const fetchFoodReq = async () => {
      try {
        const res = await axios.get(
          `https://nohunger-project.vercel.app/api/request/requests-by-user/${user._id}`
        );
        setFoodReq(res.data.requests);
      } catch (error) {
        console.error("Error fetching food requests:", error);
      }
    };
    fetchFoodReq();
  }, [user]);

  const handleFoodRequest = async () => {
    if(!user){
      toast.warn("Please login first")
      navigate("/login")
    }
    try {
      const res = await axios.post(
        "https://nohunger-project.vercel.app/api/request/create-request",
        {
          foodId: food._id,
          requesterId: user._id,
          additionalNotes,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setFoodReq(prev => [...prev, res.data.request]);
        setShowModal(false);
        setAdditionalNotes("");
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const cancelFoodReq = async (foodId) => {
    try {
      await axios.delete(
        `https://nohunger-project.vercel.app/api/request/cancel-request/${foodId}`,
        {
          data: { userId: user._id },
        }
      );
      setFoodReq((prev) =>
        prev.filter((req) => {
          const matchFoodId =
            typeof req.foodId === "object" ? req.foodId._id : req.foodId;
          return !(matchFoodId === foodId && req.requesterId === user._id);
        })
      );
      toast.success("Request cancelled successfully");
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Failed to cancel request");
    }
  };

  const alreadyRequested = (foodId) =>
    foodReq.some((req) => {
      const reqFoodId =
        typeof req.foodId === "object" ? req.foodId._id : req.foodId;
      return req.requesterId === user._id && reqFoodId === foodId;
    });

  if (!food) {
    return (
      <div className='text-center text-xl font-bold p-10'>
        Loading food details...
      </div>
    );
  }

  return (
    <div className="p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh] text-gray-800 dark:text-white">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-3xl font-bold text-violet-600 mb-2">{food.foodName}</h2>
        <p><span className='font-bold '>Quantity:</span> {food.quantity} Unit</p>
        <p><span className='font-bold'>Status:</span> <span className='text-green-500'>{food.foodStatus}</span></p>
        <p><span className='font-bold'>Expired In:</span> {food.expriredIn} Days</p>
        <p><span className='font-bold'>Pick Location:</span> {food.pickLocation}</p>
        <p className="mt-4"><strong>Additional Notes:</strong></p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{food.additionalNotes}</p>
        <p className="mt-4"><strong>Created At:</strong> {food.createdAt.slice(0, 10)}</p>

        <div className="mt-6 flex gap-4">
          {food?.postedBy === user?._id ? (
            <button disabled className="btn bg-violet-500 cursor-not-allowed">
              Your post
            </button>
          ) : user?.role === "donor" ? (
            <button disabled className="btn bg-violet-500 cursor-not-allowed">
              Donor Can't Request
            </button>
          ) : alreadyRequested(food?._id) ? (
            <button
              onClick={() => cancelFoodReq(food?._id)}
              className="btn bg-red-400 hover:bg-red-500"
            >
              Cancel Request
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="btn bg-violet-400 hover:bg-violet-500"
            >
              Request Food
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-violet-600">Request Food</h2>
            <p><strong>Name:</strong> {food.foodName}</p>
            <p><strong>Pickup Location:</strong> {food.pickLocation}</p>
            <p><strong>Expires In:</strong> {food.expriredIn} days</p>
            <p><strong>Request Date:</strong> {new Date().toLocaleDateString()}</p>

            <textarea
              placeholder="Additional Notes (optional)"
              className="w-full mt-2 p-2 border rounded"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleFoodRequest}
                className="btn bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded"
              >
                Request
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodDetails;
