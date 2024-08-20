## How to Run Scrape-YouTube

### 1. Install Dependencies

First, run the following command in your terminal to install all the necessary dependencies:

```
npm install
```

Wait until the installation is complete.

### 2. Start the Application

Once the installation is finished, start the application with:

```
npm start
```

## If you use as package

# YouTube Data Scraper

A simple Node.js package that uses Puppeteer to scrape PO Token and visitor data from YouTube video embeds without opening a browser window.

## Features

- Extracts PO Token and visitor data from YouTube embed URLs.
- Runs in headless mode, making it efficient for server-side usage.
- Easy to integrate into existing Node.js projects.

## Installation

Install the package using npm:

```bash
npm install youtube-scraper-data
```

## Usage

Import the package and use the scrapeYouTubeData function to scrape data from a YouTube embed URL.

```bash
import { scrapeYouTubeData } from "youtube-scraper-data";

scrapeYouTubeData("jNQXAC9IVRw");
```

## Output

The function will log the extracted PO Token and visitor data to the console:

```bash
PO_TOKEN: <PO_TOKEN_HERE>
VISITOR_DATA: <VISITOR_DATA_HERE>
```

## API

`scrapeYouTubeData(videoId)`

videoId: string - The URL of the YouTube embed from which you want to scrape data.
This function launches a headless browser, navigates to the specified YouTube embed URL, and logs the PO Token and visitor data to the console.
