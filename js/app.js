'use strict';

//TODO: filtering
function hornPic(title, image_url, description, keyword) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  hornPic.allHornPics.push(this);
}
hornPic.allHornPics = [];
const keyarray = [];


hornPic.prototype.renderHorns = function(){
  // When we render with Jquery, we can use templates
  // we can use pre-existing pieces of the page to build similar pieces.

  
  const $liCopy = $('#photo-template').clone();

  console.log($liCopy);
  $liCopy.removeAttr('id');
  $liCopy.find('h2').text(this.title);
  $liCopy.find('p').text(this.description);
  $liCopy.find('img').attr('src', this.image_url);


  console.log(this);
  $liCopy.addClass(this.keyword);
  $('ul').append($liCopy);
  if(!keyarray.includes(this.keyword)){
    keyarray.push(this.keyword);
  }
  //$('select').append($opt);
};
function generateOptions(){
  keyarray.forEach(key => {
    var opt = $(`<option value = ${key}>${key}</option>`);
    $('select').append(opt);

  });
}
$.ajax('./Data/page-1.json').then(callback);

function callback(retreivedImages) {
  // console.log(retreivedImages);
  retreivedImages.forEach(hornJsonObject => {
    new hornPic(hornJsonObject.title, hornJsonObject.image_url, hornJsonObject.description, hornJsonObject.keyword);
  });

  hornPic.allHornPics.forEach(hornPic => hornPic.renderHorns());
  generateOptions();
}

$('select').on('click', handleSelection);

function handleSelection(){
  $('ul').empty();
  console.log($(this).val());
  if ($(this).val() == "default"){
    console.log("yes");
    $.ajax('./Data/page-1.json').then(callback);
  }
  else{
  hornPic.allHornPics.forEach(hornTile => {
    if(hornTile.keyword === $(this).val()){
      hornTile.renderHorns();
      }

   
  });}

}

//console.log(keyarray);
$('select').on('change',handleSelection);


