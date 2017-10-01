const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notNoneValidator = [
  function (value) {
    return value.length > 0 && value.toLocaleLowerCase() !== 'none'
  },
  '{PATH} cannot be "none"'
]

const requiredStringValidator = [
  function (value) {
    return value.trim().length > 0
  },
  '{PATH} cannot be empty'
]

const standupSchema = new Schema({
  memberName: { type: String, required: true, validate: notNoneValidator },
  project: { type: String, required: true, validate: notNoneValidator },
  workYesterday: { type: String, validate: requiredStringValidator },
  workToday: { type: String, validate: requiredStringValidator },
  impediment: { type: String, default: 'none' },
  createdOn: { type: Date, default: Date.now }
})

const Standup = mongoose.model('Standup', standupSchema)

module.exports = Standup

//
// Examples
//

function examples() {
  // Disable MongoDB automatic id generation.
  const noIdSchema = new Schema({ name: String }, { _id: false })

  // Schema.add example.
  const exampleSchema = new Schema()
  exampleSchema.add({ name: String, title: String })
}
