contador = 0; // Variable global para tener poder poner un id unico a cada elemento cuando se clona.
var clase;
function start(e) {
  e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
  e.dataTransfer.setData("Data", e.target.id); // Coje el elemento que se va a mover
  e.dataTransfer.setDragImage(e.target, 0, 0); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
  e.target.style.opacity = '0.4';
}

function end(e){
  e.target.style.opacity = ''; // Pone la opacidad del elemento a 1
  e.dataTransfer.clearData("Data");
}

function enter(e) {
  e.target.style.border = '3px dotted #555';
}

function leave(e) {
  e.target.style.border = '';
}

function over(e) {
  var elemArrastrable = e.dataTransfer.getData("Data"); // Elemento arrastrado
    //id=e.target.id
  clase = e.target.className; // id del Elemento sobre el que se arrastra
 console.log(clase);
  //return false para que se pueda soltar

  /*if (id === 'contpizarra'){
    return false; // En la pizarra se puede soltar cualquier
  }*/
  if (clase == 'item item-text-wrap panelbody paneles '){

    return false; // En el panel  se puede soltar cualquier elemento menos el elemento
  }

  if (clase == 'columnas ng-scope layout-column'){

    return false; // En el panel  se puede soltar cualquier elemento menos el elemento
  }
if (clase == 'columnas'){

    return false; // En el panel  se puede soltar cualquier elemento menos el elemento
  }
}


/**
 *
 * Mueve el elemento
 *
 **/
function drop(e){

  var elementoArrastrado = e.dataTransfer.getData("Data"); // Elemento arrastrado
  var id= $('#'+elementoArrastrado).attr('id');

  console.log('id elemto arrastro :' +id);
  e.target.appendChild(document.getElementById(id));

  e.target.style.border = '';  // Quita el borde
  tamContX = $('#'+e.target.id).width();
  tamContY = $('#'+e.target.id).height();

  tamElemX = $('#'+elementoArrastrado).width();
  tamElemY = $('#'+elementoArrastrado).height();

  posXCont = $('#'+e.target.id).position().left;
  posYCont = $('#'+e.target.id).position().top;

  // Posicion absoluta del raton
  x = e.layerX;
  y = e.layerY;

  // Si parte del elemento que se quiere mover se queda fuera se cambia las coordenadas para que no sea asi
  if (posXCont + tamContX <= x + tamElemX){
    x = posXCont + tamContX - tamElemX;
  }

  if (posYCont + tamContY <= y + tamElemY){
    y = posYCont + tamContY - tamElemY;
  }
 if(clase==='columnas ng-scope layout-column'){
   document.getElementById(elementoArrastrado).style.position = "inherit";

 }else{
  document.getElementById(elementoArrastrado).style.position = "absolute";
  document.getElementById(elementoArrastrado).style.left = x + "px";
  document.getElementById(elementoArrastrado).style.top = y + "px";
 }
}
