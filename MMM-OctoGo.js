/* MagicMirror
 * Module: MMM-OctoGo
 *
 * Modified for Octopus Go Tariff by Richard Pettigrew
 * Based on the original MMM-OctoMon by Chris Thomas
 * MIT Licensed.
 */

Module.register("MMM-OctoGo", {
	defaults: {
		elecApiUrl: "",
		elecExpApiUrl: "",
		gasApiUrl: "",
		api_key: "",
		updateInterval: 60000 * 60,
		displayDays: 7,
		elecMedium: 10,
		elecHigh: 20,
		elecCostKWH: 0.2698,
		elecCostSC: 0.5492,
		elecExpMedium: 5,
		elecExpHigh: 10,
		elecExpCostKWH: 0.15,
		elecExpCostSC: 0,
		gasMedium: 0.5,
		gasHigh: 1,
		gasCostKWH: 0.0608,
		gasCostSC: 0.2949,
		cheapStartTime: "00:30",
		cheapEndTime: "05:30",
		cheapElecRate: 0.08,
		decimalPlaces: 2,
		showUpdateTime: true,
		retryDelay: 5000,
		animationSpeed: 2000,
		vatRate: 0.05
	},

	start: function () {
		this.elecLoaded = false;
		this.elecExpLoaded = false;
		this.gasLoaded = false;
		this.initialDomRendered = false;

		this.getElecData(2);
		this.getElecExpData(2);
		this.getGasData(2);

		setInterval(() => {
			this.getElecData(2);
			this.getElecExpData(2);
			this.getGasData(2);
		}, this.config.updateInterval);
	},

	checkIfAllLoaded() {
		if (this.elecLoaded && this.elecExpLoaded && this.gasLoaded && !this.initialDomRendered) {
			this.initialDomRendered = true;
			this.updateDom(this.config.animationSpeed);
		}
	},

	getElecData: function (retries) {
		var self = this;
		var hash = btoa(this.config.api_key + ":");
		if (this.config.elecApiUrl) {
			var request = new XMLHttpRequest();
			request.open("GET", this.config.elecApiUrl, true);
			request.setRequestHeader("Authorization", "Basic " + hash);
			request.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					self.processElecData(JSON.parse(this.response));
				} else if (retries > 0) {
					setTimeout(() => self.getElecData(retries - 1), self.config.retryDelay);
				}
			};
			request.send();
		}
	},

	getElecExpData: function (retries) {
		var self = this;
		var hash = btoa(this.config.api_key + ":");
		if (this.config.elecExpApiUrl) {
			var request = new XMLHttpRequest();
			request.open("GET", this.config.elecExpApiUrl, true);
			request.setRequestHeader("Authorization", "Basic " + hash);
			request.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					self.processElecExpData(JSON.parse(this.response));
				} else if (retries > 0) {
					setTimeout(() => self.getElecExpData(retries - 1), self.config.retryDelay);
				}
			};
			request.send();
		}
	},

	getGasData: function (retries) {
		var self = this;
		var hash = btoa(this.config.api_key + ":");
		if (this.config.gasApiUrl) {
			var request = new XMLHttpRequest();
			request.open("GET", this.config.gasApiUrl, true);
			request.setRequestHeader("Authorization", "Basic " + hash);
			request.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					self.processGasData(JSON.parse(this.response));
				} else if (retries > 0) {
					setTimeout(() => self.getGasData(retries - 1), self.config.retryDelay);
				}
			};
			request.send();
		}
	},

	getDom: function () {
		const wrapper = document.createElement("div");
		if (!this.config.api_key) {
			wrapper.innerHTML = "API key missing.";
			return wrapper;
		}

		const table = document.createElement("table");
		table.className = "small";

		const header = document.createElement("tr");
		header.innerHTML = "<td></td><td>Electricity</td><td>Export</td><td>Gas</td>";
		table.appendChild(header);

		const days = this.config.displayDays;
		let dateCursor = new Date();

		for (let d = 0; d < days; d++) {
			const row = document.createElement("tr");
			const day = dateCursor.getDate();
			const month = dateCursor.getMonth();
			const year = dateCursor.getFullYear();
			const dayName = dateCursor.toLocaleDateString(undefined, { weekday: 'short' });
			row.innerHTML = `<td>${dayName} ${dateCursor.toLocaleDateString()}</td>`;

			// Electricity
			let cheap = 0, normal = 0, total = 0;
			if (this.elecDataRequest?.results) {
				this.elecDataRequest.results.forEach(entry => {
					const d = new Date(entry.interval_start);
					if (d.getDate() === day && d.getMonth() === month && d.getFullYear() === year) {
						const kwh = entry.consumption;
						total += kwh;
						if (this._isInCheapPeriod(d)) cheap += kwh;
						else normal += kwh;
					}
				});
			}
			let cost = "£" + this.config.elecCostSC.toFixed(2);
			if (total > 0) {
				cost = cheap * this.config.cheapElecRate + normal * this.config.elecCostKWH + this.config.elecCostSC;
				cost = "£" + cost.toFixed(2);
			}
			let elecColor = "color:white";
			if (total >= this.config.elecMedium) elecColor = "color:orange";
			if (total >= this.config.elecHigh) elecColor = "color:red";
			row.innerHTML += `<td style=\"text-align:right\"><span style=\"${elecColor}\">${total.toFixed(this.config.decimalPlaces)} kWh ${cost}</span></td>`;

			// Export
			let totalExp = 0;
			if (this.elecExpDataRequest?.results) {
				this.elecExpDataRequest.results.forEach(entry => {
					const d = new Date(entry.interval_start);
					if (d.getDate() === day && d.getMonth() === month && d.getFullYear() === year) {
						totalExp += entry.consumption;
					}
				});
			}
			let expColor = "color:white";
			if (totalExp >= this.config.elecExpMedium) expColor = "color:orange";
			if (totalExp >= this.config.elecExpHigh) expColor = "color:green";
			const exportCost = totalExp * this.config.elecExpCostKWH + this.config.elecExpCostSC;
			const exportVal = `<span style=\"${expColor}\">${totalExp.toFixed(this.config.decimalPlaces)} kWh £${exportCost.toFixed(2)}</span>`;
			row.innerHTML += `<td style=\"text-align:right\">${exportVal}</td>`;

			// Gas
			let totalGasKWh = 0;
			if (this.gasDataRequest?.results) {
				this.gasDataRequest.results.forEach(entry => {
					const d = new Date(entry.interval_start);
					if (d.getDate() === day && d.getMonth() === month && d.getFullYear() === year) {
						const m3 = entry.consumption;
						const kWh = m3 * 1.02264 * 39.2 / 3.6;
						totalGasKWh += kWh;
					}
				});
			}
			let gasColor = "color:white";
			if (totalGasKWh >= this.config.gasMedium) gasColor = "color:orange";
			if (totalGasKWh >= this.config.gasHigh) gasColor = "color:red";
			const gasCost = (totalGasKWh * this.config.gasCostKWH + this.config.gasCostSC) * (1 + this.config.vatRate);
			const gasVal = `<span style=\"${gasColor}\">${totalGasKWh.toFixed(this.config.decimalPlaces)} kWh £${gasCost.toFixed(2)}</span>`;
			row.innerHTML += `<td style=\"text-align:right\">${gasVal}</td>`;

			table.appendChild(row);
			dateCursor.setDate(dateCursor.getDate() - 1);
		}

		wrapper.appendChild(table);
		return wrapper;
	},

	_isInCheapPeriod(dateObj) {
		const mins = dateObj.getHours() * 60 + dateObj.getMinutes();
		const [startH, startM] = this.config.cheapStartTime.split(":").map(Number);
		const [endH, endM] = this.config.cheapEndTime.split(":").map(Number);
		const start = startH * 60 + startM;
		const end = endH * 60 + endM;
		if (start < end) return mins >= start && mins < end;
		else return mins >= start || mins < end;
	},

	getHeader() {
		if (this.config.showUpdateTime) return this.data.header + " " + new Date().toLocaleTimeString();
		return this.data.header;
	},

	processElecData(data) {
		this.elecDataRequest = data;
		this.elecLoaded = true;
		this.checkIfAllLoaded();
	},

	processElecExpData(data) {
		this.elecExpDataRequest = data;
		this.elecExpLoaded = true;
		this.checkIfAllLoaded();
	},

	processGasData(data) {
		this.gasDataRequest = data;
		this.gasLoaded = true;
		this.checkIfAllLoaded();
	}
});
