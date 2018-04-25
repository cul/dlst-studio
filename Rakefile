require 'html-proofer'
require 'rake'
include FileUtils

desc 'run htmlproofer, rspec if exists'
task :test do
  opts = {
    :check_external_hash => true,
    :allow_hash_href => true,
    :disable_external => true,
    :empty_alt_ignore => true,
    :only_4xx => true,
    :verbose => true
  }
  HTMLProofer.check_directory('./_site', opts).run
  sh 'bundle exec rspec' if File.exist?('.rspec')
end


namespace :push do
  desc 'push built site to s3 branch'
  task :branch do
    if ENV['CI']
      BRANCH = ENV['TRAVIS_BRANCH']
      if BRANCH == 'production' or 'staging'
        REPO_SLUG = ENV['TRAVIS_REPO_SLUG']
        USER = REPO_SLUG.split('/')[0]
        TOKEN = ENV['ACCESS_TOKEN']
        COMMIT_MSG = "Site updated via #{ENV['TRAVIS_COMMIT']}".freeze
        ORIGIN = "https://#{USER}:#{TOKEN}@github.com/#{REPO_SLUG}.git".freeze
        puts "Deploying to #{BRANCH}_site from Travis as #{USER}"

        Dir.mktmpdir do |tmp|
          cp_r '_site/.', tmp
          Dir.chdir tmp
          system 'git init'
          system "git add . && git commit -m '#{COMMIT_MSG}'"
          system "git remote add origin #{ORIGIN}"
          system "git push origin master:refs/heads/#{BRANCH}_site --force"
        end
      end
    end
  end
end
