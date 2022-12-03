# YouTube Remove Watch Later

A Node app that allows you to remove 'Watch Later' videos from your account.

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

To keep the last N number of videos in the playlist, edit `index.ts`:

```ts
async function main() {
  await bot(50);  // Keeps the 50 most recent videos.
}
```
