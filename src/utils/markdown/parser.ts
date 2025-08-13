
// Function to parse markdown content with front matter in browser environment
export function parseMarkdown(content: string) {
  try {
    // Trim leading/trailing whitespace to handle files with empty lines at the start
    const trimmedContent = content.trim();
    
    // Simple frontmatter parser for browser environment
    // Updated regex to handle both Unix (\n) and Windows (\r\n) line endings
    const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)/;
    const match = trimmedContent.match(frontMatterRegex);
    
    if (!match) {
      return { frontMatter: {}, content: trimmedContent };
    }
    
    const [, frontMatterStr, markdownContent] = match;
    
    // Parse the front matter
    const frontMatter: Record<string, any> = {};
    const lines = frontMatterStr.split('\n');
    
    // Track multiline array/object parsing
    let currentKey: string | null = null;
    let multilineValue: string[] = [];
    let isInMultiline = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Handle multiline parsing for arrays and objects
      if (isInMultiline) {
        multilineValue.push(line);
        
        // Check if this line ends the multiline value
        if (line === ']' || line === '}') {
          isInMultiline = false;
          if (currentKey) {
            try {
              // Join the multiline value and parse it as JSON
              // Fix: Properly sanitize JSON strings before parsing
              const jsonStr = multilineValue.join('')
                .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
                .replace(/'/g, '"');
              
              try {
                frontMatter[currentKey] = JSON.parse(jsonStr);
              } catch (e) {
                console.warn(`Could not parse JSON for key ${currentKey}, using raw value`, e);
                frontMatter[currentKey] = multilineValue.join('\n');
              }
            } catch (e) {
              console.error('Error parsing multiline JSON:', e);
              frontMatter[currentKey] = multilineValue.join('\n');
            }
            multilineValue = [];
            currentKey = null;
          }
        }
        continue;
      }
      
      // Check if this is the start of a new key-value pair
      if (!isInMultiline && line.includes(':')) {
        const colonIndex = line.indexOf(':');
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // Check if this is the start of a YAML-style array (key: followed by no value)
        if (value === '' || value === null) {
          // Look ahead to see if the next lines are array items
          let yamlArrayItems = [];
          let nextLineIndex = i + 1;
          
          // Collect YAML array items (lines starting with -)
          while (nextLineIndex < lines.length) {
            const nextLine = lines[nextLineIndex].trim();
            if (nextLine.startsWith('- ')) {
              // Extract the value after the dash
              const itemValue = nextLine.slice(2).trim();
              // Remove quotes if present
              const cleanValue = itemValue.replace(/^["'](.*)["']$/, '$1');
              yamlArrayItems.push(cleanValue);
              nextLineIndex++;
            } else if (nextLine === '' || nextLine.startsWith('#')) {
              // Skip empty lines and comments
              nextLineIndex++;
            } else {
              // End of array
              break;
            }
          }
          
          if (yamlArrayItems.length > 0) {
            frontMatter[key] = yamlArrayItems;
            // Skip the lines we've already processed
            i = nextLineIndex - 1;
            continue;
          }
        }
        
        // Check if this is the start of a multiline array or object
        if ((value === '[' || value === '{' || value.endsWith('[') || value.endsWith('{'))) {
          isInMultiline = true;
          currentKey = key;
          multilineValue = [value];
          continue;
        }
        
        // Handle regular single-line values
        if (value === 'true') {
          frontMatter[key] = true;
        } else if (value === 'false') {
          frontMatter[key] = false;
        } else if (!isNaN(Number(value)) && value !== '') {
          frontMatter[key] = Number(value);
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Parse arrays
          try {
            // Process the array string: remove brackets, split by commas
            const arrayStr = value.slice(1, -1).trim();
            
            // If the array is empty, set as empty array
            if (!arrayStr) {
              frontMatter[key] = [];
            } else {
              // First try to parse as JSON if it looks like JSON format
              if (value.includes('{')) {
                // Fix: convert single quotes to double quotes for JSON compatibility
                const jsonStr = value.replace(/'/g, '"')
                  .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
                
                try {
                  frontMatter[key] = JSON.parse(jsonStr);
                } catch (e) {
                  console.warn(`Could not parse JSON array for key ${key}, falling back to simple parsing`, e);
                  // Fallback to simple array parsing with quote removal
                  frontMatter[key] = arrayStr
                    .split(',')
                    .map(item => item.trim().replace(/^["'](.*)["']$/, '$1'))
                    .filter(Boolean);
                }
              } else {
                // Simple array parsing with quote removal
                frontMatter[key] = arrayStr
                  .split(',')
                  .map(item => item.trim().replace(/^["'](.*)["']$/, '$1'))
                  .filter(Boolean);
              }
            }
          } catch (e) {
            console.error('Error parsing array:', e);
            // Fallback to basic string array
            frontMatter[key] = value
              .slice(1, -1)
              .split(',')
              .map(item => item.trim().replace(/^["'](.*)["']$/, '$1'))
              .filter(Boolean);
          }
        } else if (value.startsWith('"') && value.endsWith('"')) {
          // Remove quotes from quoted strings
          frontMatter[key] = value.slice(1, -1);
        } else {
          frontMatter[key] = value;
        }
      }
    }
    
    return {
      frontMatter,
      content: markdownContent || ''
    };
  } catch (error) {
    console.error('Error parsing markdown content:', error);
    return {
      frontMatter: {},
      content: ''
    };
  }
}
