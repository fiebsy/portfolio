import fs from 'fs';
import path from 'path';
import { ColorMapping } from '../../src/components/icons/logos/color-mappings';

interface SvgMapping {
  sourceFile: string;
  componentName: string;
  defaultColor?: string;
}

const SVG_MAPPINGS: SvgMapping[] = [
  { sourceFile: 'ts-color.svg', componentName: 'TypeScript', defaultColor: '#fff' },
  { sourceFile: 'react.svg', componentName: 'React' },
  { sourceFile: 'nextjs.svg', componentName: 'NextJs' },
  { sourceFile: 'tailwind.svg', componentName: 'Tailwind' },
  { sourceFile: 'firebase.svg', componentName: 'Firebase' },
  { sourceFile: 'figma.svg', componentName: 'Figma' },
  { sourceFile: 'framer.svg', componentName: 'Framer' },
  { sourceFile: 'bigquery-color.svg', componentName: 'BigQuery' },
  { sourceFile: 'lottie.svg', componentName: 'Lottie' },
  { sourceFile: 'whop_logo_brandmark_orange.svg', componentName: 'Whop' },
];

const SOURCE_DIR = 'public/svg/logos';
const TARGET_DIR = 'src/components/icons/logos';

function extractSvgContent(
  svgString: string,
  colorMapping?: ColorMapping
): string {
  // Extract everything between the first <svg> and </svg> tags
  const match = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!match) return '';

  const innerContent = match[1].trim();
  
  if (colorMapping) {
    const { primary, accent } = colorMapping.variants.color.colors;
    
    return innerContent
      .replace(/fill="([^"]*)"/g, (match, color) => {
        if (color.toLowerCase() === accent?.toLowerCase()) {
          return `fill={defaultColor ? '${color}' : fillColor || 'currentColor'}`;
        }
        if (color.toLowerCase() === primary.toLowerCase()) {
          return `fill={fillColor || 'currentColor'}`;
        }
        return match;
      })
      .replace(/stroke="([^"]*)"/g, (match, color) => {
        if (color.toLowerCase() === accent?.toLowerCase()) {
          return `stroke={defaultColor ? '${color}' : fillColor || 'currentColor'}`;
        }
        if (color.toLowerCase() === primary.toLowerCase()) {
          return `stroke={fillColor || 'currentColor'}`;
        }
        return match;
      });
  }

  // Default behavior for non-color-mapped components
  return innerContent
    .replace(/fill="[^"]*"/g, 'fill={fillColor || \'currentColor\'}')
    .replace(/stroke="[^"]*"/g, 'stroke={fillColor || \'currentColor\'}');
}

function updateComponentFile(
  componentPath: string,
  svgContent: string
) {
  const componentContent = fs.readFileSync(componentPath, 'utf-8');
  
  // Replace the TODO comment with the actual SVG content
  const updatedContent = componentContent.replace(
    /{\/\* TODO: Paste .* SVG content here \*\/}/,
    svgContent
  );
  
  fs.writeFileSync(componentPath, updatedContent);
}

function populateSvgComponents() {
  // Ensure directories exist
  if (!fs.existsSync(SOURCE_DIR) || !fs.existsSync(TARGET_DIR)) {
    console.error('Source or target directory does not exist');
    process.exit(1);
  }

  // Load color mappings
  let colorMappings: ColorMapping[] = [];
  try {
    const mappingsPath = path.join(TARGET_DIR, 'color-mappings.ts');
    const mappingsContent = fs.readFileSync(mappingsPath, 'utf-8');
    const match = mappingsContent.match(/export const COLOR_MAPPINGS: ColorMapping\[] = (\[[\s\S]*?\]);/);
    if (match) {
      colorMappings = JSON.parse(match[1]);
    }
  } catch (error) {
    console.warn('No color mappings found, proceeding with default behavior');
  }

  // Process each SVG mapping
  SVG_MAPPINGS.forEach(({ sourceFile, componentName }) => {
    const sourcePath = path.join(SOURCE_DIR, sourceFile);
    const targetPath = path.join(TARGET_DIR, `${componentName}.tsx`);
    const colorMapping = colorMappings.find(m => m.componentName === componentName);

    if (!fs.existsSync(sourcePath)) {
      console.warn(`Source file not found: ${sourceFile}`);
      return;
    }

    if (!fs.existsSync(targetPath)) {
      console.warn(`Target component not found: ${componentName}.tsx`);
      return;
    }

    try {
      const svgContent = fs.readFileSync(sourcePath, 'utf-8');
      const extractedContent = extractSvgContent(svgContent, colorMapping);
      updateComponentFile(targetPath, extractedContent);
      console.log(`✓ Updated ${componentName}.tsx`);
    } catch (error) {
      console.error(`Error processing ${sourceFile}:`, error);
    }
  });

  console.log('\nAll components updated successfully!');
}

// Run the script
populateSvgComponents(); 