export async function loadAllIcons(
  jsonPath = "/skills-data/index.json",
  iconsBase = "/images",
  fallback = "/images/misc/_errorIco.png"
) {
  try {
    // Step 1: Fetch JSON
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error(`Failed to fetch ${jsonPath}`);
    const data = await res.json();

    // Step 2: Build icon list
    const iconPromises = [];
    for (const [category, group] of Object.entries(data)) {
      for (const [type, names] of Object.entries(group)) {
        for (const name of names) {
          const url = `${iconsBase}/${category}-icons/${name}.png`;

          // Step 3: Preload icon
          const promise = new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () =>
              resolve({ url, name, category, type, loaded: true });
            img.onerror = () =>
              resolve({ url: fallback, name, category, type, loaded: false });
          });

          iconPromises.push(promise);
        }
      }
    }

    // Step 4: Wait for all icons
    const icons = await Promise.all(iconPromises);
    return icons;
  } catch (error) {
    console.error(error);
    return [];
  }
}
