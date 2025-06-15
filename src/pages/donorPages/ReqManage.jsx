import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../../context/Context";
import AOS from "aos";
import "aos/dist/aos.css";

const ReqManage = () => {

    useEffect(()=>{
      document.title = "FoodRequest | NoHunger"
    }, [])
    

    useEffect(() => {
      AOS.init({ duration: 1200, once: false });
    }, []);
  

  const { user } = useContext(MyContext);
  const [requests, setRequests] = useState([]);
  const donorId = user?.role === "donor" ? user._id : "";

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`https://nohunger-project.vercel.app/api/request/requests-by-donor/${donorId}`);
      const data = res.data;
      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        console.warn("Expected array but got:", data);
        setRequests([]);
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    if (donorId) {
      fetchRequests();
    }
  }, [donorId]);

  const handleUpdate = async (requestId, status) => {
    try {
      await axios.patch(`https://nohunger-project.vercel.app/api/request/update-status/${requestId}`, { status });
      fetchRequests();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-5 bg-violet-300 dark:bg-gray-800 min-h-[70vh]">
    <div className="w-[90%] mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">All Food Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center dark:text-white text-black">No requests found.</p>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2">
          {requests.map((req , index) => (
            <div
            data-aos="fade-up"
            data-aos-delay={index * 200}
              key={req._id}
              className="border p-4 rounded-xl shadow-xl bg-white h-56 w-64 border-x-4 border-y-0 border-gray-800 dark:border-violet-500"
            >
              <h3 className="text-lg font-bold mb-2 text-center">
                Food: {req.foodId?.foodName}
              </h3>
              <p>
                <strong>Requester:</strong> {req.requesterId?.fullName}
              </p>
              <p>
                <strong>Email:</strong> {req.requesterId?.email}
              </p>
              <p>
                <strong>Pick Location:</strong> {req.foodId?.pickLocation}
              </p>
              <p>
                <strong>Requested At:</strong> {req.requestedAt.slice(0, 10)}
              </p>
              <p>
                <strong>Status:</strong> {req.status}
              </p>
              
              
              {req.status === "Pending" && (
                <div className="flex justify-center gap-2 mt-3">
                  <button
                    onClick={() => handleUpdate(req._id, "Approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdate(req._id, "Rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ReqManage;
