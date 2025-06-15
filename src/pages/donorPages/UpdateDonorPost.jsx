import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const UpdateDonorPost = () => {

    useEffect(()=>{
      document.title = "UpdatePost | NoHunger"
    }, [])
    

  const { id } = useParams();
  const navigate = useNavigate()

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://nohunger-project.vercel.app/api/food/get-post-by-id/${id}`)
      .then((res) => {
        // console.log("Fetched post data:", res.data);
        setFormData(res.data.post);
      })
      .catch(() => {
        toast.error("Failed to fetch post data");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://nohunger-project.vercel.app/api/food/update-donor-post/${id}`, formData)
      .then(() => {
        toast.success("Post updated successfully!");
        setTimeout(() => {
            navigate('/manage-my-food')
        }, 1000);
      })
      .catch(() => {
        toast.error("Failed to update post");
      });
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-violet-300 dark:bg-gray-800">
        <ToastContainer />
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-violet-300 dark:bg-gray-800 min-h-[80vh]">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 min-w-96 max-w-[400px] mx-auto p-4 bg-violet-100 dark:bg-white rounded-xl shadow-md my-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Food Post</h2>

        <div>
          <label className="block font-semibold mb-1">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Food Image</label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity in Unit</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Expired In Days</label>
          <input
            type="number"
            name="expriredIn"
            value={formData.expriredIn}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Pick Location</label>
          <input
            type="text"
            name="pickLocation"
            value={formData.pickLocation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Food Status</label>
          <select
            name="foodStatus"
            value={formData.foodStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="Available">Available</option>
            <option value="Not available">Not available</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded font-semibold w-full cursor-pointer"
        >
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateDonorPost;






