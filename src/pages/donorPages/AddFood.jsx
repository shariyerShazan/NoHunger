import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { MyContext } from "../../context/Context";

const AddFood = () => {

  useEffect(()=>{
    document.title = "AddFood | NoHunger"
  }, [])
  
  const { user } = useContext(MyContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const quantity = form.quantity.value;
    const expriredIn = form.expriredIn.value;
    const pickLocation = form.pickLocation.value;
    const additionalNotes = form.additionalNotes.value;
    const foodStatus = form.foodStatus.value;
    const postedBy = user._id; 

    try {
      const res = await axios.post("https://nohunger-project.vercel.app/api/food/add-food", {
        foodName,
        foodImage,
        quantity,
        expriredIn,
        pickLocation,
        foodStatus,
        additionalNotes,
        postedBy,
      });
      if (res.data.success) {
        toast(res.data.message);
        setErrorMessage("");
        form.reset();
      } else {
        setErrorMessage(res.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(" error:", error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex gap-5 justify-center items-center flex-col-reverse sm:flex-row bg-violet-300 dark:bg-gray-800 min-h-[80vh]">
      <ToastContainer />
      <div>
        <form
          onSubmit={handleAddFood}
          className="space-y-4 min-w-96 max-w-[400px] mx-auto p-4 bg-violet-100 dark:bg-white rounded-xl shadow-md my-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center ">Add New Food</h2>

          <div>
            <label className="block font-semibold mb-1">Food Name</label>
            <input
              type="text"
              name="foodName"
              placeholder="Enter food name"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Food Image</label>
            <input
              type="text"
              name="foodImage"
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Quantity in Unit</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Exprired In Days</label>
            <input
              type="number"
              name="expriredIn"
              placeholder="Enter exprired in (Days)"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Pick Location</label>
            <input
              type="text"
              name="pickLocation"
              placeholder="Enter your location"
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 ">Food Status</label>
            <select
              name="foodStatus"
              id=""
              className="select cursor-pointer w-full"
            >
              <option disabled={true}>Food Status</option>
              <option value={"Available"}>Available</option>
              <option value={"Not available"}>Not available</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Additional Notes</label>
            <textarea
              name="additionalNotes"
              placeholder="Write description or note about your donation"
              rows="4"
              className="w-full px-4 py-2 border rounded"
              required
            ></textarea>
          </div>
          {<span className="text-red-500 pb-2">{errorMessage}</span>}
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 cursor-pointer text-white px-6 py-2 rounded font-semibold w-full"
          >
            Add Food
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2 text-center text-violet-700 mt-8">
          🍽️ Donate Your Extra Food Today!
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4 dark:text-white">
          Help someone in need by sharing your extra food.
        </p>
        <img
          src="https://img.freepik.com/free-vector/food-donation-concept-illustration_114360-11298.jpg"
          alt="Donate Food"
          className="rounded-xl w-full h-40 object-cover"
        />
      </div>
    </div>
  );
};

export default AddFood;
