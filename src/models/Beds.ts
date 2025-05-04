import mongoose, { Document, Schema, Model, model } from "mongoose";
export interface BedDocuments extends Document {
    _id: string;
    bedNumber: string;
    ward: string;
    bedType: string[];
    isOccupied: boolean;
    createdAt: Date;
  }
  const bedSchema = new Schema({
    bedNumber: {type:String,required:true},
    ward: {type:String,required:true},
    bedType: {type:String,required:true,default:"General"},
    isOccupied: {type:Boolean,required:true},
    createdAt:{type:Date}
  })
  export const Bed:Model<BedDocuments> = mongoose.model<BedDocuments>("Bed",bedSchema)