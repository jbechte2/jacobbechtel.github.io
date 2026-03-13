async function loadInclude(node) {
  const includePath = node.dataset.include;
  const root = node.dataset.root || ".";
  const current = node.dataset.current || "";

  const response = await fetch(includePath);
  if (!response.ok) {
    throw new Error(`Failed to load include: ${includePath}`);
  }

  let html = await response.text();
  html = html.replaceAll("__ROOT__", root);
  node.outerHTML = html;

  if (!current) {
    return;
  }

  const navLink = document.querySelector(`[data-nav-item="${current}"]`);
  if (navLink) {
    navLink.setAttribute("aria-current", "page");
  }
}

async function initIncludes() {
  const includeNodes = document.querySelectorAll("[data-include]");
  for (const node of includeNodes) {
    await loadInclude(node);
  }
}

initIncludes().catch((error) => {
  console.error(error);
});
