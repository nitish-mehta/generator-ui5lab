var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor
		super(args, opts);

		// work half done
		this.log('Yo UI5Lab! \n\n "Well begun is half done"- Aristotle');
	}

	createComponent() {
		this.log('Coming soon: Code to generate custom UI5 control');
	}

	addDocumentation() {
		this.log('Coming soon: Documentation for next steps & contribution to UI5Lab');
	}
};
