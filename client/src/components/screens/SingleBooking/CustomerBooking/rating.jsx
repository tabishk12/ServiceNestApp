import { useState } from "react";
import { Star } from "lucide-react"; // using lucide icons
import { useCreateRatingMutation } from "@slices/Api/booking.Api"; // assume you have rating API

const RatingComponent = ({ bookingId, providerId,serviceId, onRated }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [createRating, { isLoading }] = useCreateRatingMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
    const success =  await createRating({
        bookingId,
        providerId,
        serviceId,
        rating,
        comment,
      }).unwrap();

      if (onRated) onRated(); // callback to parent (e.g., refresh booking details)
     if(success) alert("✅ Thanks for your feedback!");
    } catch (err) {
     console.error("Rating failed:", err);
     }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Rate Your Experience</h3>

      {/* Star rating */}
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer transition ${
              (hover || rating) >= star
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
            onClick={() =>setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>

      {/* Comment box */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment (optional)"
        className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        // disabled={rating === 0 || isLoading}
        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
      >
        { "Submit Rating"}
      </button>
    </div>
  );
};

export default RatingComponent;
