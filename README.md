# saturn

Follow the below instructions to get the application running on local.
This has to be done after all the Pre-Requisites have been completed

This lists steps for asp.net core - Release Candidate 1 and angular 2 -beta  using the Visual Studio Editor
 Go to the cmd prompt where the project.json is 
 Execute the following commands
 dnu restore
 npm install 
 gulp build.lib
 
 Note: When developing open a command prompt (where the project.json is) and execute the following task
 npm run tsc
 This task will look for changes in the .ts file and create/modify the associated .js file
 
 A separate set of instructions will be provides for Asp.net core Release Candidate 2
