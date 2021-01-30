const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connected to database");
})
.catch(err => {
    console.log("error!!");
    console.log(err);
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const randomCityNum = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '600ff1d62f0efc02ededd5ed',
            location: `${cities[randomCityNum].city}, ${cities[randomCityNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla porro ratione aspernatur. Pariatur praesentium similique, hic perspiciatis cumque maxime ut minus vero maiores quae culpa debitis dolorum rem reiciendis? Veritatis!',
            price,
            geometry : {
                  type: "Point",
                  coordinates: [
                      cities[randomCityNum].longitude,
                      cities[randomCityNum].latitude
                  ]
                },
            images: [ 
                { 
                    url:'https://res.cloudinary.com/mycloud-kd/image/upload/v1611753499/YelpCamp/ie7xtzfyhj2wjxhpfeef.jpg',
                    filename: 'YelpCamp/ie7xtzfyhj2wjxhpfeef' 
                },
                { 
                    url: 'https://res.cloudinary.com/mycloud-kd/image/upload/v1611753499/YelpCamp/atjj2veztshjjrkzuapw.jpg',
                    filename: 'YelpCamp/atjj2veztshjjrkzuapw'
                }
            ]
        })
        await camp.save();
    } 
}
seedDB().then(() => {
    mongoose.connection.close();
})