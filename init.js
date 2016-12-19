/**
 * Initialize collections
 *
 * {object} obb.components Component modules
 * {object} obb.constants  Constants
 * {object} obb.data       Variable data
 * {object} obb.fn         Helper functions
 * {object} obb.modules    Modules (deprecated, use `components` namespace for new modules)
 */
window.obb = window.obb || {};

_.defaults(obb, {
	components: {},
	constants: {},
	data: {},
	fn: {},
});

(function(obb, _, $) {

	_.merge(obb.fn, {

		/**
		 * OBB JavaScript modules initializer
		 *
		 * @param modules
		 */
		init: function(modules) {

			if (!_.isArray(modules)) {
				modules = [modules]
			}

			modules.forEach(function(modulePath) {

				var module = _.get(window, modulePath);

				if (module) {
					module.initialized = false;

					if (_(obb.disabledModules).includes(modulePath)) {
						module.disabled = true;
						return;
					}

					$(document).trigger('initialize.' + modulePath);

					var initialized = false;

					if (typeof module.init == 'function') {
						module.init();
						initialized = true;
					} else if (typeof module == 'function') {
						module();
						initialized = true;
					}

					if (initialized) {
						$(document).trigger('obbInitialized.' + modulePath);
						module.initialized = true;
					}
				}
				else {
					var message = 'module "' + modulePath + '" is not available';

					obb.constants.IS_DEV_MODE
						? console.error(message)
						: (obb.jsServerLoggerEnabled ? log(message) : null);
				}
			});
		},

		/**
		 * Invoke a function only after specific module is already initialized
		 *
		 * Useful in modules where some code depends on other module availability
		 *
		 * @param {string} modulePath
		 * @param {Function} callback Code that will run only after the specified module is initialized
		 */
		initAfter: function(modulePath, callback) {

			if (_.get(obb, modulePath + '.initialized')) {
				callback();
			} else {
				$(document).on('obbInitialized.' + modulePath, callback);
			}
		},
	});

})(obb, _, $);
