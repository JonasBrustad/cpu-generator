'use strict';
const path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
const Generator = require('yeoman-generator');
const totalQ = 2;

class CpuGenerator extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    end() {
        this.log("\nGenerator done!");
    }

    initializing() {
        this.log(yosay(
            'Welcome to ' + chalk.red('generator-cpu') + '. A demo generator dor CPU!'
        ));
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: '(1/' + totalQ + ') What is the name of the application, including uppercase letters?',
        },{
            type: 'input',
            name: 'version',
            message: '(2/' + totalQ + ') What is the next version?',
            default: '1.0.0-SNAPSHOT'
        }]).then((answers) => {
            this.answers = answers;
        });
    }

    writing() {
        this.log('Creating files...');
        this.fs.copyTpl(
            this.templatePath('pom.xml'),
            this.destinationPath(this.answers.name + '/pom.xml'),
            {name: this.answers.name,
            version: this.answers.version}
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/no/ciber/Application.java'),
            this.destinationPath(this.answers.name + '/src/main/java/no/ciber/' + this.answers.name + '/Application.java'),
            {name: this.answers.name}
        );
    }
}

module.exports = CpuGenerator;