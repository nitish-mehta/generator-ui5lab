var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor
		super(args, opts);

		// saves user inputs
		this.answers = {};

		// work half done
		this.log('Yo UI5Lab! \n\n "Well begun is half done"- Aristotle \n');
	}

	/**
	 * 'prompting' priority in the run loop of yeoman generator
	 * Used for taking user inputs for the library being generated.
	 * @return {Promise} promise object created by yeoman during console input.
	 */
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
			}.bind(this)
		);
	}

	/**
	 * 'writing' priority in the run loop of yeoman generator
	 * Used for writing generator specific files ( controllers, etc.)
	 */
	writing() {
		const sLibName = this.answers.libraryName;
		const sLibNameOnly = sLibName.split('.')[sLibName.split('.').length - 1];
		const sControlName = this.answers.controlName;
		const sDir = sLibName.split('.').join('/');
		const oProps = {
			libraryName: sLibName,
			controlName: sControlName,
			dir: sDir,
			libraryNameOnly: sLibNameOnly,
		};

		this.log('\n\n Buzzing the engines');
		// Copy library file
		this.fs.copyTpl(
			this.templatePath('library.js'),
			this.destinationPath(`${sDir}/library.js`),
			oProps
		);

		// Copy Control file
		this.fs.copyTpl(
			this.templatePath('Control.js'),
			this.destinationPath(`${sDir}/${sControlName}.js`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('ControlRenderer.js'),
			this.destinationPath(`${sDir}/${sControlName}Renderer.js`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('Control.js'),
			this.destinationPath(`${sDir}/${sControlName}.js`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('.library'),
			this.destinationPath(`${sDir}/.library`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('themes/**'),
			this.destinationPath(`${sDir}/themes`),
			oProps
		);

		this.fs.copyTpl(this.templatePath('demo.html'), this.destinationPath(`demo.html`), oProps);
	}

	addDocumentation() {
		// this.log('Coming soon: Documentation for next steps & contribution to UI5Lab');
	}
};
