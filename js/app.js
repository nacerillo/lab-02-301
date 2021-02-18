'use strict';

//TODO: filtering
function hornPic(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  hornPic.allHornPics.push(this);
}
hornPic.allHornPics = [];
let keyarray = [];

hornPic.prototype.renderHorns = function(){
  // When we render with Jquery, we can use templates
  // we can use pre-existing pieces of the page to build similar pieces.
  // console.log(this);
  const li = $('#mustache-template-li').html();
  const mustache_output = Mustache.render(li,this);
  $('ul').append(mustache_output);
  if(!keyarray.includes(this.keyword)){
    keyarray.push(this.keyword);
  }   
};
function generateOptions(){
  $('option:nth-child(n+2)').remove();
  keyarray.forEach(key => {
    var opt = $(`<option value = ${key}>${key}</option>`);
    $('select').append(opt);

  });
}
$.ajax('./Data/page-1.json').then(callback);
function callback(retreivedImages) {
  $('ul').empty();
  hornPic.allHornPics = [];
  keyarray = [];
  retreivedImages.forEach(hornJsonObject => {
    new hornPic(hornJsonObject.title, hornJsonObject.image_url, hornJsonObject.description, hornJsonObject.keyword, hornJsonObject.horns);
  });
  hornPic.allHornPics.forEach(hornPic => hornPic.renderHorns());
  generateOptions();
}

function handleSelection(){
  $('ul').empty();
  console.log($(this).val());
  if ($(this).val() == "default"){
    $.ajax('./Data/page-1.json').then(callback);
  }
  else{
  hornPic.allHornPics.forEach(hornTile => {
    if(hornTile.keyword === $(this).val()){
      console.log(hornTile);
      hornTile.renderHorns();
      }
      else{

       return 0; 
      }
   
  });}

}


function handlePageChange(){
 $('ul').empty();
 if($(this)[0].id === "page-1"){
  $.ajax('./Data/page-1.json').then(callback);
 }
 else if ($(this)[0].id === "page-2"){
  $.ajax('./Data/page-2.json').then(callback);
 }
 else{
   return;
 }
 
}

$('select').on('change',handleSelection);
$('#page-1').on('click',handlePageChange);
$('#page-2').on('click',handlePageChange);

$(document).ready(function() {
  $('input[type=radio]').click(function(){
    console.log(hornPic.allHornPics);
    hornPic.allHornPics.sort((a,b) =>  {
      console.log($(this));
      console.log(a[$(this).val()]);
       if(a[$(this).val()] < b[$(this).val()]){
         return -1;
       }
       else if(a[$(this).val()] > b[$(this).val()]){
         return 1;
       }
       else{
         return 0;
       }
    })
    console.log(hornPic.allHornPics);
    $('ul').empty();
    hornPic.allHornPics.forEach(hornPic => hornPic.renderHorns());
  });
});