const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const graphOfGods = {
  jupiter: {
    name: 'jupiter',
    age: 5000,
    type: 'god',
    lives: function (){ return this.sky},
    father: function (){ return this.saturn},
    brothers: [
      function (){ return this.neptune},
      function (){ return this.pluto}
    ]
  },
  neptune: {
    name: 'neptune',
    age: 4500,
    type: 'god',
    lives: function () { return this.sea },
    brothers: [
      function (){ return this.jupiter},
      function (){ return this.pluto}
    ]
  },
  pluto: {
    name: 'pluto',
    age: 4000,
    type: 'god',
    lives: function (){ return this.tartarus},
    brothers: [
      function (){ return this.jupiter},
      function (){ return this.neptune}
    ],
    pet: function (){ return this.cerberus}
  },
  alcmene: {
    name: 'alcemene',
    age: 45,
    type: 'human'
  },
  hercules: {
    name: 'hercules',
    age: 30,
    type: 'demigod',
    father: function (){ return this.jupiter},
    mother: function (){ return this.alcmene},
    battled: [
      {
        monster: function (){ return this.nemean},
        times: 1
      },
      {
        monster: function (){ return this.hydra},
        times: 2
      },
      {
        monster: function (){ return this.cerberus},
        times: 12
      }
    ]
  },
  nemean: {
    name: 'nemean',
    type: 'monster'
  },
  hydra: {
    name: 'hydra',
    type: 'monster'
  },
  cerberus: {
    name: 'cerberus',
    type: 'monster',
    lives: function (){ return this.tartarus}
  },
  sky: {
    name: 'sky',
    type: 'location'
  },
  sea: {
    name: 'sea',
    type: 'location'
  },
  tartarus: {
    name: 'tartarus',
    type: 'location'
  },
  saturn: {
    name: 'saturn',
    type: 'titan'
  }
}

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Location {
    name: String
  }

  type Pet {
    name: String
  }

  type Monster {
    name: String
    lives: Location
  }

  type DemiGod {
    name: String
    age: Int
    father: God
    battled: [Monster]
  }

  type God {
    name: String,
    age: Int,
    lives: Location
    brothers: [God]
    pet: Pet
  }

  type DemiGods {
    hercules: DemiGod
  }

  type Gods {
    jupiter: God,
    neptune: God,
    pluto: God
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    gods: Gods
    demiGods: DemiGods
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    gods: () => graphOfGods,
    demiGods: () => graphOfGods
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

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
