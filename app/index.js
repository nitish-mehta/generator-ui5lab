var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor
		super(args, opts);

		this.answers = {};

		// work half done
		this.log('Yo UI5Lab! \n\n "Well begun is half done"- Aristotle \n');
	}

	prompting() {
		return this.prompt([
			{
				type: 'input',
				name: 'libraryName',
				message: 'Your library name',
				default: 'ui5lab',
			},
			{
				type: 'input',
				name: 'controlName',
				message: 'Your control name',
			},
		]).then(
			function(answers) {
				this.answers = answers;
				this.log(answers);
			}.bind(this)
		);
	}

	writing() {
		const sLibName = this.answers.libraryName;
		const sControlName = this.answers.controlName;
		const sDir = sLibName.split('.').join('/');

		this.log('\n\n Buzzing the engines');
		// Copy library file
		this.fs.copyTpl(
			this.templatePath('library.js'),
			this.destinationPath(`${sDir}/library.js`),
			{
				libraryName: sLibName,
				controlName: sControlName,
			}
		);

		// Copy Control file
		this.fs.copyTpl(
			this.templatePath('Control.js'),
			this.destinationPath(`${sDir}/${sControlName}.js`),
			{
				libraryName: sLibName,
				controlName: sControlName,
			}
		);

		this.fs.copyTpl(
			this.templatePath('ControlRenderer.js'),
			this.destinationPath(`${sDir}/${sControlName}Renderer.js`),
			{
				libraryName: sLibName,
				controlName: sControlName,
			}
		);

		this.fs.copyTpl(
			this.templatePath('Control.js'),
			this.destinationPath(`${sDir}/${sControlName}.js`),
			{
				libraryName: sLibName,
				controlName: sControlName,
			}
		);

		this.fs.copyTpl(this.templatePath('demo.html'), this.destinationPath(`demo.html`), {
			libraryName: sLibName,
			controlName: sControlName,
		});
	}

	createComponent() {
		this.log('Coming soon: Code to generate custom UI5 control');
	}

	addDocumentation() {
		// this.log('Coming soon: Documentation for next steps & contribution to UI5Lab');
	}
};
