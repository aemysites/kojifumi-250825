/* global WebImporter */
export default function parse(element, { document }) {
  // Get all accordion items (each .divider is an item)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: If the first child is also a .divider, include it
  if (accordionItems.length === 0 && element.classList.contains('divider')) {
    accordionItems.push(element);
  }

  // Table header row: exactly one column with the block name
  const rows = [
    ['Accordion (accordion23)']
  ];

  // For each accordion item, extract the title and content
  accordionItems.forEach((item) => {
    const grid = item.querySelector('.w-layout-grid');
    if (!grid) return;
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    const titleEl = children[0];
    const contentEl = children[1];
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix header row to have colspan=2 if there are two columns in data rows
  if (rows.length > 1 && rows[1].length === 2) {
    const thead = table.querySelector('thead');
    if (thead) {
      const th = thead.querySelector('th');
      if (th) {
        th.setAttribute('colspan', '2');
      }
    }
  }

  // Replace the original element with the new table
  element.replaceWith(table);
}
