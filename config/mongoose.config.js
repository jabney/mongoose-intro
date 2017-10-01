const mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = Promise
  var mongoConnection = mongoose.connect(process.env.MONGOOSE_URI, {
    useMongoClient: true
  }).then((connection) => {
    console.log(`Connected to MongoDB at ${connection.host}:${connection.port}`)
  }).catch((error) => console.error(error))
}
