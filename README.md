# Daniel Zulu — ICT251 Student Portfolio

A static personal portfolio for ICT251 Web Technologies at Mulungushi University. The site is in the `myweb` folder; the original Activity 1 backup is kept outside that publish folder.

## JavaScript features

1. **Contact form validation and preview** — rejects blank/whitespace-only names and messages and malformed email addresses. Valid values are previewed on the page only; nothing is sent.
2. **Expandable project details** — use each project button to show or hide its explanation.
3. **Photo gallery viewer** — Previous and Next change the photo and caption, wrapping correctly at either end.
4. **Project search** — filters the three project/skill cards, provides a reset button, and explains when there are no matches.

## Test locally

Open `myweb/index.html` in VS Code with Live Server. Test the navigation, responsive layout, all three photos, video/audio controls, project controls, and the form with empty fields, whitespace-only text, an invalid email, and valid values. The form is a local browser demonstration only.

## Sources

- Photos, video, audio, and personal details: Daniel Zulu's Activity 1 and Activity 2 materials.
- Web platform reference: [MDN Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development).

## Render static-site settings

Connect this repository as a Render Static Site and use:

- **Root Directory:** `myweb`
- **Build Command:** `echo "No build required"`
- **Publish Directory:** `.`
- **Auto Deploy:** enabled for the branch containing the finished site
