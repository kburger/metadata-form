# metadata-form
[![Build Status](https://travis-ci.org/kburger/metadata-form.svg?branch=develop)](https://travis-ci.org/kburger/metadata-form)

Angular module for metadata forms.

# usage
Add the `metadata.form` module to your dependencies:
```javascript
angular.module('example', ['metadata.form']);
```

Add the `metadata-form` directive to your page:
```html
<div ng-app="example">
  <metadata-form view="repository"></metadata-form>
</div>
```