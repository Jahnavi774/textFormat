        const inputText = document.getElementById('mybox');
        const convertToUppercaseButton = document.getElementById('converToUppercaseButton');
        const convertToLowercaseButton = document.getElementById('convertToLowercaseButton');
        const capitalizeButton = document.getElementById('capitaliseButton');
        const removeExtraSpacesButton = document.getElementById('removeExtraSpacesButton');
        const removeNewLinesButton = document.getElementById('removeNewLinesButton');
        const undoButton = document.getElementById('undoButton');
        const redoButton = document.getElementById('redoButton');
        const clearButton = document.getElementById('clearButton');
        const copyButton = document.getElementById('copyButton');
        const messageBar = document.getElementById('messagebar');
        const textSummary = document.getElementById('textSummary');
        const charCount = document.getElementById('charCount');
        const wordCount = document.getElementById('wordCount');
        const lineCount = document.getElementById('lineCount');
        const history = [];
        let undoneHistory = [];
        // let charCountValue = 0;
        // function showMessage(message) {
        //     messageBar.textContent = message;
        //     messageBar.style.display = 'block';
        //     if (messageBar.hideTimeout) {
        //     clearTimeout(messageBar.hideTimeout);
        // }
        // messageBar.hideTimeout = setTimeout(function() {
        //     messageBar.style.display = 'none';
        //     messageBar.textContent = ''; 
        // }, 3000);
        // }
        function showMessage(message) {
        messageBar.textContent = message;
        messageBar.style.display = 'block';
        setTimeout(function() {
            messageBar.style.display = 'none';
            messageBar.textContent = '';
        }, 2000);
        }
        // function updateHistory() {
        //     // Save the current text and a timestamp to the history
        //     const text = inputText.value;
        //     const timestamp = new Date().toLocaleString();
        //     history.push({ text, timestamp });
        // }

        // function updateTextSummary() {
        //     const text = inputText.value;
        //     const charCountValue = text.length;
        //     const wordCountValue = text.split(/\s+/).filter(Boolean).length;
        //     const lineCountValue = text.split(/\n/).filter(Boolean).length;

        //     charCount.textContent = charCountValue;
        //     wordCount.textContent = wordCountValue;
        //     lineCount.textContent = lineCountValue;
        // }
        function updateTextSummary(text) {
            charCount.textContent = text.length;
            wordCount.textContent = text.trim().split(/\s+/).length;
            lineCount.textContent = text.trim().split('\n').length;
        }

        function updateHistory(text) {
            history.push(text);
        }

        convertToUppercaseButton.addEventListener('click', function() {
            // updateHistory();
            const text = inputText.value;
            history.push(text);
            undoneHistory = [];
            const uppercaseText = text.toUpperCase();
            inputText.value = uppercaseText; 
            showMessage('Converted to Uppercase');
            updateTextSummary(uppercaseText);
            updateHistory(uppercaseText);
        });
        convertToLowercaseButton.addEventListener('click',function() {
            // updateHistory();
            const text = inputText.value;
            history.push(text);
            undoneHistory = [];
            const lowercaseText = text.toLowerCase();
            inputText.value = lowercaseText;
            showMessage('Converted to Lowercase');
            updateTextSummary(lowercaseText);
            updateHistory(lowercaseText);
            updateTextSummary();
        });
        capitalizeButton.addEventListener('click',function(){
            const text = inputText.value;
            history.push(text);
            undoneHistory = [];
            const sentences = text.split('.');
            const capitalizedsentences = sentences.map(function(sentence) {
                return sentence.trim() ? sentence[0].toUpperCase() + sentence.slice(1).trim()+ '.': '';
            });
            const capitalizedText = capitalizedsentences.join(' ');
            inputText.value = capitalizedText;
            showMessage('Text Capitalized');
        });

        removeExtraSpacesButton.addEventListener('click',function(){
            // updateHistory();
            const text = inputText.value;
            history.push(text);
            undoneHistory = [];
            const trimmedText = text.trim();
            const words = trimmedText.split(' ');
            const filteredWords = words.filter(function(word) {
                return word !== '';
            });
            const filteredText = filteredWords.join(' ');
            inputText.value = filteredText;
            showMessage('Extra Spaces Removed');
            updateHistory(filteredText);
            updateTextSummary(filteredText);
        });
        removeNewLinesButton.addEventListener('click',function(){
            // updateHistory();
            const text = inputText.value;
            history.push(text);
            undoneHistory = [];
            const trimmedText = text.trim();
            const words = trimmedText.split('\n');
            const filteredWords = words.filter(function(word) {
                return word !== '';
            });
            const filteredText = filteredWords.join('\n');
            inputText.value = filteredText;
            showMessage('New Lines Removed');
            // updateTextSummary();
            updateHistory(filteredText);
            updateTextSummary(filteredText);
        });
        undoButton.addEventListener('click', function() {
            if (history.length > 1) {
                const previousText = history.pop();
                undoneHistory.push(previousText);  
                const newText = history[history.length - 1];
                inputText.value = newText;
                showMessage('Undone');
                updateTextSummary(newText);
            }
        });
        redoButton.addEventListener('click', function() {
            if (undoneHistory.length > 0) {
                const nextText = undoneHistory.pop();
                history.push(nextText);  
                inputText.value = nextText;
                showMessage('Redone');
                updateTextSummary(nextText);
            }
        });
        // clearButton.addEventListener('click', function() {
        //     // updateHistory();
        //     const text = inputText.value;
        //     history.push(text);
        //     undoneHistory = [];
        //     inputText.value = '';
        //     showMessage('Text Cleared');
        //     // updateTextSummary();
        //     updateHistory('');
        //     updateTextSummary('');
        // });
        clearButton.addEventListener('click', function() {
        inputText.value = '';
        showMessage('Text Cleared');
        charCount.textContent = '0'; 
        wordCount.textContent = '0'; 
        lineCount.textContent = '0'; 
         history.push(''); 
        });

        copyButton.addEventListener('click', function() {
            inputText.select();
            document.execCommand('copy');
            showMessage('Text Copied');
        });
        inputText.addEventListener('input', function() {
            updateTextSummary(inputText.value);
            updateHistory(inputText.value);
        });