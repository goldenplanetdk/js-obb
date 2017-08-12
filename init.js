/**
 * Legacy modules initializer
 *
 * @typedef {Object}   GPP                       One of these: obb (Legacy) | gppb (Backend) | gppf (Frontend)
 * @property {Object}  gpp.fn                    Generic functions in global namespace
 * @property {Object}  gpp.constants             Publicly available constants
 * @property {Array}   gpp.disabledModules       Modules that must not be initialized
 * @property {boolean} gpp.jsServerLoggerEnabled Whether nelmio logger is enabled
 * @property {Object}  gpp.components            Components in Frontend
 * @property {Object}  gpp.modules               Modules in Backend
 */
(function(/** GPP */ gpp, _, $) {

	_.merge(gpp.fn, {

		/**
		 * GPP JavaScript modules initializer
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

					if (_(gpp.disabledModules).includes(modulePath)) {
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
						$(document).trigger('gppInitialized.' + modulePath);
						module.initialized = true;
					}
				}
				else {
					var message = 'module "' + modulePath + '" is not available';

					gpp.constants.IS_DEV_MODE
						? console.error(message)
						: (gpp.jsServerLoggerEnabled ? log(message) : null);
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

			if (_.get(gpp, modulePath + '.initialized')) {
				callback();
			} else {
				$(document).on('gppInitialized.' + modulePath, callback);
			}
		},
	});

})(window.obb || window.gppb || window.gppf, _, $);
