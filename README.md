# Hardian Marketing Website CSS and JS

Style and script overrides for www.hardianhealth.com (Squarespace).

Every commit to `master` is deployed by Cloudflare Pages to https://hardian-health-github-io.pages.dev, and the Squarespace header code injection loads two files from there:

- `style.css`: site-wide styles. Edit this file directly; there is no build step.
- `header.js`: site-wide behaviour (blog post meta, date formats, service tube maps and breadcrumbs, service colours, external links). Needs jQuery, which the header code loads first.

Other files:

- `footer.html`, `publications.html`: reference copies of code pasted into Squarespace code blocks (the site footer and the Publications widget). Changing them here does not change the site; paste the new version into Squarespace.
- `squarespace/contact-form-post-submit.html`: a note that the contact form's Post-Submit HTML stays empty. Scripts there don't run, so `header.js` sends the GTM event and LinkedIn conversion and shows the cube after a submission.
- `_headers`: Cloudflare Pages cache settings. Browsers reuse `style.css` and `header.js` for 10 minutes, so a change can take up to about 10 minutes (plus one page view) to show. Hard-refresh to see it sooner.
- `backup/`: rollback copies of the live files. See the README inside.

The Cube on /cube lives in its own repo, [hardian-health-code/Cube](https://github.com/hardian-health-code/Cube), and is embedded from there.

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
    Note the URL (e.g., http://localhost:3000/style.css)
2. Install [Requestly extension](https://chromewebstore.google.com/detail/requestly-supercharge-you/mdnleldcmiljblolnjhpnblkcekpdkpa?hl=en)
3. Create a redirect rule in requestly:
    Source equals: `https://hardian-health-github-io.pages.dev/style.css`
    Redirect location: http://localhost:3000/style.css
    (Add a second rule for `header.js` if you are changing it.)
4. Open https://www.hardianhealth.com/, select the padlock/settings for the site (left hand part of URL bar), then Site settings → Enable "Local network access"
5. Open dev tools
    1. Go to sources → Workspace
    2. Add a folder manually, select the location of this code folder
    3. You should see a little green dot next to the `style.css` where chrome has detected it's the same file

You can now edit and save styles directly in chrome allowing for faster debug.
