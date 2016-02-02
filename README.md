# hof2

Task #1

First you need to be logged in. 
Go to http://localhost:3000/login Username: a@a.a password: aaaaaa
Go to http://localhost:3000/admin which is the dashboard. 

The problem to be solved is: 

On every post there is a settings button which opens a modal. The modal needs to have the settings for the post. Now its not connected to the unique _id. The posts are called parties in the code.  
If you click on a post, you can edit the settings in the parties details view. I need this to work in the modal. 

The files involved are:

admin.ng.html - the view,  
admin-party-modal.ng.html - the modal view, 
adminPartyCtrl.ng.js - the controller --> on line 66 is the modal function.
