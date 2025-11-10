const route = require('express').Router();
const ensureAuthenticated = require('../middleware/auth');

route.get('/', ensureAuthenticated, (req, res) => {
    try {
        res.json([
            {name:"Product 1", price:100},
            {name:"Product 2", price:200},
            {name:"Product 3", price:300}
        ]);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({
            message: 'Error fetching products',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined,
            success: false
        });
    }
});

module.exports = route;
