# WEATHER CLI
An application for getting the weather in the specified city.

The data is taken from `OpenWeather`.

To work on the first launch, you need to pass the `API key` and the `city(eng)`. The configuration is saved in a json file in the user's `home directory`. When the application is running, it takes data from it, the city and the key can be changed again by passing them to the startup parameters.

## Start
Example:
```sh
node ./weather.js -t {API_KEY} -c {CITY}
```

Flags:

- -t - Api key from `OpenWeather`;
- -c - Name of the city(english);
- -h - Get help.
