/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStroke = /* GraphQL */ `
  subscription OnCreateStroke($owner: String!) {
    onCreateStroke(owner: $owner) {
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
export const onUpdateStroke = /* GraphQL */ `
  subscription OnUpdateStroke($owner: String!) {
    onUpdateStroke(owner: $owner) {
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
export const onDeleteStroke = /* GraphQL */ `
  subscription OnDeleteStroke($owner: String!) {
    onDeleteStroke(owner: $owner) {
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
export const onCreateBag = /* GraphQL */ `
  subscription OnCreateBag($owner: String!) {
    onCreateBag(owner: $owner) {
      id
      clubs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBag = /* GraphQL */ `
  subscription OnUpdateBag($owner: String!) {
    onUpdateBag(owner: $owner) {
      id
      clubs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBag = /* GraphQL */ `
  subscription OnDeleteBag($owner: String!) {
    onDeleteBag(owner: $owner) {
      id
      clubs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse {
    onCreateCourse {
      id
      name
      slope_rating
      course_rating
      holes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse {
    onUpdateCourse {
      id
      name
      slope_rating
      course_rating
      holes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse {
    onDeleteCourse {
      id
      name
      slope_rating
      course_rating
      holes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHole = /* GraphQL */ `
  subscription OnCreateHole {
    onCreateHole {
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
export const onUpdateHole = /* GraphQL */ `
  subscription OnUpdateHole {
    onUpdateHole {
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
export const onDeleteHole = /* GraphQL */ `
  subscription OnDeleteHole {
    onDeleteHole {
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
