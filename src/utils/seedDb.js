import createCourse from "../data/createCourse";
import createHole from "../data/createHole";
import listCourses from "../data/listCourses";

export async function seed() {
  const courses = await listCourses();
  console.log("Got courses", courses);
  let course = courses.find((course) => course.name === "Huron Hills");
  if (!course) {
    course = await createCourse("Huron Hills", 64, 107);
  }

  console.log("Created course", course);

  const holes = [
    {
      hole_number: 1,
      par: 4,
    },
    {
      hole_number: 2,
      par: 5,
    },
    {
      hole_number: 3,
      par: 3,
    },
    {
      hole_number: 4,
      par: 3,
    },
    {
      hole_number: 5,
      par: 4,
    },
    {
      hole_number: 6,
      par: 3,
    },
    {
      hole_number: 7,
      par: 5,
    },
    {
      hole_number: 8,
      par: 4,
    },
    {
      hole_number: 9,
      par: 4,
    },
  ];

  const promises = holes.map(async (hole) => {
    const createdHole = await createHole(
      course,
      hole.hole_number,
      hole.par,
      hole.hole_number
    );
    console.log("Created hole", createdHole);
    return createdHole;
  });
  await Promise.all(promises);
}
