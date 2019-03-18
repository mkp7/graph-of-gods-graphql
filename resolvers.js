const graphOfGods = require('./graph-of-gods')

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    gods: () => graphOfGods,
    allGods: () => {
      const gods = []
      for(v of Object.values(graphOfGods)) {
        if( v.type === 'god') {
          gods.push(v)
        }
      }
      console.log(gods)

      return gods
    },
    demiGods: () => graphOfGods,
    locations: () => graphOfGods
  },
  Mutation: {
    addGod: (_, args, context, info) => {
      console.log(args)
      const newGod = {
        name: args.name,
        age: args.age,
        type: 'god'
      }
      graphOfGods[args.name] = newGod
      return newGod
    }
  },
  Locations: {
    sea: () => graphOfGods.sea,
    sky: () => graphOfGods.sky,
    tartarus: () => graphOfGods.tartarus
  },
  Location: {
    habitants: (parent, args, context, info) => {
      return parent.habitants()
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
      return parent.lives()
    },
    brothers: (parent, args, context, info) => {
      return parent.brothers()
    },
    pet: (parent, args, context, info) => {
      return parent.pet()
    }
  },
  DemiGods: {
    hercules: () => graphOfGods.hercules
  },
  DemiGod: {
    father: (parent, args, context, info) => {
      return parent.father()
    },
    battled: (parent, args, context, info) => {
      return parent.battled && parent.battled()
    }
  },
  Monster: {
    lives: (parent, args, context, info) => {
      return parent.lives && parent.lives()
    }
  }
};

module.exports = resolvers