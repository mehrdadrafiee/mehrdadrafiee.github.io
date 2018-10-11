---
layout: post
title: Handle Server Side Errors In Ember
date: 2018-10-10
description: This post covers how to handle errors in EmberJS
keywords: ember, server side error
---
It happens that server does not return the data you requested for and throws a generic error. In these situations you want to show a friendly message to the user or handling the error by redirecting to another page. In this example I'm using [Ember CLI Mirage][ember-cli-mirage] and configured it to return a 403 response when requesting `/posts`.

{% highlight javascript %}
// app/mirage/config.js
this.get('/posts', function(schema, request) {
  return new Mirage.Response(403, {}, {});
{% endhighlight %}

Then in the modelhook where the endpoint is being called, I would need to looks for any error that may occur and handle them accordingly.

Side note: destructuring [adapter errors][adapter-errors] from `DS` makes the code more readable.

{% highlight javascript %}
// app/routes/posts.js
const { ForbiddenError } = DS;

export default Route.extend({
  ...
  model() {
    return this.store.query('post').catch((error) => {
      if (error instanceof ForbiddenError) {
        this.transitionTo('forbidden');
      }
      return error;
    });
  }
});
{% endhighlight %}

And here is an acceptance test to cover this scenario.

{% highlight javascript %}
test('when /posts errors (403), page redirects to forbidden', async function(assert) {
  server.get('/posts', function() {
    return new Mirage.Response(403, {}, {
      errors: [{
        code: 'something went wrong'
      }]
    });
  });
  await page.visit();
  assert.equal(currentURL(), '/forbidden', 'page redirected to forbidden');
});
{% endhighlight %}

Now handling more errors is just a breeze!

[ember-cli-mirage]: https://www.ember-cli-mirage.com/
[adapter-errors]: https://www.emberjs.com/api/ember-data/release/classes/DS.AdapterError
