# dhc-studio
[![Build Status](https://travis-ci.org/cul/dlst-studio.svg?branch=master)](https://travis-ci.org/cul/dlst-studio)

### to contribute

1. Clone the repository and change directory into it:
```sh
$ git clone https://github.com/cul/dlst-studio.git
$ cd dlst-studio
```
2. Install the dependencies
```sh
$ bundle install
```
3. Add/edit files
4. Serve the site to view changes
```sh
$ bundle exec jekyll serve
```
5. Add the changes to a new `staging` branch. Pushing (to) this branch will build the site on an s3 staging bucket at [[LINK]()] which will be live for 1hr.
```sh
$ git checkout -b staging
$ git add .
$ git commit -m "YOUR COMMIT"
$ git push --set-upstream origin staging
```
> __Note:__ You can keep adding to the `staging` branch as much as you like, and Travis will keep building to the staging bucket.

6. If everything looks good in the staging bucket and the tests on Travis pass, you can create a pull request to merge `staging` into `master`. If this pull request is successful, Travis will push the compiled Jekyll `_site` files to the `production` s3 bucket as well as a `static` GitHub branch (for backup).
7. Make sure you delete the `staging` branch after the PR is merged to prevent future git conflicts.
