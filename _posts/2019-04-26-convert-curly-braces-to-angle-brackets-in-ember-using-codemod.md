---
layout: post
title: Convert Curly Braces To Angle Brackets In Ember Using Codemod
date: 2019-04-26
description: This post demonstrates converting curly braces to angle brackets in EmberJS
keywords: emberjs, curly braces, angle brackets, angle bracket invocation, codemod
---
Ember 3.4 was shipped with angle bracket invocation for components which is a very powerful feature. You can read more about this feature in [this article][ember-3.4-features].

"Okay, but how can I get these cool features?" you may ask. Well, thanks to [Rajasegar Chandran][rajasegar-chandran-github-profile] we don't have to go through every single `.hbs` file, find components and convert them to angle bracket ones. Using [ember-angle-brackets-codemod][ember-angle-brackets-codemod-github-link] we will be able to easily convert all components with a single command.

Please be noted that this codemod is **_not_** a [ember-cli official codemod][ember-codemods], so you might be facing some issues using it.

Here's what you need to do:
- Install the codemod: `npm install ember-angle-brackets-codemod -g`
- cd `my-amazing-app`
- run `npx ember-angle-brackets-codemod angle-brackets path/to/templates`

**Note**: This command will convert all components including the built-in ones such as `link-to` which didn't work for me. You can read [this RFC][conver-built-in-helpers-rfc] for more details on EmberJS team's decision about addressing some of the issues that this might bring to the table.

If you want to skip converting some components, add this file to your app:
{% highlight javascript %}
// app/config/anglebrackets-codemod-config.json
{
  "helpers": ["my-component"], // skips converting this component
  "skipBuiltInComponents": true // skips converting built-in components
}
{% endhighlight %}

Then run `npx ember-angle-brackets-codemod angle-brackets path/to/templates --config ./config/anglebrackets-codemod-config.json`

Voila! You now have shiny angle bracket version of your components.

[ember-3.4-features]: https://davidtang.io/2018/09/25/what's-new-with-components-as-of-ember-3.4.html
[rajasegar-chandran-github-profile]: https://github.com/rajasegar
[ember-angle-brackets-codemod-github-link]: https://github.com/rajasegar/ember-angle-brackets-codemod
[ember-codemods]: https://github.com/ember-cli/ember-cli-update-codemods-manifest/blob/v2/manifest.json
[conver-built-in-helpers-rfc]: https://github.com/emberjs/rfcs/blob/32a25b31d67d67bc7581dd0bead559063b06f076/text/0459-angle-bracket-built-in-components.md
