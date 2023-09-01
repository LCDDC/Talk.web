var firebaseConfig = {
    apiKey: "AIzaSyAWvx74BwCuMp2V65DyZaiIYnS48MDxKRA",
    authDomain: "talk-web-2cb85.firebaseapp.com",
    databaseURL: "https://talk-web-2cb85-default-rtdb.firebaseio.com",
    projectId: "talk-web-2cb85",
    storageBucket: "talk-web-2cb85.appspot.com",
    messagingSenderId: "415942855404",
    appId: "1:415942855404:web:1f2bfafad8c63f77bb33c9"
  };
  firebase.initializeApp(firebaseConfig);
  user_name=localStorage.getItem("user_name");
  room_name=localStorage.getItem("room_name");

  document.getElementById("user_name").innerHTML="Hi "+user_name+"!";

  function addRoom(){
    room_name=document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose:"adding room name"
    });
    localStorage.setItem("room_name",room_name);
    window.location.replace("talk_web_page.html");
  }
  function getRoom(){
    firebase.database().ref("/").on('value',function(snapshot){
        document.getElementById("output").innerHTML="";
        snapshot.forEach(function(childSnapshot){
            childKey=childSnapshot.key;
            Room_names=childKey;
            console.log("room_name"+Room_names);
            row="<div class='room_name' id="+ Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names +"</div><hr>";
            document.getElementById("output").innerHTML +=row;
        });
    });
  }
  
  getRoom();

  function logout(){
    localStorage.removeItem("user_name")
    localStorage.removeItem("room_name")
    window.location.replace("index.html");
  }
  function redirectToRoomName(Room_names){
    console.log(Room_names);
    localStorage.setItem("room_name", Room_names);
    window.location="talk_web_page.html";
  }