# 🎬 Movies DB

An API endpoint where you can add new movies. **Duplicate movies are not allowed!**  

## 📌 API Routes  

### 🔹 Get All Movies  
**`GET /movies`**  
- Retrieves all movies in the database.  

### 🔹 Search for a Movie  
**`GET /search?title=...`**  
- Fetches a movie by title.  
- **Important:** The query parameter (`title`) must be correct, as the API is strict about mistakes.  

### 🔹 Add a New Movie  
**`POST /movies/new`**  
- Publishes a new movie to the database.  
- **Note:** The same movie cannot be added twice.  

---

🚀 **Happy coding!** 🎥  
