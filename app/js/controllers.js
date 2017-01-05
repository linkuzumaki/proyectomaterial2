var contador = 0;
var imgsave;
const nb_form='Nombre Formulario';
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
    .controller('OpenModalCtrl',['$scope','ngDialog','fileReader',"storageLista","$mdToast",'dbelemento','$timeout','$mdDialog',function($scope,ngDialog,fileReader,storageLista,$mdToast,dbelemento,$timeout,$mdDialog){

            $scope.myDate = new Date();
            $scope.user = null;
            $scope.usernew={};
            $scope.cambiojob = function () {

                $scope.usernew.name=$scope.user.name;
                console.log($scope.usernew.name)
            }
        console.log($scope.usernew.name)
            console.log(document.getElementById("formulario_name").innerHTML)
            $scope.users =[
                            { id: 1, name: 'Scooby Doo' },
                            { id: 2, name: 'Shaggy Rodgers' },
                            { id: 3, name: 'Fred Jones' },
                            { id: 4, name: 'Daphne Blake' },
                            { id: 5, name: 'Velma Dinkley' }
                        ];

            //elimina y cambia de evento al calendario
            $scope.initDatepicker = function(){
                angular.element(".md-datepicker-button").each(function(){
                    var el = this;
                    var ip = angular.element(el).parent().find("input").bind('click', function(e){
                        angular.element(el).click();
                    });
                    angular.element(this).css('visibility', 'hidden');
                });
            };
            //abren el modal
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

            //funciones
            $scope.posiciontext=function(posicion,id){
                if(posicion==='derecha'){
                    $($('#' + id).children('.textotitulo')).before($('#' + id).children('.texto')); //derecha
                    $($('#' + id).children('.check')).before($('#' + id).children('.textocheck')); //derecha
                }else if(posicion==='izquierda'){
                    $($('#' + id).children('.texto')).before($('#' + id).children('.textotitulo'));//izquierda
                    $($('#' + id).children('.textocheck')).before($('#' + id).children('.check')); //izquierda
                }
            }
            $scope.leerarchivo=function(){
                fileReader.readAsDataUrl($scope.file,$scope).then(function(result){
                    $scope.modal_elementos.srcimagen=result;
                    imgsave= $scope.modal_elementos.srcimagen
                })
            }
            $scope.eliminarlista=function(index) {
                storageLista.removelista(index,$scope.modal_elementos.datos)
            }
            $scope.agregardatos=function () {
                var id= $scope.modal_elementos.selectid
                if ( $scope.modal_elementos.nuevodato != null)
                    $scope.modal_elementos.datos.push({texto:  $scope.modal_elementos.nuevodato});
                storageLista.guardarlista( $scope.modal_elementos.datos, $scope.modal_elementos.selectid);
                $scope.modal_elementos.nuevodato = null;
                $scope.modal_elementos.lista=storageLista.listadatos( $scope.modal_elementos.selectid)


            }
            $scope.verlista=function(index) {
                var idelemento = event.target.id;
                var padre = $('#' + idelemento).parent().attr("id");
                $scope.lista = storageLista.listadatos(padre)
                $scope.listan=$scope.lista;
                console.log($scope.listan)
            }


            //funciones de edicion de textos
            $scope.alignjustificar=function(){
                $scope.modal_elementos.font_align='justify'
            }
            $scope.aligncentrar=function(){
                $scope.modal_elementos.font_align='center'
            }
            $scope.alignderecha=function(){
                $scope.modal_elementos.font_align='right'
            }
            $scope.alignizquierda=function(){
                $scope.modal_elementos.font_align='left'
            }
            $scope.negritatexto=function(){
                if( $scope.modal_elementos.font_weight==='bold'){
                    $scope.modal_elementos.font_weight='normal'
                }else{
                    $scope.modal_elementos.font_weight='bold'
                }
            }
            $scope.cursivatexto=function(){
                if(  $scope.modal_elementos.font_style==='oblique'){
                    $scope.modal_elementos.font_style='normal'
                }else{
                    $scope.modal_elementos.font_style='oblique'
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
                $($scope.modal_elementos.idpadre).attr('class',$scope.modal_elementos.anchoelegido.clase)
                $scope.posiciontext($scope.modal_elementos.posicion,id);

                //guardar elementos al mongodb


               /* $scope.elementosavemongo.nombreformulario=$scope.nomb_formulario;
                $scope.elementosavemongo.fechaformulario=$scope.fecha_formulario;
                $scope.elementosavemongo.lugartrabajo=$scope.lugar_trabajo;
                $scope.elementosavemongo.elementos={elemento:$scope.modal_elementos.idabuelo};
                dbelemento.guardarelemento($scope.elementosavemongo);*/




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
            $scope.check=function(){
                idabuelo    =   $scope.modal_elementos.idabuelo;
                idhijo1     =   $scope.modal_elementos.idhijo1;
                id          =   $($scope.modal_elementos.idpadre).attr('id');

                idabuelo.style.width            =  $scope.modal_elementos.largoelemento.width;
                idhijo1.style.backgroundColor   =  $scope.modal_elementos.textConfig.colorfondo;
                $($scope.modal_elementos.idpadre).attr('class',$scope.modal_elementos.anchoelegido.clase)
                $scope.posiciontext( $scope.modal_elementos.posicion, id);
            }
            $scope.cuadrotexto=function(){

                idpadre =   $scope.modal_elementos.idpadre;
                $($scope.modal_elementos.idpadre).text($scope.modal_elementos.nomb_elemento);
                idpadre.style.color              =   $scope.modal_elementos.textConfig.textcolor;
                idpadre.style.fontSize           =   $scope.modal_elementos.font_size+'px';
                idpadre.style.textAlign          =   $scope.modal_elementos.font_align;
                idpadre.style.fontWeight         =   $scope.modal_elementos.font_weight;
                idpadre.style.fontStyle          =   $scope.modal_elementos.font_style;
                idpadre.style.fontFamily         =   $scope.modal_elementos.familiaelegida.name;
                idpadre.style.backgroundColor    =   $scope.modal_elementos.textConfig.textfondo;
                idpadre.style.width='230px';
                idpadre.style.height='0px';
                idpadre.style.wordWrap='break-word';

            }
            $scope.imagen=function(){

                hijoid  =   $scope.modal_elementos.idhijo;
                padreid =   $scope.modal_elementos.idpadre;
                abueloid=   $scope.modal_elementos.idabuelo;
                if( $scope.modal_elementos.formaimmagen==="true"){

                    hijoid.style.borderTopLeftRadius='0% 0%';
                    hijoid.style.borderTopRightRadius='0% 0%';
                    hijoid.style.borderBottomLeftRadius='0% 0%';
                    hijoid.style.borderBottomRightRadius='0% 0%';
                    padreid.style.backgroundColor='rgba(255, 255, 255, 0.88)';
                    padreid.style.border='border: 1px solid #ddd;';

                }
                if( $scope.modal_elementos.formaimmagen==="false"){
                    //$('#'+idh1).attr('class','circular--square')

                    hijoid.style.borderTopLeftRadius='50% 50%';
                    hijoid.style.borderTopRightRadius='50% 50%';
                    hijoid.style.borderBottomLeftRadius='50% 50%';
                    hijoid.style.borderBottomRightRadius='50% 50%';
                    padreid.style.backgroundColor='rgba(255, 255, 255, 0)';
                    padreid.style.border='0px !important';

                }

                hijoid.src= imgsave;
                abueloid.style.width=  $scope.modal_elementos.anchoelement.width;
                abueloid.style.height= $scope.modal_elementos.altoelement.height;



            }
            $scope.select=function(){

                abueloid=$scope.modal_elementos.idabuelo
                padreid= $scope.modal_elementos.idpadre ;
                idtitulo=$scope.modal_elementos.idtitulo


                var copy = $($scope.elementohtml).clone(true);
                $('#ejemplomain').append(copy);

                $(idtitulo).text( $scope.modal_elementos.tituloselect);
                abueloid.style.width= $scope.modal_elementos.largoelemento.width;
                idtitulo.style.color= $scope.modal_elementos.textConfig.textcolor ;
                idtitulo.style.fontFamily=$scope.modal_elementos.familiaelegida.name
            }
            $scope.textarea=function () {

                idtitulo    =   $scope.Atributos_elementos.textarea.idtitulo;
                idpadre     =   $scope.modal_elementos.idpadre;

                $(idtitulo).text( $scope.modal_elementos.nomb_elemento );
                idpadre.style.width=$scope.modal_elementos.largoelemento.width
                idtitulo.style.color= $scope.modal_elementos.textConfig.textcolor;
            }

            // guardar elementos
            $scope.saveEdicion=function(){
                //obtner id  padre y abuelo del elemento

                var abuelo_id = $(id_elemento).parent().attr("id");
                $scope.id_abuelo=document.getElementById(abuelo_id)
                var padre_id = $($scope.id_abuelo).children().attr('id');
                $scope.id_padre=document.getElementById(padre_id)


                console.log( document.getElementById("formulario_name").innerHTML)
                console.log($scope.usernew.name)
                $scope.valorinputForm= document.getElementById("formulario_name").innerHTML;

                if($scope.valorinputForm===nb_form || $scope.usernew === null) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Aviso de falta de dato')
                            .textContent('para editar , porfavor primero cambia el nombre del formulario.')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('ir')
                            .targetEvent()
                    );
                }else{
                    //guarda los cabios realizados
                    if ($($scope.id_padre).children('.texto').attr("class") === 'form-control texto') {
                        $scope.texbox($scope.id_padre);
                    }
                    if ($($scope.id_abuelo).attr("class") === 'element boton grid ng-scope') {
                        $scope.boton();
                    }
                    if ($($scope.id_padre).attr("class") === 'panelP card grid _md') {
                        $scope.panel();
                    }
                    if ($($scope.id_padre).children('.check').attr("class") === 'input-group-addon check') {
                        $scope.check();
                    }
                    if ($($scope.id_padre).attr("class") === 'input-group element parrafoPH layout-padding _md flex') {
                        $scope.cuadrotexto();
                    }
                    if ($($scope.id_padre).attr("class") === 'thumbnail element') {
                        $scope.imagen();
                    }
                    if ($($scope.id_padre).attr("class") === 'form-group element selectP ng-scope') {
                        $scope.select();
                    }
                    if ($($scope.id_padre).attr("class") === 'form-group element areap') {
                        $scope.textarea();
                    }

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('modificacion exitosa')
                            .hideDelay(1000)
                            .position('top right')
                    );
                }

                ngDialog.closeAll();
            }


    }])
    .controller('EdicionElementosCtrl',['$scope','ngDialog','fileReader',"storageLista",function ($scope,ngDialog,fileReader,storageLista) {

        //obtner id  padre y abuelo del elemento

        var abuelo_id      =   $(id_elemento).parent().attr("id");
        $scope.id_abuelo   =   document.getElementById(abuelo_id)
        var padre_id       =   $($scope.id_abuelo).children().attr('id');
        $scope.id_padre    =   document.getElementById(padre_id)

        //obtner la clase estilo elementos padre y abuelo

        $scope.class_padre=$($scope.id_padre).attr('class');

        //cambio id a hijos de los elementos
        $($scope.id_padre).children('.textotitulo').attr('id','titulotxto'+padre_id);
        $($scope.id_padre).children('.panelbody').attr('id',"panelb" + contador);
        $($scope.id_padre).children('.check').attr('id','check'+padre_id);
        $($scope.id_padre).children('.textocheck').attr('id','check hermano'+padre_id);
        $($scope.id_padre).children('.element').attr('id','textoparrafo'+padre_id);
        $($scope.id_padre).children('.thumb').attr('id',"imagen" + padre_id);
        $($scope.id_padre).children('.selecthijo').attr('id',"select" + padre_id);
        $($scope.id_padre).children('.textoselect').attr('id',"selecttexto" + padre_id);
        $($scope.id_padre).children('.tituloarea').attr('id',"areatitulo" + padre_id);
        $($scope.id_padre).children('.areacuadro').attr('id',"cuadroarea" + padre_id);

        // array de elemento

        $scope.Atributos_elementos={
                textbox:{},
                boton:{},
                check:{},
                parrafo:{},
                imagen:{},
                select:{},
                textarea:{}
            };
        $scope.elementosavemongo={};
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
            ],
           widthcheck:[
                {id:1,width:'150px'},
                {id:2,width:'200px'},
                {id:3,width:'250px'},
                {id:4,width:'300px'},
                {id:5,width:'350px'}
            ],
            formaimg:[
                {title: 'cuadrado',value:'true',name:"cuadrado"},
                {title: 'circular',value:'false',name:"circular"}
            ],
            datos:[],
            lista:[]

        }

        //Elementos obteniendo sus atributos y agregandolos al modal
        if($($scope.id_padre).children('.texto').attr("class") === 'form-control texto') {
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
        if($($scope.id_abuelo).attr("class") === 'element boton grid ng-scope'){
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

            var tamañoletra =$scope.Atributos_elementos.boton.font_size ;
            console.log('tamaño letra : '+tamañoletra)
            var sizeletra = tamañoletra.split("px");
            console.log('obtner el tamaño de la letra sin px: '+sizeletra)
            $scope.modal_elementos.font_size= sizeletra[0];

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
        if($($scope.id_padre).attr("class") === 'panelP card grid _md') {
            $scope.verattrpanel='true';
            $scope.hijo=$($scope.id_padre).children('.panelbody').attr('id')
            $scope.Atributos_elementos.idabuelo=$scope.id_abuelo;
            $scope.Atributos_elementos.idpadre=$scope.id_padre;
            $scope.Atributos_elementos.idpadre=$scope.hijo;

            $scope.modal_elementos.idhijo= $scope.Atributos_elementos.idpadre=$scope.hijo;
        }
        if($($scope.id_padre).children('.check').attr("class") === 'input-group-addon check'){
            $scope.verattrcheck = 'true';
            $scope.hijoprimario =$($scope.id_padre).children('.check').attr('id');
            $scope.hijosecundario=$($scope.id_padre).children('.textocheck').attr('id');
            $scope.hijo1=document.getElementById($scope.hijoprimario);
            $scope.hijo2=document.getElementById($scope.hijosecundario);

            $scope.Atributos_elementos.check.idabuelo           =   $scope.id_abuelo;
            $scope.Atributos_elementos.check.idpadre            =   $scope.id_padre;
            $scope.Atributos_elementos.check.idhijo1            =   $scope.hijo1;
            $scope.Atributos_elementos.check.idhijo2            =   $scope.hijo2;
            $scope.Atributos_elementos.check.color_fondo        =   $($scope.hijo1).css('background-color');
            $scope.Atributos_elementos.check.clase              =   $($scope.id_padre).attr('class');
            $scope.Atributos_elementos.check.widthcheck         =   $($scope.id_padre).css('width');

            $scope.modal_elementos.widthcheck.push({id:6,width:  $scope.Atributos_elementos.check.widthcheck});
            $scope.modal_elementos.largoelemento=$scope.modal_elementos.widthcheck[5];


            $scope.modal_elementos.idabuelo                 =   $scope.Atributos_elementos.check.idabuelo;
            $scope.modal_elementos.idpadre                  =   $scope.Atributos_elementos.check.idpadre;
            $scope.modal_elementos.idhijo1                  =   $scope.Atributos_elementos.check.idhijo1;
            $scope.modal_elementos.idhijo2                  =   $scope.Atributos_elementos.check.idhijo2;
            $scope.modal_elementos.textConfig.colorfondo    =   $scope.Atributos_elementos.check.color_fondo;

            if(  $scope.Atributos_elementos.check.clase==='input-group element'){
                $scope.modal_elementos.anchoelegido     =   $scope.modal_elementos.anchotexto[2]
            }
            else
                if(  $scope.Atributos_elementos.check.clase==='input-group input-group-lg'){
                $scope.modal_elementos.anchoelegido     =   $scope.modal_elementos.anchotexto[0]
            }
            else
                if(  $scope.Atributos_elementos.check.clase==='input-group input-group-sm'){
                $scope.modal_elementos.anchoelegido     =   $scope.modal_elementos.anchotexto[1]
            }

           console.log($scope.Atributos_elementos.check.clase)

            $scope.cambio = function () {
                $scope.modal_elementos.idabuelo;
                $scope.modal_elementos.idpadre;
                $scope.modal_elementos.idhijo1;
                $scope.modal_elementos.idhijo2;
                $scope.modal_elementos.textConfig.colorfondo;
                $scope.modal_elementos.anchoelegido;
                $scope.modal_elementos.largoelemento;
                $scope.modal_elementos.posicion;
                $('#checkelemento').attr('class',$scope.modal_elementos.anchoelegido.clase)
                $scope.posiciontext( $scope.modal_elementos.posicion,'checkelemento');

            }

        }
        if($($scope.id_padre).attr("class") === 'input-group element parrafoPH layout-padding _md flex'){

            $scope.verattrparrafo = 'true';
            $scope.hijoprimario=$($scope.id_padre).children('.element').attr('id');
            $scope.hijo1=document.getElementById($scope.hijoprimario);

            $scope.Atributos_elementos.parrafo.idpadre          =   $scope.id_padre;
            $scope.Atributos_elementos.parrafo.color_fondo      =   $($scope.id_padre).css('background-color');
            $scope.Atributos_elementos.parrafo.valor            =   $($scope.id_padre).text();
            $scope.Atributos_elementos.parrafo.color            =   $($scope.id_padre).css('color')
            $scope.Atributos_elementos.parrafo.font_size        =   $($scope.id_padre).css('font-size');
            $scope.Atributos_elementos.parrafo.font_family      =   $($scope.id_padre).css('font-family');
            $scope.Atributos_elementos.parrafo.fontalinear      =   $($scope.id_padre).css('text-align');
            $scope.Atributos_elementos.parrafo.negrita          =   $($scope.id_padre).css('font-weight');
            $scope.Atributos_elementos.parrafo.cursiva          =   $($scope.id_padre).css('font-style');

            $scope.modal_elementos.fontfamilia.push({id:10,name:$scope.Atributos_elementos.parrafo.font_family});
            $scope.modal_elementos.familiaelegida=$scope.modal_elementos.fontfamilia[9];

            $scope.modal_elementos.idpadre                      =   $scope.Atributos_elementos.parrafo.idpadre;
            $scope.modal_elementos.nomb_elemento                =   $scope.Atributos_elementos.parrafo.valor;
            $scope.modal_elementos.textConfig.textcolor         =   $scope.Atributos_elementos.parrafo.color;
            $scope.modal_elementos.textConfig.textfondo         =   $scope.Atributos_elementos.parrafo.color_fondo
            $scope.modal_elementos.font_align                   =   $scope.Atributos_elementos.parrafo.fontalinear;
            $scope.modal_elementos.font_weight                  =   $scope.Atributos_elementos.parrafo.negrita;
            $scope.modal_elementos.font_style                   =   $scope.Atributos_elementos.parrafo.cursiva;


            console.log(' obtner el size ')



            var tamañoletra =$scope.Atributos_elementos.parrafo.font_size ;
            console.log('tamaño letra : '+tamañoletra)
            var sizeletra = tamañoletra.split("px");
            console.log('obtner el tamaño de la letra sin px: '+sizeletra)
            $scope.modal_elementos.font_size= sizeletra[0];
            console.log('obtner el tamaño de la letra sin ,: '+ $scope.modal_elementos.font_size)

            $scope.cambio = function () {
                $scope.modal_elementos.font_size;
                $scope.modal_elementos.textConfig.textcolor;
                $scope.modal_elementos.textConfig.textfondo;
                $scope.modal_elementos.nomb_elemento;
                $scope.modal_elementos.familiaelegida;
            }
        }
        if($($scope.id_padre).attr("class") === 'thumbnail element'){

            $scope.verattrimg='true';
            $scope.hijoprimario=$($scope.id_padre).children('.thumb').attr('id');
            $scope.hijo1=document.getElementById($scope.hijoprimario);

            $scope.Atributos_elementos.imagen.idhijo1               =      $scope.hijo1;
            $scope.Atributos_elementos.imagen.idpadre               =      $scope.id_padre;
            $scope.Atributos_elementos.imagen.idabuelo              =      $scope.id_abuelo;
            $scope.Atributos_elementos.imagen.widthbton             =      $($scope.id_abuelo).css('width');
            $scope.Atributos_elementos.imagen.heightbton            =      $($scope.id_abuelo).css('height');
            $scope.modal_elementos.formaimmagen                     =      $scope.modal_elementos.formaimg.name;


            $scope.Atributos_elementos.imagen.recurso= $scope.hijo1.src;
            $scope.modal_elementos.srcimagen= $scope.Atributos_elementos.imagen.recurso;

            $scope.modal_elementos.widthbuton.push({id:9,width: $scope.Atributos_elementos.imagen.widthbton});
            $scope.modal_elementos.anchoelement=$scope.modal_elementos.widthbuton[8];

            $scope.modal_elementos.heightbuton.push({id:5,height: $scope.Atributos_elementos.imagen.heightbton});
            $scope.modal_elementos.altoelement=$scope.modal_elementos.heightbuton[4];
            $scope.modal_elementos.idhijo           =    $scope.Atributos_elementos.imagen.idhijo1;
            $scope.modal_elementos.idpadre          =    $scope.Atributos_elementos.imagen.idpadre;
            $scope.modal_elementos.idabuelo         =     $scope.Atributos_elementos.imagen.idabuelo;
            $scope.cambio = function () {
                $scope.modal_elementos.anchoelement;
                $scope.modal_elementos.altoelement;
                $scope.modal_elementos.srcimagen
                $scope.modal_elementos.formaimmagen

                if( $scope.modal_elementos.formaimmagen==="true"){
                    console.log('cuadrado')
                    $('#imgcuadrado').attr('style','display:show')
                    $('#imgcircular').attr('style','display:none')
                }
                if( $scope.modal_elementos.formaimmagen==="false"){
                    console.log('circulo')
                    $('#imgcuadrado').attr('style','display:none')
                    $('#imgcircular').attr('style','display:show')
                }

            }

        }
        if($($scope.id_padre).attr("class") === 'form-group element selectP ng-scope'){

            $scope.verattrselect='true';
            $scope.hijoprimario     =   $($scope.id_padre).children('.selecthijo').attr('id');
            $scope.hijo1            =   document.getElementById($scope.hijoprimario);
            $scope.hijosecundario   =   $($scope.id_padre).children('.textoselect').attr('id');
            $scope.hijo2            =   document.getElementById($scope.hijosecundario);

            $scope.Atributos_elementos.select.id                        =   padre_id;
            $scope.Atributos_elementos.select.idabuelo                  =   $scope.id_abuelo;
            $scope.Atributos_elementos.select.idpadre                   =   $scope.id_padre;
            $scope.Atributos_elementos.select.idhijo1                   =   $scope.hijo1;
            $scope.Atributos_elementos.select.idtitulo                  =   $scope.hijo2;
            $scope.Atributos_elementos.select.texttitulo                =   $($scope.hijo2).text();
            $scope.Atributos_elementos.select.widthcheck                =   $($scope.id_abuelo).css('width');
            $scope.Atributos_elementos.select.font_family               =   $($scope.hijo2).css('font-family');
            $scope.Atributos_elementos.select.color                     =   $($scope.hijo2).css('color');


            $scope.modal_elementos.selectid                             =   $scope.Atributos_elementos.select.id
            $scope.modal_elementos.idpadre                              =   $scope.Atributos_elementos.select.idpadre
            $scope.modal_elementos.idabuelo                             =   $scope.Atributos_elementos.select.idabuelo
            $scope.modal_elementos.idhijo1                              =   $scope.Atributos_elementos.select.idhijo1
            $scope.modal_elementos.idtitulo                             =   $scope.Atributos_elementos.select.idtitulo
            $scope.modal_elementos.tituloselect                         =   $scope.Atributos_elementos.select.texttitulo;
            $scope.modal_elementos.textConfig.textcolor                 =   $scope.Atributos_elementos.select.color;

            $scope.modal_elementos.widthcheck.push({id:6,width:  $scope.Atributos_elementos.select.widthcheck});
            $scope.modal_elementos.largoelemento=$scope.modal_elementos.widthcheck[5];
            $scope.modal_elementos.fontfamilia.push({id:10,name:$scope.Atributos_elementos.select.font_family});
            $scope.modal_elementos.familiaelegida=$scope.modal_elementos.fontfamilia[9];
            $scope.modal_elementos.lista=storageLista.listadatos($scope.id_padre );
            $scope.Atributos_elementos.select.idvisualselect=$('#sel1').attr('id');


            $scope.cambio = function () {
                $scope.modal_elementos.textConfig.textcolor;
                $scope.modal_elementos.idtitulo;
                $scope.modal_elementos.lista;
                $scope.modal_elementos.largoelemento;
                $scope.modal_elementos.familiaelegida;

            }

        }
        if($($scope.id_padre).attr("class")==='form-group element areap'){
            $scope.verattrarea='true';
            $scope.hijosecundario=$($scope.id_padre).children('.tituloarea').attr('id');
            $scope.hijo2=document.getElementById($scope.hijosecundario);



            $scope.Atributos_elementos.textarea.id                  =   $scope.id_padre
            $scope.Atributos_elementos.textarea.idtitulo            =   $scope.hijo2
            $scope.Atributos_elementos.textarea.texttitulo          =   $($scope.hijo2).text();
            $scope.Atributos_elementos.textarea.color               =   $($scope.hijo2).css('color')
            $scope.Atributos_elementos.textarea.widthcheck          =   $($scope.id_padre).css('width');

            $scope.modal_elementos.textConfig.textcolor             =   $scope.Atributos_elementos.textarea.color;
            $scope.modal_elementos.widthcheck.push({id:6,width:  $scope.Atributos_elementos.textarea.widthcheck});
            $scope.modal_elementos.largoelemento                    =   $scope.modal_elementos.widthcheck[5];
            $scope.modal_elementos.nomb_elemento                    =   $scope.Atributos_elementos.textarea.texttitulo;
            $scope.modal_elementos.idpadre                          =   $scope.Atributos_elementos.textarea.id;


            $scope.cambio = function () {
                $scope.modal_elementos.nomb_elemento;
                $scope.modal_elementos.largoelemento;
                $scope.modal_elementos.textConfig.textcolor;
                $scope.Atributos_elementos.textarea.idtitulo;
            }
        }
    }])