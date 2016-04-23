module.exports = function(mongoose){

  // Create a new mongoose schema
  var ContactSchema = mongoose.Schema({
    name: {type: String, required: true},
    telefon: {type: Number, required: false},
    email: {type: String, required: true}
  });

  //enforce the schema required key even when the PUT method is used
  //we use .pre since we want to validate before saving it to the database
  ContactSchema.pre('update', function(next) {
    this.options.runValidators = true;
    next();
  });
  // Return the model
  return mongoose.model("Contact", ContactSchema);
};