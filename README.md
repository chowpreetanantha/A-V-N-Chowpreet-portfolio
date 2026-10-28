# A V N Chowpreet — Personal Portfolio

A responsive, dark, professional portfolio designed for GitHub Pages. It is a static website: no database, paid hosting, or build step is required.

## What is included
- Responsive dark theme with warm gold accents
- Your profile photo integrated into the homepage hero section (`assets/profile-photo.png`)
- About, journey, two achievements, projects, goals, and contact sections
- Editable content in one file: `data.js`
- SEO basics: descriptive page title, meta description, social preview, and Person structured data
- Mobile navigation, accessible focus styles, and reduced-motion support
- GitHub Pages deployment instructions

## Before publishing: personalise it
Open `data.js` in a text editor and replace:
- `YOUR_EMAIL@example.com` with the email address you want to publish
- `YOUR-LINKEDIN-USERNAME` with your LinkedIn profile URL
- `YOUR-GITHUB-USERNAME` with your GitHub username
- The two achievement placeholders with your real achievements
- The journey, goals, and project descriptions with your actual details

You can change the wording, dates, links, achievements, goals, and projects in this file whenever you want. Avoid publishing private information.

## Publish using GitHub Pages (free)
1. Sign in to GitHub in your browser.
2. Create a **new public repository** named exactly `YOUR-GITHUB-USERNAME.github.io` (replace with your username). This repository name is what gives you the simple address `https://YOUR-GITHUB-USERNAME.github.io/`.
3. Extract this ZIP on your computer.
4. Open the new repository on GitHub and choose **Add file → Upload files**.
5. Upload the contents of this folder (the files inside it, not the ZIP itself). Make sure `index.html` is at the repository root, not inside another nested folder.
6. Add a commit message such as `Add personal portfolio website`, then click **Commit changes**.
7. In the repository, open **Settings → Pages**. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, and save if that option appears.
8. Wait for the Pages deployment to finish. Open `https://YOUR-GITHUB-USERNAME.github.io/`.

GitHub's menus can change slightly; see the official guide:
https://docs.github.com/en/pages/getting-started-with-github-pages

## How to make sure only you can edit it
The live website is public, but it does **not** contain an edit button or public editing panel. People who visit it can only view the content. Keep the GitHub repository under your own account and do not grant anyone else write/admin access. Only your GitHub account (and any collaborators you deliberately authorize) should be able to change the source and publish updates.

Important: if you make the repository public, visitors can read the source code and copy the site, but they cannot change your original repository without write access. Never store passwords, API keys, or private information in the website files.

## Make future edits
1. Open your repository on GitHub.
2. Click `data.js`.
3. Click the pencil/edit icon.
4. Make your changes and commit them.
5. Wait for GitHub Pages to rebuild the website.

For bigger design changes, edit `styles.css` or `index.html`. You can also edit files locally and upload the changed files to GitHub.

## Make it appear when people search your name
No one can guarantee a specific Google ranking or instant indexing. To improve discoverability:
1. Publish the site and keep your full name consistent across your website, GitHub, and LinkedIn.
2. Add your actual public profile links and real achievements/projects.
3. In Google Search Console, add the published URL as a URL-prefix property and verify ownership using one of the offered methods.
4. Use URL Inspection to request indexing after the site is live.
5. Link to your website from your LinkedIn and GitHub profiles.
6. Keep content useful and updated. Search engines may take days or weeks to index a new site, and ranking for a common name can take longer.

Google Search Central guide:
https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Custom domain (optional)
You can later buy a domain such as `yourname.com` and connect it in **Repository Settings → Pages → Custom domain**. A custom domain costs money; GitHub Pages hosting itself can be free. Follow GitHub's official instructions:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Current placeholders
This first build uses placeholders for contact details and your two achievements because those exact details were not provided yet. Replace them before publishing.
