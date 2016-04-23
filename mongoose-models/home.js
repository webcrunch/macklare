module.exports = function(mongoose){

  //require the populate post function
  var populatePosts = require('./../app/monPop').populatePosts;

  // Create a new mongoose schema
  var HomeSchema = mongoose.Schema({
    address: {type: String, required: true},
    area: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: Number, required: true},
    price: {type: Number, required: true},
    shown: {type: Boolean, required: true},
    img: [
      {type: String, required: false},
      {type: String, required: false},
      {type: String, required: false},
      {type: String, required: false},
      ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true
    }
  });

  //enforce the schema required key even when the PUT method is used
  //we use .pre since we want to validate before saving it to the database
  HomeSchema.pre('update', function(next) {
    this.options.runValidators = true;
    next();
  });

  //after GET we populate the required fields
  HomeSchema.post('find', function(docs, next) {
      populatePosts(docs, next, 'owner');
      populatePosts(docs, next, 'seller');
    });

  // Return the model
  return mongoose.model("Home", HomeSchema);
};