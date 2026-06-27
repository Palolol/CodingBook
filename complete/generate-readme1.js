const fs = require('fs');



const readme = `


`;

fs.writeFileSync('README.md', readme, 'utf8');

console.log('✅ README.md created successfully!');