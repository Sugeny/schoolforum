export const toggleThemeWithAnimation = async (event, toggleCallback) => {
  const x = event?.clientX ?? window.innerWidth / 2
  const y = event?.clientY ?? window.innerHeight / 2

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || prefersReducedMotion) {
    toggleCallback()
    return
  }

  const transition = document.startViewTransition(async () => {
    toggleCallback()
  })

  await transition.ready

  document.documentElement.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
    },
    {
      duration: 500,
      easing: 'ease-in-out',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}
