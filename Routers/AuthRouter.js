import express from "express";
import {
  logins,
  profile,
  getUserById
} from "../Controllers/AuthCtrl.js";

const router = express.Router();

router.post("/login", logins);            
router.put("/profile/:id", profile);            
router.get("/profile/:id", getUserById);            

export default router;
