# Labels Aggregator

[![clasp][clasp-svg]][clasp]
[![CircleCI][ci-status-svg]][ci-status]

[GAS][gas] script that translates customer data & ordered products into aggregated labels for my
father's business. Nothing fancy.

## Dev Setup

1. Make sure that you have [CLASP][clasp] installed
2. Login with CLASP via `clasp login`
3. Create a Google Spreadsheet
4. Click on "Tools" -> "Script editor"
5. Within the script, select "File" -> "Project properties"
6. Copy the script id shown
7. Open a new shell, and clone and cd into this repository
8. Run `yarn install` to install dependencies
9. Run `clasp setting scriptId <your-script-id>`
10. Run `yarn deploy`, so your Google Spreadsheet is now attached to the script.

## Usage

1. Open your spreadsheet
2. Make sure there is a sheet called "in", and copy & paste your table data into this sheet.
3. Make sure there is a sheet called "lookups", and copy & paste your lookups table that contains
   the mappings between product codes and their names, formats & prices.
4. Click on "labels" -> "Generar", and wait for the execution to finish.

## Linting

```sh
$ yarn lint
```

## Deploy

1. Make sure you are logged in with CLASP as per the Dev Setup instructions.
2. Make sure you have set up your script id as per the Dev Setup instructions.
3. Run `yarn deploy` to update your remote GAS code with your local code.

[clasp-svg]: https://img.shields.io/badge/built%20with-clasp-4285f4.svg
[clasp]: https://github.com/google/clasp
[ci-status-svg]: https://circleci.com/gh/sasalatart/labels-aggregator.svg?style=svg
[ci-status]: https://circleci.com/gh/sasalatart/labels-aggregator
[gas]: https://developers.google.com/apps-script
