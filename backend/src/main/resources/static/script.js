document.addEventListener('DOMContentLoaded', () => {

    const lengthSlider = document.getElementById('pwd-length');
    const lengthVal = document.getElementById('length-val');
    const chkUpper = document.getElementById('chk-upper');
    const chkLower = document.getElementById('chk-lower');
    const chkNumbers = document.getElementById('chk-numbers');
    const chkSymbols = document.getElementById('chk-symbols');
    const generateBtn = document.getElementById('generate-btn');
    const passwordOutput = document.getElementById('password-output');
    const copyBtn = document.getElementById('copy-btn');
    const errorMsg = document.getElementById('error-msg');
    
    const strengthDisplay = document.getElementById('strength-display');
    const strengthText = document.getElementById('strength-text');

    // URLs relative to the same origin where the app is hosted
    const API_GENERATE = '/api/password/generate';
    const API_STRENGTH = '/api/password/strength';

    // Update length value display
    lengthSlider.addEventListener('input', (e) => {
        lengthVal.textContent = e.target.value;
    });

    // Generate Button Click
    generateBtn.addEventListener('click', async () => {
        errorMsg.style.display = 'none';

        const requestData = {
            length: parseInt(lengthSlider.value),
            upper: chkUpper.checked,
            lower: chkLower.checked,
            numbers: chkNumbers.checked,
            symbols: chkSymbols.checked
        };

        // Basic validation
        if (!requestData.upper && !requestData.lower && !requestData.numbers && !requestData.symbols) {
            errorMsg.textContent = 'Please select at least one character type.';
            errorMsg.style.display = 'block';
            return;
        }

        generateBtn.textContent = 'GENERATING...';
        generateBtn.disabled = true;

        try {
            // 1. Generate Password
            const response = await fetch(API_GENERATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                let errorDetails = "An error occurred";
                try {
                    const errorJson = await response.json();
                    errorDetails = errorJson.message || errorDetails;
                } catch(e) {}
                throw new Error(errorDetails);
            }

            const data = await response.json();
            const newPassword = data.value;

            passwordOutput.value = newPassword;

            // 2. Check Strength
            checkStrength(newPassword);

        } catch (error) {
            console.error('Error generating password:', error);
            errorMsg.textContent = error.message || 'Failed to connect to the server.';
            errorMsg.style.display = 'block';
        } finally {
            generateBtn.textContent = 'GENERATE';
            generateBtn.disabled = false;
        }
    });

    async function checkStrength(password) {
        try {
            const response = await fetch(`${API_STRENGTH}?password=${encodeURIComponent(password)}`);
            if (!response.ok) throw new Error("Failed to check strength");
            
            const strengthResult = await response.text(); // Because it returns a plain String

            strengthText.textContent = strengthResult;
            
            // Adjust styling based on strength
            strengthText.className = 'badge';
            
            // Expected values: "Very Strong", "Strong", "Medium", "Weak"
            const normalized = strengthResult.toLowerCase();
            if (normalized.includes('very')) {
                strengthText.classList.add('very-strong');
            } else if (normalized.includes('strong')) {
                strengthText.classList.add('strong');
            } else if (normalized.includes('medium')) {
                strengthText.classList.add('medium');
            } else if (normalized.includes('weak')) {
                strengthText.classList.add('weak');
            }

        } catch (error) {
            console.error('Error checking strength:', error);
            strengthText.textContent = 'Unknown';
            strengthText.className = 'badge';
        }
    }

    // Copy to clipboard
    copyBtn.addEventListener('click', () => {
        if (!passwordOutput.value) return;
        
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            const icon = copyBtn.querySelector('i');
            icon.className = 'fa-solid fa-check';
            copyBtn.style.color = '#52c41a';

            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
                copyBtn.style.color = 'var(--primary-cyan)';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy', err);
        });
    });
});
