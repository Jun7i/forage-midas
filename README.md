# Midas
Project repo for the JPMC Advanced Software Engineering Forage program

## Description
Your team has been asked to build out the Midas system, a high-profile, 
high-stakes project which is sure to attract the right kind of attention if you can pull it off. 
In other words, doing well on this project would be an excellent career move. 
The Midas system architecture has already been nailed down, and tasking has been distributed to the various members of your team. 
You will be working on Midas Core - the component which receives, validates, and records financial transactions. 
This component depends on quite a few external resources - Kafka to receive new transactions, 
a SQL database to record and validate them, and a REST API to incentivize them. 
Your job over the course of this program will be to integrate all of these disparate resources into the final system.

One of your teammates has already put together a scaffold for the project according to the proposed system architecture. 
They managed to define a few classes, but otherwise, the codebase is quite bare. 
Midas Core uses Spring Boot, which should make the job of integrating external resources far easier than it would be with vanilla Java. Spring Boot - an extension of Spring - provides your application with a robust Dependency Injection framework, and takes care of much of the boilerplate associated with connecting your application to external dependencies. 
Spring Boot adopts a somewhat opinionated view of how your application should communicate with the aforementioned resources, 
but in this case, that’s a good thing - it saves us quite a bit of time wiring everything together. 
Your first task is to get your local development environment set up, 
familiarize yourself with the codebase, 
and make some last-minute preparations before you begin work on the project in earnest.