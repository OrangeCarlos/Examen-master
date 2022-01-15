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
	var Examen;
	var Preguntas;
  // Initialize Firebase
//Conectar a BD
	console.log("Iniciando firebase");
	try{
	firebase.initializeApp(firebaseConfig);
	console.log("firebase se inicio");
	console.log("Iniciando base de datos");
	DB= firebase.database();
	console.log("base de datos se inicio");
		console.log("Seleccionando el directorio de la Examenes");
	Examenes=DB.ref().child('/ExamenMasterApp/DB/Examenes');
		console.log("El directorio se selecciono");
	}catch(Error){
		console.log("Error en firebase "+Error.name+"\n"+Error.message);
	}

function AgregarExamen(Titulo,Subtitulo){
	var IDExamen;
	//try{
	console.log("Generando ID")
	IDExamen=Examenes.push().key;
	console.log("la clave es "+IDExamen);
	console.log("Agregando Examen a DB ID "+IDExamen);
	Examen=Examenes.child(IDExamen);
	Examen.set({
		Titulo:Titulo,
		Subtitulo:Subtitulo
	});
	console.log("Titulo: "+Titulo+"\nSubtitulo: "+Subtitulo);
	console.log("Con ID "+IDExamen);
	
	return IDExamen;
	//}catch(error){
	//	console.log("Error "+error.name+"\n"+error.message);
	//}
}

function AgregarPregunta(id,Texto,A,B,C,D,Respuesta){
	
	console.log("Seleccionando el exmen con la ID"+id);
	Preguntas=Examen.child("Preguntas");
	console.log("EL examen "+id+"se ha seleccionado");
	console.log("Agregando Pregunta a Examen con ID"+id);
	Preguntas.push({
		Texto:Texto,
		A:A,
		B:B,
		C:C,
		D:D,
		Respuesta:Respuesta
	});
	console.log("Texto:"+Texto+"\nA "+A+"\nB "+B+"\nC "+C+"\nD "+D+"\nRespuesta "+Respuesta);
}
 
