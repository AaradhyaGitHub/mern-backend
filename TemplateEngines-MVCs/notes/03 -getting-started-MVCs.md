MVCs is simply separation of concerns 

Models: Objects or part of code responsible for representating data 
      : Represent data in the code
      : Work with data - save and fetch data 


Views: Resposible for what the user sees in the end. Rendering the right content
     : What the users see 
     : Decoupled from the application code 
     : Have light integration with data in the templating engine

Controllers: Connection point between models and views 
           : Views doesn't care about data, Models do care about data so Controllers are the middleman 
           : Contains the in between logic 
           : Routes fits into this as well. Routes define the path, method, controller to execute 

App built on express rely heavily on middleware function and Controllers are split across middleware functions 
Logic might be separated and moved around to middleware functions. 