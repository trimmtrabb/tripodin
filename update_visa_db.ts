
import * as fs from 'fs';
import * as path from 'path';

const csvFilePath = path.join(process.cwd(), 'Cleaned_Mapped_Visa_Options.csv');
const outputPath = path.join(process.cwd(), 'visaDataGenerated.ts');

const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
const lines = csvContent.split('\n');
const headers = lines[0].split(',');

// Helper to handle CSV parsing with quotes
function parseCSVLine(text: string): string[] {
    const result: string[] = [];
    let startValueIndex = 0;
    let insideQuote = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '"') {
            insideQuote = !insideQuote;
        } else if (text[i] === ',' && !insideQuote) {
            result.push(text.substring(startValueIndex, i).trim());
            startValueIndex = i + 1;
        }
    }
    result.push(text.substring(startValueIndex).trim());
    return result;
}

const visaData: any[] = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = parseCSVLine(line);
    // Columns: 
    // 0: Visa Type
    // 1: Category
    // 2: Purpose / Use Case
    // 3: Visa Fee
    // 4: Mapped Categories Array
    // 5: Currency
    // 6: Source_Country
    // 7: Mapped Categories Array (Cleaned)

    if (cols.length < 8) continue;

    const name = cols[0].replace(/^"|"$/g, '');
    const purpose = cols[2].replace(/^"|"$/g, '');
    const feeAmount = cols[3];
    const currency = cols[5];
    const country = cols[6].replace(/^"|"$/g, '');
    const mappedCatsRaw = cols[7].replace(/^"|"$/g, ''); // e.g. "['Tourism', 'Business']" or "['Tourism']"
    
    // Parse Mapped Categories
    let mappedCategories: string[] = [];
    try {
        // Replace single quotes with double quotes for JSON parsing if needed, 
        // but simple regex extraction is safer for this format
        const matches = mappedCatsRaw.match(/'([^']+)'|’([^’]+)’|"([^"]+)"/g);
        if (matches) {
            mappedCategories = matches.map(m => m.replace(/^['"’]|['"’]$/g, ''));
        }
    } catch (e) {
        console.warn(`Failed to parse categories for ${name}: ${mappedCatsRaw}`);
    }

    visaData.push({
        name: name,
        fee: `${currency} ${feeAmount}`,
        processing: "Variable", // Default as not in CSV
        validity: "Variable",   // Default as not in CSV
        mappedCategories: mappedCategories,
        documents: { // Default structure
            "Basic": ["Passport", "Photos", "Application form"],
            "Financial": ["Bank statements", "Proof of funds"],
            "Purpose": ["Travel Itinerary", "Accommodation proof"],
            "Supporting": ["Travel Insurance"]
        },
        country: country,
        description: purpose
    });
}

const fileContent = `
export const GENERATED_VISA_DATA = ${JSON.stringify(visaData, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Successfully generated visaDataGenerated.ts with ${visaData.length} entries.`);
