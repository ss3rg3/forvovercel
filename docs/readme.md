{:toc}

# Setup

- Install packages

  ```
  pnpm install
  ```

- Add path to local bin directory.

  ```bash
  export PATH=$PATH:/PATH_ON_YOUR_MACHINE/forvovercel/node_modules/.bin
  ```

- Login

  ```
  vercel login
  ```

- Deploy (link project and such)

  ```bash
  vercel			# for preview, separate URL will be provided
  vercel --prod	# deploy
  ```



# Development

Run locally

```
vercel dev
```



# Usage

- In your app, call with your API key:

  ```
  https://forvovercel.vercel.app/api/mp3?key=XXXXXXXXXXXXXX&word=怎么样
  ```

- The function will fetch the available list of MP3s and select the newest one. The ones with the most rating are mostly the oldest ones and have actually worse audio quality. If no MP3 is found, then a 404 is returned.

- The resulting JSON complies with the [Yomichan schema](chrome-extension://ogmnaimimemjmbakcfefmnahgdfhfami/data/schemas/custom-audio-list-schema.json)



# Yomichan

You need to run the Vercel app locally in `dev` move. Forvo doesn't seem to serve the MP3 if the download is done from a different IP which made the API call.
