#!/usr/bin/env node

var chalk = require('chalk');
var program = require('commander');
var packageJson = require('../package.json');
var openAPIToTS = require('../dist');

program
  .version(packageJson.version, '-v, --version', 'Output the package version number.')
  .description(packageJson.description)
  .requiredOption('-i, --input <input>', 'Convert specified OpenAPI 3.0 specification file to TypeScript types.')
  .requiredOption('-o, --output <output>', 'Specify the output file the TypeScript types should be written to.')
  .option(
    '--githubToken <token>',
    'Attach a GitHub personal access token to the request if fetching the input remotely.'
  )
  .option('--prefixWithI', 'Append the letter `I` as a prefix to all interface names.')
  .option('--isYaml', 'The file is of type .yaml (although it does not have an extension).')
  .action(async (options) => {
    try {
      /** Fetch the file and convert it to JSON. */
      const specFile = await openAPIToTS.getOpenAPISpecAsJSON(options.input, options.githubToken, options.isYaml);

      /** Convert the OpenAPI 3.0 Spec to TypeScript types. */
      const types = openAPIToTS.convertOpenAPIToTS(specFile, options);
      /** Write the file to the file system. */
      types.map((x) => openAPIToTS.writeTypesToLocalFile(options.output, x.name + '.ts', x.interface));

      /** Inform the user about the success. */
      /** TODO */
      console.log(
        chalk.green(
          `Successfully created the types at: ${options.output}
          ⚠⚠ La salida aun contiene algunos errores !! ⚠⚠
          🚮Los ficheros que ya estaban en la carpeta no se borrarán automáticamente para evitar perdidas de datos.`
        )
      );
    } catch (error) {
      /** Inform the user about any errors thrown. */
      console.log(chalk.red(error));
      process.exit(1);
    }
    process.exit(0);
  });

program.parse(process.argv);
