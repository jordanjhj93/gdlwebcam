var api = 'AIzaSyB8FS3r928roNn_UNlD_RCL-cfHHoopxWg';

var map;

function initMap() {
    var latlng = {
        lat:10.1911674,
        lng: -67.9312386        
    };
    
    var map = new google.maps.Map(document.getElementById('mapa'), {
        'center': latlng,
        'zoom': 14,
        'mapTypeId': google.maps.MapTypeId.ROADMAP,
        //'draggable': false
        });
    
    var marker = new google.maps.Marker({
        position:latlng,
        map: map,
        title: 'GDLWEBCAMP'
    });
    
    var contenido = '<h2>GDLWEBCAMP</h2>'+
        '<p>Del 18 al 20 de Mayo</p>'+
        '<p>Visitanos!</p>'
    
    var info = new google.maps.InfoWindow({
       content : contenido
    });
    
    marker.addListener('click',function(){
        info.open(map, marker);
        
    });
}


(function(){
    
    "use strict";
    var regalo = document.getElementById('regalo');
    
    document.addEventListener('DOMContentLoaded', function(){
       
        //campos datos usuarios
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');
        
        //campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');
        
        //botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');
        
        //extras
        var etiquetas = document.getElementById('etiquetas');
        var camisas = document.getElementById('camisa_evento');
        
        
        calcular.addEventListener('click',calcularMontos);
        pase_dia.addEventListener('blur',mostrarDias);
        pase_dosdias.addEventListener('blur',mostrarDias);
        pase_completo.addEventListener('blur',mostrarDias);
        
        nombre.addEventListener('blur',validarCampos);
        apellido.addEventListener('blur',validarCampos);
        email.addEventListener('blur',validarCampos);
        email.addEventListener('blur',validarMail);
        
        function validarCampos(){
            
            if(this.value ==''){
                
                errorDiv.style.display='block';
                errorDiv.innerHTML ="*Este campo es obligatorio";
                this.style.border = '1px solid red';
                
                
            }
            else{
                errorDiv.style.display='none';
                this.style.border = '1px solid #cccccc';
            }
            
        }
        
        function validarMail(){
            
    
            if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(this.value)){
                errorDiv.style.display='none';
                this.style.border = '1px solid #cccccc';
            }
            else{
                errorDiv.style.display='block';
                errorDiv.innerHTML ="*Direccion de correo no válida";
                this.style.border = '1px solid red';
            }
        }
        
        
        
        function calcularMontos(event){
            event.preventDefault();
            if(regalo.value === ''){
                alert('Disculpe, debe elegir un regalo');
                regalo.focus();
            }
            else{
                var boletosDia = parseInt(pase_dia.value,10)||0, 
                    boletos2Dias = parseInt(pase_dosdias.value,10)||0, 
                    boletosCompleto = parseInt(pase_completo.value,10)||0,
                    cantEtiquetas = parseInt(etiquetas.value,10)||0,
                    cantCamisas = parseInt(camisas.value,10)||0;
                
                var totalPagar = boletosDia*30+boletos2Dias*45+boletosCompleto*50+(cantCamisas*10*0.93)+cantEtiquetas*2; 
                console.log(totalPagar);
                
                var listadoProductos = [];
                
                if(boletosDia >=1){
                    listadoProductos.push(boletosDia + ' Pase(s) por Día');
                }
                if(boletos2Dias >=1){
                    listadoProductos.push(boletos2Dias + ' Pase(s) por 2 Días');
                }
                if(boletosCompleto >=1){
                    listadoProductos.push(boletosCompleto + ' Pase(s) Completos');
                }
                if(cantEtiquetas >=1){
                    listadoProductos.push(cantEtiquetas + ' Etiqueta(s)');
                }
                if(cantCamisas >=1){
                    listadoProductos.push(cantCamisas + ' Camisa(s)');
                }
                
                lista_productos.style.display="block";
                lista_productos.innerHTML='';
                for(var i=0; i<listadoProductos.length;i++ ){
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                }
                
                suma.innerHTML = "$" + totalPagar.toFixed(2);
               
                
                
                
            }
        }
        
        function mostrarDias(event){
            
            var boletosDia = parseInt(pase_dia.value,10)||0, 
                boletos2Dias = parseInt(pase_dosdias.value,10)||0, 
                boletosCompleto = parseInt(pase_completo.value,10)||0;
            
            var diasElegidos = [];
            
            if(boletosDia>0){
                diasElegidos.push('viernes');
            }
            else{
                document.getElementById('viernes').style.display='none';
 
            }
            if(boletos2Dias>0){
                diasElegidos.push('viernes','sabado');
            }
            else{
                document.getElementById('viernes').style.display='none';
                document.getElementById('sabado').style.display='none';
 
            }
            if(boletosCompleto>0){
                diasElegidos.push('viernes','sabado','domingo');
            }
            else{
                document.getElementById('viernes').style.display='none';
                document.getElementById('sabado').style.display='none';
                document.getElementById('domingo').style.display='none';
            }
            
            for(var i=0; i<diasElegidos.length; i++){
                document.getElementById(diasElegidos[i]).style.display='block';
            }
            
            
        }
        
    });
    
})();