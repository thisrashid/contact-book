# contact-book

* Develop a suite of CRUD APIs for a contact book app - done
* Each contact should have a unique email address - done
* APIs should support adding/editing/deleting contacts - done
* Allow searching by name and email address - done
* Search should support pagination and should return 10 items by default per invocation - done
* Add unit tests and Integration tests for each functionality. - done
* Add basic authentication for the app. Use environment variables or basic auth(for rest APIs)
* The code should scale out for millions of contacts per contact book - done

# Installation steps

* System requirement: nodejs >=10.15.3
* clone the git repo: `git clone https://github.com/thisrashid/contact-book.git`
* go inside of the project directory: `cd contact-book`
* install dependencies: `npm install`
* set env variables `PORT` and `DATABASE`. `PORT` is where the http server listens and `DATABASE` is the URL of mongodb
* to start local mongodb server: `docker-compose up`. It will start mongodb listening on the port 27017 without and username or password
* to start local dev server: `npm run serve`. It will start the server at port 8080 (if no `PORT` defined). Port may be configured by setting env variable `PORT`
* create, update and delete requires basic authorization header. View and search are public. As of now username password is hard coded as username: plivo, password: dontknow
* Endpoints:
  * GET /contacts : to search
  * POST /contacts : to create contact
  * GET /contacts/:id : to view contact by id
  * PUT /contacts/:id : to update contact by id
  * DELETE /contacts/:id : to delete contact by id
  * payload for POST & PUT : `{
	"name": "Rashid Azar",
	"email": "rashidazar@azar.com",
	"address": "bangalore karnataka"
}`

Sample search query: `http://localhost:8080/contacts?field=email&keyword=@azar&limit=10&page=2&sortby=name`.
