#🔥 📖 💬

An example work, tying together RequireJS, Angular, React, the Facebook Graph API, Firebase, Karma, and Gulp. The final product should be a clone of Tinder with a few special modifications...

You're gonna need an env.json to provide environmental variables, specifically the app's API Key. This belongs in the root of the repo, next to the `gulpfile.js`. Mine looks like this:
/* /env.json */
{
  "FB_API_KEY" : "______________"
}
`npm test` runs: `scss-lint src/app/styles/**.scss -e src/app/styles/_xeditable.scss`
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

#Flow
---

1. John opens the app.
2. A social network login is required and optionally stored. (There is a logout button)
3. John is presented with a list of trending topics, or the option to suggest their own. User Moderated for tag cleanliness.
4. They select a topic, "The Walking Dead"
5. John are presented with an individual who has selected to either:
    a. show an image.
    b. show a list of the topics they have been interested in.
6. John can see a text area, the user's profile, by swiping up on the image.
7. John then can either swipe left (uninterested) or right (interested).
8. If John swipes right (interested) on user B's profile/image that has already swiped right (interested) on he is "matched" with the user.

  a. Matching:

    i. can be removed

    ii. enables a messaging system for the users

9. John is continually re-presented with a user at a time until all users have been exhausted.
  *. Users include current Facebook friends, but more importantly include other users of the app who are geographically close.
*. Later, as a user has other users sorting them, they will get alerts if you and the other user swiped the same on the same topic. You can then chat with them or, if they agree, send them a text message


