const path = require('path');
const fs = require('fs');

const SVGS_PATH = path.join(__dirname, '../', 'src', 'res', 'assets', 'svgs');
const SVGS_FILE_PATH = path.join(__dirname, '../', 'src', 'res', 'svgs.ts');

const svgs = [];
for (const svg of fs.readdirSync(SVGS_PATH)) {
    const sanitizedName = svg.split('.')[0];
    svgs.push(sanitizedName);
}
const data = `
${svgs.map((svg) => `import ${svg} from './assets/svgs/${svg}'`).join(';\n')}

const svgs={
    ${svgs.join(',\n')}
}
export default svgs

`;

if (fs.existsSync(SVGS_FILE_PATH)) {
    fs.unlinkSync(SVGS_FILE_PATH);
}
fs.writeFileSync(SVGS_FILE_PATH, data);
