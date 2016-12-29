var contador =0;
var borrarHtml = ("<button ng-controller='EventoElementCtrl' class='delete-button right'  style='float: right;color:black' id='borrar'>x</button>");
var editarHtml = ("<button ng-controller='ModalCtrl' class='editar-button right'  style='float: right;color:black' id='editar'>/</button>");
var agregarHtml = ("<button ng-controller='EventoElementCtrl' class='crear-button right'  style='float: right;color:black' id='editar'>+</button>");
var todosElementos=[];
angular.module('app.directive', [])

.directive('crearElementos',['$compile','storageLista',function($compile,storageLista){

    return {
        scope:{},
        link: function(scope, element, attrs, controller) {
            scope.inputElement=[{elemento:{id:'hola'}}];
            element.bind("click",function(e) {
                console.log(' entro directiva');
                var id = e.target.id;// obtengo la id elemento del bar
                console.log('id target  '+id);
                var idelemento;

                if (id === 'elemt1') {
                    idelemento = 'parrafos'; //id del elemento
                }
                if (id === 'elemt2') {
                    idelemento = 'boton';
                }
                if (id === 'elemt3') {
                    idelemento = 'texbox';
                }
                if (id === 'elemt4') {
                    idelemento = 'check';
                }
                if (id === 'elemt5') {
                    idelemento = 'label';
                }
                if (id === 'elemt6') {
                    idelemento = 'panel';

                }
                if (id === 'elemt7') {
                    idelemento = 'img';
                }
                if (id === 'elemt10') {
                    idelemento = 'txtarea';
                }
                if (id === 'elemt11') {
                    idelemento = 'select';
                }
                if (id === 'elemt13') {
                    idelemento = 'radio';
                }

                console.log('id a clonar  id :  '+ idelemento);

                var elemento = document.getElementById(idelemento); // id elemento
                var copy = $(elemento).clone(true);//se crea un clon  del elemento
                //se edita los atributos de objeto  clonado
                $(copy).attr("id", "ElemClonado" + contador);
                $(copy).children('.element').attr("id", "hijo" + contador);// crea la id  para  el hijo con clase element
                $(copy).children('.element').attr("style", "width:100%;height:100%;");
                $(copy).attr("ondragstart", "start(event)");
                $(copy).attr("ondragend", "end(event)");

                if(idelemento==='img'){
                    $(copy).children('.element').attr("draggable","false")
                    $(copy).attr("style", "display:show;width: 200px;padding-left: 0px;padding-right: 0px;");

                }
                if(idelemento==='txtarea'){
                    $(copy).children('.element').attr("draggable","false")
                    $(copy).attr("style", "display:show;");

                }
                if(idelemento==='select'){
                    $(copy).children('.element').attr("draggable","false")
                    $(copy).attr("style", "display:show;");

                }
                if(idelemento==='texbox'){
                    $(copy).attr("style", "display:show;width: 100px;padding-top: 0px;padding-bottom: 0px;margin-top: 0px; " +
                        "margin-bottom: 0px;");

                }
                if(idelemento==='parrafos'){
                    $(copy).attr("style", "display:show;word-wrap: break-word");

                }
                if (idelemento==='check'){
                    $(copy).attr("style", "display:show;width:100px;padding-top: 0px;padding-bottom: 0px;margin-top: 0px; " +
                        "margin-bottom: 0px;");

                }
                if(idelemento==='boton'){
                    $(copy).attr("style", "display:show;width:150px;height:100px");
                    //$(copy).attr('style',"width:100px !important ;height:80px !important");
                    //$(copy).children('.element').attr('style',"width:100%;height:80%");
                }
                if (idelemento === 'panel' ){
                    $(copy).attr("style", "display:show;width:100%;padding-top: 0px;padding-bottom: 0px;margin-top: 0px; " +
                        "margin-bottom: 0px;");
                    $(copy).children('.panelP').attr('id', "panelP" + contador);
        
                }
                $(copy).attr("draggable", true);
                // el elemento tipo text y check no tienen  el resisable
                if (idelemento !== 'texbox' && idelemento !== 'check' && idelemento !== 'parrafos' && idelemento !== 'panel') {
                   // $(copy).resizable();
                }

                $(copy).clone(true, true);// se confirma que los eventos y atributos esten activos
                $(borrarHtml).appendTo(copy);//se agrega el btn eleminar
                $(editarHtml).appendTo(copy);//se agrega el btn editar
                $(agregarHtml).appendTo(copy);//se agrega el btn editar
                $(copy).children('.delete-button').attr("id", "eliminar" + contador);
                $(copy).children('.delete-button').attr("ng-click", "eliminar()");//se agrega el evento eliminar  despues de agregar el boton al clon
                $(copy).children('.editar-button').attr("id", "editar" + contador);
                $(copy).children('.editar-button').attr("ng-click", "clickToOpen(e)");
                $(copy).children('.crear-button').attr("id", "crear" + contador);
                $(copy).children('.crear-button').attr("ng-click", "crear(e)");


                id=$(copy).attr("id")

                angular.element(document.getElementById('fila110'))
                        .append($compile(copy)(scope));

               // todosElementos.push({elemento:elementosave});
                todosElementos.push({elemento: document.getElementById(id).innerHTML})
                storageLista.guardarlista(todosElementos,'TodosElementos')
                contador += 1;
            })
        }
    }

}])


.directive('fileInput',function($parse){
    return {
        restrict: "EA",
        template: "<input type='file' />",
        replace: true,
        link: function (scope, element, attrs) {

            var modelGet = $parse(attrs.fileInput);
            var modelSet = modelGet.assign;
            var onChange = $parse(attrs.onChange);

            var updateModel = function () {
                scope.$apply(function () {
                    modelSet(scope, element[0].files[0]);
                    onChange(scope);
                });
            };

            element.bind('change', updateModel);
        }
    };

})



