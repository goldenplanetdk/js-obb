/**
 * Manager for boolean values that are stored in browser's local storage as strings
 *
 * @param {string} key A key in localstorage that will be managed
 * @param {*} defaultValue A default value to be set if it is not defined
 * @constructor
 */
obb.fn.LocalStorageBooleanSetting = function(key, defaultValue) {

	/**
	 * Retrieve value from local storage and convert to boolean type
	 *
	 * @returns {boolean} `true` for `'true'` and `1`, in all other cases `false`
	 */
	this.get = function() {
		return localStorage[key] == 'true' || localStorage[key] == 1;
	};

	/**
	 * Store boolean value as `true`/`false` string
	 * @param {*} value
	 */
	this.set = function(value) {
		localStorage[key] = !!value;
	};

	/**
	 * Toggle boolean value
	 * @param {*} value
	 */
	this.toggle = function(value) {
		this.set(!this.get());
	};

	/**
	 * Set value only if it is not `undefined`
	 * @param value
	 */
	this.setDefault = function(value) {
		!this.defined ? this.set(value) : null;
	};

	// Define getters for the local storage key
	Object.defineProperties(this, {

		/**
		 * Getter for the `get` method
		 */
		enabled: {
			get: this.get
		},

		/**
		 * Getter for the `get` method, returns the opposite value
		 */
		disabled: {
			get: function() {
				return !this.enabled;
			}
		},

		/**
		 * Test whether a value is defined
		 */
		defined: {
			get: function() {
				return localStorage[key] !== undefined;
			}
		}
	});

	// A default value to be set if it is not defined
	if (defaultValue !== undefined) {
		this.setDefault(defaultValue);
	}
};

