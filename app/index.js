var Generator = require("yeoman-generator");
var yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor
    super(args, opts);

    // saves user inputs
    this.answers = {};

    // work half done
    this.log(yosay('Allo! \n\n "Well begun is half done"- Aristotle \n'));
  }

  /**
   * 'prompting' priority in the run loop of yeoman generator
   * Used for taking user inputs for the library being generated.
   * @return {Promise} promise object created by yeoman during console input.
   */
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "libraryName",
        message: "Your library name",
        default: "ui5lab.mylibrary"
      },
      {
        type: "input",
        name: "controlName",
        message: "Your control name",
        default: "FancyText"
      }
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
    const sLibNameOnly = sLibName.split(".")[sLibName.split(".").length - 1];
    const sControlName = this.answers.controlName;
    const sDir = sLibName.split(".").join("/");
    const oProps = {
      libraryName: sLibName,
      controlName: sControlName,
      baseDir: sDir,
      srcCodeDir: `src/${sDir}`,
      libraryNameOnly: sLibNameOnly,
      gitRepository: "" // TODO: Obtain from user
    };

    this.log("\n\n Buzzing the engines");

    // create library
    this._createTemplateLibrary(oProps);

    // create development setup
    this._createDevelopmentSetup(oProps);

    // copy sandbox html
    this.fs.copyTpl(
      this.templatePath("demo.html"),
      this.destinationPath(`test/demo.html`),
      oProps
    );
  }

  /**
   * Copies relevant artifacts for library
   * @param  {Object} oProps properties used in template
   */
  _createTemplateLibrary(oProps) {
    // Copy library file
    this.fs.copyTpl(
      this.templatePath("library.js"),
      this.destinationPath(`${oProps.srcCodeDir}/library.js`),
      oProps
    );

    // Copy Control file
    this.fs.copyTpl(
      this.templatePath("Control.js"),
      this.destinationPath(`${oProps.srcCodeDir}/${oProps.controlName}.js`),
      oProps
    );

    this.fs.copyTpl(
      this.templatePath("ControlRenderer.js"),
      this.destinationPath(
        `${oProps.srcCodeDir}/${oProps.controlName}Renderer.js`
      ),
      oProps
    );

    this.fs.copyTpl(
      this.templatePath("Control.js"),
      this.destinationPath(`${oProps.srcCodeDir}/${oProps.controlName}.js`),
      oProps
    );

    this.fs.copyTpl(
      this.templatePath(".library"),
      this.destinationPath(`${oProps.srcCodeDir}/.library`),
      oProps
    );

    this.fs.copyTpl(
      this.templatePath("themes/**"),
      this.destinationPath(`${oProps.srcCodeDir}/themes`),
      oProps
    );

    this.fs.copyTpl(
      this.templatePath("devresources/package.json"),
      this.destinationPath(`package.json`),
      oProps
    );

    this.fs.copyTpl(
      this.templatePath("devresources/ui5.yaml"),
      this.destinationPath(`ui5.yaml`),
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
        this.templatePath("devresources/**"),
        `!${this.templatePath("devresources/package.json")}`,
        `!${this.templatePath("devresources/ui5.yaml")}`
      ],
      this.destinationPath(``),
      oProps,
      {
        globOptions: {
          dot: true
        }
      }
    );

    // copy dot files
    this.fs.copy(
      this.templatePath("devresources/.*"),
      this.destinationPath(``),
      oProps,
      {
        globOptions: {
          dot: true
        }
      }
    );

    // Copy prepare.js
    this.fs.copyTpl(
      this.templatePath("prepare.js"),
      this.destinationPath(`prepare.js`),
      oProps,
      {
        interpolate: /<#=([\s\S]+?)#>/g
      }
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      yarn: false,
      bower: false
    });
  }
};
