const fs = require('fs');
const mermaid = require('mermaid').default;

async function renderDiagram() {
  const content = fs.readFileSync('./diagrama-container-c4.mmd', 'utf-8');
  
  // Remove markdown code fences
  const mermaidCode = content.replace(/```mermaid\n/, '').replace(/```$/, '');
  
  try {
    const { svg } = await mermaid.render('diagram', mermaidCode);
    fs.writeFileSync('./diagrama-container-c4.svg', svg);
    console.log('Diagram rendered successfully to diagrama-container-c4.svg!');
  } catch (error) {
    console.error('Error rendering diagram:');
    console.error(error.message);
  }
}

renderDiagram();
