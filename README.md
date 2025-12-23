# Hardian Marketing Website CSS

This repo contains style overrides for the hardianhealth.com site. The CSS is served via github pages and published on any commit to the master branch.

> ![WARNING]
> There are various old files and presumed unused content in this repo - only `style.css` is known to be used.

## Local CSS Development

Prerequisites:
1. Recent version of nodejs (On mac: `brew install nvm; nvm install 22; nvm global 22`)
2. A chrome based browser (tested in brave)
3. A local checkout of this repo

Starting up server:
1. Serve the CSS from this folder
    ```bash
    npx serve .
    ```
    Note the URL (e.g., http://localhost:3000/styles.css)
2. Install [Requestly extension](https://chromewebstore.google.com/detail/requestly-supercharge-you/mdnleldcmiljblolnjhpnblkcekpdkpa?hl=en)
3. Create a redirect rule in requestly:
    Source equals: `https://hardian-health-code.github.io/hardian-health.github.io/style.css`
    Redirect location: http://localhost:3000/styles.css
4. Open https://www.hardianhealth.com/, select the padlock/settings for the site (left hand part of URL bar), then Site settings → Enable "Local network access"
5. Open dev tools
    1. Go to sources → Workspace
    2. Add a folder manually, select the location of this code folder
    3. You should see a little green dot next to the `style.css` where chrome has detected it's the same file

You can now edit and save styles directly in chrome allowing for faster debug.
