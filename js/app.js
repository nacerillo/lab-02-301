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
let keyarray = [];


hornPic.prototype.renderHorns = function(){
  // When we render with Jquery, we can use templates
  // we can use pre-existing pieces of the page to build similar pieces.
  /*const $liCopy = $('#photo-template').clone();

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
  }   */
  //$('select').append($opt);
  console.log(this);
  const li = $('#mustache-template-li').html();
  const mustache_output = Mustache.render(li,this);
  $('ul').append(mustache_output);
  if(!keyarray.includes(this.keyword)){
    keyarray.push(this.keyword);
  }   
  //$('select').append($opt);
};
function generateOptions(){
  $('option:nth-child(n+2)').remove();
  keyarray.forEach(key => {
    var opt = $(`<option value = ${key}>${key}</option>`);
    $('select').append(opt);

  });
}
$.ajax('./Data/page-1.json').then(callback);
//$.ajax('./Data/page-2.json').then(callback);
function callback(retreivedImages) {
  // console.log(retreivedImages);
  $('ul').empty();
  hornPic.allHornPics = [];
  keyarray = [];
  retreivedImages.forEach(hornJsonObject => {
    new hornPic(hornJsonObject.title, hornJsonObject.image_url, hornJsonObject.description, hornJsonObject.keyword);
  });

  hornPic.allHornPics.forEach(hornPic => hornPic.renderHorns());
  generateOptions();
}

//$('select').on('click', handleSelection);

function handleSelection(){
  $('ul').empty();
  console.log($(this).val());
  if ($(this).val() == "default"){
  //  console.log("yes");
    $.ajax('./Data/page-1.json').then(callback);
  }
  else{
  hornPic.allHornPics.forEach(hornTile => {
    if(hornTile.keyword === $(this).val()){
      console.log(hornTile);
      hornTile.renderHorns();
      
     // console.log("this worked");
      }
      else{
       // console.log("nope",hornTile.keyword,$(this).val() );
       return 0; 
      }
   
  });}

}


function handlePageChange(){
 //console.log( $(this)[0].id)
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

//console.log(keyarray);
$('select').on('change',handleSelection);

//Pages listener
$('#page-1').on('click',handlePageChange);
$('#page-2').on('click',handlePageChange);



