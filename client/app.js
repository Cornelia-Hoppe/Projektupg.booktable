//api root
const rootURL = "http://localhost:5000/api/";

// new post
const newPost = async () => {
    const Firstname = document.querySelector("#booking-firstname").value;
    const Email = document.querySelector("#booking-email").value;
    const Phonenumber = document.querySelector("#booking-phonenumber").value;
    const Additionalinfo = document.querySelector("#booking-content").value;

const post = {
    Firstname,
    Email,
    Phonenumber,
    Additionalinfo,
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
  getPosts();/*
  showResponseMessage(data.message.msgBody);

  document.querySelector("#booking-firstname").value = "";
  document.querySelector("#pbooking-email").value = "";
  document.querySelector("#booking-phonenumber").value = "";
  document.querySelector("#booking-content").value = ""; */
}; 

const getPosts = async () => {
  const res = await fetch(`${rootURL}getposts`);
  const data = await res.json();
  posts = data.posts;
  document.querySelector("#booked-tables").innerHTML = posts
  .map(
    (post) => `
  <div>
      <p id="': ${post._id}'-firstname">Booked by: ${post.firstname}</p>
      <p id="': ${post._id}'-email">Sent from: ${post.email}</p>
      <p id="': ${post._id}'-phonenumer">Phone: ${post.phonenumber}</p>
      <p id="': ${post._id}'-additionalinfo">Additional info: <br> (Gluten/Lactose/Vegetarian) ${post.additionalinfo}</p>
      <form onsubmit="updatePost('${post._id}'); return false;" >
          <input id="update-post-'${post._id}'-title" placeholder="Title">
          <input id="update-post-'${post._id}'-content" placeholder="Content">
          <button type="submit">Update</button>
      </form>
      <button onclick="deletePost('${post._id}')">Delete</button>
  </div>
  `
  )
  .join("");

};

const updatePost = async (id) => {
const firstname = docuemnt.getElementById(`update-post-'${id}'firstname`).value;
const email = docuemnt.getElementById(`update-post-'${id}'email`).value;

const post = {
}
}



window.addEventListener("load", getPosts);