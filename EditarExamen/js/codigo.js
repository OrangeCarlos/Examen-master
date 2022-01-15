
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
//Variables
var DB;
var KEY=sessionStorage.getItem('EditarExamen');

//Esta seccion se necesita ejecutar cada que auente las preguntas
//el selector query solo consulta 1 vez
var Contenedor=document.querySelector('#Contenedor');
var Pregunta=document.querySelector('div.Pregunta');
var Preguntas=document.querySelectorAll('div.Pregunta');
var Titulo=document.querySelector('input.Titulo');
var Subtitulo=document.querySelector('input.Subtitulo');
var Texto=document.querySelectorAll('textarea.Texto');
var OpcionA=document.querySelectorAll('input.OpcionA');
var A=document.querySelectorAll('input.A');
var OpcionB=document.querySelectorAll('input.OpcionB');
var B=document.querySelectorAll('input.B');
var OpcionC=document.querySelectorAll('input.OpcionC');
var C=document.querySelectorAll('input.C');
var OpcionD=document.querySelectorAll('input.OpcionD');
var D=document.querySelectorAll('input.D');
var Numero=document.querySelectorAll('b.Numero');
var Numerador=document.querySelectorAll('b.Numerador');
//Aqui termina el acceso de obj por selector query

var Snapshot;
var NumeroPreguntas;
var KEYPreguntas;
const CopiarPregunta=document.querySelector('div.Pregunta');
var PreguntaSiguiente=CopiarPregunta.cloneNode(true);
	//console.log(PreguntaSiguiente);		
// Initialize Firebase
//Conectar a BD
	console.log("Iniciando firebase");
	try{
	firebase.initializeApp(firebaseConfig);
	console.log("firebase se inicio");
	console.log("Iniciando base de datos");
	DB= firebase.database().ref().child("/ExamenMasterApp/DB");
	console.log("base de datos se inicio");
	//console.log("Seleccionando el directorio  Examenes");
	//Examenes=DB.child("Examenes");
	//	console.log("El directorio se selecciono");
	}catch(Error){
		console.log("Error en firebase "+Error.name+"\n"+Error.message);
	}
	//DB iniciada
