const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sample recipe data
const recipes = [
    {
        id: 1,
        name: "Fluffy Buttermilk Pancakes",
        category: "breakfast",
        price: "$12.99",
        description: "Light and airy pancakes served with pure maple syrup and fresh berries",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
        fullDescription: "Start your day with our heavenly buttermilk pancakes. Each stack is made from scratch using premium ingredients, topped with fresh seasonal berries, a dollop of whipped cream, and drizzled with pure Canadian maple syrup. Perfect for a luxurious breakfast experience.",
        prepTime: "15 mins",
        cookTime: "20 mins",
        servings: "2-3"
    },
    {
        id: 2,
        name: "Mediterranean Grilled Chicken Salad",
        category: "lunch",
        price: "$15.99",
        description: "Fresh garden salad with grilled chicken, feta, and olive vinaigrette",
        image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80",
        fullDescription: "A refreshing and healthy salad featuring succulent grilled chicken breast, mixed greens, cherry tomatoes, cucumber, red onions, Kalamata olives, and crumbled feta cheese. Dressed with our house-made olive vinaigrette and served with warm pita bread.",
        prepTime: "20 mins",
        cookTime: "15 mins",
        servings: "1-2"
    },
    {
        id: 3,
        name: "Prime Ribeye Steak",
        category: "dinner",
        price: "$29.99",
        description: "Premium aged ribeye with roasted vegetables and red wine reduction",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
        fullDescription: "Savor our perfectly cooked prime ribeye steak, aged for 28 days for maximum flavor. Served with garlic-roasted seasonal vegetables, creamy mashed potatoes, and a rich red wine reduction sauce. A true fine dining experience at home.",
        prepTime: "25 mins",
        cookTime: "20 mins",
        servings: "1-2"
    },
    {
        id: 4,
        name: "Avocado Toast & Poached Eggs",
        category: "breakfast",
        price: "$13.99",
        description: "Sourdough toast topped with smashed avocado and perfectly poached eggs",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        fullDescription: "Artisanal sourdough bread toasted to perfection, topped with freshly smashed avocado seasoned with lime and sea salt, two perfectly poached eggs, cherry tomatoes, and microgreens. Served with a side of fresh fruit.",
        prepTime: "10 mins",
        cookTime: "10 mins",
        servings: "1"
    },
    {
        id: 5,
        name: "Asian Quinoa Bowl",
        category: "lunch",
        price: "$14.99",
        description: "Healthy quinoa bowl with edamame, avocado, and sesame dressing",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        fullDescription: "A nutritious and flavorful bowl featuring quinoa, edamame, shredded carrots, cucumber, avocado, and pickled red cabbage. Topped with sesame seeds and a homemade ginger-sesame dressing. Both healthy and satisfying.",
        prepTime: "15 mins",
        cookTime: "20 mins",
        servings: "1-2"
    },
    {
        id: 6,
        name: "Grilled Salmon with Asparagus",
        category: "dinner",
        price: "$24.99",
        description: "Fresh Atlantic salmon with grilled asparagus and lemon butter sauce",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
        fullDescription: "Fresh Atlantic salmon fillet grilled to perfection, served with crisp asparagus spears and a light lemon butter sauce. Garnished with fresh herbs and accompanied by wild rice pilaf. A healthy and delicious dinner option.",
        prepTime: "15 mins",
        cookTime: "25 mins",
        servings: "1-2"
    }
];

// Routes
app.get('/', (req, res) => {
    res.render('home', { recipes: recipes });
});

app.get('/breakfast', (req, res) => {
    const breakfastRecipes = recipes.filter(recipe => recipe.category === 'breakfast');
    res.render('category', { recipes: breakfastRecipes, category: 'Breakfast' });
});

app.get('/lunch', (req, res) => {
    const lunchRecipes = recipes.filter(recipe => recipe.category === 'lunch');
    res.render('category', { recipes: lunchRecipes, category: 'Lunch' });
});

app.get('/dinner', (req, res) => {
    const dinnerRecipes = recipes.filter(recipe => recipe.category === 'dinner');
    res.render('category', { recipes: dinnerRecipes, category: 'Dinner' });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact', (req, res) => {
    // Here you would typically handle the contact form submission
    // For now, we'll just redirect back to the contact page
    res.redirect('/contact');
});

app.get('/recipe/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('recipe-detail', { recipe });
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
