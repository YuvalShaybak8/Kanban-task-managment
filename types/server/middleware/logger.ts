export default defineEventHandler((event) => {
  if (
    event.path?.includes("components/ui") &&
    (event.path?.includes("ENOTDIR") || event.path?.includes("ENOENT"))
  ) {
    return;
  }

  if (event.path?.includes("shadcn-nuxt")) {
    return;
  }
});
