import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    default: '',
  },
  feedback: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
