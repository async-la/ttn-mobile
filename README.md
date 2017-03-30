### Internationalization ###
We're using [react-intl](https://github.com/yahoo/react-intl). It provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations.

```
<FormattedMessage
  id='app.general.yes'
  defaultMessage='Yes'
/>
---
<Text>Yes</Text>
```

`babel-plugin-react-intl` extracts all of the defaultMessages we have and puts it in `build/messages`. Our script file `scripts/translations.js` then takes all of those ids and default messages and writes a flat json object in `build/lang/en.json`. The translator would then create a new locale with the same keys and input the translations.
