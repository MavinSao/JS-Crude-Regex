var name_obj = document.getElementById("name");
var phone_obj = document.getElementById("phone");
var btn_add = document.getElementById("add");
var list_data = document.getElementById("data");
var indexItem = document.getElementById("index");
var id_obj = document.getElementById("id");
var isUpdate = false
var data = []
var id = 1;

//Add Data To Array
btn_add.onclick = (e)=>{
  e.preventDefault()
  if(isUpdate){
    updateData()
  }else{
    addData()
  } 
}

var addData = ()=>{
  var validName = validateName(name_obj.value)
  var validPhone = validatePhone(phone_obj.value)
  if (validName&&validPhone){
    var person = {id:id,name:name_obj.value,phone:phone_obj.value}
    data.push(person)
    id++;
    load()
    clear()
  }
}

var clear = ()=>{
  name_obj.value = "";
  phone_obj.value = "";
}

//Edit Item
var editItem = (thisItem)=>{  
  isUpdate = true  
  btn_add.innerHTML = "Update" 
  let child = thisItem.parentNode.parentNode.childNodes
  var index = child[1].innerText
  var id = child[3].innerText
  var name = child[5].innerText
  var phone = child[7].innerText

  indexItem.value =  index;
  name_obj.value = name;
  phone_obj.value = phone;
  id_obj.value = id;
}

//Update Data

let updateData = ()=>{
    var validName = validateName(name_obj.value)
    var validPhone = validatePhone(phone_obj.value)
    var updateIndex = indexItem.value
    var updateId = id_obj.value

    console.log("Update Id : " + updateId);
    console.log("Update Index : " + updateIndex);
    
    
    

    if (validName&&validPhone){
      var person = {id:updateId,name:name_obj.value,phone:phone_obj.value}
      //data.splice(1,updateIndex,person)
      data[updateIndex] = person
      console.log("Data: " + data.length);
      load()
    }
    clear()
    btn_add.innerHTML = "Add"
    isUpdate = false  
}

//Load Data from Array to Table
var load = ()=>{
    var content = ""
    row_index = 0
    for(info of data){
      content += `
        <tr>
          <th style="display:none">${row_index}</th>
          <th scope="row">${info.id}</th>
          <td>${info.name}</td>
          <td>${info.phone}</td>
          <td>
            <button class="btn btn-dark  btn-sm" onclick="viewItem(this)">View</button>
            <button class="btn btn-danger  btn-sm" onclick="deleteItem(${row_index++})">Delete</button>
            <button class="btn btn-info  btn-sm" onclick="editItem(this)">Edit</button>
          </td>
        </tr>` 
    } 
    list_data.innerHTML = content
    content = "";
}
//Delete Data by index
var deleteItem = (id)=>{
    console.log(id);
    data.splice(id,1)
    console.log(data);
    
    load()  
}

//View Item
var viewItem = (obj)=>{
  let child = obj.parentNode.parentNode.childNodes
  var id = child[3].innerText
  var name = child[5].innerText
  var phone = child[7].innerText
  console.log("working");
  alert(`ID : ${id} , Name : ${name} , Phone: ${phone}`)
}

//Validate 

// phone_obj.oninput = ()=>{
//   validatePhone(phone_obj.value);
// }
// name_obj.oninput = ()=>{
//   validateName(name_obj.value);
// }

var phone_err = document.getElementById(phone_error)
var name_err = document.getElementById(name_error)

var validatePhone = (phone)=>{
    var patt = /^[0-9]+$/gi;
   if(phone == null){
     phone_error.innerHTML = "phone can not be empty"
     return false
   }else if(phone.length>10){
    phone_error.innerHTML = "phone number can not more than 10 number"
     return false
   }else if(phone.match(patt) == null){
     phone_error.innerHTML = "Invalid phone number"
     return false
   }else{
    phone_error.innerHTML = ""
     return true
   }
}
var validateName = (name)=>{
    var patt = /^[a-z]+$/gi;
   if(name.match(patt) == null){
     name_error.innerHTML = "Invalid name"
     return false
   }else{
    name_error.innerHTML = ""
    return true
   }
}