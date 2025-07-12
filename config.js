/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 *
 * Use font-awesome for the google calendar icons!
*/
let config = {
	address: "0.0.0.0",		// Address to listen on, can be:
					// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
					// - another specific IPv4/6 to listen on a specific interface
					// - "0.0.0.0", "::" to listen on any interface
					// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],		// Set [] to allow all IP addresses
						// or add a specific IPv4 of 192.168.1.5 :
						// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
						// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
						// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",		// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",		// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-UK",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
/*		{
			module: "MMM-PIR-Sensor-Lite",
			position: "bottom_bar",
			config: {
					sensorPin: 23,
					deactivateDelay: 10000,
					showCountDown: true,
					showDetection: true,
			}
		},
*/

/*		{
    			module: "MMM-Wallpaper",
    			position: "fullscreen_below",
    			config: { 
      				source: "apod",
      				slideInterval: 30 * 1000,
				nasaApiKey: "Dt0FvDgQFoaoh86uuBRvvMEOGnMgA3Ea41JeRUss",
  			}
		},
*/
		{
    			module: "MMM-PiTemp",
    			position: "bottom_bar",
    			config: {
				tempUnit: "C",
				freq: 60000,
				high: 80,
				low: 70,
                                highColor: "red",
				lowColor: "green",
				otherColor: "yellow",
				label: "<i class='fab fa-raspberry-pi'>",
			},
		},

		{
    			module: "MMM-BurnIn",
    			position: "bottom_bar", // whatever, doesn't render anything
    			config: {
       				updateInterval: 15, // in Minutes
       				invertDuration: 2 // in Seconds
    			},
		},
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				dateFormat: "dddd, D MMMM", 
			},
		},

		{
		module: "MMM-OpenmapWeather",
			position: "top_left",	// This can be any of the regions. Best results in left or right regions.
			header: "Current Weather", //Location is the default value if header is empty or not defined.
			config: {
				// See 'Configuration options' for more information.
				location: "Doncaster",
				locationID: "2651123", //Location ID from http://openweathermap.org/help/city_list.txt
				appid: "ef8b663bf7ce6926023a53275e58299a",  //openweathermap.org API key
      				colorIcon: true,
				showFeelsLike: false,
				showWindDirection: false,
				useBeaufort: false,
                                onlyTemp: true,


			}
	        },
		{
    			module: "MMM-MortgageCountdown",
    			position: "top_right",  // Choose your preferred position
    			config: {
        			lastPaymentDate: "2033-01-01",  // Your last mortgage payment date
        			nextSwitchDate: "2027-01-01",    // Set your next switch date
				originalCompletionDate: "2038-08-30", // Original mortgage completion date
    			}
		},

		{
    			module: "MMM-HolidayCountdown",
    			position: "top_right",  // Or wherever you'd like it displayed
    			config: {
        			trips: [
					{ destination: "Mighty Coast Hike", date: "2025-09-14" },
					{ destination: "Galactic Gathering", date: "2025-06-28" },
					{ destination: "Agadir", date: "2026-02-13" },
        			]
    			}
		},

		{
			module: 'MMM-OctoGo',
			position: 'top_center',
			header: '<img src="modules/MMM-OctoGo/public/octobw.jpg" style="width:20px;vertical-align:bottom;"/> Octopus Energy',
			config: {
				elecApiUrl: 'https://api.octopus.energy/v1/electricity-meter-points/2332357784210/meters/21E5218111/consumption/',
				elecExpApiUrl: 'https://api.octopus.energy/v1/electricity-meter-points/2394300187578/meters/21E5218111/consumption/?group_by=day',
				gasApiUrl: 'https://api.octopus.energy/v1/gas-meter-points/2143274303/meters/E6E01890562021/consumption/?group_by=day',
				api_key: 'sk_live_T0mu7YzR4UaYfNN53vZVQ9L9',
				displayDays: 7,

                                vatRate: 0.05,

                                cheapStartTime: "00:30",
                                cheapEndTime: "05:30",
                                cheapElecRate: 0.0850,

				elecMedium: 10,
				elecHigh: 13,
				elecCostKWH: 0.2698,
				elecCostSC: 0.5492,

				elecExpMedium: 3.6613,
				elecExpHigh: 6,
				elecExpCostKWH: 0.15,
				elecExpCostSC: 0,

				gasMedium: 5,
				gasHigh: 10,
				gasCostKWH: 0.0608,
				gasCostSC: 0.2949,

				decimalPlaces: 2,
				showUpdateTime: true,
				updateInterval: 60000*60,
				retryDelay: 5000,
				animationSpeed: 2000,
			}
		},
		{
			module: "calendar",
			header: "Richard",
			position: "bottom_left",
			config: {
				maximumEntries: 6,
				wrapEvents: false,
				maxTitleLength: 25,
				showEnd: false,
				calendars: [
					{
						fetchInterval: 30000,
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/rpettigrew1974%40gmail.com/private-0b7dc7b86d1f3e71e2040faa46dd1f93/basic.ics"
					}
				],
				coloredText: true,
				fade: false,
				customEvents: [
					{keyword: 'Off School', symbol: 'exclamation', color: 'Red'},
                                        {keyword: 'BBQ', symbol: 'burger', color: 'Red'},
					{keyword: 'Birthday', symbol: 'cake-candles', color: 'Gold'},
					{keyword: 'Bletchley', symbol: 'user-secret', color: 'Yellow'},
					{keyword: 'Book Alex School Dinners', symbol: 'exclamation', color: 'Red'},
					{keyword: 'Chimney', symbol: 'house-chimney', color: 'Red'},
					{keyword: 'Dentist', symbol: 'teeth-open', color: 'Red'},
					{keyword: '(DW)', symbol: 'person-hiking', color: 'Yellow'},
					{keyword: '(DR)', symbol: 'person-hiking', color: 'Yellow'},
					{keyword: 'Enigma', symbol: 'fire', color: 'Red'},
					{keyword: 'La Fiesta', symbol: 'martini-glass-citrus', color: 'Green'},
					{keyword: 'Holiday', symbol: 'plane', color: 'Yellow'},
					{keyword: 'Laser', symbol: 'eraser', color: 'Red'},
					{keyword: 'Makerspace', symbol: 'screwdriver-wrench', color: 'Yellow'},
					{keyword: 'Packed Lunch', symbol: 'bread-slice', color: 'Red'},
					{keyword: 'Pay', symbol: 'sterling-sign', color: 'Green'},
					{keyword: 'Parents Evening', symbol: 'hands-holding-child', color: 'Red'},
                    			{keyword: 'Philip', symbol: 'person', color: 'Yellow'},
					{keyword: 'Photo', symbol: 'camera', color: 'Red'},
					{keyword: 'School Meeting', symbol: 'exclamation', color: 'Red'},
					{keyword: 'School Dinners', symbol: 'burger', color: 'Red'},
                                        {keyword: 'TALP', symbol: 'gamepad', color: 'Red'},
					{keyword: 'Spy', symbol: 'user-secret', color: 'Yellow'},
					{keyword: 'V22ARP', symbol: 'car-side', color: 'Blue'},
					{keyword: 'Y3P', symbol: 'person-hiking', color: 'Yellow'},
				],
			}
		},
		{
			module: "calendar",
			header: "Becky",
			position: "bottom_center",
			config: {
				maximumEntries: 6,
				wrapEvents: false,
				maxTitleLength: 25,
				showEnd: false,
				calendars: [
					{
						fetchInterval: 30000,
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/becky.james.rj%40googlemail.com/private-d92f68fbf57c0266ac57f32accf7148c/basic.ics"
					}
				],
				coloredText: true,
				fade: false,
				customEvents: [
					{keyword: 'B14KYP', symbol: 'car-side', color: 'Blue'},
                                        {keyword: 'BBQ', symbol: 'burger', color: 'Red'},
					{keyword: 'Birthday', symbol: 'cake-candles', color: 'Gold'},
					{keyword: 'Black Bin', symbol: 'trash', color: 'Grey'},
					{keyword: 'Blue Bin', symbol: 'trash', color: 'Blue'},
					{keyword: 'Book Alex School Dinners', symbol: 'exclamation', color: 'Red'},
					{keyword: 'Child Benefit', symbol: 'sterling-sign', color: 'Green'},
					{keyword: 'Chimney', symbol: 'house-chimney', color: 'Red'},
					{keyword: 'Dentist', symbol: 'teeth-open', color: 'Red'},
					{keyword: 'Depo', symbol: 'syringe', color: 'Red'},
					{keyword: 'Enigma', symbol: 'fire', color: 'Red'},
					{keyword: 'Exam', color: 'Red'},
					{keyword: 'Holiday', symbol: 'plane', color: 'Yellow'},
					{keyword: 'La Fiesta', symbol: 'martini-glass-citrus', color: 'Green'},
                                        {keyword: 'Makerspace', symbol: 'screwdriver-wrench', color: 'Yellow'},
					{keyword: 'Packed Lunch', symbol: 'bread-slice', color: 'Red'},
					{keyword: 'Pay', symbol: 'sterling-sign', color: 'Green'},
					{keyword: 'Parents Evening', symbol: 'hands-holding-child', color: 'Red'},
					{keyword: 'Photo', symbol: 'camera', color: 'Red'},
					{keyword: 'Placement', symbol: 'user-nurse', color: 'Yellow'},
					{keyword: 'School Meeting', symbol: 'exclamation', color: 'Red'},
					{keyword: 'University', symbol: 'graduation-cap', color: 'Yellow'},
					{keyword: 'Work', symbol: 'user-nurse', color: 'Green'},
                                        {keyword: 'Nights', symbol: 'user-nurse', color: 'Green'},
                                        {keyword: 'Long', symbol: 'user-nurse', color: 'Green'},

				],
			}
		},
		{
            		module: "calendar",
            		header: "Alex",
            		position: "bottom_right",
            		config: {
				maximumEntries: 6,
				wrapEvents: false,
				maxTitleLength: 25,
				showEnd: false,
                		calendars: [
                		{
					fetchInterval: 30000,
                    			symbol: "calendar-check",
                   			url: "https://calendar.google.com/calendar/ical/54b3e08f0c816ef3f147bab3f6a729426e8179626df2f86c1e5d705fe4d518c9%40group.calendar.google.com/private-4c23c0905b38f1ade0b4f0c044589ff3/basic.ics"
                		}
                		],
				coloredText: true,
				fade: false,
				customEvents: [
                                        {keyword: 'BBQ', symbol: 'burger', color: 'Red'},
					{keyword: 'Birthday', symbol: 'cake-candles', color: 'Gold'},
					{keyword: 'Bletchley', symbol: 'user-secret', color: 'Yellow'},
					{keyword: 'Breakfast', symbol: 'bacon', color: 'Green'},
					{keyword: 'Burger', symbol: 'burger', color: 'Green'},
					{keyword: 'Chicken', symbol: 'drumstick-bite', color: 'Green'},
					{keyword: 'Cub', symbol: 'child-reaching', color: 'Yellow'},
					{keyword: 'Dentist', symbol: 'teeth-open', color: 'Red'},
					{keyword: 'Fish', symbol: 'fish', color: 'Green'},
					{keyword: 'Gammon', symbol: 'piggy-bank', color: 'Green'},
					{keyword: 'Holiday', symbol: 'plane', color: 'Yellow'},
					{keyword: 'Hotdog', symbol: 'hotdog', color: 'Green'},
					{keyword: 'Margarita', symbol: 'pizza-slice', color: 'Green'},
					{keyword: 'Packed Lunch', symbol: 'bread-slice', color: 'Red'},
					{keyword: 'Parents Evening', symbol: 'hands-holding-child', color: 'Red'},
					{keyword: 'Philip', symbol: 'person', color: 'Yellow'},
					{keyword: 'Pizza',symbol: 'pizza-slice', color: 'Green'},
					{keyword: 'Photo', symbol: 'camera', color: 'Red'},
					{keyword: 'Quorn', symbol: 'carrot', color: 'Green'},
					{keyword: 'Beef', symbol: 'cow', color: 'Green'},
					{keyword: 'Sausage', symbol: 'hotdog', color: 'Green'},
					{keyword: 'School Meeting', symbol: 'exclamation', color: 'Red'},
					{keyword: 'Scout', symbol: 'child-reaching', color: 'Yellow'},
					{keyword: 'Trip', symbol: 'plane', color: 'Yellow'},
					{keyword: 'Turkey', symbol: 'drumstick-bite', color: 'Green'},
					{keyword: 'Toad', symbol: 'frog', color: 'Green'},
					{keyword: 'Vegan', symbol: 'leaf', color: 'Green'},									],
			}
		}
	]
}
;

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
