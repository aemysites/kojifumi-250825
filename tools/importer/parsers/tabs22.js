/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // 2. Get all tab links and tab panes
  const tabLinks = getDirectChildren(tabMenu, 'a');
  const tabPanes = getDirectChildren(tabContent, 'div.w-tab-pane');

  // Defensive: Only proceed if tabLinks and tabPanes match
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // 3. Build rows: first row is header, then one row per tab
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Tab label: use the text content of the inner div, or fallback to link text
    let tabLabel = '';
    const labelDiv = link.querySelector('div');
    if (labelDiv && labelDiv.textContent.trim()) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = link.textContent.trim();
    }

    // Tab content: use the entire content of the tab pane's first child (the grid)
    const pane = tabPanes[i];
    // Defensive: find the grid inside the pane
    let tabContentElem = null;
    for (const child of pane.children) {
      if (child.classList.contains('w-layout-grid')) {
        tabContentElem = child;
        break;
      }
    }
    // If not found, fallback to the pane itself
    if (!tabContentElem) tabContentElem = pane;

    // Create the row: [label, content]
    rows.push([tabLabel, tabContentElem]);
  }

  // 4. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
