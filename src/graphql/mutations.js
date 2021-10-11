/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStroke = /* GraphQL */ `
  mutation CreateStroke(
    $input: CreateStrokeInput!
    $condition: ModelStrokeConditionInput
  ) {
    createStroke(input: $input, condition: $condition) {
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
export const updateStroke = /* GraphQL */ `
  mutation UpdateStroke(
    $input: UpdateStrokeInput!
    $condition: ModelStrokeConditionInput
  ) {
    updateStroke(input: $input, condition: $condition) {
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
export const deleteStroke = /* GraphQL */ `
  mutation DeleteStroke(
    $input: DeleteStrokeInput!
    $condition: ModelStrokeConditionInput
  ) {
    deleteStroke(input: $input, condition: $condition) {
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
export const createBag = /* GraphQL */ `
  mutation CreateBag(
    $input: CreateBagInput!
    $condition: ModelBagConditionInput
  ) {
    createBag(input: $input, condition: $condition) {
      id
      clubs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateBag = /* GraphQL */ `
  mutation UpdateBag(
    $input: UpdateBagInput!
    $condition: ModelBagConditionInput
  ) {
    updateBag(input: $input, condition: $condition) {
      id
      clubs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteBag = /* GraphQL */ `
  mutation DeleteBag(
    $input: DeleteBagInput!
    $condition: ModelBagConditionInput
  ) {
    deleteBag(input: $input, condition: $condition) {
      id
      clubs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
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
export const createHole = /* GraphQL */ `
  mutation CreateHole(
    $input: CreateHoleInput!
    $condition: ModelHoleConditionInput
  ) {
    createHole(input: $input, condition: $condition) {
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
export const updateHole = /* GraphQL */ `
  mutation UpdateHole(
    $input: UpdateHoleInput!
    $condition: ModelHoleConditionInput
  ) {
    updateHole(input: $input, condition: $condition) {
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
export const deleteHole = /* GraphQL */ `
  mutation DeleteHole(
    $input: DeleteHoleInput!
    $condition: ModelHoleConditionInput
  ) {
    deleteHole(input: $input, condition: $condition) {
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
