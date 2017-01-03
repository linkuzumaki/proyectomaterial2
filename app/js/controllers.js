var contador = 0;
var alignvalor="";
var imgsave
angular.module('app.controllers', [])
    .controller('mainController', function ($scope) {
            $scope.message = 'Hola, Mundo!';
        })
    .controller('sideNavController', function ($scope, $mdSidenav) {
            $scope.openLeftMenu = function () {
                $mdSidenav('left').toggle();
            };
            $scope.openRightMenu = function () {
                $mdSidenav('right').toggle();
            };
        })
    .controller('EventoElementCtrl', ['$scope', '$compile', function ($scope, $compile) {
                $scope.eliminar = function () {
                    var id = event.target.id;
                    var idpadre = ($('#' + id).parent().attr('id'));
                    console.log('id del elemento a borrar : ' + idpadre);
                    var idhijo = $('#' + idpadre).children('.element').attr("id");
                    console.log('id del elemento a borrar : ' + idhijo);
                    var myEl = angular.element(document.querySelector('#' + idpadre));
                    myEl.remove();

                };
                $scope.crear = function () {
                    var id = event.target.id;// obtengo la id elemento del bar
                    var abuelo = $('#' + id).parent().attr("id");
                    var abueloclon = document.getElementById(abuelo); // id elemento
                    var copyabuelo = $(abueloclon).clone(true);//se crea un clon  del elemento
                    //se edita los atributos de objeto  clonado
                    $(copyabuelo).attr("id", "ElemClonadoab" + contador);
                    $(copyabuelo).children('.element').attr("id", "parrafoab" + contador);
                    $(copyabuelo).children('.panelbody').attr('id', "panelbody" + contador);
                    $(copyabuelo).children('.delete-button').attr("id", "eliminarab" + contador);
                    $(copyabuelo).children('.crear-button').attr("id", "crearab" + contador);
                    $(copyabuelo).children('.editar-button').attr("id", "editarab" + contador);

                    $('#contpizarra').append($compile(copyabuelo)($scope));

                    contador++;
                };

            }])
    .controller('grillaCtrl',['$scope', function ($scope) {

       var nc=8,nf =6,n=0,i= 1;
        //creando la grilla
        while (n < nc) {
            var idcol = "col" + n;

            var row='<div layout="row" style="padding: 0px" class="ng-scope layout-row" id="' + idcol + '"></div>';
            $('#contpizarra').append(row);

            for (i; i <= nf; i++) {
                var idrow = "fila" + i;
                var col='<div layout="column" class="columnas ng-scope layout-column" id="' + idrow + i + n + '"></div>';
                $('#'+idcol).append(col);
            }
            n++;
            i = 1;
        }
       /* var row_general='<div layout="row" style="padding: 0px" class="ng-scope layout-row" id="row_g"></div>'
        $('#contpizarra').append(row_general);
        while (n < nc) {
            var idrow = "row" + n;
            var idcolmg="row_col"+n;
            var rows='<div flex class="ng-scope layout-row" id="' + idrow + '"></div>'
            var columnas='<div layout="column" id="' + idcolmg + '"></div>'
            $('#row_g').append(rows);
            $('#'+idrow).append(columnas);
            for (i; i <= nf; i++) {
                var idcol = "fila" + i;
                var columnas_div='<div flex class="columnas ng-scope layout-column" id="' + idcol + i + n + '" ></div>'
                $('#'+idcolmg).append(columnas_div);
            }
            n++;
            i = 1;
        }*/
    }])
    .controller('ModalCtrl',["$scope","storageLista","ngDialog","$compile","fileReader","$mdToast","dbelemento" ,function ($scope,storageLista,ngDialog,$compile,fileReader,$mdToast,dbelemento) {

                $scope.clickToOpen = function () {
                    idelemento = event.target.id;
                    $scope.dialog= ngDialog.open({
                        class:'ngdialog-theme-default',
                        template: 'templates/modal.html',
                        width: '50%',
                        height: '100%',
                        controller: 'modaldatosCtrl',
                        scope: $scope
                    });
                };
                $scope.verlista=function(index) {
                    var idelemento = event.target.id;
                    var padre = $('#' + idelemento).parent().attr("id");
                    $scope.lista = storageLista.listadatos(padre)
                    $scope.listan=$scope.lista;
                    console.log($scope.listan)
                }
                $scope.leerarchivo=function(){
                    fileReader.readAsDataUrl($scope.file,$scope).then(function(result){
                        $scope.srcimagen=result;
                        imgsave=$scope.srcimagen
                    })
                }
                $scope.agregardatos=function () {
                    var id=$scope.elemento.select.id
                    if ($scope.nuevodato != null)
                        $scope.datos.push({texto: $scope.nuevodato});
                        storageLista.guardarlista($scope.datos,id);
                    $scope.nuevodato = null;
                    $scope.lista=storageLista.listadatos($scope.elemento.select.id)
                    $scope.listaelegida=$scope.lista[0];

                }
                $scope.consola=function(persona,index) {
                   console.log(persona);
                   console.log(index);
                }
                $scope.eliminarlista=function(index) {
                    storageLista.removelista(index,$scope.lista)
                }

                //cambia los valores de los elementos de la pizarra

                $scope.editarboton=function (padre) {
                    var id=$scope.elemento.boton.id;
                    var idh = document.getElementById(id);
                    var abuelo = $('#' + idelemento).parent().attr("id");
                    var idp = document.getElementById(abuelo);
                    console.log('id del boton : '+abuelo)

                    console.log($scope.anchoelement.width)
                    console.log($scope.altoelement.height)

                    idp.style.width=  $scope.anchoelement.width;
                    idp.style.height= $scope.altoelement.height;
                    idh.style.backgroundColor= $scope.textConfig.colorfondo;
                    idh.style.color=$scope.textConfig.textcolor
                    idh.style.fontSize=$scope.font_size.opcion+'px';
                    $('#' +id).val($scope.nomb_elementobtn);
                    $scope.CurrentDate = new Date();
                    var hoy = new Date();
                    var fecha =hoy.getDate()
                    var idformulario='form130121610',nombformulario='form1',
                        dateform= $scope.CurrentDate ,idelement=abuelo;


                }
                $scope.editartexto=function(padre) {
                    var abuelo = $('#' + padre).parent().attr("id");
                    var padreid=document.getElementById(padre);
                    var abueloid=document.getElementById(abuelo);
                    var id=$scope.elemento.textbox.id;
                    var hijoid = document.getElementById(id);
                    var posicion=  $scope.posicion.opcion;
                    $('#' + id).text($scope.nomb_elemento);

                    $(padreid).attr('class',$scope.anchoelegido.opcion.clase)
                    hijoid.style.color= $scope.textConfig.textcolor;
                    hijoid.style.fontFamily= $scope.familiaelegida.name;
                    hijoid.style.backgroundColor= $scope.textConfig.colorfondo;
                    abueloid.style.width= $scope.largoelemento.width;
                    $scope.posiciontext( posicion, padre);
                    $scope.element=document.getElementById(abuelo).innerHTML
                }
                $scope.editarparrafo=function(padre){

                    var id=$scope.elemento.parrafo.id;
                    var hijoid = document.getElementById(id);
                    var padreid = document.getElementById(padre);
                    $('#' + id).text($scope.modal.nomb_elemento);
                    hijoid.style.color=$scope.textConfig.textcolor;
                    hijoid.style.fontSize=$scope.font_size.opcion+'px';
                    hijoid.style.textAlign= $scope.font_align;
                    hijoid.style.fontWeight=$scope.font_weight
                    hijoid.style.fontStyle=$scope.font_style
                    hijoid.style.fontFamily=  $scope.familiaelegida.name;
                    padreid.style.width='230px';
                    padreid.style.height='0px';
                    padreid.style.backgroundColor= $scope.textConfig.textfondo;
                    padreid.style.wordWrap='break-word'

                }
                $scope.editarcheck=function (padre) {

                    idh1=$('#' + padre).children('.check').attr('id');
                    abu=$('#' + padre).parent().attr('id');
                    idh2=$('#' + padre).children('.textocheck').attr('id');
                    var padreid=document.getElementById(padre);
                    var abuid=document.getElementById(abu);
                    var hijoid = document.getElementById(idh1);
                    var hijoid2 = document.getElementById(idh2);
                    var posicion=  $scope.posicion.opcion;
                    console.log(padreid)
                   $(padreid).attr('class',$scope.anchoelegido.opcion.clase)
                    abuid.style.width= $scope.largoelemento.width;
                    hijoid.style.backgroundColor=  $scope.textConfig.colorfondo;
                    $scope.posiciontext( posicion, padre);
                }
                $scope.editarimg=function (padre) {
                    var abuelo = $('#' + padre).parent().attr("id");
                    var idh1=$('#' + padre).children('.thumb').attr('id');
                    var abueloid=document.getElementById(abuelo);
                    var hijoid = document.getElementById(idh1);
                    var padreid = document.getElementById(padre);

                    if($scope.formaimmagen.opcion==="true"){

                        hijoid.style.borderTopLeftRadius='0% 0%';
                        hijoid.style.borderTopRightRadius='0% 0%';
                        hijoid.style.borderBottomLeftRadius='0% 0%';
                        hijoid.style.borderBottomRightRadius='0% 0%';
                        padreid.style.backgroundColor='rgba(255, 255, 255, 0.88)';
                        padreid.style.border='border: 1px solid #ddd;';

                    }
                    if($scope.formaimmagen.opcion==="false"){
                        //$('#'+idh1).attr('class','circular--square')

                        hijoid.style.borderTopLeftRadius='50% 50%';
                        hijoid.style.borderTopRightRadius='50% 50%';
                        hijoid.style.borderBottomLeftRadius='50% 50%';
                        hijoid.style.borderBottomRightRadius='50% 50%';
                        padreid.style.backgroundColor='rgba(255, 255, 255, 0)';
                        padreid.style.border='0px !important';

                    }

                    hijoid.src= imgsave;
                    abueloid.style.width=  $scope.anchoelement.width;
                    abueloid.style.height= $scope.altoelement.height;

                }
                $scope.editarselect=function(padre){
                    var abuelo = $('#' + padre).parent().attr("id");
                    var padreid=document.getElementById(padre);
                    var abueloid=document.getElementById(abuelo);
                    console.log($scope.largoelemento.width);
                    var id=$scope.elemento.select.idtitulo;
                    console.log(id)
                    console.log($scope.formulario.form)

                    var copy = $($scope.elementohtml).clone(true);
                    $('#ejemplomain').append(copy);
                    var idtitulo=document.getElementById(id);
                    $('#' + id).text($scope.tituloselect);
                    abueloid.style.width= $scope.largoelemento.width;
                    idtitulo.style.color= $scope.textConfig.textcolor;
                    idtitulo.style.fontFamily=$scope.familiaelegida.name
                }
                $scope.editararea=function(padre){
                    var padreid=document.getElementById(padre);
                    var id=$scope.elemento.textarea.idtitulo;
                    $('#' + id).text($scope.nomb_elemento);
                    var idtitulo=document.getElementById(id);
                    padreid.style.width=$scope.largoelemento.width
                    idtitulo.style.color= $scope.textConfig.textcolor;
                }
                //funciones de edicion de textos
                $scope.alignjustificar=function(){
                    $scope.font_align='justify'
                }
                $scope.aligncentrar=function(){
                    $scope.font_align='center'
                }
                $scope.alignderecha=function(){
                    $scope.font_align='right'
                }
                $scope.alignizquierda=function(){
                    $scope.font_align='left'
                }
                $scope.negritatexto=function(){
                    if( $scope.font_weight==='bold'){
                        $scope.font_weight='normal'
                    }else{
                        $scope.font_weight='bold'
                    }
                }
                $scope.cursivatexto=function(){
                    if(  $scope.font_style==='oblique'){
                        $scope.font_style='normal'
                    }else{
                        $scope.font_style='oblique'
                    }
                }
                //funcion de posicion de texbox y check
                $scope.posiciontext=function(posicion,id){
                    if(posicion==='derecha'){
                        $($('#' + id).children('.textotitulo')).before($('#' + id).children('.texto')); //derecha
                        $($('#' + id).children('.check')).before($('#' + id).children('.textocheck')); //derecha
                    }else if(posicion==='izquierda'){
                        $($('#' + id).children('.texto')).before($('#' + id).children('.textotitulo'));//izquierda
                        $($('#' + id).children('.textocheck')).before($('#' + id).children('.check')); //izquierda
                    }
                }

                //guardar los cambios
                $scope.guardarelemento = function (e) {
                    var abuelo = $('#' + idelemento).parent().attr("id");
                    var classabuelo = $('#' + idelemento).parent().attr("class");
                    var padre = $('#' + abuelo).children().attr('id');
                    console.log($('#'+padre).children('.thumb').attr("class"))

                    //texto
                    if ($('#' + padre).children('.texto').attr("class") === 'form-control texto') {
                        $scope.editartexto(padre);
                    }
                    //imagen
                    if ($('#' + padre).attr("class") === 'thumbnail element') {
                        console.log('save img')
                        $scope.editarimg(padre);
                    }
                    //boton
                    if ($('#' + abuelo).attr("class") === 'element boton grid ng-scope') {
                       var padre= $('#' + abuelo).children('.element').attr("id");
                        console.log(padre);
                        $scope.editarboton(abuelo);
                    }
                    //parrafo
                    if ($('#' + padre).children('.element').attr("class") === 'lead element') {
                        $scope.editarparrafo(padre);
                        alignvalor="";
                    }
                    //panel
                    if ($('#' + padre).attr("class") === 'panelP card grid _md') {


                        var hijo=$('#'+padre).children('.panelbody').attr('id')
                        console.log( 'n'+hijo);
                        nc = $('#columnas').val();
                        nf = $('#filas').val();
                        n = 0;
                        i = 1;
                        var idcol = "colpanel" + hijo;
                        //creando la grilla
                        while (n < nc) {
                            var idrow = "filapanel" + hijo + n;
                             var row='<div layout="row" style="padding: 0px" class="ng-scope layout-row" id="' + idrow + '"></div>';
                            $('#'+hijo).append(row);

                            for (i; i <= nf; i++) {

                                var col='<div layout="column" class="columnas ng-scope layout-column" id="' + idcol + i + n + '"></div>';
                                $('#'+idrow).append(col);
                            }
                            console.log('padre panel :' + hijo);
                            n++;
                            i = 1;
                        }
                    }
                    //check
                    if ($('#' + padre).children('.check').attr("class") === 'input-group-addon check' ){

                        $scope.editarcheck(padre);
                        }
                        //select
                    if($('#' + padre).attr("class") === 'form-group element selectP ng-scope'){
                        $scope.editarselect(padre);
                    }
                    if($('#' + padre).attr("class")==='form-group element areap'){
                        $scope.editararea(padre);
                    }
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Elemento Modificado Con Exito')
                            .hideDelay(1000)
                            .position('top right')
                    );
                    ngDialog.closeAll();

                };
            }])
    .controller('modaldatosCtrl',["$scope","$compile","fileReader","storageLista",function ($scope,$compile,fileReader,storageLista) {

            var abuelo = $('#' + idelemento).parent().attr("id");
            var classabu=$('#'+abuelo).attr("class")
            var padre = $('#' + abuelo).children().attr('id');


            //cambio id del hijo texto
            $('#'+padre).children('.textotitulo').attr('id','titulotxto'+padre);
            //cambio id hijo parrafo
            $('#'+padre).children('.element').attr('id','textoparrafo'+padre);
            //cambio id hijo check
            $('#' + padre).children('.check').attr('id','check'+padre);
            $('#' + padre).children('.textocheck').attr('id','check hermano'+padre);
            //cambio id panel
            console.log(abuelo)
            $('#'+padre).children('.panelbody').attr('id',"panelb" + contador);
            //cambio id img
            $('#'+padre).children('.thumb').attr('id',"imagen" + contador);
            var idh1=$('#'+padre).children('.textotitulo').attr('id');
            //cambio id select
            $('#'+padre).children('.selecthijo').attr('id',"select" + contador);
            $('#'+padre).children('.textoselect').attr('id',"selecttexto" + contador);
            //cambio id al area
            $('#'+padre).children('.tituloarea').attr('id',"areatitulo" + contador);
            $('#'+padre).children('.areacuadro').attr('id',"cuadroarea" + contador);

            $scope.ancho = {
                opcion: null,
            }
            $scope.largo = {
                opcion: null,
            }
            $scope.posicion = {
                opcion: 'izquierda'
            }
            $scope.fonts = {
                opcion: null,
            };
            $scope.size ={
                opcion:null,
            };
            $scope.textConfig = {
                optionsf:{
                    label: "color fuente",
                    icon: "brush",
                    default: "#000000",
                    genericPalette: false,
                    materialPalette:false,
                    history: false
                },
                optionsb:{
                    label: "color fondo",
                    icon: "brush",
                    default: "rgb(205, 205, 205)",
                    genericPalette: false,
                    materialPalette:false,
                    history: false
                },
                optionsborder:{
                    label: "color borde",
                    icon: "brush",
                }
            };
            $scope.anchoElemento = {
                opcion: null,
            }
            $scope.altoElemento = {
                opcion: null,
            }
            $scope.texto={};
            $scope.modal={
                textConfig :{}
            }
            $scope.font_size={
                opcion:null,
            }
            $scope.fontfamilia = [
                { id: 1, name: 'Arial' },
                { id: 2, name: 'Arial Black' },
                { id: 3, name: 'Courier New' },
                { id: 4, name: 'Georgia' },
                { id: 5, name: 'Comic Sans MS' },
                { id: 6, name: 'Impact' },
                { id: 7, name: 'Times New Roman' },
                { id: 8, name: 'Trebuchet MS' },
                { id: 9, name: 'Verdana' }
            ];
            $scope.widthbuton=[
                {id:1,width:'50px'},
                {id:2,width:'100px'},
                {id:3,width:'150px'},
                {id:4,width:'200px'},
                {id:5,width:'250px'},
                {id:6,width:'300px'},
                {id:7,width:'350px'},
                {id:8,width:'400px'},
            ]
            $scope.heightbuton=[
                {id:1,height:'50px'},
                {id:2,height:'100px'},
                {id:3,height:'150px'},
                {id:4,height:'200px'},
            ]
            $scope.anchotexto=[
                {id:1,name:'grande', clase:'input-group input-group-lg'},
                {id:2,name:'pequeño',clase:"input-group input-group-sm"},
                {id:3,name:'normal',clase:"input-group element"},
            ]
            $scope.widthcheck=[
                {id:1,width:'150px'},
                {id:2,width:'200px'},
                {id:3,width:'250px'},
                {id:4,width:'300px'},
                {id:5,width:'350px'}
            ]
            $scope.datos = [];
            $scope.elementossave=[];
            $scope.lista=[]
            $scope.listamain=[];

            $scope.formaimg= [
                {title: 'cuadrado',value:'true',name:"cuadrado"},
                {title: 'circular',value:'false',name:"circular"}
            ];

            $scope.formaimmagen={
                opcion:null,
            }
            $scope.anchoelegido={opcion:{}}
            $scope.value={ancho:null}

            // textbox
            if ($('#' + padre).children('.texto').attr("class") === 'form-control texto') {
                $scope.elemento={
                    textbox:{}
                }
                $scope.verattrtexto = 'true';
                $scope.elemento.textbox.idpadre=$('#' + padre).attr('id');
                $scope.elemento.textbox.id=$('#' + idh1).attr('id');
                $scope.elemento.textbox.texttitulo=$('#' + idh1).text();
                $scope.elemento.textbox.color=$('#' + idh1).css('color')
                $scope.elemento.textbox.color_fondo=$('#' + idh1).css('background-color');
                $scope.elemento.textbox.font_size=$('#' + idh1).css('font-size');
                $scope.elemento.textbox.font_family=$('#' + idh1).css('font-family');
                $scope.elemento.textbox.clase=$('#' + padre).attr('class');
                $scope.fontfamilia.push({id:10,name: $scope.elemento.textbox.font_family});
                $scope.familiaelegida=$scope.fontfamilia[9];
                $scope.elemento.textbox.widthcheck=$('#' + padre).css('width');
                $scope.widthcheck.push({id:6,width:  $scope.elemento.textbox.widthcheck});
                $scope.largoelemento=$scope.widthcheck[5];

                $scope.nomb_elemento=$scope.elemento.textbox.texttitulo;
                $scope.textConfig.textcolor=$scope.elemento.textbox.color;
                $scope.textConfig.colorfondo= $scope.elemento.textbox.color_fondo;
                $scope.textConfig.font_size=$scope.elemento.textbox.font_size;
                $scope.textConfig.idpadre=$scope.elemento.textbox.idpadre;

                if(  $scope.elemento.textbox.clase==='input-group element'){
                    $scope.anchoelegido.opcion =$scope.anchotexto[2]
                }else if( $scope.elemento.textbox.clase==='input-group input-group-lg'){
                    $scope.anchoelegido.opcion =$scope.anchotexto[0]
                }else if( $scope.elemento.textbox.clase==='input-group input-group-sm'){
                    $scope.anchoelegido.opcion =$scope.anchotexto[1]
                }
               // $scope.anchotext(ancho,padre);
                $scope.cambio = function () {
                    $scope.nomb_elemento;
                    $scope.textConfig.font_size
                    $scope.textConfig.textcolor
                    $scope.textConfig.colorfondo
                    $scope.familiaelegida
                    $scope.largoelemento
                    $scope.posicion.opcion
                    $scope.textConfig.idpadre
                    $scope.anchoelegido.opcion
                    $('#ejemplotexbox').attr('class',$scope.anchoelegido.opcion.clase)
                    $scope.posiciontext( $scope.posicion.opcion,'ejemplotexbox');
                }
            }
            //panel
            if ($('#' + padre).attr("class") === 'panelP card grid _md') {
                $scope.verattrpanel='true';
            }
            //boton
            if ($('#'+abuelo).attr("class") === 'element boton grid ng-scope'){

                $scope.elemento={boton:{}};
                $scope.verattrboton = 'true';
                $scope.elemento.boton.id=$('#' + padre).attr('id');
                $scope.elemento.boton.valor=$('#' + padre).val();
                $scope.elemento.boton.color=$('#' + padre).css('color')
                $scope.elemento.boton.font_size=$('#' + padre).css('font-size');
                $scope.elemento.boton.color_fondo=$('#' + padre).css('background-color');

                $scope.elemento.boton.widthbton=$('#' + padre).css('width');
                $scope.elemento.boton.heightbton=$('#' + padre).css('height');

                $scope.widthbuton.push({id:9,width: $scope.elemento.boton.widthbton});
                $scope.anchoelement=$scope.widthbuton[8];

                $scope.heightbuton.push({id:5,height: $scope.elemento.boton.heightbton});
                $scope.altoelement=$scope.heightbuton[4];

                $scope.textConfig.textcolor= $scope.elemento.boton.color;
                $scope.textConfig.colorfondo= $scope.elemento.boton.color_fondo;
                $scope.nomb_elementobtn=  $scope.elemento.boton.valor;
                var str =$scope.elemento.boton.font_size;
                var fontsize = str.split("px");
                $scope.font_size.opcion= fontsize[0];

                $scope.cambio = function () {
                    $scope.anchoelement
                    $scope.altoelement
                    $scope.font_size.opcion
                    $scope.textConfig.colorfondo
                    $scope.textConfig.textcolor
                }
            }
            //check
            if ($('#' + padre).children('.check').attr("class") === 'input-group-addon check'){

                idh1=$('#' + padre).children('.check').attr('id');
                idh2=$('#' + padre).children('.textocheck').attr('id');
                console.log('id hermano : '+idh2)
                $scope.verattrcheck = 'true';
                $scope.elemento={
                    check:{}
                }

                $scope.elemento.check.id= $('#' + idh1).attr('id');
                $scope.elemento.check.color_fondo=$('#' + idh1).css('background-color');
                $scope.elemento.check.color_borde=$('#' + idh1).css('border-color');
                $scope.elemento.check.clase=$('#' + padre).attr('class');
                $scope.elemento.check.widthcheck=$('#' + padre).css('width');
                console.log( $scope.elemento.check.clase)
                $scope.widthcheck.push({id:6,width:  $scope.elemento.check.widthcheck});
                $scope.largoelemento=$scope.widthcheck[5];

                if(  $scope.elemento.check.clase==='input-group element'){
                    $scope.anchoelegido.opcion =$scope.anchotexto[2]
                }else if( $scope.elemento.check.clase==='input-group input-group-lg'){
                    $scope.anchoelegido.opcion =$scope.anchotexto[0]
                }else if( $scope.elemento.check.clase==='input-group input-group-sm'){
                    $scope.anchoelegido.opcion =$scope.anchotexto[1]
                }

                $scope.textConfig.colorfondo= $scope.elemento.check.color_fondo;
                $scope.textConfig.colorborde= $scope.elemento.check.color_borde;
                $scope.posicion.opcion

                $scope.clickradio=function(){
                    console.log('hola radio')
                }
                $scope.cambio = function () {
                    $scope.textConfig.colorborde
                    $scope.textConfig.colorfondo
                    $scope.posicion.opcion
                    $scope.anchoelegido
                    $scope.largoelemento
                    $scope.anchoelegido.opcion
                    $('#checkelemento').attr('class',$scope.anchoelegido.opcion.clase)
                    $scope.posiciontext( $scope.posicion.opcion,'checkelemento');

                }
            }
            //parrafo
            if ($('#'+padre).attr("class") === 'input-group element parrafoPH layout-padding _md flex'){
                var idh1=$('#' + padre).children('.element').attr('id');
                var idpadre=$('#'+padre).attr('id');
                $scope.elemento={parrafo:{}};
                $scope.verattrparrafo = 'true';

                $scope.elemento.parrafo.color_fondo=$('#'+idpadre).css('background-color');
                $scope.elemento.parrafo.id=$('#' + idh1).attr('id');
                $scope.elemento.parrafo.valor=$('#' + idh1).text();
                $scope.elemento.parrafo.color=$('#' + idh1).css('color')
                $scope.elemento.parrafo.font_size=$('#' + idh1).css('font-size');
                $scope.elemento.parrafo.font_family=$('#' + idh1).css('font-family');
                $scope.elemento.parrafo.fontalinear=$('#' + idh1).css('text-align');
                $scope.elemento.parrafo.negrita=$('#' + idh1).css('font-weight');
                $scope.elemento.parrafo.cursiva=$('#' + idh1).css('font-style');

                $scope.modal.nomb_elemento=$scope.elemento.parrafo.valor;
                $scope.textConfig.textcolor= $scope.elemento.parrafo.color;
                $scope.textConfig.textfondo=$scope.elemento.parrafo.color_fondo
                $scope.fontfamilia.push({id:10,name:$scope.elemento.parrafo.font_family});
                $scope.familiaelegida=$scope.fontfamilia[9];
                $scope.font_align= $scope.elemento.parrafo.fontalinear;
                $scope.font_weight=$scope.elemento.parrafo.negrita;
                $scope.font_style=$scope.elemento.parrafo.cursiva;
                var str =$scope.elemento.parrafo.font_size;
                var fontsize = str.split("px");
                console.log(fontsize);
                console.log($scope.font_align);
                $scope.font_size.opcion= fontsize[0];

                $scope.cambio = function () {
                    $scope.fonts.opcion;
                    $scope.textConfig.textcolor;
                    $scope.textConfig.textfondo
                    $scope.font_size.opcion
                    $scope.modal.nomb_elemento
                    $scope.familiaelegida
                }
            }
            //img
            if ($('#' + padre).attr("class") === 'thumbnail element') {
                var idh1=$('#' + padre).children('.thumb').attr('id');
                var abuelo = $('#' + padre).parent().attr("id");
                $scope.verattrimg='true';
                $scope.elemento={imagen:{}};

                $scope.elemento.imagen.id=$('#' + idh1).attr('id');
                $scope.elemento.imagen.widthbton=$('#' + abuelo).css('width');
                $scope.elemento.imagen.heightbton=$('#' + abuelo).css('height');

                $scope.formaimmagen.opcion=$scope.formaimg.name;

                var img = document.getElementById($scope.elemento.imagen.id);
                $scope.elemento.imagen.recurso=img.src;
                $scope.srcimagen= $scope.elemento.imagen.recurso;

                $scope.widthbuton.push({id:9,width: $scope.elemento.imagen.widthbton});
                $scope.anchoelement=$scope.widthbuton[8];

                $scope.heightbuton.push({id:5,height: $scope.elemento.imagen.heightbton});
                $scope.altoelement=$scope.heightbuton[4];


                $scope.cambio = function () {
                    $scope.anchoelement
                    $scope.altoelement
                    $scope.imageSrc
                    $scope.formaimmagen

                    if($scope.formaimmagen.opcion==="true"){
                        console.log('cuadrado')
                        $('#imgcuadrado').attr('style','display:show')
                        $('#imgcircular').attr('style','display:none')
                    }
                    if($scope.formaimmagen.opcion==="false"){
                        console.log('circulo')
                        $('#imgcuadrado').attr('style','display:none')
                        $('#imgcircular').attr('style','display:show')
                    }

                }
            }
            //select
            if ($('#' + padre).attr("class") === 'form-group element selectP ng-scope'){
                $scope.verattrselect='true';
                $scope.elemento={select:{}}

                $scope.formulario= {
                    form: {
                        elementos_form:[{}]
                    }
                }

                var idh1=$('#'+padre).children('.selecthijo').attr('id');
                var idh2=$('#'+padre).children('.textoselect').attr('id');
                $scope.elementohtml=document.getElementById(abuelo);
                $scope.html=$(abuelo).attr('id')
                $scope.elemento.select.id=$('#' + padre).attr('id');
                $scope.elemento.select.idtitulo=$('#' + idh2).attr('id')
                $scope.elemento.select.widthcheck=$('#' + abuelo).css('width');
                $scope.elemento.select.texttitulo=$('#' + idh2).text();
                $scope.elemento.select.font_family=$('#' + idh2).css('font-family');
                $scope.elemento.select.color=$('#' + idh2).css('color');
                $scope.widthcheck.push({id:6,width:  $scope.elemento.select.widthcheck});
                $scope.largoelemento=$scope.widthcheck[5];
                $scope.tituloselect=$scope.elemento.select.texttitulo;
                $scope.lista=storageLista.listadatos($scope.elemento.select.id);
                $scope.elemento.select.idvisualselect=$('#sel1').attr('id');
                $scope.textConfig.textcolor= $scope.elemento.select.color;
                $scope.fontfamilia.push({id:10,name:$scope.elemento.select.font_family});
                $scope.familiaelegida=$scope.fontfamilia[9];
                $scope.formulario.form.nombre="formulario1"
                $scope.formulario.form.tipoform="minero";
                $scope.formulario.form.elementos_form=$scope.elementohtml;


                $scope.cambio = function () {
                    $scope.textConfig.textcolor
                    $scope.elemento.select.idtitulo
                    $scope.lista
                    $scope.largoelemento
                    $scope.familiaelegida
                }
            }
            // text area
            if($('#' + padre).attr("class")==='form-group element areap'){
                $scope.verattrarea='true';
                $scope.elemento={textarea:{}}
                var idh2=$('#'+padre).children('.tituloarea').attr('id');
                $scope.elemento.textarea.id=$('#'+padre).attr('id');
                $scope.elemento.textarea.idtitulo=$('#'+idh2).attr('id')
                $scope.elemento.textarea.texttitulo=$('#' + idh2).text();
                $scope.elemento.textarea.color=$('#' + idh2).css('color')
                $scope.elemento.textarea.widthcheck=$('#' + padre).css('width');

                $scope.textConfig.textcolor=$scope.elemento.textarea.color;
                $scope.widthcheck.push({id:6,width:  $scope.elemento.textarea.widthcheck});
                $scope.largoelemento=$scope.widthcheck[5];

                $scope.nomb_elemento=$scope.elemento.textarea.texttitulo;
                $scope.cambio = function () {
                    $scope.nomb_elemento
                    $scope.largoelemento
                    $scope.textConfig.textcolor
                }
            }
    }])
    .controller('UploadController',["$scope","fileReader",function ($scope, fileReader) {
        $scope.readFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;

                });

        };
    }])
    .controller('enviarCtrl',function ($scope, $http,$mdToast) {

        $scope.registardatos = function() {
            $http.post('/ejemplo',({nombre:$scope.nombre, apellido:$scope.apellido}))
                .then(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('dato guardado')
                            .hideDelay(1000)
                            .position('top right')
                    );
                    $scope.nombre="",
                    $scope.apellido=""
                })
                .catch(function(err){
                    console.log('Error: ' + err);
                })
        };

        $scope.obtnertodosdatos=function(){

            $http.get('/ejemplo')
                .then(function (data) {
                    console.log(data)
                })
                .catch(function (err) {
                    console.log('Error: ' + err);
                })

        }
    })
    .controller('OpenModalCtrl',['$scope','ngDialog',function($scope,ngDialog){
            $scope.abrirModal=function() {
            id_elemento = document.getElementById(event.target.id);
            $scope.dialog = ngDialog.open({
                class: 'ngdialog-theme-default',
                template: 'templates/modal.html',
                width: '50%',
                height: '100%',
                controller: 'EdicionElementosCtrl',
                scope: $scope
            });
        }
            $scope.posiciontext=function(posicion,id){
                if(posicion==='derecha'){
                    $($('#' + id).children('.textotitulo')).before($('#' + id).children('.texto')); //derecha
                    $($('#' + id).children('.check')).before($('#' + id).children('.textocheck')); //derecha
                }else if(posicion==='izquierda'){
                    $($('#' + id).children('.texto')).before($('#' + id).children('.textotitulo'));//izquierda
                    $($('#' + id).children('.textocheck')).before($('#' + id).children('.check')); //izquierda
                }
            }

            //modifica los atributos segun lo escrito en el modal

            $scope.texbox=function(){
                $($scope.modal_elementos.idtitulo).text($scope.modal_elementos.nomb_elemento);
                idabuelo    =   $scope.modal_elementos.idabuelo;
                idtitulo    =   $scope.modal_elementos.idtitulo;
                id          =   $($scope.modal_elementos.idpadre).attr('id');
                idtitulo.style.color            =   $scope.modal_elementos.textConfig.textcolor;
                idtitulo.style.fontFamily       =   $scope.modal_elementos.familiaelegida.name;
                idtitulo.style.backgroundColor  =   $scope.modal_elementos.textConfig.colorfondo
                idabuelo.style.width            =   $scope.modal_elementos.largoelemento.width;
                $scope.posiciontext($scope.modal_elementos.posicion,id);
            }
            $scope.boton=function () {

                idpadre                     =   $scope.modal_elementos.idpadre;
                idabuelo                    =   $scope.modal_elementos.idabuelo;
                idabuelo.style.width        =   $scope.modal_elementos.anchoelement.width;
                idabuelo.style.height       =   $scope.modal_elementos.altoelement.height;

                idpadre.style.backgroundColor       =   $scope.modal_elementos.textConfig.colorfondo ;
                idpadre.style.color                 =   $scope.modal_elementos.textConfig.textcolor
                idpadre.style.fontSize              =   $scope.modal_elementos.font_size+'px';
                $(idpadre).val($scope.modal_elementos.nomb_elementobtn);
            }
            $scope.panel=function () {
                var  numero=0,inicio=1;
                var idcolumnas,idfilas;
                var idhijo=$scope.modal_elementos.idhijo;
                console.log($scope.modal_elementos.idhijo);
                var numeroColumnas=$('#columnas').val();
                var numeroFilas=$('#filas').val();

                idcolumnas="columnas"+idhijo;
                while(numero<numeroColumnas){
                    idfilas="filas"+idhijo+numero;
                    var row ='<div layout="row" style="padding:0px;" class="ng-scope layout-row" id="'+idfilas+'"></div>';
                    $('#'+idhijo).append(row);
                    for(inicio;inicio <= numeroFilas;inicio++){
                        var col='<div layout="column" class="columnas ng-scope layout-column" id="' + idcolumnas + inicio + numero + '"></div>';
                        $('#'+idfilas).append(col);
                    }
                    numero++;
                    inicio = 1;
                }

            }


            // guardar elementos

            $scope.saveEdicion=function(){
                //obtner id  padre y abuelo del elemento

                var abuelo_id = $(id_elemento).parent().attr("id");
                $scope.id_abuelo=document.getElementById(abuelo_id)
                var padre_id = $($scope.id_abuelo).children().attr('id');
                $scope.id_padre=document.getElementById(padre_id)

                if ($($scope.id_padre).children('.texto').attr("class") === 'form-control texto') {
                    $scope.texbox($scope.id_padre);
                }
                if ($($scope.id_abuelo).attr("class") === 'element boton grid ng-scope') {
                    $scope.boton();
                }
                if ($($scope.id_padre).attr("class") === 'panelP card grid _md') {
                    $scope.panel();
                }
                ngDialog.closeAll();
            }


    }])
    .controller('EdicionElementosCtrl',function ($scope) {

        //obtner id  padre y abuelo del elemento

        var abuelo_id = $(id_elemento).parent().attr("id");
        $scope.id_abuelo=document.getElementById(abuelo_id)
        var padre_id = $($scope.id_abuelo).children().attr('id');
        $scope.id_padre=document.getElementById(padre_id)

        //obtner la clase estilo elementos padre y abuelo

        $scope.class_padre=$($scope.id_padre).attr('class');

        //cambio id a hijos de los elementos
        $($scope.id_padre).children('.textotitulo').attr('id','titulotxto'+padre_id);
        $($scope.id_padre).children('.panelbody').attr('id',"panelb" + contador);

        // array de elemento

            $scope.Atributos_elementos={
                textbox:{},
                boton:{}
            };
        //array de elementos del modal
        $scope.modal_elementos={
            fontfamilia:[
                { id: 1, name: 'Arial' },
                { id: 2, name: 'Arial Black' },
                { id: 3, name: 'Courier New' },
                { id: 4, name: 'Georgia' },
                { id: 5, name: 'Comic Sans MS' },
                { id: 6, name: 'Impact' },
                { id: 7, name: 'Times New Roman' },
                { id: 8, name: 'Trebuchet MS' },
                { id: 9, name: 'Verdana' }
            ],
            widthtextbox:[
                {id:1,width:'150px'},
                {id:2,width:'200px'},
                {id:3,width:'250px'},
                {id:4,width:'300px'},
                {id:5,width:'350px'}
            ],
            textConfig:{},
            anchotexto:[
                {id:1,name:'grande', clase:'input-group input-group-lg'},
                {id:2,name:'pequeño',clase:"input-group input-group-sm"},
                {id:3,name:'normal',clase:"input-group element"},
            ],
            posicion: 'izquierda',
            widthbuton:[
                {id:1,width:'50px'},
                {id:2,width:'100px'},
                {id:3,width:'150px'},
                {id:4,width:'200px'},
                {id:5,width:'250px'},
                {id:6,width:'300px'},
                {id:7,width:'350px'},
                {id:8,width:'400px'},
            ],
            heightbuton:[
                {id:1,height:'50px'},
                {id:2,height:'100px'},
                {id:3,height:'150px'},
                {id:4,height:'200px'},
            ]

        }

        //Elementos obteniendo sus atributos y agregandolos al modal
        if ($($scope.id_padre).children('.texto').attr("class") === 'form-control texto') {
            $scope.verattrtexto = 'true';
            $scope.hijoprimario=$($scope.id_padre).children('.textotitulo').attr('id');
            $scope.id_hijo1=document.getElementById($scope.hijoprimario)
            $scope.Atributos_elementos.textbox.idabuelo     =   $scope.id_abuelo;
            $scope.Atributos_elementos.textbox.idpadre      =   $scope.id_padre;
            $scope.Atributos_elementos.textbox.clasepadre   =   $scope.class_padre;
            $scope.Atributos_elementos.textbox.idtitulo     =   $scope.id_hijo1;
            $scope.Atributos_elementos.textbox.texttitulo   =   $($scope.id_hijo1).text();
            $scope.Atributos_elementos.textbox.color        =   $($scope.id_hijo1).css('color')
            $scope.Atributos_elementos.textbox.color_fondo  =   $($scope.id_hijo1).css('background-color');
            $scope.Atributos_elementos.textbox.font_size    =   $($scope.id_hijo1).css('font-size');
            $scope.Atributos_elementos.textbox.font_family  =   $($scope.id_hijo1).css('font-family');
            $scope.Atributos_elementos.textbox.widthtextbox =   $($scope.id_padre).css('width');

            $scope.modal_elementos.fontfamilia.push({id:10,name:$scope.Atributos_elementos.textbox.font_family});
            $scope.modal_elementos.familiaelegida=$scope.modal_elementos.fontfamilia[9];
            $scope.modal_elementos.widthtextbox.push({id:6,width:  $scope.Atributos_elementos.textbox.widthtextbox});
            $scope.modal_elementos.largoelemento= $scope.modal_elementos.widthtextbox[5];

            $scope.modal_elementos.nomb_elemento            =   $scope.Atributos_elementos.textbox.texttitulo;
            $scope.modal_elementos.textConfig.textcolor     =   $scope.Atributos_elementos.textbox.color ;
            $scope.modal_elementos.idpadre                  =   $scope.Atributos_elementos.textbox.idpadre;
            $scope.modal_elementos.idabuelo                 =   $scope.Atributos_elementos.textbox.idabuelo;
            $scope.modal_elementos.textConfig.colorfondo    =   $scope.Atributos_elementos.textbox.color_fondo;
            $scope.modal_elementos.textConfig.font_size     =   $scope.Atributos_elementos.textbox.font_size;
            $scope.modal_elementos.idtitulo                 =   $scope.Atributos_elementos.textbox.idtitulo ;
            console.log( $scope.modal_elementos.textConfig.textcolor )
            if( $scope.Atributos_elementos.textbox.clasepadre==='input-group element'){
                $scope.modal_elementos.anchoelegido =$scope.modal_elementos.anchotexto[2]
            }else if(  $scope.Atributos_elementos.textbox.clasepadre==='input-group input-group-lg'){
                $scope.modal_elementos.anchoelegido =$scope.modal_elementos.anchotexto[0]
            }else if( $scope.Atributos_elementos.textbox.clasepadre==='input-group input-group-sm'){
                $scope.modal_elementos.anchoelegido =$scope.modal_elementos.anchotexto[1]
            }
            // $scope.anchotext(ancho,padre);
            $scope.cambio = function () {
                $scope.modal_elementos.nomb_elemento;
                $scope.modal_elementos.textConfig.font_size;
                $scope.modal_elementos.textConfig.textcolor;
                $scope.modal_elementos.textConfig.colorfondo;
                $scope.modal_elementos.familiaelegida;
                $scope.modal_elementos.largoelemento;
                $scope.modal_elementos.idpadre;
                $scope.modal_elementos.anchoelegido;
                $scope.modal_elementos.posicion;
                $scope.modal_elementos.idtitulo;
                $('#ejemplotexbox').attr('class', $scope.modal_elementos.anchoelegido.clase)
                $scope.posiciontext( $scope.modal_elementos.posicion,'ejemplotexbox');
            }


        }
        if ($($scope.id_abuelo).attr("class") === 'element boton grid ng-scope'){
            $scope.verattrboton = 'true';

            $scope.Atributos_elementos.boton.idabuelo       =   $scope.id_abuelo
            $scope.Atributos_elementos.boton.idpadre        =   $scope.id_padre
            $scope.Atributos_elementos.boton.valor          =   $($scope.id_padre).val();
            $scope.Atributos_elementos.boton.color          =   $($scope.id_padre).css('color')
            $scope.Atributos_elementos.boton.font_size      =   $($scope.id_padre).css('font-size');
            $scope.Atributos_elementos.boton.color_fondo    =   $($scope.id_padre).css('background-color');
            $scope.Atributos_elementos.boton.widthbton      =   $($scope.id_padre).css('width');
            $scope.Atributos_elementos.boton.heightbton     =   $($scope.id_padre).css('height');

            $scope.modal_elementos.widthbuton.push({id:9,width: $scope.Atributos_elementos.boton.widthbton});
            $scope.modal_elementos.anchoelement=$scope.modal_elementos.widthbuton[8];
            $scope.modal_elementos.heightbuton.push({id:5,height: $scope.Atributos_elementos.boton.heightbton});
            $scope.modal_elementos.altoelement=$scope.modal_elementos.heightbuton[4];

            $scope.modal_elementos.idabuelo                 =   $scope.Atributos_elementos.boton.idabuelo;
            $scope.modal_elementos.idpadre                  =   $scope.Atributos_elementos.boton.idpadre;
            $scope.modal_elementos.textConfig.textcolor     =   $scope.Atributos_elementos.boton.color;
            $scope.modal_elementos.textConfig.colorfondo    =   $scope.Atributos_elementos.boton.color_fondo;
            $scope.modal_elementos.nomb_elementobtn         =   $scope.Atributos_elementos.boton.valor;

            var str =$scope.Atributos_elementos.boton.font_size ;
            var fontsize = str.split("px");
            $scope.modal_elementos.font_size= fontsize[0];

            $scope.cambio = function () {
                $scope.modal_elementos.idpadre;
                $scope.modal_elementos.idabuelo;
                $scope.modal_elementos.anchoelement;
                $scope.modal_elementos.altoelement;
                $scope.modal_elementos.font_size;
                $scope.modal_elementos.textConfig.textcolor;
                $scope.modal_elementos.textConfig.colorfondo;
            }


        }
        if ($($scope.id_padre).attr("class") === 'panelP card grid _md') {
            $scope.verattrpanel='true';
            $scope.hijo=$($scope.id_padre).children('.panelbody').attr('id')
            $scope.Atributos_elementos.idabuelo=$scope.id_abuelo;
            $scope.Atributos_elementos.idpadre=$scope.id_padre;
            $scope.Atributos_elementos.idpadre=$scope.hijo;

            $scope.modal_elementos.idhijo= $scope.Atributos_elementos.idpadre=$scope.hijo;
        }

    })