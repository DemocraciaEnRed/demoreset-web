# DemoReset Website

> Made by [Democracia en Red](https://democraciaenred.org)

This project uses:
- [NuxtJS](https://nuxtjs.org/)
- [Bulma](https://bulma.io/)
- [Buefy](https://buefy.org/)
- [VueJS 2](https://vuejs.org/)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

---

## Working with the project

### Adding a new page

To add a new page, create a new file in the `pages` directory. The file name will be the URL of the page. For example, `pages/about.vue` will be accessible at `http://localhost:3000/about`.

### Adding a new component

To add a new component, create a new file in the `components` directory. The file name will be the name of the component. For example, `components/MyComponent.vue` will be accessible as `<my-component>`.

### Adding translations strings

Inside each language you can create new keys and values. The key will be the name of the string and the value will be the translation. For example, in `lang/en.json`:

```json
{
  "hello": "Hello world!"
}
```

You can access the string in your code with `$t('hello')`.

**IMPORTANT** You might need to restart the server to see the changes.

### Styles 

The project uses [Bulma](https://bulma.io/documentation/) as a CSS framework and [Buefy](https://buefy.org/) as a UI components library. You can find the documentation for both of them in their respective websites.

### Icons

The project uses [Font Awesome](https://fontawesome.com/icons?d=gallery) for icons. You can already use it :)

### Styles inside components

You can add styles to your components by adding a `<style>` tag inside the component. For example:

```vue
<template>
  <div>
    <h1>My component</h1>
  </div>
</template>

<script>
export default {
  name: 'MyComponent'
}
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
```

We recommend you using [SCSS](https://sass-lang.com/documentation/syntax) for your styles. You can use it by adding `lang="scss"` to the `<style>` tag.

Also if you want to use variables, you can add a `variables.scss` file inside the `assets` directory. You can use it by importing it in your component. 

**IMPORTANT**: You can use scoped styles in your components. Just add `scoped` next to `lang="scss"` This means that the styles will only be applied to the component. If you don't want to use scoped styles, just remove `scoped`. But be careful, you can break the styles of other components, because they will be using the same classes.


----

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
