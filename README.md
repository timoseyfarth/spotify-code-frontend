# Spotify Code Generator - Frontend

[![License](https://img.shields.io/github/license/timoseyfarth/smoothiepy)](https://github.com/timoseyfarth/spotify-code-frontend/blob/main/LICENSE)
[![](https://img.shields.io/badge/GitHub-Backend-darkgreen)](https://github.com/timoseyfarth/spotify-code-backend)
[![](https://img.shields.io/badge/GitHub-Main%20Repo-white)](https://github.com/timoseyfarth/spotify-code-project)

This repository contains the frontend code for the 3D Printable Spotify Code Generator. It's a Vue.js application that provides the user interface for generating the necessary Base-8 codes from a Spotify URL. Beside that it provides color suggestions for 3D-printing and downloadable PDF files to print the album cover image.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development.

### Prerequisites

* Node.js (tested on v20.x)
* npm (tested on v10.x)

### Installation & Running

(Note: These instructions are optimized for Windows and not tested on other OS's)

1. Clone the repo to your local machine

```bash
git clone git@github.com:timoseyfarth/spotify-code-frontend.git
cd spotify-code-frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory. See `.env.example` for a default local setup. If this configuration fits for you rename the file to `.env`.

4. Run the development server
```bash
npm run dev
```
Open the provided link from the terminal to view it in your browser.

5. Test it out!

Make sure that you also have the backend up and running. (More information in the [backend repo](https://github.com/timoseyfarth/spotify-code-backend)).
Now you can test it out by pasting Spotify URL's. If you Submit it, there will be a request to the local backend and it will display the response nicely in the frontend!

---

## 👨‍💻 A Note from the Creator

This project was a fantastic learning experience. It was my first time trying out Vue.js, therefore it may not be perfect. I defintely see much room for improving the code e.g. in structure and im working on a cleaner version if time allows it. I'm proud of how it turned out and hope you enjoy using it!
