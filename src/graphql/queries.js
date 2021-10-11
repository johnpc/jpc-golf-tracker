/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStroke = /* GraphQL */ `
  query GetStroke($id: ID!) {
    getStroke(id: $id) {
      id
      club
      start_flag_distance
      end_flag_distance
      fate
      tags
      shot_number
      hole {
        id
      }
      date
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listStrokes = /* GraphQL */ `
  query ListStrokes(
    $filter: ModelStrokeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStrokes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        club
        start_flag_distance
        end_flag_distance
        fate
        tags
        shot_number
        hole {
          id
          par
          hole_number
          course {
            id
            name
          }
        }
        date
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBag = /* GraphQL */ `
  query GetBag($id: ID!) {
    getBag(id: $id) {
      id
      clubs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBags = /* GraphQL */ `
  query ListBags(
    $filter: ModelBagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clubs
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      name
      slope_rating
      course_rating
      holes {
        items {
          id
          hole_number
          par
          handicap
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slope_rating
        course_rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHole = /* GraphQL */ `
  query GetHole($id: ID!) {
    getHole(id: $id) {
      id
      course {
        id
        name
        slope_rating
        course_rating
        createdAt
        updatedAt
      }
      hole_number
      par
      handicap
      createdAt
      updatedAt
    }
  }
`;
export const listHoles = /* GraphQL */ `
  query ListHoles(
    $filter: ModelHoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        hole_number
        par
        handicap
        course {
          id
          name
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
