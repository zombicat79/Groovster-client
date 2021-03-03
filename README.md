README **SPOTYCHAT**

# Description

This is **Groovster,** it is built to connect people with same musical interests. They will be able to engage in live group conversations & create events to worship their favorite artists.

# User Stories

- 404: As an anon/user I will see a 404 page in case I try to reach a page that is no longer available.
- Signup: As an anon I will be able to sign up in the platform.
- Login: As a registered user, this is where I can login.
- Logout: as a user who already logged in, I am logging out.
- Main Page: As a logged in user, this is where I see my favorite artists & genre, and can browse through all the artists / genre of the platform.
- Artist Page: As a logged in user, this is where I can see all the information about an artist & their related events. I can also create a new event & join the chat.
- Detail Page: As a logged in user, this is where I can access all the artist's albums & tracks, I can also access preview of the songs.
- Create Event Page: As a logged in user, this is where I can create an event about an artist / Genre.
- Chat Page: As a logged in user, this is where I can join the chat with all the fans of the previously selected artist/genre.
- Settings: As a logged in user, this is where I can change my app preferences, but also change my username&password.

# Backlog

- Insanely cool CSS.
- Create user's profile page & direct chat possibility.
- In-app Notifications.
- Email notification.

# Client / Frontend

## React Router Routes (React App)

| Path              | Component       | Permissions                 | Behaviour                                                                                                                                                  |
| ----------------- | --------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /                 | LoginPage       | Anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login                                                                                               |
| /signup           | SignupPage      | Anon only `<AnonRoute>`     | Signup form, link to login, navigate to homepage after signup                                                                                              |
| /mainpage         | MainPage        | Users only `<PrivateRoute>` | Shows artists & genre based on the user's preference. Possibility to each of them to get to ArtistPage. Possibility to toggle to see only Artist or Genre. |
| /:id/page         | ArtistPage      | Users only `<PrivateRoute>` | Shows the Artist page. Link to the DetailsPage & CreateEventPage. Button to EnterChat                                                                      |
| /:id/details      | DetailsPage     | Users only `<PrivateRoute>` | Shows Details Page where user can explore albums & songs. & play Snippet. Go back button?                                                                  |
| /:id/create-event | CreateEventPage | Users only `<PrivateRoute>` | Shows Create Event Page, Event will be created by filling up the form.                                                                                     |
| /:id/chat         | ChatPage        | Users only `<PrivateRoute>` | Shows the chat dedicated to that specific artist/genre                                                                                                     |
| /settings         | SettingsPage    | Users only `<PrivateRoute>` | Shows the settings page, ability to change username & password & to set the preferences.                                                                   |

## Components

- LoginPage
- SignupPage
- MainPage
- ArtistPage
- DetailsPage
- CreateEventPage
- ChatPage
- SettingsPage
- Header
- ArtistsCard
- MusicPlayer

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
- Event Service
  - event.create()
  - event.delete()
  - event.modify()
  - event.read()
- User Service
  - user.delete()
  - user.update()
- Spotify Service
  - spotify.read()

# Server / Backend

## Models

User Model

```js
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  preferences: [ type:String ]
  events: [{type: Schema.Types.ObjectId,ref:'Event'}]
}
```

Event Model

```js
{
  artist: {type: String, required: true}
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  date: {type: String, required: true},
  participants: [{type: Schema.Types.ObjectId,ref:'User'}],
  creator: [{type: Schema.Types.ObjectId,ref:'User'}]
}
```

## API Endpoints (backend routes)

| HTTP Method | URL            | Request Body                                              | Success Status | Error Status | Description                                                                                                                     |
| ----------- | -------------- | --------------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup` | {name, email, password}                                   | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}                                      | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout` | (empty)                                                   | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/api/main`    | {preferences}                                             | 200            | 400          | Check user's preferences & ...                                                                                                  |
| GET         | /spotify/main  | {artist} {genre}                                          | 200            | 400          | ... retrieve Spotify data's accordingly                                                                                         |
| GET         | /spotify/:id   | {artist}                                                  | 200            | 400          | Retrieve Spotify's data about an artist.                                                                                        |
| GET         | /api/:id       | {events}                                                  | 200            | 400          | Retrieve all the events about specific artist                                                                                   |
| GET         | /spotify/:id   | {artist}                                                  | 200            | 400          | Retrieve more specific data about an artist including music samples.                                                            |
| POST        | /api/:id/event | {artist, title, description, date, participants, creator} | 201            | 400          | Save the new created event in the database.                                                                                     |
| GET         | /api/chat/:id  | {users \_id}                                              | 200            | 400          | Get users participating in the chat.                                                                                            |
| GET         | /spotify/      | {genres} {artists}                                        | 200            | 400          | Receive list of artists & genres from Spotify                                                                                   |
| PUT         | /api/:id       | {preferences, username, password}                         | 200            | 400          | Updating a user's preferences, username & password.                                                                             |
| DELETE      | /api/:id       | {preferences}                                             | 202            | 400          | Deletes a user's existing preference.                                                                                           |

# Links

Trello:

-

Git:

-

Heroku:

-

Slides:

-

Miro board:

- https://miro.com/app/board/o9J_lRwP5KY=/
