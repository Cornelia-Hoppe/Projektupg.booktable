// Api root
const rootURL = "http://localhost:5000/api/";

let posts = [];


// Here our function waits for promise from fetch, once it's resolved it then continues to set res/constant. 
// When that is finished it then makes progress towards the next line of code.
const getPosts = async () => {
//where we call for the end point getpost in API.js and gets a result (res), it comes as json.
  const res = await fetch(`${rootURL}getposts`);
//To be able to work whit it we have to formate it from json (res.json) to javascript (data)
  const data = await res.json();
  posts = data.posts;
  document.querySelector("#booked-tables").innerHTML = posts
  //then map the data, and some buttons for our update and delete functions and a form for our update function.
  .map(
    (post) => `
  <div class="booking-form">
      <p id="': ${post._id}'-firstname">Booked by: ${post.firstname}</p>
      <p id="': ${post._id}'-email">Sent from: ${post.email}</p>
      <p id="': ${post._id}'-phonenumer">Phone: ${post.phonenumber}</p>
      <p id="': ${post._id}'-additionalinfo">Additional info: <br> (Gluten/Lactose/Vegetarian) ${post.additionalinfo}</p>
      <form onsubmit="updatePost('${post._id}'); return false;" >
          <input type="update-text" id="update-post-'${post._id}'-additionalinfo" placeholder="Additional info">
          <button type="submit">Update</button>
      </form>
      <button onclick="deletePost('${post._id}')">Delete</button>
  </div>
  `
  )
  .join("");
};

// Response message
// Here we target our message and display it on our page once a booking has been made.
// A string of text will appear (message) for 2 seconds through our settimeout function. 
const showResponseMessage = (message) => {
  document.querySelector("#booking-message").innerHTML = message;
  setTimeout(() => {
    document.querySelector("#booking-message").innerHTML = "";
  }, 2000);
};

// Here we make a new promise through async. We then target our classes and turn it to an object array. 
const newPost = async () => {
    const firstname = document.querySelector("#booking-firstname").value;
    const email = document.querySelector("#booking-email").value;
    const phonenumber = document.querySelector("#booking-phonenumber").value;
    const additionalinfo = document.querySelector("#booking-content").value;

const post = { //object array
    firstname,
    email,
    phonenumber,
    additionalinfo,
};

// //We call for the endpoint newpost in API.js and uses the post method to send the data,
//stringify to convert javascript to json and then use headers so cors can read and the reciver know what kind of data it is.
const res = await fetch(`${rootURL}newpost`, {
    method: "post",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  getPosts();
  
  showResponseMessage(data.message.msgBody);
//Clears the form
  document.querySelector("#booking-firstname").value = "";
  document.querySelector("#booking-email").value = "";
  document.querySelector("#booking-phonenumber").value = "";
  document.querySelector("#booking-content").value = ""; 
}; 

// Update post
//Gets id from from onsubmit="updatePost" (stated futher up in getPost) so it knows where to update.
const updatePost = async (id) => {
const additionalinfo = document.getElementById(`update-post-'${id}'-additionalinfo`).value;

//If additionalinfo is falsy (empty string) then the additional info is the id from the getPost booking-form (stated futher up) additional info id.
const post = {
additionalinfo: additionalinfo
? additionalinfo 
 : document.getElementById(`"${id}"-additionalinfo`).innerHTML,
};
//When api function for update post is done it save the information in const res as json. 
const res = await fetch(`${rootURL}updatepost/${id}`, {
  method: "put",
  body: JSON.stringify(post),
  headers: {
    "Content-Type": "application/json",
  },
});
// then we convert the json to javascript so we can use and display it. And then a getPost to get all the data and the showResponsMessage from the api.
const data = await res.json();
getPosts();
showResponseMessage(data.message.msgBody);
};

// Delete post
//We call for the endpoint (fetch) deletepost in API.js and uses the delete post method to delete the data with corresponding id,
const deletePost  = async (id) => {
  const res = await fetch (`${rootURL}deletepost/${id}`, {
    method:"delete",
  });

  const data = await res.json();
  getPosts();
  showResponseMessage(data.message.msgBody);
};

//A function that loads getPosts.
window.addEventListener("load", getPosts);