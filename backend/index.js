import express from "express"
import cors from "cors";
import authRoutes from "./auth.js";
import bookRoutes from "./bookmanage.js";
import authorRoutes from "./authormanage.js";
import reviewRoutes from "./reviewmanage.js";
import userRoutes from "./user.js";
import shelvesRoutes from "./shelvesmanage.js";
import followRoutes from "./followmanage.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // add authenticateToken as second argument
app.use ('/api/authors', authorRoutes);
app.use ('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shelves', shelvesRoutes);
app.use('/api/follow', followRoutes);

app.listen(8000, ()=>{
    console.log("Connected to backend!")
})