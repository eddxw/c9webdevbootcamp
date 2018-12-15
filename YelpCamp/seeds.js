const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

var data = [{
        name: "Union Creek",
        image: "https://205329-619722-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2014/04/Union-Creek-Site-3.jpg",
        description: "This picturesque campground in the midst of old growth forest cradles Union Creek as well as the intersection of Union Creek and the Rogue River. Quiet secluded campsites, there are many group sites for family and friends, which can be reserved www.roguerec.com. Groceries and a hot meal are close by in Prospect Oregon, or within walking distance at The Union Creek Resort. Amazing fishing locations, numerous hiking trails are within easy access to the Union Creek and Upper Rogue River Trails. Sites to see include Crater Lake, Rogue Gorge and Natural Bridge.",
    },
    {
        name: "Hidden Acres",
        image: "http://www.hiddenacrespa.com/wp-content/uploads/2017/12/6.Campground6-Hidden-Acres-Campground.jpg",
        description: `There aren’t many getaways that can create as many long-lasting memories as time spent camping. Hidden Acres Campground is family camping at its best.
        Nestled in the woods at the doorstep of Pennsylvania Dutch country in Coatesville, PA, Hidden Acres is the perfect place to leave it all behind for a night, a weekend, a week, or a whole summer season.`,
    },
    {
        name: "Black Mountain",
        image: "https://www.retreatcenterdirectory.com/wp-content/uploads/job-manager-uploads/main_image/2017/08/img_0853.jpg",
        description: `The buildings that now comprise Black Mountain Retreat Center were built in 1964 by the California Department of Forestry as part of their network of conservation camps. The minimum security ‘Black Mountain Camp’ was opened in October 1964 to house an 80-man crew that was assigned to work with local fire services on land clearing, telephone line maintenance and road-work. 
        The actual name‘ Black Mountain’ comes from the hills of these names around the property,
        although its origin is uncertain.The local forests underwent much logging and milling,
        and native flora has often struggled to stay dominant with the introduction of some very aggressive invasive species.We have been working to replace invasive or recently - introduced species with native plants,
        which is also key to effective safety.
        `,
    },
    {
        name: "Virginia’s Beach Lakefront",
        image: "https://virginiasbeach.com/img/RentalRow_Full.jpg",
        description: `Lake Erie is the shallowest and warmest of the Great Lakes and is great for swimming, jet skiing, fishing, and boating. The sunset on the lake is rated among the best in the world by National Geographic! Click here to learn more about recreational opportunities on the waters of Lake Erie at Virginia’s Beach.`
    },
    {
        name: "Fletcher Bay",
        image: "https://www.thecoromandel.com/assets/Tourism-Operators/images/_resampled/CroppedFocusedImageWzgwMCw2MDAsIngiLDg2XQ/Fletcher-Bay-Campsite.jpg",
        description: `64 km north of Coromandel town at the road end. This is a beachfront campsite in a farm setting. An ideal location for water sports, including swimming, boating, diving and fishing. The Coromandel Walkway and mountain bike track start and finish here. 
        There is space for 300 campers.`
    },
    {
        name: "Deep River",
        image: "http://www.deeprivercampground.com/yahoo_site_admin/assets/images/photo_1.149202829_std.JPG",
        description: `Deep River Campground is a beautiful scenic hillside park, located on The Deep River, We also have a 5 Acre Stocked Fishing Lake, and 20 Acres of groomed nature trails. Near the Zoo but also convenient to Greensboro, we offer cabins and Full Service RV Sites, and Unlimited Tent Camping! Our 2 Pools on the hillside have the best view in town! We also have laundry on site, a game room, play ground, and camp store.`
    },
    {
        name: "Spring Creek",
        image: "http://www.tarcoinc.com/CGImages/BT0901.jpg",
        description: `This is a very nice campground located about two miles south of Big Timber, MT on Hwy 298. It is on the Boulder river, a blue ribbon trout stream. The sites vary in size but no problems for big motorhomes. No sewer hookups in the sites on the river but they have a honey bucket service for $10 if you stay long enough to need it; or you can use the dump station. There are sewer hookups at other sites in the campground.
            They have two well stocked trout ponds. These are really great for the kids. We saw a boy that was around five years old come with his dad and his fishing pole. He cast into the pond and caught a trout, all by himself. He was so happy, as were several other kids, catching fish with their parents or grand parents. There is a charge for the fish you catch, but that makes sense considering the cost of maintaining and stocking the ponds.
            Nelda and Lynn, the sisters that run this campground, keep it in beautiful condition. That and the quiet location, make it a top rated campground in our books. You can go to sleep listening to the sound of the river, not bad eh? `,
    },
    {
        name: "Yellowstone Holiday",
        image: "http://www.tarcoinc.com/CGImages/MT0901.jpg",
        description: `Located on the north shore of beautiful Hebgen Lake Montana, Yellowstone Holiday RV Campground & Marina has all of the ingredients to create a spectacular summer vacation. Open Memorial Day through the end of September (weather permitting), visitors can stay in a cozy cabin, or park their RV at one of our 36 sites. Only 15 minutes from the West Entrance to Yellowstone National Park, Yellowstone Holiday is the perfect base camp to explore some of the most incredible sites in the world. We welcome you and your family to come play, and relax, in one of the most beautiful corners of the Great Outdoors.`,
    },
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // Add several campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added a campground");
                    // create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, (err, comment) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
