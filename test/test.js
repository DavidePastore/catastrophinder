var fs = require('fs')
var chai = require('chai')
var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = chai.assert // Using Assert style

const FILE_PATH = 'data/events.json'

describe('events.json file', function () {
  var fileContent = fs.readFileSync(FILE_PATH)
  it('should be a valid JSON file', function () {
    assert.doesNotThrow(
      () => {
        JSON.parse(fileContent)
      }
    )
  })

  it('should contains all the required fields', function () {
    const requireFields = [
      'title',
      'latitude',
      'longitude',
      'date',
      'link'
    ]
    var events = JSON.parse(fileContent)
    events.forEach(function (event, index) {
      requireFields.forEach(function (field) {
        assert.isDefined(event[field], 'The ' + field + ' field is not defined for event ' + index)
      })
    })
  })

  it('should contains valid title string', function () {
    var events = JSON.parse(fileContent)
    events.forEach(function (event, index) {
      const title = event.title
      assert.isString(title, 'The title field is not defined for event ' + index)
      assert.isNotEmpty(title, 'The title field is an empty string')
    })
  })

  it('should contains valid latitude and longitude values', function () {
    var events = JSON.parse(fileContent)
    events.forEach(function (event, index) {
      const latitude = event.latitude
      const longitude = event.longitude
      assert.isNumber(latitude, 'The latitude field is not defined for event ' + index)
      assert.isNumber(longitude, 'The longitude field is not defined for event ' + index)
    })
  })

  it('should contains valid date string', function () {
    var events = JSON.parse(fileContent)
    events.forEach(function (event, index) {
      const date = event.date
      assert.isString(date, 'The date field is not defined for event ' + index)
      assert.match(date, /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'The date should be in the YYYY-MM-DD format')
    })
  })

  it('should contains valid link string', function () {
    var events = JSON.parse(fileContent)
    events.forEach(function (event, index) {
      const link = event.link
      assert.isString(link, 'The link field is not defined for event ' + index)
      assert.isNotEmpty(link, 'The link field is an empty string')
    })
  })
})
