# hof2

Task #1

First you need to be logged in. <br>
Go to http://localhost:3000/login Username: a@a.a password: aaaaaa <br>
Go to http://localhost:3000/admin which is the dashboard. <br>

This app is gonna be a blog/magazine, and now you can make posts in it. In the code "posts" are refered to as "parties" or "party". I should change this... <br>

The problem to be solved is: <br>

On every post (party) there is a settings button which opens a modal. The modal needs to have the settings for the post. Now its not connected to the unique _id. The posts are called parties in the code.  
If you click on a post, you can edit the settings in the parties details view. I need this to work in the modal. <br>

The files involved are: <br>

admin.ng.html - the view, <br>  
admin-party-modal.ng.html - the modal view, <br>
adminPartyCtrl.ng.js - the controller --> on line 66 is the modal function. <br>
