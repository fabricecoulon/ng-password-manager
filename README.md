# NgPasswordManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

 1. Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
 2. In another terminal window run `npm run json-server` to launch a dummy dev backend on port 3000
 
The proxy.conf.json redirects API calls to `/api` to port 3000. 
This is because the script `start` in `package.json`:

```
 "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "json-server": "json-server --routes data/routes.json --watch data/pwmgr-data.json"
  },
```

The default username is defined in the file `data\pwmgr-data.json` and the default password is `1234` (bcrypt hashed in the file)
So, navigate to `http://localhost:4200/`, enter the default username and password and press the `login` button.

You'll be rerouted to the next page, containing your secret passwords that can be revealed/hidden when pressing on the `eye` button beside the password column.

PS: A major part of this example is to make sure that NO passwords are encoded in plain text in the backend.

## Further improvements

 * Replace the dev/dummy backend on port 3000 with a serious production backend
 * Use HTTPS
 * Allow multiple users and only retrieve the entries for that user (using for example JSON Web Token)
 * Encrypt everything, even the url and the username column

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
