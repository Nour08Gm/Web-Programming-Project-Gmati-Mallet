/*CHATBOT.JS*/

/*Class to manage the history of the conversation*/
class ChatHistory {
    constructor() {
        this.messages = [];
    }

    // 3- Method to add a message to the array
    addMessage(message) {
        this.messages.push(message);
    }

    // 4- Method to return the complete history
    getHistory() {
        return this.messages;
    }
}

// Create an instance of ChatHistory
const historyMessages = new ChatHistory();

/*Function for retrieving and processing JSON (Step 2.2)*/
function fetchJSON(url) {
    // Retrieve JSON from supplied URL
    fetch(url)
        .then(response => {
            // Check if the answer is correct
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if JSON is empty or malformed
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                throw new Error('Empty JSON or malformed JSON');
            }
            // Pass intentions to the sendMessage function
            sendMessage(data.intents);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

/*Function to handle sending a message*/
function sendMessage(intents) {
    // Retrieve the input element from the DOM
    const userInputField = document.getElementById('user-input');
    // check if the element exists before proceeding
    if (!userInputField) return;

    // extract the text value + remove extra blank space
    const userInput = userInputField.value.trim();
    // If the input is empty = do nothing
    if (!userInput) return;

    // clear the input field for next message
    userInputField.value = '';
    //Added for Autonomy (timestamp)
    const timestamp = new Date().toLocaleString();

    // display the user's message in the chat window
    showMessage(userInput, 'user', timestamp);

    // add the user message to the history object
    historyMessages.addMessage({ message: userInput, sender: 'user', timestamp: timestamp });

    // ProcessMessage() the message to find the appropriate bot response
    const response = processMessage(intents, userInput);

    // display the bot's response
    setTimeout(() => {
        showMessage(response, 'bot', timestamp);

        // add the bot response to the history object
        historyMessages.addMessage({ message: response, sender: 'bot', timestamp: timestamp });

        // save the updated history to Session Storage
        saveMessages();
    }, 500);
}

/*Function to process the user's message*/
function processMessage(intents, message) {
    // By default, the response is "I'm sorry, I'm not sure I understand."
    let response = "I'm sorry, I'm not sure I understand.";
    // Browse chatbot intentions
    intents.forEach(intent => {
        // Check if the user's message matches one of the patterns
        intent.patterns.forEach(pattern => {
            // Check if the user's message contains the pattern
            if (message.toLowerCase().includes(pattern.toLowerCase())) {
                // Select a random answer from the list if responses exist
                if (intent.responses && intent.responses.length > 0) {
                    response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                }
            }
        });
    });
    // Return answer
    return response;
}

function showMessage(message, type, timestamp) {
    const chatBox = document.getElementById('chat-messages');
    if (!chatBox) return;

    const label = (type === 'bot') ? 'Bot' : 'User';
    const messageHTML = `
        <div class="${type}">
            <strong>${label}</strong> 
            <small>(${timestamp})</small>
            <p>${message}</p>
        </div>
    `;
    chatBox.innerHTML += messageHTML;
    chatBox.scrollTop = chatBox.scrollHeight;
}

/*Create a browser session to store messages*/
function saveMessages() {
    console.log('Saving chat history...');
    console.log(historyMessages.getHistory());
    sessionStorage.setItem('chatHistory',
        JSON.stringify(historyMessages.getHistory().map(msg => msg.message)));
}

/*Function to load messages from the browser session*/
function loadMessages() {
    // Recover message history from browser session
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(message => {
            showMessage(message, message.sender);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadMessages();

    const input = document.getElementById("user-input");
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") fetchJSON('../json/intents.json');
        });
    }
});

/*Function to clear all chat history and the chat UI*/
function clearChat() {
    if (confirm("Are you sure you want to clear the chat history?")) {
        // Clear session storage
        sessionStorage.removeItem('chatHistory');
        // Clear ChatHistory class array
        historyMessages.messages = [];
        // Clear UI
        document.getElementById('chat-messages').innerHTML = '';
        console.log("Chat history cleared.");
    }
}

// Ensure history is saved before leaving
window.addEventListener('beforeunload', saveMessages);
