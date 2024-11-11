export default function imageUrlFormatter(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/fire-homes-course.appspot.com/o/${encodeURIComponent(
    imagePath
  )}?alt=media`;
}
