# Books

This project was created with the followings commands

```bash

rails new booksapp

rails generate scaffold Books title:string author:string description:text score:integer
```

## How to run

1. Install ruby 3.2.2 and rails
	🐳 [dockerimage](https://github.com/ecureuill/docker-development-enviroment)
1. Install sqlite3 
	`apt install sqlite3`
1. Clone this repository
	`git clone https://github.com/ecureuill/dio-ruby-developer.git`
1. Move to the project folder
	`cd desafios/005`
1. Install gems
	`bundle install --gemfile Gemfile`
1. Run database migrations
	`rails db:migration` 
1. If you are running dock container, uncomment `# bind "tcp://CONTAINER_IP_ADDRESS"` in `/desafios/005/config/puma.rb` and replace CONTAINER_IP_ADDRESS
1. Start server
	`rails s`
