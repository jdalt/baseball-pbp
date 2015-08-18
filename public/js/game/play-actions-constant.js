/*
  PlayActions

  Describe how many outs an event will result in and how the base runners (including the batter) are able to advance.

  Properties

  {
    abbrev: 'BB', // Standard scoring abbreviation
    outs: 0, // Outs awarded for this play actions
    atBatOnly, // actions that always complete an at bat --> true; actions that can also occur before and after --> true
    name: 'Base on Balls', // Full name of play action
    advancement: {
      batter: 1, // how far the batter is guaranteed to advance by default
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
    { abbrev: 'BB', outs: 0, atBatOnly: true, requiredRunners: 0, name: 'Base on Balls', advance:
      { batter: 1,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: false
      },
    },
    { abbrev: 'IBB', outs: 0, atBatOnly: true, requiredRunners: 0, name: 'Intentional Base on Balls', advance:
      { batter: 1,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: false
      },
    },
    { abbrev: '1B', outs: 0, atBatOnly: true, requiredRunners: 0, name: 'Single', advance:
      { batter: 1,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: true
      },
    },
    { abbrev: '2B', outs: 0, atBatOnly: true, requiredRunners: 0, name: 'Double', advance:
      { batter: 2,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: true
      },
    },
    { abbrev: '3B', outs: 0, atBatOnly: true, requiredRunners: 0, name: 'Triple', advance:
      { batter: 3,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: true
      },
    },
    { abbrev: 'HR', outs: 0, atBatOnly: true, requiredRunners: 0, name: 'Home Run', advance:
      { batter: 4,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: true
      },
    },
    { abbrev: 'K', outs: 1, atBatOnly: true, requiredRunners: 0, name: 'Strike Out', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: false
      },
    },
    { abbrev: 'SAC', outs: 1, atBatOnly: true, requiredRunners: 1, name: 'Sacrifice', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: false
      },
    },
    { abbrev: 'F',  outs: 1, atBatOnly: true, requiredRunners: 0, name: 'Flyout', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: false,
        optimistic: false
      },
    },
    { abbrev: 'FC', outs: 1, atBatOnly: true, requiredRunners: 1, name: 'Fielders Choice', advance:
      { batter: 1,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: false
      },
    },
    { abbrev: 'DP', outs: 2, atBatOnly: true, requiredRunners: 1, name: 'Double Play', advance:
      { batter: 0,
        batterModifiable: true,
        runnersModifiable: true,
        optimistic: false
      },
    },
    { abbrev: 'TP', outs: 3, atBatOnly: true, requiredRunners: 2, name: 'Triple Play', advance:
      { batter: 0,
        batterModifiable: true,
        runnersModifiable: true,
        optimistic: false
      },
    },
    { abbrev: 'E', outs: 0, atBatOnly: false, requiredRunners: 0, name: 'Error', advance:
      { batter: 1,
        batterModifiable: true,
        runnersModifiable: true,
        optimistic: true
      },
    },
    { abbrev: 'St', outs: 0, atBatOnly: false, requiredRunners: 1, name: 'Steal', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: false
      },
    },
    { abbrev: 'Sub', outs: 0, atBatOnly: false, requiredRunners: 0, name: 'Substitution', advance:
      { batter: 0,
        batterModifiable: true,
        runnersModifiable: true,
        optimistic: false
      },
    },
    { abbrev: 'B', outs: 0, atBatOnly: false, requiredRunners: 1, name: 'Balk', advance:
      { batter: 0,
        batterModifiable: false,
        runnersModifiable: true,
        optimistic: false
      },
    },
  ]
)

