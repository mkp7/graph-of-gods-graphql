const graphOfGods = require('./graph-of-gods')

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    gods: () => graphOfGods,
    demiGods: () => graphOfGods,
    locations: () => graphOfGods
  },
  Locations: {
    sea: () => graphOfGods.sea,
    sky: () => graphOfGods.sky,
    tartarus: () => graphOfGods.tartarus
  },
  Location: {
    habitants: (parent, args, context, info) => {
      return parent.habitants.bind(graphOfGods)()
    }
  },
  Habitant: {
    __resolveType: (obj, context, info) => {
      if (obj.type === 'god') {
        return 'God'
      }

      if (obj.type === 'monster') {
        return 'Monster'
      }

      return null
    }
  },
  Gods: {
    jupiter: () => graphOfGods.jupiter,
    neptune: () => graphOfGods.neptune,
    pluto: () => graphOfGods.pluto,
  },
  God: {
    lives: (parent, args, context, info) => {
      return parent.lives.bind(graphOfGods)()
    },
    brothers: (parent, args, context, info) => {
      return parent.brothers.map(bro => bro.bind(graphOfGods)())
    },
    pet: (parent, args, context, info) => {
      return parent.pet.bind(graphOfGods)()
    }
  },
  DemiGods: {
    hercules: () => graphOfGods.hercules
  },
  DemiGod: {
    father: (parent, args, context, info) => {
      return parent.father.bind(graphOfGods)()
    },
    battled: (parent, args, context, info) => {
      return parent.battled && parent.battled.map(bt => ({...bt.monster.bind(graphOfGods)(), ...bt}))
    }
  },
  Monster: {
    lives: (parent, args, context, info) => {
      return parent.lives && parent.lives.bind(graphOfGods)()
    }
  }
};

module.exports = resolvers