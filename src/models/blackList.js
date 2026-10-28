import mongoose from "mongoose";

const blackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  tokenHash: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

blackSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("blacklist", blackSchema);
