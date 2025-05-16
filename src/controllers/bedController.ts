import { Express, Request, response, Response } from "express";
import mongoose from "mongoose";
import { Bed, BedDocuments } from "../models/Beds";

// create bedDetails
export const createBed = async (req: Request, res: Response) => {
  const { bedNumber, ward, bedType, isOccupied } = req.body;
  const existingBed = await Bed.find({ bedNumber, ward });
  if (existingBed) {
    res.status(400).json({
      message: "Bed with same name/ward already there",
      success: false,
    });
  }
  const newBed = await Bed.create({
    bedNumber,
    ward,
    bedType,
    isOccupied,
  });
  if (newBed) {
    res.status(200).json({
      success: true,
      message: "Succesfully created new Bed",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get bed details
export const getBeds = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const bedList = await Bed.find().skip(skip).limit(limit).sort({ ward: 1 });

    const totalDocuments = await Bed.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const results = {
      data: bedList,
      pageCount: totalPages,
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// delete Bed
export const deleteBed = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const bedDetails = Bed.findOneAndDelete({ _id: objectId });
    console.log(bedDetails);

    if (await bedDetails) {
      res.status(200).json({
        success: true,
        message: "Bed succesfully deleted",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Bed is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// edit Bed
export const editBed = async (req: Request, res: Response) => {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);
  const { bedNumber, ward, bedType, isOccupied } = req.body;

  try {
    const bedDetails = await Bed.findOneAndUpdate(
      { _id: objectId },
      { bedNumber, ward, bedType, isOccupied },
      { new: true, runValidators: true }
    );
    if (bedDetails) {
      res.status(200).json({
        success: true,
        message: "Bed details modified succesfully",
        bedDetails,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Bed is not found",
    });
  }
};

// search Bed
export const searchBed = async (req: Request, res: Response) => {
  const { query } = req.query;
  
  if (!query) {
    response.status(400).json({
      success: false,
      message: "search query cannot be empty",
    });
  }
  console.log(query);
  try {
    const results = await Bed.find({
      $or: [
        { bedNumber: { $regex: new RegExp(query as string, "i") } },
        { ward: { $regex: new RegExp(query as string, "i") } },
        { bedType: { $regex: new RegExp(query as string, "i") } },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Search results",
      results,
    });
  } 
  catch(error) {
    console.error("Error during bed search:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during search",
      error
  })
}
}
