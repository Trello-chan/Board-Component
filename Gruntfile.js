module.exports = function(grunt) {
  // Load S3 plugin
  grunt.loadNpmTasks('grunt-aws');
  // Static Webserver
  grunt.loadNpmTasks('grunt-contrib-connect');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('.aws.json'),
    s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "<%= aws.bucket %>",
        region: "us-west-1",
        uploadConcurrency: 5,
        downloadConcurrency: 5,
        progress: "progressBar"
      },
      build: {
        cwd: "client/dist/",
        src: "**/*bundle.js"
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: "client/dist/",
          keepalive: true
        }
      }
    }
  });
  // Default task(s).
  grunt.registerTask("default", ["connect"]);

};