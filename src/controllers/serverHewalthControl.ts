import { Express, Request, Response } from "express";
export const serverHealth=(req: Request, res: Response)=>{
    res.status(200).send("ok");
}