//KEY='-MBkoDINjBpCpQc_l9dn';
KEY=sessionStorage.getItem('EditarExamen');
DB.child('Examenes/'+KEY).once('value',function(snapshot){
	Snapshot=snapshot.val();
	CargarDatos(Snapshot);
});

 
function CargarDatos(Snapshot){
	//console.log(Snapshot);
	Titulo.value=Snapshot.Titulo;
	Titulo.addEventListener('change',function(){
		//Cuando cambie el texto de Campo
		Actualizar('Titulo',Titulo.value);
		//console.log('Campo Actualizado');
	});
	Subtitulo.value=Snapshot.Subtitulo;
	Subtitulo.addEventListener('change',function(){
		//Cuando cambie el texto de Campo
		Actualizar('Subtitulo',Subtitulo.value);
	});
	//Cargando preguntas
	KEYPreguntas=Snapshot.Preguntas;
	KEYPreguntas=Object.getOwnPropertyNames(KEYPreguntas);
	//console.log(KEYPreguntas);
	Snapshot=JSON.stringify(Snapshot.Preguntas);
	Snapshot=JSON.parse(Snapshot);
	NumeroPreguntas=KEYPreguntas.length;
	//console.log(NumeroPreguntas);
	
	if (NumeroPreguntas>0){
		//console.log(OpcionA.length);
		for(var i=1;i<=NumeroPreguntas;i++){
			PreguntaSiguiente=PreguntaSiguiente.cloneNode('true');
			Contenedor.appendChild(PreguntaSiguiente);
			//console.log('clonada la i '+i);
		}
		RefreshSelector();
		for(var i=0;i<=NumeroPreguntas;i++){
			OpcionA.item(i).setAttribute('name','P'+(i+1));
			OpcionB.item(i).setAttribute('name','P'+(i+1));
			OpcionC.item(i).setAttribute('name','P'+(i+1));
			OpcionD.item(i).setAttribute('name','P'+(i+1));
		}
		
		
		for(var i=0;i<NumeroPreguntas;i++){
			
			Preguntas.item(i).setAttribute('id',KEYPreguntas[i]);
			Numerador.item(i).innerHTML=(i+1);
			Numero.item(i).innerHTML=NumeroPreguntas;
			Texto.item(i).value=Snapshot[KEYPreguntas[i]]['Texto'];
			
			Texto.item(i).addEventListener('change',function(){
				var ID=this.parentElement.getAttribute('id');
				ActualizarPregunta(ID,'Texto',this.value);
				this.style.border='solid 2px green';
			});
			//autosize(document.querySelectorAll('textarea.Texto'));
			A.item(i).value=Snapshot[KEYPreguntas[i]]['A'];
			A.item(i).addEventListener('change',function(){
				//Referenciado Para acceder a Elementopadre principal
				//que contenga la clave
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'A',this.value);
				this.style.border='solid 2px green';
			});
			B.item(i).value=Snapshot[KEYPreguntas[i]]['B'];
			B.item(i).addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'B',this.value);
				this.style.border='solid 2px green';
			});
			C.item(i).value=Snapshot[KEYPreguntas[i]]['C'];
			C.item(i).addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'C',this.value);
				this.style.border='solid 2px green';
			});
			D.item(i).value=Snapshot[KEYPreguntas[i]]['D'];
			D.item(i).addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'D',this.value);
				this.style.border='solid 2px green';
			});
			//console.log('Pregunta '+(i+1));
			//console.log('Texto '+Snapshot[KEYPreguntas[i]]['Texto']);
			//console.log('A '+Snapshot[KEYPreguntas[i]]['A']);
			//console.log('B '+Snapshot[KEYPreguntas[i]]['B']);
			//console.log('C '+Snapshot[KEYPreguntas[i]]['C']);
			//console.log('D '+Snapshot[KEYPreguntas[i]]['D']);
			
			var Respuesta=Snapshot[KEYPreguntas[i]]['Respuesta'];
			console.log('la respuesta es '+Respuesta);
			switch(Respuesta){
				case 'A':OpcionA.item(i).checked=true;break;
				case 'B':OpcionB.item(i).checked=true;break;
				case 'C':OpcionC.item(i).checked=true;break;
				case 'D':OpcionD.item(i).checked=true;break;
			}
			OpcionA.item(i).addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				for(var j=0;j<document.querySelectorAll('li').length;j++){
					document.querySelectorAll('li').item(j).style.background='rgba(0,0,0,0)';
				}
				li.style.background='green';
			});
			OpcionB.item(i).addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				li.style.background='green';
			});
			OpcionC.item(i).addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				li.style.background='green';
			});
			OpcionD.item(i).addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				li.style.background='green';
			});
			var BotonEliminar=document.querySelectorAll('input.BotonEliminar').item(i);
			BotonEliminar.addEventListener('click',function(){
				var divbtn=this.parentElement;
				var divPreg=divbtn.parentElement;
				var id=divPreg.getAttribute('id');
				console.log(id);
				EliminarPregunta(id);
			});
		}
		//Cambiando Numeradores
		document.querySelectorAll('b.Numerador').item(NumeroPreguntas).innerHTML=NumeroPreguntas+1;
		document.querySelectorAll('b.Numero').item(NumeroPreguntas).innerHTML=NumeroPreguntas+1;
	}
	autosize(document.querySelectorAll('textarea'));
	RefreshSelector();
	//console.log(Texto.length);
}

