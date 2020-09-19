const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// homepage route
app.get('/', function (req, res) {
    return res.send({ error: false, message: "This is the root API call" })
});

// connection configurations
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Book-store'
});

// connect to database
dbConn.connect();

// retrieve all books 
app.get('/book', function (req, res) {
    dbConn.query('SELECT * FROM books', function (error, results, fields) {
        if (error) throw error;

        // check has data or not
        let message = "";
        if (results === undefined || results.length == 0)
            message = "Books table is empty";
        else
            message = "Successfully retrived all books";

        return res.send({ error: false, data: results, message: message });
    });
});

// retrieve book by id 
app.get('/book/:id', function (req, res) {

    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide book id' });
    }

    dbConn.query('SELECT * FROM books where id=?', id, function (error, results, fields) {
        if (error) throw error;

        // check has data or not
        let message = "";
        if (results === undefined || results.length == 0)
            message = "Book not found";
        else
            message = "Successfully retrived book data";

        return res.send({ error: false, data: results[0], message: message });
    });
});

// add a new book  
app.post('/book', function (req, res) {

    let name = req.body.name;
    let author = req.body.author;

    // validation
    if (!name || !author)
        return res.status(400).send({ error: true, message: 'Please provide book name and author' });

    // insert to db
    dbConn.query("INSERT INTO books (name, author) VALUES (?, ?)", [name, author], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Book successfully added' });
    });
});

// update book with id
app.put('/book', function (req, res) {

    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;

    // validation
    if (!id || !name || !author) {
        return res.status(400).send({ error: book, message: 'Please provide book id, name and author' });
    }

    dbConn.query("UPDATE books SET name = ?, author = ? WHERE id = ?", [name, author, id], function (error, results, fields) {
        if (error) throw error;

        // check data updated or not
        let message = "";
        if (results.changedRows === 0)
            message = "Book not found or data are same";
        else
            message = "Book successfully updated";

        return res.send({ error: false, data: results, message: message });
    });
});

// delete book by ID
app.delete('/book', function (req, res) {

    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide book id' });
    }
    dbConn.query('DELETE FROM books WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;

        // check data updated or not
        let message = "";
        if (results.affectedRows === 0)
            message = "Book not found";
        else
            message = "Book successfully deleted";

        return res.send({ error: false, data: results, message: message });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;