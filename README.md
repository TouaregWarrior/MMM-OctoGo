# MMM-OctoGo

"Octopus Go Monitor", displays:
'Octopus Go' Electric Import and daily charge - supports the overnight cheap rate window and rest of the day at standard rate - Shows kWh and daily £ (inc. Standing Charge)
Total 'Solar Export' in KwH and daily £ earned.
Octopus Gas Import - Fixed daily rate, shows kWh and daily £ (inc. Standing Charge)

Uses the published API calls from Octopus Agile API. 

## Example

![screenshot](screenshot.jpg)

## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* An electricity and/or gas supply account with Octopus Energy and a smart electricity meter

## Installation

1. Clone this repo into `~/MagicMirror/modules` directory, to create `~/MagicMirror/modules/MMM-OctoGo`.

```
	cd ~/MagicMirror/modules
	git clone https://github.com/TouaregWarrior/MMM-OctoGo
```

1. Add OctoGo configuration into `~/MagicMirror/config/config.js`:

```
	{
		module: 'MMM-OctoGo',
		position: 'bottom_right',
		header: '<img src="modules/MMM-OctoGo/public/octobw.jpg" style="width:20px;vertical-align:bottom;"/> Octopus Energy',
		config: {
				elecApiUrl: 'https://api.octopus.energy/v1/electricity-meter-points/[ELECTRIC-MPAN]/meters/[METER_SERIAL]/consumption/',
				elecExpApiUrl: 'https://api.octopus.energy/v1/electricity-meter-points/[ELECTRIC-MPAN]/meters/[METER_SERIAL]/consumption/?group_by=day',
				gasApiUrl: 'https://api.octopus.energy/v1/gas-meter-points/[GAS-MPRN]/meters/[GAS-SERIAL]/consumption/?group_by=day',
				api_key: '[YOUR-API-KEY]',
				displayDays: 7,

	                vatRate: 0.05,

        	        cheapStartTime: "00:30",
                	cheapEndTime: "05:30",
	                cheapElecRate: 0.0850,

			elecMedium: 10,
			elecHigh: 20,
			elecCostKWH: 0.1372,
			elecCostSC: 0.25,

			gasMedium: 5,
			gasHigh: 6,
			gasCostKWH: 0.0331,
			gasCostSC: 0.168,				

			decimalPlaces: 1,
			showUpdateTime: true,
			updateInterval: 60000*60,
			retryDelay: 5000,
			animationSpeed: 2000,
		}
	},
```

1. Obtain your API key from the Octopus Energy website, by signing into your account, then click 'Menu' -> 'My Account' -> 'Personal Details' -> 'API Access'. This page will also provide you with the electricity meter's MPAN and Serial numbers, and the gas meter's MPRN and Serial numbers, which need to be replaced above.

## Configuration options

The following config.js properties can be configured.

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| 'header' | 'octobw.jpg' | other graphics available in the 'public' directory, or just remove it |
| 'displayDays' | '7' | The number of days of historical energy usage to display |
| 'vatRate' | '0.05' | Goverment fuel VAT rate |
| 'cheapStartTime' | ' "00:30"' | Cheap Electric rate start time |
| 'cheapEndTime' | ' "05:30"' |  Cheap Electric rate end time  |
| 'cheapElecRate' | ' 0.0850' | Cost per kWh in pounds |
| 'elecMedium' | '10' | kWh values over this amount will be displayed in Orange |
| 'elecHigh' | '20' | kWh values over this amount will be displayed in Red |
| 'elecCostKWH' | '0.1372' | cost per kWh in pounds, or zero to hide display |
| 'elecCostSC' | '0.25' | daily standing charge in pounds |
| 'gasMedium' | '5' | kWh values over this amount will be displayed in Orange |
| 'gasHigh' | '6' | kWh values over this amount will be displayed in Red |
| 'gasCostKWH' | '0.0331' | cost per kWh in pounds, or zero to hide display |
| 'gasCostSC' | '0.168' | daily standing charge in pounds |
| 'decimalPlaces' | '1' | round all kWh values to this number of decimal places |
| 'showUpdateTime' | 'true' | true or false, to display the time the energy usage figures were last updated |
| 'updateInterval' | '60000\*60' | delay between refresing energy usage via the API, in milliseconds (1 hour, or 60 * 60 seconds) |
| 'retryDelay' | '5000' | delay between failing to get a valid result from the API and trying again in milliseconds (5 seconds) |
| 'animationSpeed' | '2000' | fade in/out speed in milliseconds (2 seconds) |

## Additional customisation

## Note

## Disclaimer

It's completely unofficial, but it is using the Octopus Energy (https://developer.octopus.energy) publicly available customer API. Supplied AS-IS. No warranties expressed or implied. 
It works on my machine!
