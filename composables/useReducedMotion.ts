export function useReducedMotion() {
  // checking if user has reduced motion enabled
  const prefersReducedMotion = ref(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  onMounted(() => {
    // detect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Adds listener to update when user changes preference
    mediaQuery.addEventListener("change", (e) => {
      prefersReducedMotion.value = e.matches;
    });
  });

  return { prefersReducedMotion };
}
