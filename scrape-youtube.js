import puppeteer from "puppeteer";

// Define the function that will scrape YouTube data
export async function scrapeYouTubeData(videoId) {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });

  try {
    // Start a new page
    const page = await browser.newPage();

    // Turn on Chrome DevTools
    const client = await page.createCDPSession();
    await client.send("Debugger.enable");
    await client.send("Debugger.setAsyncCallStackDepth", { maxDepth: 32 });
    await client.send("Network.enable");

    // Intercept the requestWillBeSent event
    client.on("Network.requestWillBeSent", (e) => {
      if (e.request.url.includes("/youtubei/v1/player")) {
        const jsonData = JSON.parse(e.request.postData);

        // Extract and log PO Token and visitor data
        console.log(
          `PO_TOKEN: ${jsonData["serviceIntegrityDimensions"]["poToken"]}`
        );
        console.log(
          `VISITOR_DATA: ${jsonData["context"]["client"]["visitorData"]}`
        );

        // Close the browser
        browser.close();
      }
    });

    // Go to the YouTube embed URL
    await page.goto("https://www.youtube.com/embed/" + videoId, {
      waitUntil: "networkidle2",
    });

    // Start playing the video
    const playButton = await page.$("#movie_player");
    await playButton.click();
  } catch (error) {
    console.error("Error scraping YouTube data:", error);
    await browser.close();
  }
}
