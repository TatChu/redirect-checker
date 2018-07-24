# Easily check redirects

## Set up

Clone the repository
```bash
git clone https://github.com/ansipes/redirect-check.git
```

Install dependecies
```bash
npm install
```

The CSV should look like this
```csv
301,a-relative-link.html,a-new-relative-link
...
```

## Run the command
```bash
npm run check -- https://www.basedomain.com/ path/to/your.csv
```
