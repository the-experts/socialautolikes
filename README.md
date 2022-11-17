# socialautolikes

Een automatisch social like systeem gemaakt met PlayWright bevat Linkedin, Instagram en Twitter.
https://playwright.dev/

Steps:
- npm install

- Set credentials in .env

- npx playwright test

Om de testen in Chromium te openen kun je het commando --headed toevoegen

- npx playwright test --headed

opzetten van automatisch draaien via een cronjob

Open een terminal en draai het commando:
- crontab -e

Voeg de onderste 2 regels toe om de testen te draaien elke werkdag om 10 uur.

PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
0 10 * * 1-5 sleep $(( RANDOM \% 40 )) ; cd ~/(PAD_NAAR_AUTOLIKER)/ && npx playwright test
