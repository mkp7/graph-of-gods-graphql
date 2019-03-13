// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
// Directed/Undirected reference
const graphOfGods = {
  jupiter: {
    name: 'jupiter',
    age: 5000,
    type: 'god',
    lives: function () { return this.sky },
    father: function () { return this.saturn },
    brothers: [
      function () { return this.neptune },
      function () { return this.pluto }
    ]
  },
  neptune: {
    name: 'neptune',
    age: 4500,
    type: 'god',
    lives: function () { return this.sea },
    brothers: [
      function () { return this.jupiter },
      function () { return this.pluto }
    ]
  },
  pluto: {
    name: 'pluto',
    age: 4000,
    type: 'god',
    lives: function () { return this.tartarus},
    brothers: [
      function () { return this.jupiter },
      function () { return this.neptune }
    ],
    pet: function () { return this.cerberus }
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
    father: function () { return this.jupiter },
    mother: function () { return this.alcmene },
    battled: [
      {
        monster: function () { return this.nemean },
        times: 1
      },
      {
        monster: function () { return this.hydra },
        times: 2
      },
      {
        monster: function () { return this.cerberus },
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
    lives: function () { return this.tartarus }
  },
  sky: {
    name: 'sky',
    type: 'location',
    habitants: function () { return [this.jupiter]}
  },
  sea: {
    name: 'sea',
    type: 'location',
    habitants: function () { return [this.neptune]}
  },
  tartarus: {
    name: 'tartarus',
    type: 'location',
    habitants: function () { return [this.cerberus, this.pluto] }
  },
  saturn: {
    name: 'saturn',
    type: 'titan'
  }
}

module.exports = graphOfGods