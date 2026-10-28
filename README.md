# DesignFreeHub

A responsive, static-first graphic design resource library for English and Urdu templates.

## Included

- Responsive homepage and navigation
- Search, category filtering, and sorting
- Eight sample resource records with original inline SVG previews
- About, Contact, Privacy, and Terms & License pages
- Basic sitemap and robots.txt
- GitHub Pages-compatible HTML, CSS, and JavaScript
- No build step, paid API, database, or server required

## Important starter-version limitations

- The current resource cards are sample previews only. They are not downloadable templates.
- `downloadUrl: "#"` intentionally shows “Preview only.”
- Replace the placeholder contact email.
- Replace `YOUR-USERNAME` in `robots.txt` and `Sitemap.xml` after publishing.
- This is a static site. It does not include secure user accounts, server-side admin, a database, payment processing, analytics, or real ad integration.
- The Privacy and Terms pages are templates and should be reviewed for your actual deployment and applicable law.

## Preview locally

Open `index.html` in a modern browser. For the best local development experience, use a simple local web server or VS Code Live Server, but no compilation is needed.

## Publish using GitHub Pages

1. Create/sign in to a GitHub account at https://github.com.
2. Create a new public repository named exactly `YOUR-USERNAME.github.io`, replacing `YOUR-USERNAME` with your GitHub username.
3. Upload the contents of this folder (not the folder wrapper itself) to the repository root.
4. In repository Settings → Pages, select deployment from the `main` branch and `/ (root)` if that option is shown.
5. Save and wait for GitHub Pages to publish. Open `https://YOUR-USERNAME.github.io`.
6. Update `robots.txt` and `Sitemap.xml` with your actual site URL.
7. Add the site to Google Search Console and submit `https://YOUR-USERNAME.github.io/Sitemap.xml`.

GitHub interface labels may change; use GitHub's current Pages documentation if the menu differs.

## Add a real resource

1. Create your original design file and export an appropriate preview image.
2. Put the actual downloadable file in `assets/downloads/` (or use a properly licensed, stable external file URL).
3. Open `assets/js/resources.js`.
4. Add a new object to `window.DESIGNFREEHUB_RESOURCES`, using a unique `id`.
5. Set `downloadUrl` to the correct relative path, for example `assets/downloads/my-original-template.pdf`.
6. Add an accurate title, description, category, language, format, tags, and license information.
7. Test the download link and mobile layout before publishing.

Only upload assets you created or have permission to distribute. Do not claim commercial-use rights without checking the applicable license.

## SEO launch checklist

- Replace placeholder site URLs and contact information.
- Add genuinely useful original resources and descriptions.
- Check page titles and descriptions.
- Confirm all links work and no sample item is presented as a real download.
- Test mobile layout, accessibility, and loading performance.
- Verify the website in Google Search Console.
- Apply for ads only after the site contains substantial original value and meets the advertising provider's current policies.
