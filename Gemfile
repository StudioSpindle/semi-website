source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

gem 'jekyll-toc'
gem "jekyll", ">= 3.8.5"
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem 'bundle'
gem 'rake'
gem 'concurrent-ruby', '~> 1.1.5'
gem 'jekyll-redirect-from'

# This is the default theme for new Jekyll sites. You may change this to anything you like.
# gem "minima", "~> 2.0"

# If you have any plugins, put them here!
group :jekyll_plugins do
	gem 'jekyll-sitemap'
	gem 'jekyll-redirect-from'
	gem 'html-proofer'
end

group :jekyll_optional_dependencies do
	platform :ruby, :mswin, :mingw, :x64_mingw do
		gem "rdiscount", "~> 2.0"
	end
end
