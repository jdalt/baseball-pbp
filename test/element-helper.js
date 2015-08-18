function selectOptions(select) {
  var options = select.find('option')
  return _.map(options, optionToObj)
}

function optionToObj(option) {
  var value = _.result(option, 'value')
  if (value) value = value.split(':')[1] // remove angular ng-option typing...
  return {
    value: value,
    text: _.result(option, 'text')
  }
}

function findOption(elem, text) {
  return elem.find("option:contains('" + text + "')")
}

function setOption(select, text) {
  // If we need to support select2 in the future, see:
  // https://github.com/sportngin/sport_admin/blob/5bce73/app/assets/ng/tournament/settings/tournament-stat-preferences-row-test.js#L122-L128
  var option = findOption(select, text)
  select.val(option.val())
    .trigger('change')
}

function getSelectedOption(select) {
  return optionToObj(select.find('option:selected')[0])
}

