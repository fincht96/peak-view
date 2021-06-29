const { gql } = require('apollo-server');

const typeDefs = gql`
  
  type PEFReading {
    id: ID!
    createdAt: String
    pefValue: Int
    medication: String
    medicationTime: MedicationTime
    comment: String
  }

  type PEFReadingResponse {
      success: Boolean!
      message: String
      pefReading: PEFReading
  }

  enum MedicationTime {
    NONE
    PRE
    POST
  }

  type Query {
    pefReadings: [PEFReading]
    pefReading(id: ID!): PEFReading
  }

  type Mutation {
    addReading(newReading: PEFReading): PEFReadingResponse!
    deleteReading(pefReadingID: ID!): PEFReadingResponse!
  }


`;

module.exports = typeDefs;