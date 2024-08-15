import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: false,
});

// start scraping youtube!
const page = await browser.newPage();

// laymen's terms: Turn on chrome dev tools
const client = await page.createCDPSession();
await client.send("Debugger.enable");
await client.send("Debugger.setAsyncCallStackDepth", { maxDepth: 32 });
await client.send("Network.enable");

// Intercept requestWillBeSent from the dev tools
client.on("Network.requestWillBeSent", (e) => {
  if (e.request.url.includes("/youtubei/v1/player")) {
    const jsonData = JSON.parse(e.request.postData);

    // Extractor PO Token and visitor data
    console.log(
      `PO TOKEN: ${jsonData["serviceIntegrityDimensions"]["poToken"]}`
    );
    console.log(
      `VISITOR DATA: ${jsonData["context"]["client"]["visitorData"]}`
    );

    browser.close();
  }
});
// Go to a YouTube embed
await page.goto("https://www.youtube.com/embed/jNQXAC9IVRw", {
  waitUntil: "networkidle2",
});

// Start playing the video
const playButton = await page.$("#movie_player");

await playButton.click();
