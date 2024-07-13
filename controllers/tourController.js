import Tour from "../models/Tour.js";

//create new tour
export const createTour=async(req,res)=>{
    const newTour=new Tour(req.body)
    try{
        const savedTour=await newTour.save()
        res.status(200).json({success:true,message:'Created Successfully',data:savedTour})
    }
    catch(err)
    {
        res.status(500).json({success:false,message:'Failed to Create,Try Again'})
        console.log(err)
    }
}

//update tour
export const updateTour=async(req,res)=>{
    const id=req.params.id
    try{
        const updatedTour=await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200).json({
            success:true,
            message:"Updated Successfully",
            data:updatedTour,
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Cant update, try it again"
        })
        console.log(err)
    }
}

//delete tour
export const deleteTour=async(req,res)=>{
    const id=req.params.id
    try{
        const deletedTour=await Tour.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Deleted Successfully",
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:"Failed to Delete"
        })
    }
}

//get 1 tour
export const getSingleTour=async(req,res)=>{
    const id=req.params.id
    try{
        const tour=await Tour.findById(id)
        res.status(200).json({
            success:true,
            message:"Found Successfully",
            data:tour,
        })
    }
    catch(err)
    {
        res.status(404).json({
            success:false,
            message:"Not Found"
        })
    }
}

//get packages
    export const getRelatedTour=async(req,res)=>{
        const title=new RegExp(req.query.title,'i')
        try
        {
            const relTour=await Tour.find({title})
            res.status(200).json({success:true,
                message:"Got all Related Tours",
                data:relTour,
            })
        }
        catch(err)
        {
            res.status(404).json({
                success:false,
                message:"Not Found"
            })
        }
    }

//get all tours
export const getAllTour=async(req,res)=>{
    const page=parseInt(req.query.page)
    try{
        const tours=await Tour.find({})
        .skip(page*8).limit(8)
        res.status(200).json({success:true,
            message:"Successful",
            data:tours,
        })
    }
    catch(err)
    {
        res.status(404).json({
            success:false,
            message:"Not Found"
        })
    }
}

