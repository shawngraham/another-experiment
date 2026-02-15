#!/usr/bin/env node

/**
 * decompile-lessons.mjs
 * 
 * Corrected: Splits only on top-level lesson IDs, keeping 
 * challenges inside their parent lesson file.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const LESSONS_TS = join(ROOT, 'src', 'data', 'lessons.ts');
const OUT_DIR = join(ROOT, 'lessons-decompiled');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function unescapeTemplateLiteral(s) {
  if (!s) return '';
  return s
    .replace(/\\`/g, '`')
    .replace(/\\\${/g, '${')
    .replace(/\\\\/g, '\\');
}

function unescapeStringLiteral(s) {
  if (!s) return '';
  return s
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

// ---------------------------------------------------------------------------
// Parser Logic
// ---------------------------------------------------------------------------

function parseLessonsTS(content) {
  // 1. Isolate the internal part of the array
  const arrayStart = content.indexOf('export const lessons: LessonDefinition[] = [');
  const arrayEnd = content.lastIndexOf('];');
  if (arrayStart === -1 || arrayEnd === -1) throw new Error("Could not find lessons array.");
  const arrayContent = content.slice(arrayStart, arrayEnd);

  /**
   * 2. Split into Lesson Blocks.
   * We look for "id:" preceded by exactly 4 spaces. 
   * This identifies the start of a Lesson object, but NOT a Challenge object.
   */
  const lessonBlocks = arrayContent.split(/(?=\n    id:\s*')/).filter(b => b.trim());

  return lessonBlocks.map(block => {
    
    // Extract top-level fields (Lesson metadata)
    const extractField = (key) => {
      // Look for key: value, ensuring it's at the lesson level (4 spaces)
      const tMatch = block.match(new RegExp(`^    ${key}: \`([\\s\\S]*?)\`,`, 'm'));
      if (tMatch) return unescapeTemplateLiteral(tMatch[1]);

      const sMatch = block.match(new RegExp(`^    ${key}: '([\\s\\S]*?)',`, 'm'));
      if (sMatch) return unescapeStringLiteral(sMatch[1]);

      const nMatch = block.match(new RegExp(`^    ${key}: (\\d+),`, 'm'));
      if (nMatch) return parseInt(nMatch[1], 10);

      return null;
    };

    const extractArray = (key) => {
      const match = block.match(new RegExp(`^    ${key}: \\[([\\s\\S]*?)\\],`, 'm'));
      if (!match) return [];
      return match[1]
        .split(',')
        .map(item => item.trim().replace(/^['`]|['`]$/g, ''))
        .filter(item => item !== '');
    };

    // 3. Extract Challenges as a sub-array
    const challenges = [];
    const challengesSection = block.match(/challenges: \[([\s\S]*?)\]\n\s*\},?/);
    
    if (challengesSection) {
      // Split individual challenges (indented 6 spaces)
      const chBlocks = challengesSection[1].split(/(?=\s+{\s+id:\s*')/).filter(c => c.trim());
      
      for (const ch of chBlocks) {
        const idMatch = ch.match(/id: '([^']+)'/);
        if (!idMatch) continue;

        challenges.push({
          id: idMatch[1],
          title: ch.match(/title: '([^']+)'/)?.[1],
          language: ch.match(/language: '([^']+)'/)?.[1] || 'python',
          difficulty: ch.match(/difficulty: '([^']+)'/)?.[1] || 'beginner',
          starterCode: unescapeTemplateLiteral(ch.match(/starterCode: `([\s\S]*?)`,/)?.[1]),
          expectedOutput: unescapeStringLiteral(ch.match(/expectedOutput: '([^']+)'/)?.[1]),
          hints: (ch.match(/hints: \[([\s\S]*?)\]/)?.[1] || '')
            .split(',')
            .map(h => h.trim().replace(/^'|'$/g, ''))
            .filter(h => h),
          solution: unescapeTemplateLiteral(ch.match(/solution: `([\s\S]*?)`,/)?.[1]),
        });
      }
    }

    return {
      id: extractField('id'),
      title: extractField('title'),
      moduleId: extractField('moduleId'),
      prerequisites: extractArray('prerequisites'),
      estimatedTimeMinutes: extractField('estimatedTimeMinutes'),
      difficulty: extractField('difficulty'),
      learningObjectives: extractArray('learningObjectives'),
      keywords: extractArray('keywords'),
      content: extractField('content'),
      challenges
    };
  });
}

// ---------------------------------------------------------------------------
// Markdown Formatting
// ---------------------------------------------------------------------------

function formatMarkdown(lesson) {
  let md = `---\n`;
  md += `id: ${lesson.id}\n`;
  md += `title: ${lesson.title}\n`;
  md += `moduleId: ${lesson.moduleId}\n`;
  md += `prerequisites:\n${lesson.prerequisites.map(p => `  - ${p}`).join('\n')}\n`;
  md += `estimatedTimeMinutes: ${lesson.estimatedTimeMinutes}\n`;
  md += `difficulty: ${lesson.difficulty}\n`;
  md += `learningObjectives:\n${lesson.learningObjectives.map(o => `  - ${o}`).join('\n')}\n`;
  md += `keywords:\n${lesson.keywords.map(k => `  - ${k}`).join('\n')}\n`;
  md += `---\n\n`;

  md += lesson.content.trim();
  md += `\n\n---challenges---\n`;

  for (const ch of lesson.challenges) {
    md += `\n### Challenge: ${ch.title}\n\n`;
    md += `- id: ${ch.id}\n`;
    md += `- language: ${ch.language}\n`;
    md += `- difficulty: ${ch.difficulty}\n\n`;
    
    md += `#### Starter Code\n\n\`\`\`${ch.language}\n${ch.starterCode}\`\`\`\n\n`;
    md += `#### Expected Output\n\n\`\`\`\n${ch.expectedOutput}\n\`\`\`\n\n`;
    
    md += `#### Hints\n\n`;
    ch.hints.forEach((hint, i) => {
      md += `${i + 1}. ${hint}\n`;
    });

    md += `\n#### Solution\n\n\`\`\`${ch.language}\n${ch.solution}\`\`\`\n`;
  }

  return md;
}

// ---------------------------------------------------------------------------
// Main Execution
// ---------------------------------------------------------------------------

function main() {
  if (!existsSync(LESSONS_TS)) {
    console.error(`Error: ${LESSONS_TS} not found.`);
    process.exit(1);
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR);

  console.log(`Analyzing ${LESSONS_TS}...`);
  const tsContent = readFileSync(LESSONS_TS, 'utf-8');
  
  try {
    const lessons = parseLessonsTS(tsContent);
    console.log(`Extracted ${lessons.length} lessons. Writing Markdown files...\n`);

    for (const lesson of lessons) {
      if (!lesson.id) continue;
      const mdContent = formatMarkdown(lesson);
      const fileName = `${lesson.id}.md`;
      writeFileSync(join(OUT_DIR, fileName), mdContent, 'utf-8');
      console.log(`  [ok] Created ${fileName}`);
    }

    console.log(`\nSuccess! All lessons decompiled to ${OUT_DIR}`);
  } catch (err) {
    console.error(`Decompilation failed: ${err.message}`);
    process.exit(1);
  }
}

main();