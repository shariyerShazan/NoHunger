import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

function FoodDetails() {
    useEffect(()=>{
      document.title = "FoodDetails | NoHunger"
    }, [])
    
  const { id } = useParams();
  const [food, setFood] = useState(null);

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

  if (!food) {
    return (
      <div className='text-center text-xl font-bold p-10'>
        Loading food details...
      </div>
    );
  }

  return (
    <div className="p-6 bg-violet-300 dark:bg-gray-800 min-h-[70vh] text-gray-800 dark:text-white">
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
      </div>
    </div>
  );
}

export default FoodDetails;
