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

  function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("msg").value = "";
  }
  function getData(){firebase.database().ref("/"+room_name).on('value',
  function (snapshot) {document.getElementById("output").innerHTML = "";
  snapshot.forEach(function(childSnapshot){
    childKey = childSnapshot.key;
    childData = childSnapshot.val() ;
    if(childKey !="purpose"){
        firebase_message_id = childKey;
        message_data = childData;
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Me gusta: "+ like +"</span></button><hr>";

    row = name_with_tag + message_with_tag +like_button + span_with_tag;       
    document.getElementById("output").innerHTML += row;
    }
  });
});

  }
  getData();