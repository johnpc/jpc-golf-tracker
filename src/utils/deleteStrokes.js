import listStrokes from "../data/listStrokes";
import removeStroke from "../data/removeStroke";

export async function deleteStrokes() {
  const strokes = await listStrokes();
  const promises = strokes.map(async (stroke) => {
    return await removeStroke(stroke.id)
  });
  await Promise.all(promises);
}
