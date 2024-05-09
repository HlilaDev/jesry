const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");

// Route to create a new quote
router.post("/add-quote", quoteController.addQuote);

// Route to get a random quote
router.get("/quotes", quoteController.getRandomeQuote);

// Route to get a single quote by ID
router.get("/quotes/:id", quoteController.getQuoteById);

// Route to update a quote by ID
router.put("/edit-quote/:id", quoteController.updateQuote);

// Route to delete a quote by ID
router.delete("/delete-quote/:id", quoteController.deleteQuote);

module.exports = router;
