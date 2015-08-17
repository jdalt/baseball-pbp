/*
  PlayActions describe how many outs an event will result in and how the base runners (including the batter) are able to advance.

  PlayAction properties:
    { abbrev: 'BB', // Standard scoring abbreviation
      outs: 0, // Outs awarded for this play actions
      name: 'Base on Balls', // Full name of play action
      advancement: {
        batter: 1, // how far the batter advances by default
        batterModifiable: true, // whether user can select end base for batter
        runnersModifiable: false, // whether use can select end base for runners
        optimistic: false // true: runners advance by same amount as batter by defaul, false: runners advance minimum possible bases
      }
    }

    Logical Consquences of This Model
    outs == 1 && advance.batter == 0 --> the batter is out
    outs == 1 && advance.batter == 1 --> a runner is out (a runner must exist)
*/

angular.module('game')
.constant('playActions', [
    { abbrev: 'BB', outs: 0, name: 'Base on Balls', advance:
      { batter: 1,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: false
      },
      isPossible: function() { return true }
    },
    { abbrev: '1B', outs: 0, name: 'Single', advance:
      { batter: 1,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: true
      },
      isPossible: function() { return true }
    },
    { abbrev: '2B', outs: 0, name: 'Double', advance:
      { batter: 2,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: true
      },
      isPossible: function() { return true }
    },
    { abbrev: '3B', outs: 0, name: 'Triple', advance:
      { batter: 3,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: true
      },
      isPossible: function() { return true }
    },
    { abbrev: 'HR', outs: 0, name: 'Home Run', advance:
      { batter: 4,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: true
      },
      isPossible: function() { return true }
    },
    { abbrev: 'K', outs: 1, name: 'Strike Out', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: false
      },
      isPossible: function() { return true }
    },
    { abbrev: 'SAC', outs: 1, name: 'Sacrifice', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: false
      },
      isPossible: function(gameState) {
        if(gameState.runners.length < 1) return false
        if(gameState.outs >= 2) return false
        return true
      }
    },
    { abbrev: 'F',  outs: 1, name: 'Flyout', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: false
      },
      isPossible: function() { return true }
    },
    { abbrev: 'FC', outs: 1, name: 'Fielders Choice', advance:
      { batter: 1,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: false
      },
      isPossible: function(gameState) {
        if(gameState.runners.length < 1) return false
        return true
      }
    },
    { abbrev: 'DP', outs: 2, name: 'Double Play', advance:
      { batter: 0,
        batterModifiable: true,
        runnersModifiable: true,
        optimistic: false
      },
      isPossible: function(gameState) {
        if(gameState.runners.length < 1) return false
        if(gameState.outs > 1) return false
        return true
      }
    },
    { abbrev: 'TP', outs: 3, name: 'Triple Play', advance:
      { batter: 0,
        batterModifiable: true,
        runnersModifiable: true,
        optimistic: false
      },
      isPossible: function(gameState) {
        if(gameState.runners.length < 2) return false
        if(gameState.outs > 0) return false
        return true
      }
    },
    { abbrev: 'E',  outs: 0, name: 'Error', advance:
      { batter: 1,
        batterModifiable: true,
        runnersModifiable: true,
        optimistic: true
      },
      isPossible: function() { return true }
    },
    { abbrev: 'B',  outs: 0, name: 'Balk', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: false
      },
      isPossible: function(gameState) {
        if(gameState.runners.length < 1) return false
        return true
      }
    },
  ]
)

