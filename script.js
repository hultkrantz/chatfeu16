var userName = document.getElementById("userName")
	, loginButton = document.getElementById("loginButton")
	, chatWindow = document.getElementById("chatWindow")
	, sendChatInput = document.getElementById("sendChatInput")
	, chatInput = document.getElementById("chatInput")
	, messageToUser = document.getElementById("messageToUser");
/////////////////////
//////functions//////
/////////////////////
let userLogin = function () {
		console.log("inside userLogin")
		if (userName.value === "") {
			console.log(userName.innerHTML)
			messageToUser.innerHTML = "Not a valid username";
			messageToUser.style.color = "red";
		}
		else {
			localStorage.setItem('loggedinUser', userName.value);
			messageToUser.innerHTML = "Loged in";
			messageToUser.style.color = "green";
			loginButton.innerHTML = "Logout"
			console.log("Item set to localstorage: " + userName.value)
		}
	}
	/*let userLogout = function(){
		if()
	}*/
	///
let pushMessage = function () {
	let message = chatInput.value;
	let loggedinUser = localStorage.getItem("loggedinUser");
	console.log(loggedinUser);
	firebase.database().ref("messages").push({
		message: message
		, user: loggedinUser
	})
}
let displayMessage = function (messages) {
	for(let key in messages) {
		console.log(messages[key].message)
		//add messages to chatWindow
		//appendChild
	}
}
	/////////////////////
	/////////event///////
	/////////////////////
loginButton.addEventListener("click", function (event) {
	userLogin();
});
sendChatInput.addEventListener("click", function (vent) {
	pushMessage();
	displayMessage();
})

firebase.database().ref('messages/').on('value', function(snapshot) {
    let data = snapshot.val();
    let key  = snapshot.key;
	console.log(data);
	displayMessage(data);
});
