# Book Store API

This project is a simple RESTful API for managing a bookstore, built using Node.js, Express, and MySQL. The API allows you to create, retrieve, update, and delete books in the bookstore database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/book-store-api.git
   cd book-store-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the database:**

   Ensure you have MySQL installed and running. Create a database named `Book-store` and a table named `books` with the following schema:
   ```sql
   CREATE TABLE books (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       author VARCHAR(255) NOT NULL
   );
   ```

4. **Update database configuration:**

   Modify the database connection settings in the `dbConn` object within `index.js` if necessary:
   ```javascript
   const dbConn = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: '',
       database: 'Book-store'
   });
   ```

5. **Start the server:**
   ```bash
   node index.js
   ```

   The server will start on port 3000.

## Usage

Once the server is running, you can use an API client like Postman or cURL to interact with the API.

## API Endpoints

### Root
- **GET /**

  Returns a welcome message.

  **Response:**
  ```json
  {
    "error": false,
    "message": "This is the root API call"
  }
  ```

### Books
- **GET /book**

  Retrieves all books.

  **Response:**
  ```json
  {
    "error": false,
    "data": [...],
    "message": "Successfully retrieved all books"
  }
  ```

- **GET /book/:id**

  Retrieves a book by its ID.

  **Parameters:**
  - `id`: The ID of the book.

  **Response:**
  ```json
  {
    "error": false,
    "data": {...},
    "message": "Successfully retrieved book data"
  }
  ```

- **POST /book**

  Adds a new book.

  **Body:**
  ```json
  {
    "name": "Book Name",
    "author": "Author Name"
  }
  ```

  **Response:**
  ```json
  {
    "error": false,
    "data": {...},
    "message": "Book successfully added"
  }
  ```

- **PUT /book**

  Updates an existing book.

  **Body:**
  ```json
  {
    "id": 1,
    "name": "Updated Book Name",
    "author": "Updated Author Name"
  }
  ```

  **Response:**
  ```json
  {
    "error": false,
    "data": {...},
    "message": "Book successfully updated"
  }
  ```

- **DELETE /book**

  Deletes a book by its ID.

  **Body:**
  ```json
  {
    "id": 1
  }
  ```

  **Response:**
  ```json
  {
    "error": false,
    "data": {...},
    "message": "Book successfully deleted"
  }
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
