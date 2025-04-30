// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const philatelicItemRoutes = require('./routes/philatelicItem.route');
const createCircleRoutesByAdmin = require('./routes/admin.route');
const authRoutes = require('./routes/auth.route');

const newsRoutes = require('./routes/news.route');
const forumRoutes = require('./routes/forum.route');
const userRoutes = require('./routes/user.route');


const cookieParser = require('cookie-parser');


const postRoutes = require("./routes/community-post.route");
const reactionRoutes = require("./routes/community-reaction.route");
const commentRoutes = require("./routes/Community-comments.route");
const galleryRoutes = require('./routes/gallery.route');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  credentials: true // Include cookies if needed
}));

app.use('/api/admin', createCircleRoutesByAdmin);
app.use('/api/auth', authRoutes); 
// app.use('/api/postal-circles', postalCircleRoutes);
app.use('/api/philatelic-items', philatelicItemRoutes);
// app.use('/api/pda', pdaRoutes); 
// app.use('/api/events', eventRoutes); 
app.use('/api/news', newsRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/subscribers', subscriberRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/comments", commentRoutes);
app.use('/api/gallery', galleryRoutes);
// app.use('/api/pdaOrders',pdaOrderRoutes);
app.use('/api/forum', forumRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: 'Resource not found' });
// });
module.exports = app;
