# Redirect checker with Nodejs

This project was forked from https://github.com/ansipes/redirect-checker

## Set up

Clone the repository
```bash
git clone https://github.com/TatChu/redirect-checker.git
```

Install dependecies
```bash
npm install
```
Or 
```bash
yarn
```

The CSV should look like this
```csv
301,a-relative-link.html,a-new-relative-link
...
```

## Run the command
```bash
node index.js https://www.basedomain.com/ path/to/your.csv
```
