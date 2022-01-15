var firebaseConfig = {
    apiKey: "AIzaSyBRvetMGPrdfIT-bKrirmtWMQmorQ0ElVU",
    authDomain: "examen-master.firebaseapp.com",
    databaseURL: "https://examen-master.firebaseio.com",
    projectId: "examen-master",
    storageBucket: "examen-master.appspot.com",
    messagingSenderId: "913806402097",
    appId: "1:913806402097:web:eac0932885dc006f69eb10",
    measurementId: "G-63FL1VR0V6"
  };
	var DB;
	var Examenes;
	var Log;
	var Hoy;
	var Fecha
	var Hora;
	var snapshot;
	var ul;
	var ul2;
	var li;
	var Nuevali;
	var Titulo;
	var Subtitulo;
	var NoPreguntas;
	var ElementosClonados=0;
	var ID;//Uso para insercion y consulta aislada
  // Initialize Firebase
//Conectar a BD
	console.log("Iniciando firebase");
	try{
	firebase.initializeApp(firebaseConfig);
	console.log("firebase se inicio");
	console.log("Iniciando base de datos");
	DB= firebase.database().ref().child("/ExamenMasterApp/DB");
	console.log("base de datos se inicio");
		console.log("Seleccionando el directorio  Examenes");
	Examenes=DB.child("Examenes");
		console.log("El directorio se selecciono");
	}catch(Error){
		console.log("Error en firebase "+Error.name+"\n"+Error.message);
	}
	
	ul=document.getElementById("ListaExamenes");
	li=document.getElementsByClassName("Examen");
	Titulo=document.getElementsByClassName("Titulo");
	Subtitulo=document.getElementsByClassName("Subtitulo");
	NoPreguntas=document.getElementsByClassName("NoPreguntas");
	
	Examenes.once("value", function(snap){
		try{
		var llave;
		var obj;
		var json;
		//obteniendo objeto generado por Firebase
		obj=snap.val();
		//Generando arreglo con las llaves de acceso a los examenes
		var ids = Object.getOwnPropertyNames(obj);
		////Generando el numero de elementos
		//var Num = Object.getOwnPropertyDescriptor(obj).length;
		//Comvirtiendo a cadena
		obj = JSON.stringify(obj);
		//Comvirtiendo a objeto legible
		json=JSON.parse(obj);
		

		//Resta 1 a i, no se toma en cuenta el objeto muestra Examen 
		var i=ids.length;
		i--;
		var j=0;
		//Resta 1 DE NUEVO para usar i como indice del arreglo
		i--;
		console.log("Iniciando iteracion DO WHILE");
		do{
			//Pasando la llave como id
			li.item(j).setAttribute("id",ids[i]);
			console.log("El indice es "+i);
			console.log(ids[i]);
			//COndicion Si i es 0 significa que no se necesita crear un nuevo elemento
			//por que se ha llegado al final del arreglo
			if (i>0){
			Nuevali=li.item(j).cloneNode(true);
			ul.appendChild(Nuevali);
			}
			i--;
			j++;
		}while(i>=0);
		
		//obteniendo llave de elemento clickeado
		//Para colocarlos en los items
			for (var k=0;k<li.length;k++){
				//Obteniendo llave
				llave=li.item(k).getAttribute("id");
				//Escribiendo titulo
				Titulo.item(k).innerHTML=json[llave]["Titulo"];
				//Escribiendo subtitulo
				Subtitulo.item(k).innerHTML=json[llave]["Subtitulo"];
				//Poniendo num preguntas basado en el arreglo segun la pos de la llave
				var num =Object.getOwnPropertyNames(json[llave]["Preguntas"]).length;
				//Escribiendo num de preguntas
				NoPreguntas.item(k).innerHTML=num;
			}
		//Agregando agentes de escucha a la clase
			console.log("Agregando agentes de escucha");
			//Este for agrega un agente a cada elemento de la clase	
			for(var l=0;l<li.length;l++){
					li.item(l).addEventListener("click",function(){
					//Este codigo se ejecuta con cada click de li
					console.log("La clave es "+this.getAttribute("id"));
					//Desactivando el elemento seleccionado previo
					for (var k=0; k<li.length;k++){
						li.item(k).classList.remove("Seleccionado");
					}
					//Activando botones de operaciones con BD
					this.classList.add('Seleccionado');
					document.getElementsByClassName('btn_Aplicar').item(0).classList.add('Seleccionado');
					document.getElementsByClassName('btn_Eliminar').item(0).classList.add('Seleccionado');
					document.getElementsByClassName('btn_Editar').item(0).classList.add('Seleccionado');
					//Generando turno
					//Escritura de ID de trabajo
					var ID=this.getAttribute("id");
					sessionStorage.setItem('Titulo', json[ID]['Titulo']);
					sessionStorage.setItem('EliminarExamen', ID);
					sessionStorage.setItem('EditarExamen', ID);
					sessionStorage.setItem('AplicarExamen', ID);
					
					document.getElementById('EliminarExamen').innerHTML=sessionStorage.getItem('Titulo');
					//Enviendo la clave seleccionada a la DB
					//Esta clave sera consultada en futuras operaciones
					//var id=this.getAttribute("id");
					});//Fin de agente de escucha
				}//fin del for explorador
		}catch(Error){
			if(Error.message=="Cannot read property 'Titulo' of undefined"){
				console.log("No hay Examenes en la DB");
				Titulo.item(0).innerHTML="No hay Examenes";
				Subtitulo.item(0).innerHTML="en la DB";
				NoPreguntas.item(0).innerHTML=0;
			}
			
		}
	});//Fin metodo on
//Generando fecha y hora
	function HoraFecha(){
	Hoy=new Date;
	Fecha= Hoy.getDate()+"-"+(Hoy.getMonth()+1)+"-"+Hoy.getFullYear();
	Hora= Hoy.getHours()+":"+Hoy.getMinutes()+":"+Hoy.getSeconds();
	var HoraYFecha= Hora+""+Fecha;
	console.log("La fecha y hora "+HoraYFecha);
	return HoraYFecha;
	}
	//function EliminarExamen(){}
function EliminarExamen(){
	var Eliminar=sessionStorage.getItem('EliminarExamen');
	var Div= document.getElementById(Eliminar);//Senalando al div a eliminar
	try{//Para la DB
	if (!Div&&!Eliminar){//Para el Div
		console.log("El elemento selecionado no existe");
	} else {
		Examenes.child(Eliminar).remove();//Eliminando de DB
		var Divpadre = Div.parentNode;//Senalando el div padre
		Divpadre.removeChild(Div);//Eliminando de la Interfaz
		sessionStorage.clear;//Limpiando sessonStorage
		for (var k=0; k<li.length;k++){
			//Eliminado la seleccion de algun elemento
			li.item(k).classList.remove("Seleccionado");
		}
		//Deshabilitando botones
		document.getElementsByClassName('btn_Aplicar').item(0).classList.remove('Seleccionado');
		document.getElementsByClassName('btn_Eliminar').item(0).classList.remove('Seleccionado');
	}
	}catch(Err){console.log("Error al Eliminar"+Err.message); }
	console.log('Eliminando '+Eliminar);
}