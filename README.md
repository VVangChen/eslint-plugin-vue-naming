# eslint-plugin-vue-naming

A ESLint plugin for check vue components&#39; members naming.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-vue-naming`:

```
$ npm install eslint-plugin-vue-naming --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-vue-naming` globally.

## Usage

Add `vue-naming` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "vue-naming"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "vue-naming/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





