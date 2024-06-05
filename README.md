Woof Woof!  

Doggopedia is a frontend application run on Node JS using the fetch JS API to fetch doggo data from an open public source dog API [dog.ceo](https://dog.ceo/dog-api/) with a chatbot fine-tuned on ChatGPT's 3.5 turbo model.

## Features:
- Homepage
- Random Doggo Fetch
- Breed List
- Chatbot

  
## Instructions:
1. Setup and dependencies
- Make sure you are in the Doggopedia repo by opening that folder (use cd/pwd)
- Install NodeJS on your system https://nodejs.org/en/download/package-manager
- Ensure you have NodeJS by running node -v in your terminal, it should display a version, if not retry
```
npm install
```
2. Next, we will setup a sensitive API Key in an environment
- Every person's key is unique, so setup yours at https://openai.com/index/openai-api/
```
touch .env
nano .env
OPENAI_API_KEY=your_actual_api_key_here
(command x to exit the nano editor)
node chatbot.js (run the node server with chatbot)
```
3. Open the homepage
 ```
open ./index.html
```



