# dhc-studio

### to contribute

1. clone the repository and change directory into it:
```sh
$ git clone https://github.com/cul/dhc-studio.git
$ cd dhc-studio
```
2. install the dependencies
```sh
$ bundle install
```
3. add/edit files
4. serve the site to view changes
```sh
$ bundle exec jekyll serve
```
5. add the changes to the `staging` branch
```sh
$ git checkout -b staging
$ git add .
$ git commit -m "YOUR COMMIT"
$ git push
```
6. look at the staging s3 bucket at [[LINK]()]. it will be live for 1hr.
7. if everything looks good and the tests pass, create a pull request to merge `staging` into `master`. If the PR is successful, travis will push the compiled Jekyll `_site` files to the `static` branch and to the `prod` s3 bucket.
8. delete the `staging` branch after the PR is merged.