function Actualizar(Campo,Valor){
	var str='{"'+Campo+'":"'+Valor+'"}';
	str=JSON.parse(str);
	//str=JSON.stringify(str);
	console.log('Campo '+Campo+' actualizado con '+Valor);
	console.log(str);
	DB.child('Examenes/'+KEY).update(str);
	
}
function ActualizarPregunta(ID,Campo,Valor){
	var str='{"'+Campo+'":'+'"'+Valor+'"}';
	str=JSON.parse(str);
	//str=JSON.stringify(str);
	DB.child('Examenes/'+KEY+'/Preguntas/'+ID).update(str);
	console.log('Campo '+Campo+' con KEY '+ID+' actualizado');
}

function AgregarPregunta(){
	var Correcta;
	
	var i=NumeroPreguntas;
	console.log('i vale '+i);
	var Text=Texto.item(i);
	var TextA=A.item(i);
	var TextB=B.item(i);
	var TextC=C.item(i);
	var TextD=D.item(i);
	var RadioA=OpcionA.item(i);
	var RadioB=OpcionB.item(i);
	var RadioC=OpcionC.item(i);
	var RadioD=OpcionD.item(i);
	
	if(RadioA.checked){Correcta='A';}
	if(RadioB.checked){Correcta='B';}
	if(RadioC.checked){Correcta='C';}
	if(RadioD.checked){Correcta='D';}
	
	var txt=Text.value;
	var txta=TextA.value;
	var txtb=TextB.value;
	var txtc=TextC.value;
	var txtd=TextD.value;
	if(txt.length>0&&txta.length>0&&txtb.length>0&&txtc.length>0&&txtd.length&&(RadioA.checked|RadioB.checked|RadioC.checked|RadioD.checked)){
		PreguntaSiguiente=PreguntaSiguiente.cloneNode(true);
		//console.log(PreguntaSiguiente);
		console.log(Correcta);
		
		var KEYP=DB.child('Examenes/'+KEY+'/Preguntas').push().key;
		
		DB.child('Examenes/'+KEY+'/Preguntas/'+KEYP).set({
			Texto:txt,
			A:txta,
			B:txtb,
			C:txtc,
			D:txtd,
			Respuesta:Correcta
		});
		console.log('Datos agregados');
		console.log('Y la llave de la pregunta es '+KEYP);
		//Notificando al usuario el alta de la pregunta
		Text.style.border='Solid 2px green';
		TextA.style.border='Solid 2px green';
		TextB.style.border='Solid 2px green';
		TextC.style.border='Solid 2px green';
		TextD.style.border='Solid 2px green';
		
		if(RadioA.checked){var li=RadioA.parentElement; li.style.background='green';}
		if(RadioB.checked){var li=RadioB.parentElement; li.style.background='green';}
		if(RadioC.checked){var li=RadioC.parentElement; li.style.background='green';}
		if(RadioD.checked){var li=RadioD.parentElement; li.style.background='green';}
		
		var ul=li.parentElement;
		var divres=ul.parentElement;
		var divpreg= divres.parentElement;
		divpreg.setAttribute('id', KEYP);
		
			Text.addEventListener('change',function(){
				var ID=this.parentElement.getAttribute('id');
				ActualizarPregunta(ID,'Texto',this.value);
				this.style.border='solid 2px green';
			});
			TextA.addEventListener('change',function(){
				//Referenciado Para acceder a Elementopadre principal
				//que contenga la clave
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'A',this.value);
				this.style.border='solid 2px green';
			});
			TextB.addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'B',this.value);
				this.style.border='solid 2px green';
			});
			TextC.addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'C',this.value);
				this.style.border='solid 2px green';
			});
			TextD.addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'D',this.value);
				this.style.border='solid 2px green';
			});
		RadioA.addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				for(var j=0;j<document.querySelectorAll('li').length;j++){
					document.querySelectorAll('li').item(j).style.background='rgba(0,0,0,0)';
				}
				li.style.background='green';
			});
			RadioB.addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				li.style.background='green';
			});
			RadioC.addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				li.style.background='green';
			});
			RadioD.addEventListener('change',function(){
				var li=this.parentElement;
				var ul=li.parentElement;
				var divRes=ul.parentElement;
				var divPreg=divRes.parentElement;
				var ID=divPreg.getAttribute('id');
				ActualizarPregunta(ID,'Respuesta',this.value);
				li.style.background='green';
			});
		var BotonEliminar=document.querySelectorAll('input.BotonEliminar').item(i);
			BotonEliminar.addEventListener('click',function(){
				var divbtn=this.parentElement;
				var divPreg=divbtn.parentElement;
				var id=divPreg.getAttribute('id');
				console.log(id);
				EliminarPregunta(id);
			});
		
		PreguntaSiguiente=CopiarPregunta.cloneNode('true');
		Contenedor.appendChild(PreguntaSiguiente);
		
		NumeroPreguntas++;
		RefreshSelector();
		i=NumeroPreguntas;
		console.log(i);
		Text=Texto.item(i);
		TextA=A.item(i);
		TextB=B.item(i);
		TextC=C.item(i);
		TextD=D.item(i);
		RadioA=OpcionA.item(i);
		RadioB=OpcionB.item(i);
		RadioC=OpcionC.item(i);
		RadioD=OpcionD.item(i);
		Text.value="";
		TextA.value="";
		TextB.value="";
		TextC.value="";
		TextD.value="";
		RadioA.checked=false;
		RadioB.checked=false;
		RadioC.checked=false;
		RadioD.checked=false;
		
		RadioA.setAttribute('name','P'+(i+1));
		RadioB.setAttribute('name','P'+(i+1));
		RadioC.setAttribute('name','P'+(i+1));
		RadioD.setAttribute('name','P'+(i+1));
	}
	}
