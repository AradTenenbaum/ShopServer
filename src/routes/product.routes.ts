import { Request, Response } from "express";
import { fetchAmazonData } from "../services/crawler.service";
import { getAllProducts } from "../services/product.service";
const router = require("express").Router();

router.get("/load", fetchAmazonData);
router.get("/all", getAllProducts);

export default router;
