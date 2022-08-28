# MTA Hosting Optimizer

## Description 
Currently, about 35 physical servers host 482 mail transfer agents (MTAs) each having a
dedicated public IP address. To be economical while hosting MTAs as a software engineer I
want to create a service that uncovers the inefficient servers hosting only few active MTAs.

## STEPS TO RUN PROJECT
1. __npm i__
2. __npm run start__

## RUN TEST CASES
1. __npm run build__
2. __npm run test__

## APIs provided
- __*/health-check*__  -> Health check of server
- __*/api/hosting/inefficient-hosting*__ -> Get all inefficient servers hosting
- __*/api/hosting/hosting/add-mock-hostings*__ -> Add mock servers hosting

## Swagger Documentaion 
[http://localhost:9005/api-docs](http://localhost:9005/api-docs)

## Github Actions pipeline
Added manual Github Action workflow.

Steps to run it ->
1. Click on the __Actions__ Tab
2. On left sidebar you will see all workflows, click on Nodejs.CI Workflow
3. In workflows list you will see text - *This workflow has a workflow_dispatch event trigger.* And you will get __Run Workflow__ button. Click on __Run Workflow__ button.

![image](https://user-images.githubusercontent.com/22771900/187082336-2673d7c5-956f-49a4-bad9-65fc00b00288.png)
