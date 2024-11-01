# Basic automation testing example

## How to setup
To create this project we need Node which you can install via Homebrew:

```
brew install node
```

After this we setup a basic javascript package via NPM:

```
npm init
```

For the implementation of the tests we are going to use Cypress which we can install via the instructions of their website

```
npm install cypress --save-dev
```

After node is installed we open it with the following command and follow the instruction to setup end-to-end testing:

```
npx cypress open
```

Through using the quick configuration provided by cypress we have an easy way to start our basic automation. Specs are setup under cypress/e2e.

## How to run

Use NPM to install packages
```
npm install
```

Open Cypress to start testing
```
npx cypress open
```
