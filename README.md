#🔥 📖 💬

An example work, tying together RequireJS, Angular, React, the Facebook Graph API, Firebase, Karma, and Gulp. The final product should be a clone of Tinder with a few special modifications...


You're gonna need an env.json to provide environmental variables, specifically the app's API Key. This belongs in the root of the repo, next to the `gulpfile.js`. Mine looks like this:
/* /env.json */
{
  "FB_API_KEY" : "______________"
}

---
Below is a boilerplate contributing document, if you wanted to contribute, you could fix that, or you could take the below as some general guidelines to making your own.

We love pull requests. Here's a quick guide:

Fork the repo.

Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: bundle && rake

Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or fixing a bug, we need a test!

Make the test pass.

Push to your fork and submit a pull request.

At this point you're waiting on us. We like to at least comment on, if not accept, pull requests within three business days (and, typically, one business day). We may suggest some changes or improvements or alternatives.

Some things that will increase the chance that your pull request is accepted, taken straight from the Ruby on Rails guide:

Use Rails idioms and helpers
Include tests that fail without your code, and pass with it
Update the documentation, the surrounding one, examples elsewhere, guides, whatever is affected by your contribution
Syntax:

Two spaces, no tabs.
No trailing whitespace. Blank lines should not have any space.
Prefer &&/|| over and/or.
MyClass.my_method(my_arg) not my_method( my_arg ) or my_method my_arg.
a = b and not a=b.
Follow the conventions you see used in the source already.
And in case we didn't emphasize it enough: we love tests!