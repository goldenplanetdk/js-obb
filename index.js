var requireContext = require.context('.', true, /^\.\/.*\/.*\.js$/);

// Require scripts from subdirectories
requireContext.keys().map((path) => {
	requireContext(path);
});
