# hof2

Taks #3

<br>

When you add a new post, you can add as many images as you like. You just save an image, and crop a new one and save the new on and so on. 

The images just saves in the image property i the party object:

<br>

images: Array[4]
0: Object
id: "Qug7rFQyBMt9YLcAA"
__proto__: Object
1: Object
id: "9n8JMQNuszqpCoZDn"
__proto__: Object
2: Object
id: "QcvNjr7f6qFkd4btg"
__proto__: Object
3: Object
id: "gJTXQuXvBAszTb9RD"
__proto__: Object
length: 4
__proto__: Array[0]

<br>

I simply need to get all images to display in the party-details.ng.html view. 
<br>
You can see that I have tried, but haven't succeeded, and you can just delete this if you want. 

<br>

---------------------------------------------------------------


Task #2

<br>
In the app, when you upload a image to your new post you can choose three different cropps. 

<br>
I need the the dimentions for the choosen crop to be saved in the database: party --> images --> dimentions --> height and width. So if it is the tall rectangle it will save the width: 375, height: 450 to the database. 
<br>


---------------------------------------------------------------


Task #1

First you need to be logged in. <br>
Go to http://localhost:3000/login Username: a@a.a password: aaaaaa <br>
Go to http://localhost:3000/admin which is the dashboard. <br>

This app is gonna be a blog/magazine, and now you can make posts in it. In the code "posts" are refered to as "parties" or "party". I should change this... <br>

The problem to be solved is: <br>

On every post (party) there is a settings button which opens a modal. The modal needs to have the settings for the post. Now its not connected to the unique _id. The posts are called parties in the code.  
If you click on a post, you can edit the settings in the parties details view. I need this to work in the modal. <br>

The files involved are: <br>

admin.ng.html - the view, <br>  admin-party-modal.ng.html - the modal view, <br> adminPartyCtrl.ng.js - the controller --> on line 66 is the modal function.

<br>

!! NBNB !! <br>
There is a file in the meteor packagde folder ( .meteor --> local --> build --> web.browser --> package ) called "correpw_ng-img-crop-full-extended.js". The file has an error, and I fix it, but it writes back to it's original all the time. So if the program is broken and throw this error:  <br>
Error: [$injector:strictdi] function($scope ) is not using explicit annotation and cannot be invoked in strict mode
<br>

Line 2613 must look like this: <br>

        controller: ['$scope', function($scope /*, $attrs, $element*/ ) {                                                        
            $scope.events = new CropPubSub();               
        }],
<br>
If it's not, change it to this. 

