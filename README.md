# Mob Timer

[![Greenkeeper badge](https://badges.greenkeeper.io/mob-timer/mob-timer.svg)](https://greenkeeper.io/)

A cross-platform timer built on [Electron](http://electron.atom.io/)
for doing [Mob Programming](http://mobprogramming.org/). This is a fork from [pluralsight/mob-timer](https://github.com/pluralsight/mob-timer).

![Example Timer Image](timer-example.png)

Click the gear icon in the top right to configure the timer.
Then click the large circle to start/stop the timer,
or the smaller circle to skip to the next mobber.


# Build the timer

Run `npm install` and then one of the following commands for your respective operating system:
- Windows: `npm run build-win`
- Mac OS X: `npm run build-mac`
- Linux: `npm run build-linux` (You may need to install `libcanberra-gtk-module`)

Platform specific packages will be placed in the `dist` directory.
If you need a platform other than these, you will need to modify the build script in the `package.json` file.


# Development

Run `npm install` to get the dependencies, then `npm start` to run the timer.
Run `npm test` to run the unit tests once, or alternatively `npm run watch` to run them on changes.


# Contributing

Feel free to open Issues and Pull Requests discussing additions to this project. You can also have a look at the [existing issues](https://github.com/mob-timer/mob-timer/issues). Keep the Pull Requests small and make sure the tests and code style checks pass.

If you are uncertain, please reach out first (by opening an issue) before investing too much time. :)

# License

The Mob Timer is licensed under the [Apache 2.0 license](LICENSE).
