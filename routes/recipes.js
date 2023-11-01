const express = require('express');
const router = express.Router();
const recipes = require('../recipes.json');


router.get('/', (req, res) => {
    const { context } = req;
    let results = [];
    if (context.searchTerm) {
        results = recipes.filter(({name}) => name.match(context.search))
    } else {
        results = recipes
    }
    
    const data = results.slice(context.skip, context.skip + context.limit);
    
    res.json({
        page: context.page,
        limit: context.limit,
        skip: context.skip,
        search: context.searchTerm,
        data,
    });
});

module.exports = router;
