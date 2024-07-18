import mongoose from "mongoose";


const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
   /* touristAttractions: {
      type: String,
      required: true,
    },
    culturalExperiences: {
      type: String,
      required: true,
    },*/
    photo: {
      type: String,
      required: true,
    },
    days:{
      type:Number,
      required:true,
    },
    /*bestTimeToVisit: {
      type: String,
      required: true,
    },*/
    downloadItinerary: {
      type: String,
      required: true,
    },
    inclusions:{
      type:String,
      required:true,
    },
    exclusions:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
