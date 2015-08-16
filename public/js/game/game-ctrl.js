angular.module('game')
.controller('GameCtrl', function($scope) {
  var vm = this

  vm.rosterTeam1 = [
    { id: 1001, order: 1, name: "Jimmy", position: 'P'},
    { id: 1002, order: 2, name: "Ralph", position: 'C'},
    { id: 1003, order: 3, name: "Groucho", position: '1B'},
    { id: 1004, order: 4, name: "Deadpan", position: '2B'},
    { id: 1005, order: 5, name: "Rando", position: '3B'},
    { id: 1006, order: 6, name: "Same", position: 'SS'},
    { id: 1007, order: 7, name: "Froto", position: 'LF'},
    { id: 1008, order: 8, name: "Lila", position: 'CF'},
    { id: 1009, order: 9, name: "Peach", position: 'RF'}
  ]

  vm.rosterTeam2 = [
    { id: 2001, order: 1, name: "Suza", position: 'P'},
    { id: 2002, order: 2, name: "Garbonzo", position: 'C'},
    { id: 2003, order: 3, name: "Goose", position: '1B'},
    { id: 2004, order: 4, name: "Maverick", position: '2B'},
    { id: 2005, order: 5, name: "Ice Man", position: '3B'},
    { id: 2006, order: 6, name: "Vulcan", position: 'SS'},
    { id: 2007, order: 7, name: "Fox", position: 'LF'},
    { id: 2008, order: 8, name: "Toadstool", position: 'CF'},
    { id: 2009, order: 9, name: "Bowser", position: 'RF'}
  ]

  vm.state = {
    outs: 0,
    inning: 'T1',
    pitcher: vm.rosterTeam2[0],
    batter: vm.rosterTeam1[0],
    base1: {},
    base2: {},
    base3: {}
  }

  vm.playActions = [
    { abbrev: 'BB', outs: 0, minAdv: 1, name: 'Base on Balls' },
    { abbrev: '1B', outs: 0, minAdv: 1, name: 'Single' },
    { abbrev: '2B', outs: 0, minAdv: 2, name: 'Double' },
    { abbrev: '3B', outs: 0, minAdv: 3, name: 'Triple' },
    { abbrev: 'HR', outs: 0, minAdv: 4, name: 'Home Run' },
    { abbrev: 'SO', outs: 1, minAdv: 0, name: 'Strike Out' },
    { abbrev: 'SF', outs: 1, minAdv: 0, name: 'Sacrifice Fly' },
    { abbrev: 'S',  outs: 1, minAdv: 0, name: 'Sacrifice' },
    { abbrev: 'P',  outs: 1, minAdv: 0, name: 'Popout' },
    { abbrev: 'F',  outs: 1, minAdv: 0, name: 'Flyout' },
    { abbrev: 'L',  outs: 1, minAdv: 0, name: 'Lineout' },
    { abbrev: 'FC', outs: 1, minAdv: 0, name: 'Fielders Choice' },
    { abbrev: 'DP', outs: 2, minAdv: 0, name: 'Double Play' },
    { abbrev: 'TP', outs: 3, minAdv: 0, name: 'Triple Play' },
    { abbrev: 'B',  outs: 0, minAdv: 1, name: 'Balk' }
  ]

  vm.plays = []
})
