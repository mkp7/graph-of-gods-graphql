const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  union Habitant = God | Monster

  type Location {
    name: String
    habitants: [Habitant]
  }

  type Locations {
    sky: Location
    sea: Location
    tartarus: Location
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
    locations: Locations
  }
`;

module.exports = typeDefs