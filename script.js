// Load books from localStorage or use sample data
let sampleBooks = JSON.parse(localStorage.getItem("books")) || [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", editorial: "J.B. Lippincott & Co.", edition: 1, pages: 281 },
    { id: 2, title: "1984", author: "George Orwell", editorial: "Secker & Warburg", edition: 1, pages: 328 },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", editorial: "Charles Scribner's Sons", edition: 1, pages: 218 },
    { id: 4, title: "Romeo and Juliet", author: "William Shakespeare", editorial: "Penguin Classics", edition: 3, pages: 320 },
    { id: 5, title: "Solo Leveling Vol. 1", author: "Chugong", editorial: "Yen Press", edition: 1, pages: 400 },
    { id: 6, title: "Pride and Prejudice", author: "Jane Austen", editorial: "Modern Library", edition: 2, pages: 279 },
    { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", editorial: "Little, Brown and Company", edition: 1, pages: 234 },
    { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", editorial: "George Allen & Unwin", edition: 1, pages: 310 },
    { id: 9, title: "Hamlet", author: "William Shakespeare", editorial: "Folger Shakespeare Library", edition: 5, pages: 278 },
    { id: 10, title: "The Art of War", author: "Sun Tzu", editorial: "Shambhala", edition: 1, pages: 273 }
];

// Display books on the homepage
function displayBooks() {
    const itemList = document.getElementById("item-list");
    if (itemList) {
        itemList.innerHTML = ""; // Clear the list before rendering
        sampleBooks.forEach(book => {
            const listItem = document.createElement("li");

            // Book Details Link
            const link = document.createElement("a");
            link.href = `item.html?id=${book.id}`;
            link.textContent = `${book.title} by ${book.author}`;
            listItem.appendChild(link);

            // Edit Button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");
            editButton.onclick = () => {
                window.location.href = `edit.html?id=${book.id}`;
            };
            listItem.appendChild(editButton);

            // Delete Button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = () => {
                deleteBook(book.id);
            };
            listItem.appendChild(deleteButton);

            itemList.appendChild(listItem);
        });
    }
}

// Delete book functionality
function deleteBook(bookId) {
    sampleBooks = sampleBooks.filter(book => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(sampleBooks));
    alert("Book deleted!");
    displayBooks();
}

// Handle the "Edit Book" form
document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("edit-form");
    if (editForm) {
        const params = new URLSearchParams(window.location.search);
        const bookId = params.get("id");
        const book = sampleBooks.find(b => b.id == bookId);

        if (book) {
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("editorial").value = book.editorial;
            document.getElementById("edition").value = book.edition;
            document.getElementById("pages").value = book.pages;

            editForm.addEventListener("submit", function (event) {
                event.preventDefault();

                book.title = document.getElementById("title").value;
                book.author = document.getElementById("author").value;
                book.editorial = document.getElementById("editorial").value;
                book.edition = parseInt(document.getElementById("edition").value);
                book.pages = parseInt(document.getElementById("pages").value);

                localStorage.setItem("books", JSON.stringify(sampleBooks));
                alert("Book updated!");
                window.location.href = "index.html";
            });
        } else {
            alert("Book not found!");
            window.location.href = "index.html";
        }
    }

    // Initialize books list if on homepage
    if (document.getElementById("item-list")) {
        displayBooks();
    }
});
