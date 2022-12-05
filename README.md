<b>NOTE: THIS PROJECT IS NO LONGER UPDATED. DUE TO THE WAY YOUTUBE'S PAGINATION SYSTEM WORKS IN THE PLAYLIST UI, THIS CODE MAY NOT BE ABLE TO DELETE ALL THE VIDEOS IN 
ONE GO. EVENTUALLY THE YOUTUBE APP STOPS LOADING MORE VIDEOS AFTER SOME REMOVALS, SO YOU MAY HAVE TO RUN THIS CODE FOR MULTIPLE ROUNDS. A BETTER IMPLEMENTATION 
WOULD BE TO USE GOOGLE'S YOUTUBE API INSTEAD OF WRITING A WEB USER SCRIPT.</b>


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
