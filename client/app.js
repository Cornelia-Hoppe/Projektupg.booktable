// Api root
const rootURL = "http://localhost:5000/api/";

let posts = [];



const getPosts = async () => {
  const res = await fetch(`${rootURL}getposts`);
  const data = await res.json();
  posts = data.posts;
  document.querySelector("#booked-tables").innerHTML = posts
  .map(
    (post) => `
  <div class="booking-form">
      <p id="': ${post._id}'-firstname">Booked by: ${post.firstname}</p>
      <p id="': ${post._id}'-email">Sent from: ${post.email}</p>
      <p id="': ${post._id}'-phonenumer">Phone: ${post.phonenumber}</p>
      <p id="': ${post._id}'-additionalinfo">Additional info: <br> (Gluten/Lactose/Vegetarian) ${post.additionalinfo}</p>
      <form onsubmit="updatePost('${post._id}'); return false;" >
          <input id="update-post-'${post._id}'-firstname" placeholder="Firstname">
          <input id="update-post-'${post._id}'-email" placeholder="Email">
          <button type="submit">Update</button>
      </form>
      <button onclick="deletePost('${post._id}')">Delete</button>
  </div>
  `
  )
  .join("");
};

// Response message
const showResponseMessage = (message) => {
  document.querySelector("#booking-message").innerHTML = message;
  setTimeout(() => {
    document.querySelector("#booking-message").innerHTML = "";
  }, 2000);
};

// New post
const newPost = async () => {
    const firstname = document.querySelector("#booking-firstname").value;
    const email = document.querySelector("#booking-email").value;
    const phonenumber = document.querySelector("#booking-phonenumber").value;
    const additionalinfo = document.querySelector("#booking-content").value;

const post = {
    firstname,
    email,
    phonenumber,
    additionalinfo,
};


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

  document.querySelector("#booking-firstname").value = "";
  document.querySelector("#pbooking-email").value = "";
  document.querySelector("#booking-phonenumber").value = "";
  document.querySelector("#booking-content").value = ""; 
}; 

// Update post 
const updatePost = async (id) => {
const firstname = docuemnt.getElementById(`update-post-'${id}'firstname`).value;
const email = docuemnt.getElementById(`update-post-'${id}'email`).value;

const post = {
}
}


// Delete post

const deletePost  = async (id) => {
  const res = await fetch (`${rootURL}deletepost/${id}`, {
    method:"delete",
  });

  const data = await res.json();
  getPosts();
  showResponseMessage(data.message.msgBody);
};


window.addEventListener("load", getPosts);