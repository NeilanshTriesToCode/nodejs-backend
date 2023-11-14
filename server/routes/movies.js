// file containing API endpoints
// this will have the code concerneed with the "movies" route
const express = require("express");
import { connectToServer, getCollection } from '../db/conn';

// defining movies route
const moviesRoute = express.Router();

