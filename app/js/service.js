angular.module('app.service',[])
    .service('storageLista',['$window',function (win) {


        this.guardarlista=function(data,name) {
            sessionStorage.setItem(name, JSON.stringify(data));
        }
        this.removelista=function (index,data) {
           data.splice(index,1);
        }
        this.listadatos=function(name){
            var data = JSON.parse(sessionStorage.getItem(name));
            return data;
        }

    }])
    .service('dbelemento',function($mdToast,$http){
       var  elementos1=[];
        this.guardarelemento=function(elemento){
            $http.post('/elemento',({
                idform      :elemento.nombreformularioid,
                nameform    :elemento.nombreformulario,
                dateform    :elemento.dateform,
                idelement   :elemento.idelement,
                element     :elemento.elementos,

            }))
                .then(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('dato guardado')
                            .hideDelay(1000)
                            .position('top right')
                    );
                })
                .catch(function(err){
                    console.log('Error: ' + err);
                })

        }
        this.mostrarall=function () {
            $http.get('/elemento')
                .then(function (data) {
                    console.log(data)
                    return data;
                })
                .catch(function (err) {
                    console.log('Error: ' + err);
                })
        }
    })
    .service('dbejemplo',function($mdToast,$http,$q){

        this.saveejemplo=function(elemento){
            $http.post('/ejemplo',({
                nombre    :elemento.nombre,
                apellido    :elemento.apellido,

            }))
                .then(function () {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('dato guardado')
                            .hideDelay(1000)
                            .position('top right')
                    );
                })
                .catch(function(err){
                    console.log('Error: ' + err);
                })

        }
        this.obtnertodos=function () {
            var defered = $q.defer();
            var promise = defered.promise;
            
            $http.get('/ejemplo')
                .then(function (data) {
                    defered.resolve(data);
                })
                .catch(function (err) {
                    defered.reject(err)
                })
            return promise;
        }
        this.updatedato=function (datos) {
            var defered = $q.defer();
            var promise = defered.promise;
            console.log(datos._id)
            console.log(datos.nombre+"_____"+datos.apellido)
            $http.post('/ejemplo/'+datos._id,({
                nombre    :datos.nombre,
                apellido    :datos.apellido,

            }))
                .then(function (data) {
                    defered.resolve(data);
                })
                .catch(function (err) {
                    defered.reject(err)
                })
            return promise;

        }
        this.eliminardatos=function(datos){
            console.log("eliminar")
            var defered = $q.defer();
            var promise = defered.promise;
            console.log(datos._id)
            $http.post('/ejemplo/eliminar/'+datos._id)
                .then(function (data) {
                    defered.resolve(data);
                })
                .catch(function (err) {
                    defered.reject(err)
                })
            return promise;

        }



    })
    .factory('fileReader',function($q, $log){
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };
        return {
            readAsDataUrl: readAsDataURL
        };

    })


