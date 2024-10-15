require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const redis = require('redis');

// Create Redis client using async connect
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379
});

// Promisify Redis client connection
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
};

// Redis Event Handlers
redisClient.on('ready', () => {
  console.log('Redis is ready to accept commands');
});

redisClient.on('error', (err) => {
  console.error('Redis client could not connect:', err);
});

redisClient.on('end', () => {
  console.log('Redis connection closed');
});

const app = express();
const PORT = process.env.PORT || 3000;
const query = 'prostate cancer';
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-GB&gl=GB&ceid=GB:en`;

// Cache time-to-live (TTL)
const NEWS_CACHE_TTL = process.env.NEWS_CACHE_TTL_DAYS
? parseInt(process.env.NEWS_CACHE_TTL_DAYS) * 24 * 60 * 60
: 2419200 // 28 days in seconds

app.use(cors());

// Middleware to check Redis cache
const checkCache = async (req, res, next) => {
  try {
    const data = await redisClient.get('newsData');
    if (data) {
      console.log('Serving from Redis cache');
      return res.send(JSON.parse(data));
    } else {
      next(); // No cache, proceed to API fetch
    }
  } catch (err) {
    console.error('Redis error:', err);
    return res.status(500).send('Redis error');
  }
};

// Middleware to rate limit requests
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, try again later!'
});

app.use(limiter);

// Route to get news with caching
app.get('/news', checkCache, async (req, res) => {
  try {
    console.log('Fetching fresh data from API');
    const response = await axios.get(rssUrl);

    // Cache the data in Redis
    await redisClient.setEx('newsData', NEWS_CACHE_TTL, JSON.stringify(response.data));
    console.log('Data successfully cached in Redis');

    res.send(response.data);
  } catch (error) {
    console.error('Error fetching news from API:', error);
    res.status(500).send('Error fetching news');
  }
});

// Start the server only after Redis client connects
connectRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
