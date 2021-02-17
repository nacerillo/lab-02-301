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

  //1. copy an existing element
  const $liCopy = $('#photo-template').clone();
  //const $opt = $('#def').clone();
  console.log($liCopy);
  $liCopy.removeAttr('id');
  $liCopy.find('h2').text(this.title);
  $liCopy.find('p').text(this.description);
  $liCopy.find('img').attr('src', this.image_url);

  //$opt.find('option').attr('value',this.keyword);
  //$opt.find('option').text(this.keyword);
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
//  === 
  hornPic.allHornPics.forEach(hornPic => hornPic.renderHorns());
  generateOptions();
}

$('select').on('click', handleSelection);

function handleSelection(){
  $('ul').empty();
  hornPic.allHornPics.forEach(hornTile => {
    if(hornTile.keyword === $(this).val()){
      hornTile.renderHorns();
    }
  });
  //do sh*t with the selected item 
}

console.log(keyarray);

// $('button:nth-of-type(1)').on('click', handleClickingOnOdieButton);
// $('button:nth-of-type(2)').on('click', handleClickingOnCliffordButton);
$('select').on('change',handleSelection);


// function handleClickingOnOdieButton(){
//   // Hide and show way: hide all and then show some : HTML focused
//   $('li').hide();
//   // $('li:first-child').show();
//   //find the one that contains 'Odie'
//   $('li:contains(Odie)').show();
// }

// function handleClickingOnCliffordButton(){
//   //  TODO: find the object with name clifford: JS/DATA focused
//   //delete and then rerender
//   $('ul').empty();
//   hornPic.allHornPics.forEach(dogPic => {
//     if(dogPic.name === 'Clifford'){
//       dogPic.renderHorns();
//     }
//   });
// }