angular.module('game')
.factory('GameSettings', function(_) {

  var innings = _.map(_.range(1,10), function(inningNum) {
    return {
      number: inningNum,
      top: { completedAtBats: [] },
      bottom: { completedAtBats: [] }
    }
  })

  var awayTeam = {
    name: 'Leland Giants',
    pitcher: { id: 1001, name: "Jimmy"},
    runs: 0,
    batterIndex: 0,
    lineup: [
      { id: 1001, name: "Fig", position: 'DH'},
      { id: 1002, name: "Ralph", position: 'C'},
      { id: 1003, name: "Groucho", position: '1B'},
      { id: 1004, name: "Deadpan", position: '2B'},
      { id: 1005, name: "Rando", position: '3B'},
      { id: 1006, name: "Sam", position: 'SS'},
      { id: 1007, name: "Froto", position: 'LF'},
      { id: 1008, name: "Lila", position: 'CF'},
      { id: 1009, name: "Peach", position: 'RF'}
    ]
  }

  var homeTeam = {
    name: 'White Elepants',
    pitcher: { id: 2001, name: "Suza"},
    runs: 0,
    batterIndex: 0,
    lineup: [
      { id: 2001, name: "Landon", position: 'DH'},
      { id: 2002, name: "Garbonzo", position: 'C'},
      { id: 2003, name: "Goose", position: '1B'},
      { id: 2004, name: "Maverick", position: '2B'},
      { id: 2005, name: "Ice Man", position: '3B'},
      { id: 2006, name: "Vulcan", position: 'SS'},
      { id: 2007, name: "Fox", position: 'LF'},
      { id: 2008, name: "Toadstool", position: 'CF'},
      { id: 2009, name: "Bowser", position: 'RF'}
    ]
  }

  return {
    innings: innings,
    homeTeam: homeTeam,
    awayTeam: awayTeam
  }

})
