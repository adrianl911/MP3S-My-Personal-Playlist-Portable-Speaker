// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDk89D6Ab0PbPJ_XMcz5NybWIFe0ca-kxQ",
    	authDomain: "data-30cd5.firebaseapp.com",
    	databaseURL: "https://data-30cd5.firebaseio.com",
	    projectId: "data-30cd5",
	    storageBucket: "data-30cd5.appspot.com",
	    messagingSenderId: "407667555353",
	    appId: "1:407667555353:web:c8dad3d0ff464b40"
    }
};