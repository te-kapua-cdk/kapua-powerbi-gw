const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Andrew Frazer',
  authorAddress: 'andrew.frazer@raindancers.cloud',
  cdkVersion: '2.60.0',
  defaultReleaseBranch: 'main',
  name: 'kapua-powerbi-gw',
  repositoryUrl: 'https://github.com/te-kapua-cdk/kapua-powerbi-gw',
  description: 'Opinionated Construct to build powerBi Gateway',
  majorVersion: 1,
  keywords: [
    'Microsoft Power BI',
    'Gateway',
  ],
  license: 'Apache-2.0',
  publishToPypi: {
    distName: 'kapua-cdk.kapua-powerbi',
    module: 'PowerBi',
  },
});

project.synth();