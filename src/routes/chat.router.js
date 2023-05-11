import { Router } from "express";
import MessageManagerDao from "../Dao/chatManagerDao.js";

const router = Router();
const manager = new MessageManagerDao();

