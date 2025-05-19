function getUniqueValues(recipes, selector) {
  const mapped = recipes.map(selector)
  const flattened = mapped.reduce((acc, val) => acc.concat(val), [])
  const cleaned = flattened.map((v) => v.toLowerCase().trim())
  return [...new Set(cleaned)].sort()
}
