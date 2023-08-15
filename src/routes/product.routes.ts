import { getAllProducts } from "../services/product.service";
const router = require("express").Router();

router.get("/all", getAllProducts);

export default router;
