import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar, FaChevronLeft } from "react-icons/fa";
import api from "../../api";

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  // Booking details fetch karein (Optional: To show service name)
  useEffect(() => {
    api.get(`/booking/detail/${id}`).then(res => setBooking(res.data));
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating!");
    setLoading(true);
    try {
      
      await api.post("/review/add", {
        booking: id,
        service: booking.service,
        provider: booking.provider,
        rating,
        comment
      });
      toast.success("Review submitted successfully!");
    } catch (err) {
        toast.error(err.response?.data?.msg)
    } finally {
      setLoading(false);
      navigate("/user/booking");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-7 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-[2.5rem] py-8 px-5 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">
            Leave a <span className="text-blue-600">Review</span>
          </h2>
          <p className="text-slate-500 mb-8">Share your experience with this service.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Star Rating */}
            <div className="flex flex-col items-center p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Tap to Rate</span>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="transition-transform active:scale-90"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <FaStar
                      className={`w-10 h-10 ${
                        star <= (hover || rating) ? "text-yellow-400" : "text-slate-200"
                      } transition-colors duration-200`}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm font-bold text-slate-600 uppercase">
                {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good" : rating === 3 ? "Good" : rating === 2 ? "Fair" : rating === 1 ? "Poor" : "Select Rating"}
              </p>
            </div>

            {/* Comment Area */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Your Feedback</label>
              <textarea
                required
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-5 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-700"
                placeholder="What did you like or dislike?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
                loading ? "bg-slate-200 text-slate-400" : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
              }`}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;