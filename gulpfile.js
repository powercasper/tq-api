var gulp = require('gulp');
var db = require('./db/dynamoDB');
gulp.task('default', ['createTable', 'deleteTable', 'taskThree']);

gulp.task('createTable', function() {
  console.log('creating Table');
  db.dbCreateTable();
});

gulp.task('deleteTable', function() {
  console.log('deleting Table');
  db.dbDeleteTable();
});

gulp.task('taskThree', function() {
  console.log('taskThree');
});
