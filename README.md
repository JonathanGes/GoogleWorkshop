# Google Workshop - Event Planner

## Intro

The Event Planner is the perfect tool for anyone planning small to medium sized events.  
Plan any event in just a few easy steps:

1. Create your event.
2. Add assignments for yourself and others
3. Invite your friends
4. Enjoy!

http://google-workshop.netlify.com

## The Dev Zone

### Before You Start

Run in the terminal:

```
yarn install
yarn start
```

The web app will open in your default browser.

### Implementation

- **Framework** - React for its ease of use, vast community and reusable components methodology.
- **State Management** - We use MobX State Tree to manage state. The opinionated methodology makes it easy for us to work together and makes the code readable. Snapshots help us implement autosave easily!
- **Routing** - Reach router is one of the easiest solutions we could find.
- **UI** - We chose to go with Material UI for its simplicity and many available examples.
- **Deployment** - We use Netlify to continously deploy our project to production.

## Usage Instructions

**Note** - Currently, only an event-organizer profile is implemented.
A co-organizer or participant profile was planned but not yet implemented.
Additionally, some functionality is still missing and so some of the buttons are only stubs

After signing in with your Google account (see known issues), you can start creating your new event page.

You can either choose one of pre-defined event types, or start from scratch.
The layout is common for both cases.

**WE HAVE AUTOSAVE! 🕺 Any change you make is automatically saved!**  
You should start by setting your event description and date.
You'll also see a list of tasks. This list will be pre-populated in case you chose an existing template, or empty in case you start from scratch.
You can start creating tasks and update their progress.
You can also add songs to your playlist (again, pre-populated in case of default event type).
The playlist is meant to be connected to Spotify but it is currently a stub.

When your event is ready to go public, you can click 'publish' (stub)
You will also be able to assign tasks to others using the 'invite' button (stub).
After the event took place you can archive it and remove it from editing by using the 'archive' button.

## Additional known issues

- Sign in using username and password is not yet supported. Currently only 'sign in with google' is.
- Deleting an event is not supported
