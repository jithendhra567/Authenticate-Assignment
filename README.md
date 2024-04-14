# JUST READ ME

## Screenshots

### desktop

<img src="https://firebasestorage.googleapis.com/v0/b/assignment-a2356.appspot.com/o/authenicate%2FScreenshot%202024-04-14%20at%209.14.08%E2%80%AFPM-min.png?alt=media&token=16a04d3c-bfae-433e-be56-04d2b299d1aa" style="widht: 200px"  />
<img src="https://firebasestorage.googleapis.com/v0/b/assignment-a2356.appspot.com/o/authenicate%2FScreenshot%202024-04-14%20at%209.14.29%E2%80%AFPM-min.png?alt=media&token=021db410-95f5-451e-9498-3cdb89a28565" />

### mobile

<table>
  <tr>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/assignment-a2356.appspot.com/o/authenicate%2FScreenshot%202024-04-14%20at%209.15.43%E2%80%AFPM-min.png?alt=media&token=c65e9535-f4d6-4827-95d8-28eb447257b3" style="height: 400px" />
   </td>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/assignment-a2356.appspot.com/o/authenicate%2FScreenshot%202024-04-14%20at%209.16.02%E2%80%AFPM-min.png?alt=media&token=2caa34b8-c852-4481-8402-33f2c7ddf267"  style="height: 400px" />
   </td>
   <td>
   <img src="https://firebasestorage.googleapis.com/v0/b/assignment-a2356.appspot.com/o/authenicate%2FScreenshot%202024-04-14%20at%209.44.44%E2%80%AFPM-min.png?alt=media&token=377db209-0a35-487e-ba45-ada09ed19fe5"  style="height: 400px" />
   </td>
  </tr>
 </table>

## Project Structure

`/src`
`├── components`
`├── elements (building blocks)`
`├── hooks (custom hooks)`
`├── pages`
`├── tests`
`└── utils`

## Features

- mutiple users can use this platform
- can create, delete and rename watchlist
- can search movies and add to their watchlist on the go
- all are stored in local as of now
- responsive to all screens
- search watch lists

## State management

- I used context api only
- This project doesn't have a complex state to manage. which can be managed easily with context api itself.
- This project is designed and followed open/close principle, so without changing any code you can create store file for redux and integrate easily

## Testing

- unit testing (components testing)
- api testing (search and details api)

## Concepts used

- Component with hooks (custom Hooks)
- Datamanagement with provider (context)
- Custom Elements (p, input, button... etc)
- SOLID Principles

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
