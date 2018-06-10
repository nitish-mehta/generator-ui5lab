var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor
		super(args, opts);

		// saves user inputs
		this.answers = {};

		// work half done
		this.log('Allo! \n\n "Well begun is half done"- Aristotle \n');
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
				default: 'FancyText',
			},
			// TODO: Add confirmation step before creation with provided namespace
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
			baseDir: sDir,
			srcCodeDir: `src/${sDir}`,
			libraryNameOnly: sLibNameOnly,
			gitRepository: '',
		};

		this.log('\n\n Buzzing the engines');

		// create library
		this._createTemplateLibrary(oProps);

		// create development setup
		this._createDevelopmentSetup(oProps);

		// install required npm packages
		// TODO

		// copy sandbox html
		this.fs.copyTpl(this.templatePath('demo.html'), this.destinationPath(`test/demo.html`), oProps);
	}

	/**
	 * Copies relevant artifacts for library
	 * @param  {Object} oProps properties used in template
	 */
	_createTemplateLibrary(oProps) {
		// Copy library file
		this.fs.copyTpl(
			this.templatePath('library.js'),
			this.destinationPath(`${oProps.srcCodeDir}/library.js`),
			oProps
		);

		// Copy Control file
		this.fs.copyTpl(
			this.templatePath('Control.js'),
			this.destinationPath(`${oProps.srcCodeDir}/${oProps.controlName}.js`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('ControlRenderer.js'),
			this.destinationPath(`${oProps.srcCodeDir}/${oProps.controlName}Renderer.js`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('Control.js'),
			this.destinationPath(`${oProps.srcCodeDir}/${oProps.controlName}.js`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('.library'),
			this.destinationPath(`${oProps.srcCodeDir}/.library`),
			oProps
		);

		this.fs.copyTpl(
			this.templatePath('themes/**'),
			this.destinationPath(`${oProps.srcCodeDir}/themes`),
			oProps
		);
	}

	/**
	 * Copies all required development artifacts
	 * @param  {Object} oProps properties used in template
	 */
	_createDevelopmentSetup(oProps) {
		this.fs.copyTpl(
			[
				this.templatePath('devresources/**'),
				`!${this.templatePath('devresources/Gruntfile.js')}`,
			],
			this.destinationPath(``),
			oProps,
			{
				globOptions: {
					dot: true,
				},
			}
		);

		// copy dot files
		this.fs.copy(this.templatePath('devresources/.*'), this.destinationPath(``), oProps, {
			globOptions: {
				dot: true,
			},
		});

		this.fs.copyTpl(
			this.templatePath('devresources/Gruntfile.js'),
			this.destinationPath(`Gruntfile.js`),
			oProps,
			{
				interpolate: /<#=([\s\S]+?)#>/g,
			}
		);
	}

	install(){
	    this.installDependencies({
	      npm: false,
	      bower: true,
	      yarn: true
	    });
  	}

	addDocumentation() {
		// this.log('Coming soon: Documentation for next steps & contribution to UI5Lab');
	}
};
