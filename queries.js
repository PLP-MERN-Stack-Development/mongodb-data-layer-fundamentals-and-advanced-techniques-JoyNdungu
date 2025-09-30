// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })


// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting by price ascending
db.books.find().sort({ price: 1 })

// Sorting by price descending
db.books.find().sort({ price: -1 })

// Pagination: first 5 books
db.books.find().limit(5)

// Pagination: skip first 5, get next 5
db.books.find().skip(5).limit(5)



// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade
db.books.aggregate([
  { $project: { decade: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] } ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])


// Create index on title
db.books.createIndex({ title: 1 })

// Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Check performance with explain
db.books.find({ title: "1984" }).explain("executionStats")
