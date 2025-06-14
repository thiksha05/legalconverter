# Legal Contract Jargon Simplifier

A web application that simplifies legal contract documents by converting complex legal jargon and law terms into plain, easy-to-understand language. This helps users quickly grasp the meaning of dense legal text without needing specialized knowledge.

---

## Features

- Upload or paste legal contract text.
- Automatically detects and replaces jargon legal terms with plain English explanations.
- Outputs a simplified, readable version of the contract.
- Maintains the original paragraph structure with added clarifications.

---

## Technology Stack

- **Frontend:** HTML, CSS  
- **Backend:** Node.js, Express.js  
- **Logic:** A dictionary of jargon terms with their meanings is stored in the backend and used to replace terms dynamically.

---

## How It Works

1. User inputs a legal contract document (text format).
2. The backend scans the text for known legal jargon.
3. Identified jargon terms are replaced or appended with their plain-language equivalents.
4. The processed text is sent back and displayed to the user in an easy-to-read format.