function RefreshSelector(){
	//Esto actualiza al selector de los cambios
	//Use cuando use clonenode appenchild o cuando agregue un elemento de la matriz de controles
Contenedor=document.querySelector('#Contenedor');
Pregunta=document.querySelector('div.Pregunta');
Preguntas=document.querySelectorAll('div.Pregunta');
//Titulo=document.querySelector('input.Titulo');
//Subtitulo=document.querySelector('input.Subtitulo');
Texto=document.querySelectorAll('textarea.Texto');
OpcionA=document.querySelectorAll('input.OpcionA');
A=document.querySelectorAll('input.A');
OpcionB=document.querySelectorAll('input.OpcionB');
B=document.querySelectorAll('input.B');
OpcionC=document.querySelectorAll('input.OpcionC');
C=document.querySelectorAll('input.C');
OpcionD=document.querySelectorAll('input.OpcionD');
D=document.querySelectorAll('input.D');
Numero=document.querySelectorAll('b.Numero');
Numerador=document.querySelectorAll('b.Numerador');
console.log('Se encontraron '+Preguntas.length+' Preguntas '+Texto.length+' Textos '+A.length+' As '+B.length+' Bs '+C.length+' Cs '+D.length+' Ds ');
}
//Ejecucion primera
//Ejecute cada que une appenchild o agregue un elemento a la matriz de controles
function EliminarPregunta(id){
	//DB.child('Examenes/'+KEY+'/Preguntas/'+)
	//var Eliminar=sessionStorage.getItem('EliminarExamen');
	var Div= document.getElementById(id);//Senalando al div a eliminar
	try{//Para la DB
	if (!Div&&!id){//Para el Div
		console.log("Pregunta no existe");
	} else {
		DB.child('Examenes/'+KEY+'/Preguntas/'+id).remove();//Eliminando de DB
		var Divpadre = Div.parentElement;//Senalando el div padre
		Divpadre.removeChild(Div);//Eliminando de la Interfaz
		NumeroPreguntas--;
		RefreshSelector();
	}
	}catch(Err){console.log("Error al Eliminar"+Err.message); }
	console.log('Eliminando '+id);
}