const fs = require('fs');
const { execSync } = require('child_process');

// Read index.html and create test files
const html = fs.readFileSync('e:/THIET KE WEB/Toán 9/index.html', 'utf8');

// Test 1: Modal is open
const htmlModal = html.replace("id=\"missionModalOverlay\" class=\"modal-overlay\"", "id=\"missionModalOverlay\" class=\"modal-overlay\" style=\"display:flex;\"");
fs.writeFileSync('e:/THIET KE WEB/Toán 9/temp_test_modal.html', htmlModal);

// Test 2: In workspace with 2 cameras deployed at diff >= 120 (100% coverage)
const html100 = html.replace("draw();\n    };", `
  deployCamera(1, O.x - 220, O.y - 120);
  deployCamera(2, O.x + 220, O.y + 120);
  draw();
};`);
fs.writeFileSync('e:/THIET KE WEB/Toán 9/temp_test_100.html', html100);

// Test 3: In workspace with 2 cameras deployed at diff < 60 (same side, blind spot remaining)
const htmlSameSide = html.replace("draw();\n    };", `
  deployCamera(1, O.x - 220, O.y - 120);
  deployCamera(2, O.x - 240, O.y + 50);
  draw();
};`);
fs.writeFileSync('e:/THIET KE WEB/Toán 9/temp_test_sameside.html', htmlSameSide);

console.log('Test files created');
