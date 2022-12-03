# YouTube Remove Watch Later

A Puppeteer script that allows you to remove `Watch Later` videos from your YouTube account with minimal manual intervention.

## Usage

Create a `.env` in the project root containing your Google account email and password:

```env
YT_EMAIL=<email>
YT_PASSWORD=<password>
```

Run the following commands:

```
npm install
npm start
```

While running, you will have to complete the multifactor authentication step manually. Have your device nearby, so that can complete the authentication. Once
completed, navigate back to the terminal in which you ran this app and enter `y` to continue the video removal.

To keep the last `N` number of videos in the playlist, edit `index.ts`:

```ts
async function main() {
  await bot(50);  // Keeps the 50 most recent videos.
}
```
