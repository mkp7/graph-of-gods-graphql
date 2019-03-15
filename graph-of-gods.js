// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
// Directed/Undirected reference
const graphOfGods = {
  jupiter: {
    name: 'jupiter',
    age: 5000,
    type: 'god',
    lives: function () { return graphOfGods.sky },
    father: function () { return graphOfGods.saturn },
    brothers: function () { return [graphOfGods.neptune, graphOfGods.pluto] },
  },
  neptune: {
    name: 'neptune',
    age: 4500,
    type: 'god',
    lives: function () { return graphOfGods.sea },
    brothers: function () { return [graphOfGods.jupiter, graphOfGods.pluto] },
  },
  pluto: {
    name: 'pluto',
    age: 4000,
    type: 'god',
    lives: function () { return graphOfGods.tartarus},
    brothers: function () { return [graphOfGods.jupiter, graphOfGods.neptune] },
    pet: function () { return graphOfGods.cerberus }
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
    father: function () { return graphOfGods.jupiter },
    mother: function () { return graphOfGods.alcmene },
    battled: function () { return [
      {
        monster: graphOfGods.nemean,
        times: 1
      },
      {
        monster: graphOfGods.hydra,
        times: 2
      },
      {
        monster: graphOfGods.cerberus,
        times: 12
      }
    ] }
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
    lives: function () { return graphOfGods.tartarus }
  },
  sky: {
    name: 'sky',
    type: 'location',
    habitants: function () { return [graphOfGods.jupiter]}
  },
  sea: {
    name: 'sea',
    type: 'location',
    habitants: function () { return [graphOfGods.neptune]}
  },
  tartarus: {
    name: 'tartarus',
    type: 'location',
    habitants: function () { return [graphOfGods.cerberus, graphOfGods.pluto] }
  },
  saturn: {
    name: 'saturn',
    type: 'titan'
  }
}

module.exports = graphOfGods