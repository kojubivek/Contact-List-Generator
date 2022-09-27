const apiUrl = "https://randomuser.me/api/?";

let userList = [];

const displayElm = document.querySelector("#list");

const fetchUsers = (params = "results=20") => {
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      display(data.results);
      userList = data.results;
    })
    .catch((error) => {
      console.log(error);
    });
};

const display = (user) => {
  let str = "";
  user.map((element, i) => {
    str += `
    <div class="card" style="width: 18rem">
    <img src="${element.picture.large}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${element.name.title} ${element.name.first}
      ${element.name.last}</h5>
      <p class="card-text">
      <ul class='list-unstyled'>
      <li><i class="fa-solid fa-mobile ml-2"></i>${element.phone}</li>
      <li><i class="fa-solid fa-envelope ml-2"></i>${element.email}</li>
      <li><i class="fa-regular fa-calendar-days ml-2"></i>${element.dob.date}</li>
      <li><i class=" fa-solid fa-house ml-2"></i>${element.location.street.number} ${element.location.street.name}${element.location.postcode}${element.location.state}</li>
      </ul>
      </p>
    </div>
  </div>

        `;

    document.querySelector("#count").innerText = user.length;
  });
  displayElm.innerHTML = str;
};

fetchUsers();

const handleOnChange = (e) => {
  const params = "results=20&gender=" + e.value;
  fetchUsers(params);
};

const handelOnSearch = (e) => {
  const str = e.value;
  const filteredUser = userList.filter((item) => {
    const userName = item.name.first + item.name.last;

    return userName.toLowerCase().includes(str.toLowerCase());
  });

  display(filteredUser);
};
