//your JS code here. If required.
// Get all input fields
        const codes = document.querySelectorAll('.code');

        // Focus on first input when page loads
        codes[0].focus();

        // Add event listener to each input field
        codes.forEach((code, index) => {
            // Handle typing
            code.addEventListener('input', (e) => {
                // Get the value
                const value = e.target.value;

                // Only allow numbers
                if (isNaN(value)) {
                    e.target.value = '';
                    return;
                }

                // If user typed a number and there's a next field
                if (value && index < codes.length - 1) {
                    // Move focus to next field
                    codes[index + 1].focus();
                }
            });

            // Handle backspace and arrow keys
            code.addEventListener('keydown', (e) => {
                // If backspace key is pressed
                if (e.key === 'Backspace') {
                    // If current field is empty and there's a previous field
                    if (!code.value && index > 0) {
                        // Move focus to previous field
                        codes[index - 1].focus();
                    }
                }

                // Arrow key navigation
                if (e.key === 'ArrowLeft' && index > 0) {
                    codes[index - 1].focus();
                }

                if (e.key === 'ArrowRight' && index < codes.length - 1) {
                    codes[index + 1].focus();
                }
            });

            // Handle paste
            code.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text');
                
                // Only process if pasted data contains numbers
                const numbers = pastedData.replace(/\D/g, '');
                
                // Fill the fields with pasted numbers
                for (let i = 0; i < numbers.length && index + i < codes.length; i++) {
                    codes[index + i].value = numbers[i];
                }

                // Focus on the next empty field or last field
                const nextIndex = Math.min(index + numbers.length, codes.length - 1);
                codes[nextIndex].focus();
            });

            // Select all text when field is focused
            code.addEventListener('focus', (e) => {
                e.target.select();
            });
        });